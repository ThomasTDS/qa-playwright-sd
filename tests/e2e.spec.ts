import { test, expect } from '@playwright/test';

test.describe('E2E - Saucedemo', () => {

  test('login → filtrar → adicionar/remover itens → checkout → logout', async ({ page }) => {

    // Step 1: Login
    await test.step('Login', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    // Step 2: Filtrar produtos
    await test.step('Filtrar produtos', async () => {
      const sort = page.locator('[data-test="product-sort-container"]');
      await sort.selectOption('za');   // Nome Z → A
      await sort.selectOption('lohi'); // Preço baixo → alto
      await sort.selectOption('hilo'); // Preço alto → baixo
      await sort.selectOption('lohi'); // Preço baixo → alto novamente
    });

    // Step 3: Adicionar dois produtos ao carrinho
    await test.step('Adicionar produtos', async () => {
      await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
      await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    });

    // Step 4: Remover um produto do carrinho
    await test.step('Carrinho', async () => {
      await page.locator('[data-test="shopping-cart-link"]').click();
      await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
    });

    // Step 5: Checkout do item restante
    await test.step('Checkout', async () => {
      await page.locator('[data-test="checkout"]').click();
      await page.locator('[data-test="firstName"]').fill('Fulano');
      await page.locator('[data-test="lastName"]').fill('Ciclano');
      await page.locator('[data-test="postalCode"]').fill('99876789');
      await page.locator('[data-test="continue"]').click();
      await page.locator('[data-test="finish"]').click();
      await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    });

    // Step 6: Logout
    await test.step('Logout', async () => {
      await page.locator('[data-test="back-to-products"]').click();
      await page.getByRole('button', { name: 'Open Menu' }).click();
      await page.locator('[data-test="logout-sidebar-link"]').click();
      await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

  });

});
