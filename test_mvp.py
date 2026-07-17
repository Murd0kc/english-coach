from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 390, "height": 844})
    page.goto("http://127.0.0.1:4173")
    page.wait_for_load_state("networkidle")
    assert page.get_by_role("heading", name="Habla inglés con más confianza.").is_visible()
    page.get_by_role("button", name="Continuar lección").click()
    assert page.get_by_text("Tu lección está lista para comenzar.").is_visible()
    page.get_by_role("button", name="Comenzar lección").click()
    assert page.get_by_text("La práctica conversacional estará disponible en el siguiente paso.").is_visible()
    browser.close()
