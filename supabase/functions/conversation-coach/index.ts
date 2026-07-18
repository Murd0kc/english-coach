const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const scenarioRules: Record<string, string> = {
  cafe: 'The learner orders a drink at a cafe. Ask one short follow-up question at a time.',
  travel: 'The learner checks into a hotel. Ask for the reservation and help with one practical request.',
  work: 'The learner has a short professional introduction. Ask about their role and one responsibility.',
};

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const body = await request.json();
    const scenario = scenarioRules[body.scenario] ? body.scenario : 'cafe';
    const level = body.levelCode ?? 'A1';
    const messages = Array.isArray(body.messages) ? body.messages.slice(-12) : [];
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) throw new Error('OPENAI_API_KEY is not configured on the server.');
    const input = messages.map((message: { role: string; content: string }) => ({ role: message.role, content: message.content }));
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: Deno.env.get('OPENAI_MODEL') ?? 'gpt-4o-mini',
        instructions: `You are a patient English coach for a Spanish-speaking learner at ${level}. ${scenarioRules[scenario]} Reply in English, keep it concise, and after your reply include a JSON correction only when the learner made a meaningful mistake. Format: <reply>\n<!--CORRECTION:{"original":"...","better":"...","explanation":"..."}-->`.replace(/\n/g, ' '),
        input,
        max_output_tokens: 180,
      }),
    });
    if (!response.ok) throw new Error(`OpenAI request failed with status ${response.status}.`);
    const result = await response.json();
    const output = result.output_text ?? (result.output ?? [])
      .flatMap((item: { content?: Array<{ type?: string; text?: string }> }) => item.content ?? [])
      .filter((part: { type?: string; text?: string }) => part.type === 'output_text' && part.text)
      .map((part: { text?: string }) => part.text)
      .join('\n');
    if (!output) throw new Error('OpenAI returned an empty response.');
    const match = output.match(/<!--CORRECTION:(.*?)-->/);
    const correction = match ? JSON.parse(match[1]) : null;
    const reply = output.replace(/<!--CORRECTION:.*?-->/, '').trim();
    return new Response(JSON.stringify({ reply, correction }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Conversation failed.' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
