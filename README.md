# nesto Signup Page - Automated Test Suite

## Overview
Cypress + TypeScript test suite for the nesto signup page.
Built as part of a technical exercise for the Automation QA Developer role.

## Prerequisites
- Node.js v18 or higher
- npm v9 or higher

## Installation
```bash
npm install
```

## Running Tests

### English (default)
```bash
npx cypress run --env lang=en
```

### French
```bash
npx cypress run --env lang=fr
```

### Interactive mode (Cypress GUI)
```bash
npx cypress open
```

## Test Coverage
- **Section 1** - Page structure and labels (11 tests)
- **Section 2** - Positive: successful registration (4 tests)
- **Section 3** - Negative: required fields (4 tests)
- **Section 4** - Negative: invalid email formats (3 tests)
- **Section 5** - Negative: password policy (4 tests)
- **Section 6** - Negative: password mismatch (1 test)
- **Section 7** - Navigation (3 tests)

**Total: 29 tests — all passing in both EN and FR**

## Project Structure
```
cypress/
  e2e/
    signup.cy.ts        ← All test cases
  fixtures/
    en.json             ← English test data
    fr.json             ← French test data
  pages/
    SignupPage.ts       ← Page Object Model
  support/
    e2e.js              ← Global configuration
BUG_REPORT.txt          ← Bugs found during testing
README.md               ← This file
cypress.config.js       ← Cypress configuration
tsconfig.json           ← TypeScript configuration
```

## Bilingual Support
Tests run in both English and French by passing the `lang` environment variable:
- English: `--env lang=en`
- French: `--env lang=fr`

## API Testing Note
Account creation is verified through successful page redirect after form submission. Direct API assertion of the 201 status code was attempted but the nesto signup flow uses OAuth authentication through `auth.nesto.ca`, making cross-domain API interception challenging in Cypress. This was investigated via Chrome DevTools and documented accordingly.

## Notes
- Tests handle cookie consent popup automatically in both EN and FR
- Page Object Model used to keep selectors maintainable
- Bug report available in my submitted doc