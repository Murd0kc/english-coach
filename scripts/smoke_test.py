from playwright.sync_api import sync_playwright

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.goto('http://127.0.0.1:5173', wait_until='networkidle')
    title = page.title()
    assert title == 'English Coach', title
    assert page.locator('h1').count() == 1
    assert page.get_by_role('button', name='Iniciar sesión').count() == 1
    assert page.get_by_text('Crear una').count() == 1
    assert not errors, errors
    print('smoke-test-ok')
    browser.close()
