import { Page, expect } from '@playwright/test';

export interface PaymentDetails {
  nameOnCard: string;
  cardNumber: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
}

export class CheckoutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async proceedToCheckout() {
    await this.page.getByText('Proceed To Checkout').click();
  }

  async assertLoginRequiredMessage() {
    await expect(this.page.getByText('Register / Login account to proceed on checkout.')).toBeVisible();
  }

  async placeOrder() {
    await this.page.locator('a:has-text("Place Order")').click();
  }

  async fillPayment(details: PaymentDetails) {
    await this.page.locator('[data-qa="name-on-card"]').fill(details.nameOnCard);
    await this.page.locator('[data-qa="card-number"]').fill(details.cardNumber);
    await this.page.locator('[data-qa="cvc"]').fill(details.cvc);
    await this.page.locator('[data-qa="expiry-month"]').fill(details.expiryMonth);
    await this.page.locator('[data-qa="expiry-year"]').fill(details.expiryYear);
    await this.page.locator('[data-qa="pay-button"]').click();
  }

  async assertOrderPlaced() {
    await expect(this.page.getByText('Order Placed!')).toBeVisible();
  }
}
