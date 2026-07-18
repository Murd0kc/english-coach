import { useEffect, useRef, useState } from 'react';
import { savePronunciationAttempt } from '../services/pronunciationService';
import './PronunciationCoach.css';

const prompts = ['I start work at eight.', 'Could I have a medium latte, please?', 'Where is the train station?'];

function scoreWords(target, transcript) {
  const expected = target.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/);
  const said = transcript.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/);
  if (!expected.length) return 0;
  return Math.round((expected.filter((word, index) => said[index] === word).length / expected.length) * 100);
}

export function PronunciationCoach() {
  const [promptIndex, setPromptIndex] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [score, setScore] = useState(null);
  const [error, setError] = useState('');
  const recognition = useRef(null);
  const target = prompts[promptIndex];
  useEffect(() => () => recognition.current?.stop(), []);
  function listenModel() { window.speechSynthesis?.speak(new SpeechSynthesisUtterance(target)); }
  function startRecording() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { setError('Tu navegador no permite transcripción de voz. Prueba con Chrome.'); return; }
    setError(''); setTranscript(''); setScore(null);
    const instance = new SpeechRecognition(); instance.lang = 'en-US'; instance.interimResults = false; instance.maxAlternatives = 1;
    instance.onstart = () => setIsListening(true); instance.onend = () => setIsListening(false);
    instance.onerror = () => { setIsListening(false); setError('No pudimos escuchar con claridad. Inténtalo otra vez.'); };
    instance.onresult = async (event) => { const result = event.results[0][0].transcript; const nextScore = scoreWords(target, result); setTranscript(result); setScore(nextScore); try { await savePronunciationAttempt({ targetText: target, transcript: result, wordScore: nextScore }); } catch (saveError) { setError(saveError.message); } };
    recognition.current = instance; instance.start();
  }
  function nextPrompt() { setPromptIndex((value) => (value + 1) % prompts.length); setTranscript(''); setScore(null); setError(''); }
  return <section className="pronunciation-coach" aria-labelledby="pronunciation-title"><div className="section-heading"><div><p className="eyebrow">Pronunciación</p><h2 id="pronunciation-title">Hazte entender con confianza</h2></div><span>Escucha · habla · mejora</span></div><p className="pronunciation-target">“{target}”</p><div className="pronunciation-actions"><button className="secondary-button" type="button" onClick={listenModel}>🔊 Escuchar modelo</button><button className="primary-button" type="button" onClick={startRecording} disabled={isListening}>{isListening ? 'Escuchando...' : '🎙 Leer en voz alta'}</button><button className="text-button" type="button" onClick={nextPrompt}>Otra frase</button></div>{transcript && <div className="pronunciation-result"><p><strong>Te escuchamos:</strong> {transcript}</p><strong className="pronunciation-score">{score}%</strong><small>{score >= 80 ? 'Muy bien. Suena claro.' : 'Practica despacio y marca cada palabra.'}</small></div>}{error && <p role="alert">{error}</p>}</section>;
}
