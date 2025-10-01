import { test, expect } from '@playwright/test';

test.describe('Products tests - Saucedemo', () => {

  test('verify all product names', async ({ page }) => {

    // Step 1: login
    await test.step('login', async () => {
      await page.goto('https://www.saucedemo.com');
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    // Step 2: Verifica o título dos produtos
    await test.step('product title verification', async () => {
      const expectedProducts = [
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Onesie',
        'Test.allTheThings() T-Shirt (Red)'
      ];

      const titleListLocator = page.locator('.inventory_item_name');
      const productTitleList = await titleListLocator.allTextContents();

      expect(productTitleList).toEqual(expectedProducts);
    });

  });

});
