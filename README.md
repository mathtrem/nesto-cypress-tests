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
- **Section 1** - Page structure and labels (9 tests)
- **Section 2** - Positive: successful registration (2 tests)
- **Section 3** - Negative: required fields (4 tests)
- **Section 4** - Negative: invalid email formats (3 tests)
- **Section 5** - Negative: password policy (4 tests)
- **Section 6** - Negative: password mismatch (1 test)
- **Section 7** - Navigation (2 tests)

**Total: 25 tests — all passing in both EN and FR**

## Notes
- Tests handle cookie consent popup automatically
- Language is controlled via `--env lang=en` or `--env lang=fr`
- Bug report available in my google submitted doc