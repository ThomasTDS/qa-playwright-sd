import { Page, expect } from '@playwright/test';

export interface AccountInfo {
  password: string;
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
  country?: string;
}

export class RegisterPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async startSignup(name: string, email: string) {
    await this.page.locator('[data-qa="signup-name"]').fill(name);
    await this.page.locator('[data-qa="signup-email"]').fill(email);
    await this.page.locator('[data-qa="signup-button"]').click();
    await expect(this.page.getByText('Enter Account Information')).toBeVisible();
  }

  async fillAccountInformation(info: AccountInfo) {
    await this.page.locator('#id_gender1').check();
    await this.page.locator('[data-qa="password"]').fill(info.password);
    await this.page.locator('#days').selectOption('10');
    await this.page.locator('#months').selectOption('5');
    await this.page.locator('#years').selectOption('1995');

    await this.page.locator('[data-qa="first_name"]').fill(info.firstName);
    await this.page.locator('[data-qa="last_name"]').fill(info.lastName);
    await this.page.locator('[data-qa="company"]').fill(info.company);
    await this.page.locator('[data-qa="address"]').fill(info.address);
    await this.page.locator('[data-qa="state"]').fill(info.state);
    await this.page.locator('[data-qa="city"]').fill(info.city);
    await this.page.locator('[data-qa="zipcode"]').fill(info.zipcode);
    await this.page.locator('[data-qa="mobile_number"]').fill(info.mobileNumber);
    if (info.country) {
      await this.page.locator('[data-qa="country"]').selectOption(info.country);
    }

    await this.page.locator('[data-qa="create-account"]').click();
  }

  async assertAccountCreated(expectedMessage: string) {
    await expect(this.page.getByText(expectedMessage)).toBeVisible();
  }

  async continueAfterAccountCreated() {
    await this.page.locator('[data-qa="continue-button"]').click();
  }

  async deleteAccount() {
    await this.page.locator('a[href="/delete_account"]').click();
    await expect(this.page.getByText('ACCOUNT DELETED!')).toBeVisible();
    await this.page.locator('[data-qa="continue-button"]').click();
  }
}
