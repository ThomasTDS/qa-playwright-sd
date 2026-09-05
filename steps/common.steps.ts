import { Given, When, Then, Before, After, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';
import { ProductsPage } from '../pages/products.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { ContactPage } from '../pages/contact.page';
import { SecurityPage } from '../pages/security.page';

setDefaultTimeout(30000);

let browser: Browser;
let page: Page;
let loginPage: LoginPage;
let registerPage: RegisterPage;
let productsPage: ProductsPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;
let contactPage: ContactPage;
let securityPage: SecurityPage;

// Hooks
Before(async () => {
  browser = await chromium.launch({ headless: process.env.HEADLESS === 'true' });
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  registerPage = new RegisterPage(page);
  productsPage = new ProductsPage(page);
  cartPage = new CartPage(page);
  checkoutPage = new CheckoutPage(page);
  contactPage = new ContactPage(page);
  securityPage = new SecurityPage(page);
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

When('ele faz logout', async () => {
  await loginPage.logout();
});

Then('ele deve ver que está deslogado', async () => {
  await loginPage.assertLoggedOut();
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

When('ele adiciona o produto {string} ao carrinho', async (productName: string) => {
  await productsPage.addProductToCart(productName);
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

// CHECKOUT STEPS
When('ele prossegue para o checkout', async () => {
  await checkoutPage.proceedToCheckout();
});

When('ele confirma o pedido', async () => {
  await checkoutPage.placeOrder();
});

When('ele preenche o pagamento com um cartão de teste', async () => {
  await checkoutPage.fillPayment({
    nameOnCard: 'QA Playwright',
    cardNumber: '4111111111111111',
    cvc: '123',
    expiryMonth: '12',
    expiryYear: '2030',
  });
});

Then('ele deve ver a confirmação do pedido', async () => {
  await checkoutPage.assertOrderPlaced();
});

Then('ele deve ver a mensagem pedindo para fazer login', async () => {
  await checkoutPage.assertLoginRequiredMessage();
});

// CONTACT / NEWSLETTER STEPS
Given('que o usuário está na página de contato', async () => {
  await contactPage.goto();
});

Given('que o usuário está na página inicial', async () => {
  await contactPage.gotoHome();
});

When('ele envia o formulário de contato com {string}, {string}, {string} e {string}', async (name: string, email: string, subject: string, message: string) => {
  await contactPage.submitForm(name, email, subject, message);
});

Then('ele deve ver a confirmação de envio do formulário', async () => {
  await contactPage.assertMessageSent();
});

When('ele se inscreve na newsletter com o e-mail {string}', async (email: string) => {
  await contactPage.subscribeToNewsletter(email);
});

Then('ele deve ver a confirmação da inscrição', async () => {
  await contactPage.assertSubscribed();
});

// SECURITY STEPS
Then('a aplicação deve responder com os cabeçalhos de segurança esperados', async () => {
  await securityPage.assertSecurityHeadersPresent();
});

Then('o acesso via HTTP deve ser redirecionado para HTTPS', async () => {
  await securityPage.assertHttpRedirectsToHttps();
});

Then('o campo de senha deve ser do tipo password', async () => {
  await securityPage.assertPasswordFieldIsMasked();
});

Then('o cookie de sessão deve ter a flag HttpOnly ativada', async () => {
  await securityPage.assertSessionCookieIsHttpOnly();
});
