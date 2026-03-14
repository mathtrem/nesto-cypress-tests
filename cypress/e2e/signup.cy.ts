Cypress.on('uncaught:exception', () => {
  return false;
});

import { SignupPage } from '../pages/SignupPage';

const page = new SignupPage();
const lang = Cypress.env('lang') || 'en';

describe('Signup Page', () => {

  beforeEach(() => {
  cy.setCookie('cookieConsent', 'true');
  cy.setCookie('cookie_consent', 'accepted');
  cy.visit(lang === 'fr' ? 'https://app.qa.nesto.ca/fr/signup' : 'https://app.qa.nesto.ca/signup');
  cy.wait(2000);
  cy.get('body').then(($body) => {
    if ($body.find('button:contains("Agree and close"), button:contains("Accepter & Fermer")').length > 0) {
      cy.contains('button', /agree and close|accepter & fermer/i).click({force: true});
      cy.wait(500);
    }
  });
});

  // ── 1. PAGE STRUCTURE ──────────────────────────────────────────
  describe('1 - Page structure and labels', () => {

    it('displays the correct page heading', () => {
      cy.contains(/create a nesto account|créez un compte nesto/i).should('be.visible');
    });

    it('page title should contain nesto', () => {
      cy.title().should('include', 'nesto');
    });

    it('shows all required form fields', () => {
      page.firstNameInput.should('be.visible');
      page.lastNameInput.should('be.visible');
      page.phoneInput.should('be.visible');
      page.provinceSelect.should('be.visible');
      page.emailInput.should('be.visible');
      page.passwordInput.should('be.visible');
      page.confirmPasswordInput.should('be.visible');
    });

    it('form fields have correct placeholder labels', () => {
      page.firstNameInput.should('have.attr', 'placeholder').and('match', /first name|prénom/i);
      page.lastNameInput.should('have.attr', 'placeholder').and('match', /last name|nom/i);
      page.phoneInput.should('have.attr', 'placeholder').and('match', /phone number|téléphone/i);
      page.emailInput.should('have.attr', 'placeholder').and('match', /email|courriel/i);
      page.passwordInput.should('have.attr', 'placeholder').and('match', /^password$|mot de passe/i);
      page.confirmPasswordInput.should('have.attr', 'placeholder').and('match', /confirm password|confirmation du mot de passe/i);
    });

    it('shows the consent checkbox unchecked by default', () => {
      page.consentCheckbox.should('exist').and('not.be.checked');
    });

    it('shows the submit button', () => {
      page.submitButton.should('be.visible');
    });

    it('shows password hint text', () => {
      page.passwordHintText.should('be.visible');
    });

    it('shows the Log in link', () => {
      page.loginLink.should('be.visible');
    });

    it('shows the Terms of Service link', () => {
      page.termsLink.should('be.visible');
    });

  });

  // ── 2. POSITIVE TESTS ──────────────────────────────────────────
  describe('2 - Positive: successful registration', () => {

    it('creates an account and navigates away from signup page', () => {
      const email = SignupPage.uniqueEmail();

    page.fillForm({
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '5141234567',
      province: 'QC',
      email,
      password: 'SecurePassword1',
      confirmPassword: 'SecurePassword1',
      consent: true,
  });

  // Dismiss cookie popup if it reappears before submitting
  cy.get('body').then(($body) => {
    if ($body.find('button:contains("Agree and close")').length > 0) {
      cy.contains('button', 'Agree and close').click({force: true});
    }
  });

  page.clickSubmit();

  cy.url({ timeout: 20000 }).should('not.include', '/signup');
});

    it('consent checkbox can be checked and unchecked', () => {
      page.consentCheckbox.check().should('be.checked');
      page.consentCheckbox.uncheck().should('not.be.checked');
    });

  });

  // ── 3. NEGATIVE: REQUIRED FIELDS ──────────────────────────────
  describe('3 - Negative: required fields', () => {

    it('shows error when submitting empty form', () => {
      page.clickSubmit();
      cy.get('[class*="error" i], :invalid').should('exist');
    });

    it('shows error when First Name is missing', () => {
      page.fillLastName('Doe')
        .fillPhone('5141234567')
        .selectProvince('QC')
        .fillEmail(SignupPage.uniqueEmail())
        .fillPassword('SecurePassword1')
        .fillConfirmPassword('SecurePassword1')
        .checkConsent()
        .clickSubmit();
      cy.get('[class*="error" i], :invalid').should('exist');
    });

    it('shows error when Last Name is missing', () => {
      page.fillFirstName('John')
        .fillPhone('5141234567')
        .selectProvince('QC')
        .fillEmail(SignupPage.uniqueEmail())
        .fillPassword('SecurePassword1')
        .fillConfirmPassword('SecurePassword1')
        .checkConsent()
        .clickSubmit();
      cy.get('[class*="error" i], :invalid').should('exist');
    });

    it('shows error when Email is missing', () => {
      page.fillFirstName('John')
        .fillLastName('Doe')
        .fillPhone('5141234567')
        .selectProvince('QC')
        .fillPassword('SecurePassword1')
        .fillConfirmPassword('SecurePassword1')
        .checkConsent()
        .clickSubmit();
      cy.get('[class*="error" i], :invalid').should('exist');
    });

  });

  // ── 4. NEGATIVE: INVALID EMAIL ────────────────────────────────
  describe('4 - Negative: invalid email formats', () => {

    const invalidEmails = [
      'notanemail',
      '@nodomain.com',
      'plaintext',
    ];

    invalidEmails.forEach((email) => {
      it(`rejects invalid email: "${email}"`, () => {
        page.fillFirstName('John')
          .fillLastName('Doe')
          .fillPhone('5141234567')
          .selectProvince('QC')
          .fillEmail(email)
          .fillPassword('SecurePassword1')
          .fillConfirmPassword('SecurePassword1')
          .checkConsent()
          .clickSubmit();
        cy.get('[class*="error" i], :invalid').should('exist');
      });
    });

  });

  // ── 5. NEGATIVE: PASSWORD POLICY ──────────────────────────────
  describe('5 - Negative: password policy', () => {

    it('rejects password shorter than 12 characters', () => {
      page.fillPassword('Short1').clickSubmit();
      cy.get('[class*="error" i], :invalid').should('exist');
    });

    it('rejects password without uppercase letter', () => {
      page.fillPassword('alllowercase1').clickSubmit();
      cy.get('[class*="error" i], :invalid').should('exist');
    });

    it('rejects password without lowercase letter', () => {
      page.fillPassword('ALLUPPERCASE1').clickSubmit();
      cy.get('[class*="error" i], :invalid').should('exist');
    });

    it('rejects password without a number', () => {
      page.fillPassword('NoNumbersHere').clickSubmit();
      cy.get('[class*="error" i], :invalid').should('exist');
    });

  });

  // ── 6. NEGATIVE: PASSWORD MISMATCH ────────────────────────────
  describe('6 - Negative: password mismatch', () => {

    it('shows error when passwords do not match', () => {
      page.fillFirstName('John')
        .fillLastName('Doe')
        .fillPhone('5141234567')
        .selectProvince('QC')
        .fillEmail(SignupPage.uniqueEmail())
        .fillPassword('SecurePassword1')
        .fillConfirmPassword('DifferentPass1')
        .checkConsent()
        .clickSubmit();
      cy.get('[class*="error" i], :invalid').should('exist');
    });

  });

  // ── 7. NAVIGATION ─────────────────────────────────────────────
  describe('7 - Navigation', () => {

    it('Log in link navigates away from signup page', () => {
      page.loginLink.click();
      cy.url().should('not.include', '/signup');
    });

    it('Terms of Service link has a valid href', () => {
      page.termsLink.should('have.attr', 'href').and('include', 'nesto.ca');
    });

  });

});