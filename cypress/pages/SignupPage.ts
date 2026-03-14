export class SignupPage {
  
  visit(lang: 'en' | 'fr' = 'en'): void {
    const path = lang === 'fr' ? '/fr/signup' : '/signup';
    cy.visit(path);
  }

  get firstNameInput() {
    return cy.get('[data-testid="first-name-input"]');
  }

  get lastNameInput() {
    return cy.get('[data-testid="last-name-input"]');
  }

  get phoneInput() {
    return cy.get('[data-testid="phoneInput"]');
  }

  get provinceSelect() {
    return cy.get('[data-testid="region-select"]');
  }

  get emailInput() {
    return cy.get('[data-testid="email-input"]');
  }

  get passwordInput() {
    return cy.get('[data-testid="password-input"]');
  }

  get confirmPasswordInput() {
    return cy.get('[data-testid="passwordConfirmation-input"]');
  }

  get consentCheckbox() {
    return cy.get('input[type="checkbox"]').first();
  }

  get submitButton() {
    return cy.contains('button', /create your account|créez votre compte/i);
  }

  get loginLink() {
    return cy.get('a').contains(/log in|connectez-vous/i);
  }

  get termsLink() {
    return cy.get('a').contains(/terms of service|conditions d'utilisation/i);
  }

  get passwordHintText() {
    return cy.contains(/password must be between|le mot de passe doit contenir/i);
  }

  fillFirstName(value: string): this {
    this.firstNameInput.clear().type(value);
    return this;
  }

  fillLastName(value: string): this {
    this.lastNameInput.clear().type(value);
    return this;
  }

  fillPhone(value: string): this {
    this.phoneInput.clear().type(value);
    return this;
  }

  selectProvince(province: string): this {
    this.provinceSelect.select(province);
    return this;
  }

  fillEmail(value: string): this {
    this.emailInput.clear().type(value);
    return this;
  }

  fillPassword(value: string): this {
    this.passwordInput.clear().type(value);
    return this;
  }

  fillConfirmPassword(value: string): this {
    this.confirmPasswordInput.clear().type(value);
    return this;
  }

  checkConsent(): this {
    this.consentCheckbox.check();
    return this;
  }

  clickSubmit(): this {
    this.submitButton.click();
    return this;
  }

  fillForm(data: {
    firstName: string;
    lastName: string;
    phone: string;
    province: string;
    email: string;
    password: string;
    confirmPassword: string;
    consent?: boolean;
  }): this {
    this.fillFirstName(data.firstName);
    this.fillLastName(data.lastName);
    this.fillPhone(data.phone);
    this.selectProvince(data.province);
    this.fillEmail(data.email);
    this.fillPassword(data.password);
    this.fillConfirmPassword(data.confirmPassword);
    if (data.consent !== false) {
      this.checkConsent();
    }
    return this;
  }

  static uniqueEmail(base = 'qa.nesto.test'): string {
    return `${base}+${Date.now()}@mailinator.com`;
  }
}