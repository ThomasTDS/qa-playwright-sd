import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';
import { CheckoutPage } from '../pages/checkout.page';
import { expect } from '@playwright/test';

let browser: Browser;
let page: Page;
let loginPage: LoginPage;
let productsPage: ProductsPage;
let checkoutPage: CheckoutPage;

// Hooks
Before(async () => {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  productsPage = new ProductsPage(page);
  checkoutPage = new CheckoutPage(page);
});

After(async () => {
  await browser.close();
});

// LOGIN STEPS
Given('que o usuário está na página de login', async () => {
  await loginPage.goto();
});

When('ele insere o usuário {string} e a senha {string}', async (username: string, password: string) => {
  await loginPage.login(username, password);
});

Then('ele deve ser redirecionado para a página de inventário', async () => {
  await loginPage.assertLoggedIn();
});

Then('ele deve ver a mensagem de erro {string}', async (expectedMessage: string) => {
  await loginPage.assertErrorMessage(expectedMessage);
});

// COMMON LOGIN STEP (reutilizado)
Given('que o usuário está logado com {string} e {string}', async (username: string, password: string) => {
  await loginPage.goto();
  await loginPage.login(username, password);
  await loginPage.assertLoggedIn();
});

// PRODUCTS STEPS
When('ele adiciona os produtos {string} e {string} ao carrinho', async (product1: string, product2: string) => {
  await checkoutPage.addProductToCart(product1);
  await checkoutPage.addProductToCart(product2);
});

When('ele adiciona o produto {string} ao carrinho', async (productName: string) => {
  await checkoutPage.addProductToCart(productName);
});

When('ele remove o produto {string} do carrinho', async (productName: string) => {
  const selector = `[data-test="remove-${productName.toLowerCase().replace(/ /g, '-')}"]`;
  await page.locator(selector).click();
});

Then('ele deve ver o produto {string} no carrinho', async (productName: string) => {
  await checkoutPage.assertProductInCart(productName);
});

// SORT PRODUCTS
When('ele filtra os produtos por {string}', async (option: string) => {
  await productsPage.sortProducts(option);
});

Then('os produtos devem aparecer em ordem decrescente de nome', async () => {
  await productsPage.assertSortedByNameDesc();
});

// CHECKOUT STEPS
When('ele finaliza o checkout com informações {string}, {string}, {string}', async (firstName: string, lastName: string, postalCode: string) => {
  await checkoutPage.checkout(firstName, lastName, postalCode);
});

Then('ele deve ver a mensagem de confirmação {string}', async (expectedMessage: string) => {
  await checkoutPage.assertOrderComplete(expectedMessage);
});

When('ele tenta finalizar o checkout sem preencher informações obrigatórias', async () => {
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="continue"]').click();
});

Then('ele deve ver uma mensagem de erro {string}', async (expectedMessage: string) => {
  await checkoutPage.assertErrorMessage(expectedMessage);
});
