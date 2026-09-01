import { Given, When, Then, Before, After, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';
import { ProductsPage } from '../pages/products.page';
import { CartPage } from '../pages/cart.page';

setDefaultTimeout(20000);

let browser: Browser;
let page: Page;
let loginPage: LoginPage;
let registerPage: RegisterPage;
let productsPage: ProductsPage;
let cartPage: CartPage;

// Hooks
Before(async () => {
  browser = await chromium.launch({ headless: process.env.HEADLESS === 'true' });
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  registerPage = new RegisterPage(page);
  productsPage = new ProductsPage(page);
  cartPage = new CartPage(page);
});

After(async function (scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const screenshot = await page.screenshot();
    await this.attach(screenshot, 'image/png');
  }
  await browser.close();
});

// LOGIN STEPS
Given('que o usuário está na página de login', async () => {
  await loginPage.goto();
});

When('ele faz login com a conta de teste', async () => {
  await loginPage.loginWithTestUser();
});

When('ele insere o e-mail {string} e a senha {string}', async (email: string, password: string) => {
  await loginPage.login(email, password);
});

Then('ele deve ver que está logado', async () => {
  await loginPage.assertLoggedIn();
});

Then('ele deve ver a mensagem de erro {string}', async (expectedMessage: string) => {
  await loginPage.assertErrorMessage(expectedMessage);
});

// REGISTRATION STEPS
When('ele se cadastra com um e-mail novo', async () => {
  const uniqueEmail = `qa-playwright-sd-${Date.now()}@mailinator.com`;
  await registerPage.startSignup('QA Playwright SD', uniqueEmail);
  await registerPage.fillAccountInformation({
    password: 'SenhaDeTeste123',
    firstName: 'QA',
    lastName: 'Playwright',
    company: 'qa-playwright-sd',
    address: 'Rua de Teste, 123',
    state: 'SP',
    city: 'Sao Paulo',
    zipcode: '01000-000',
    mobileNumber: '11999999999',
    country: 'Canada',
  });
});

Then('ele deve ver a mensagem {string}', async (expectedMessage: string) => {
  await registerPage.assertAccountCreated(expectedMessage);
});

Then('a conta criada deve poder ser removida', async () => {
  await registerPage.continueAfterAccountCreated();
  await registerPage.deleteAccount();
});

// PRODUCTS STEPS
Given('que o usuário está na página de produtos', async () => {
  await productsPage.goto();
});

When('ele busca por {string}', async (term: string) => {
  await productsPage.search(term);
});

Then('ele deve ver resultados da busca', async () => {
  await productsPage.assertSearchResultsVisible();
});

When('ele adiciona os produtos {string} e {string} ao carrinho', async (product1: string, product2: string) => {
  await productsPage.addProductToCart(product1);
  await productsPage.addProductToCart(product2);
});

// CART STEPS
When('ele acessa o carrinho', async () => {
  await cartPage.goto();
});

Then('ele deve ver os produtos {string} e {string} no carrinho', async (product1: string, product2: string) => {
  await cartPage.assertProductInCart(product1);
  await cartPage.assertProductInCart(product2);
});

When('ele remove o produto {string} do carrinho', async (productName: string) => {
  await cartPage.removeProduct(productName);
});

Then('ele não deve ver o produto {string} no carrinho', async (productName: string) => {
  await cartPage.assertProductNotInCart(productName);
});

Then('ele deve ver o produto {string} no carrinho', async (productName: string) => {
  await cartPage.assertProductInCart(productName);
});
