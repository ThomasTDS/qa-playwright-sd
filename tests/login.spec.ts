import { test, expect } from '@playwright/test';

test.describe('Login tests - Saucedemo', () => {

  test('should log in successfully with valid credentials', async ({ page }) => {
    // Navega até a página
    await page.goto('https://www.saucedemo.com');
    await expect(page).toHaveTitle('Swag Labs');

    // Preenche usuário e senha válidos
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // Clica no botão de login
    await page.locator('[data-test="login-button"]').click();

    // Verifica que a URL é a da página de produtos
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Verifica se o título da página de produtos aparece corretamente
    const productTitle = page.locator('.header_secondary_container > span');
    await expect(productTitle).toHaveText('Products');
  });

  test('should show error message for invalid credentials', async ({ page }) => {
    // Navega até a página
    await page.goto('https://www.saucedemo.com');

    // Preenche usuário correto e senha incorreta
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('random12345');

    // Clica no botão de login
    await page.locator('[data-test="login-button"]').click();

    // Verifica se a mensagem de erro é visível
    const errorText = page.locator('[data-test="error"]');
    await expect(errorText).toBeVisible();
  });

});
