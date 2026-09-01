import { Given, When, Then, Before, After, Status } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';

let browser: Browser;
let page: Page;
let loginPage: LoginPage;
let registerPage: RegisterPage;

// Hooks
Before(async () => {
  browser = await chromium.launch({ headless: process.env.HEADLESS === 'true' });
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  registerPage = new RegisterPage(page);
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
