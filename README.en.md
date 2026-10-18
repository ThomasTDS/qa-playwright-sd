# 🧪 QA Playwright + Cucumber - Automation Exercise

[Português](README.md) · **English**

![tests](https://github.com/ThomasTDS/qa-playwright-sd/actions/workflows/tests.yml/badge.svg)
![license](https://img.shields.io/badge/license-MIT-blue.svg)
![node](https://img.shields.io/badge/node-%3E%3D22-brightgreen.svg)

📊 **[Live Allure report](https://ThomasTDS.github.io/qa-playwright-sd/)** — automatically updated on every push to `main`.

## Description

This repository contains automated tests for **[automationexercise.com](https://automationexercise.com)**, built with **Playwright**, **Cucumber (BDD/Gherkin)** and the **Page Object Model (POM)** pattern.

The goal is to demonstrate practical **QA Automation** skills, covering login, sign-up, logout, products, cart, checkout, contact, newsletter and passive security checks through End-to-End (E2E) tests.

> **Status:** migration complete (the project originally targeted saucedemo.com, a much simpler site). Current coverage: login, sign-up, logout, product search, cart, checkout, contact, newsletter and security (headers, HTTPS, cookies).

> **About the language:** the Gherkin scenarios (`.feature` files), the step definitions and the SQL/code comments are all in Portuguese. This README is a full translation of the [Portuguese README](README.md), written for an English-speaking reader of the repository, not a translation of the test suite itself.

---

## Project Structure

```text
qa-playwright-sd/
├── .github/
│   ├── workflows/         # CI pipeline (GitHub Actions)
│   ├── ISSUE_TEMPLATE/    # Bug report template
│   └── dependabot.yml     # Automatic dependency updates
├── docs/
│   ├── criterios-aceite/  # Acceptance criteria per feature (Given/When/Then)
│   └── test-cases.md      # Test case traceability matrix
├── features/              # Gherkin scenarios (.feature)
├── steps/                 # Cucumber step implementations
├── pages/                 # Page Objects (LoginPage, RegisterPage, ...)
├── reports/               # HTML report generated on each run (not versioned)
├── allure-results/        # Raw Allure Report data (not versioned)
├── cucumber.js            # Cucumber configuration
├── eslint.config.js       # ESLint configuration
├── .prettierrc.json       # Prettier configuration
├── .env.example           # Environment variables template
├── package.json           # Dependencies and npm scripts
├── tsconfig.json          # TypeScript configuration
├── Dockerfile             # Image to run the tests containerized
├── LICENSE                # MIT license
├── SECURITY.md            # Vulnerability disclosure policy
├── README.md              # Portuguese
└── README.en.md           # English (this file)

```

---

### Clone the Repository

```
git clone https://github.com/ThomasTDS/qa-playwright-sd.git

cd qa-playwright-sd
```

### Install Dependencies

Requires Node.js 22 or higher (see `engines` in `package.json`).

```
npm install
```

### Install Playwright Browsers

```
npx playwright install
```

### Run All Tests

```
npm test
```

**NOTE:** _By default, tests run with the browser visible (headless = false). To run in headless mode (e.g. like in CI), use the `HEADLESS` environment variable:_

```
# PowerShell
$env:HEADLESS="true"; npm test

# bash
HEADLESS=true npm test
```

### Run Only the Smoke Subset

Critical end-to-end scenarios are tagged `@smoke`. To run only that subset:

```
npm run test:smoke
```

### Lint and Formatting

The project uses **ESLint** (code quality/errors) and **Prettier** (consistent formatting):

```
npm run lint          # checks for lint issues
npm run lint:fix      # auto-fixes what it can
npm run format        # formats every file with Prettier
npm run format:check  # check-only, no changes (used in CI)
npm run typecheck     # checks TypeScript type errors (no output files)
```

A **pre-commit** hook (via [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/lint-staged/lint-staged)) runs automatically on every `git commit`, applying ESLint and Prettier only to staged files — so lint/formatting issues are caught before they even reach CI. The hook is installed automatically by `npm install` (the `prepare` script).

### Run on a Different Browser

By default the tests run on Chromium. To run on a different browser, set `BROWSER` (`chromium`, `firefox` or `webkit`):

```
# PowerShell
$env:BROWSER="firefox"; npm test

# bash
BROWSER=firefox npm test
```

CI runs the full suite on all three browsers on every run.

### Run with Mobile Device Emulation

Scenarios tagged `@mobile` (the ones most sensitive to layout: login, product search, cart and the full checkout flow) also run with Pixel 7 emulation (real-device viewport, user agent and touch, via Playwright's own device preset). To run locally:

```
# PowerShell
$env:DEVICE="mobile"; npm test -- --tags "@mobile"

# bash
DEVICE=mobile npm test -- --tags "@mobile"
```

With `DEVICE=mobile`, the `BROWSER` variable is ignored and Chromium is always used — it's the `defaultBrowserType` of the Pixel 7 preset itself in Playwright. CI runs this subset automatically on every run, in addition to the three desktop browsers.

> **Real finding while validating this:** on narrow mobile viewports, Google AdSense ads (including a fixed "side rail" widget) load asynchronously and late, causing a layout shift big enough to overlap real buttons on the page — reproduced and confirmed through Playwright's actionability log (`<iframe ... title="Advertisement"> ... subtree intercepts pointer events`), both on the "add to cart" button and on the confirmation modal. It's real third-party instability, but not something it makes sense to "wait out" with a retry (it sometimes persisted across both attempts) or dodge by clicking elsewhere (the ad can end up in any position). The fix was to block requests to Google's ad domains (`googlesyndication.com`, `doubleclick.net`, etc.) within the test context — it's not something we're testing, it's third-party noise orthogonal to the application's behavior, the same reasoning you'd apply to mocking an unstable third-party payment widget.

### Run Against a Different URL

By default the tests target `https://automationexercise.com/`. To run against a different environment, set `BASE_URL`:

```
# PowerShell
$env:BASE_URL="https://another-environment.com/"; npm test

# bash
BASE_URL=https://another-environment.com/ npm test
```

### Credentials Setup (.env)

The login scenarios use an existing account on automationexercise.com, defined via environment variable (never hardcoded in the code). Copy `.env.example` to `.env` (not versioned) and fill it in:

```
BASE_URL=https://automationexercise.com/
HEADLESS=false
TEST_USER_EMAIL=
TEST_USER_PASSWORD=
```

In CI, these same variables come from GitHub Secrets (`TEST_USER_EMAIL`/`TEST_USER_PASSWORD`), configured in the repository.

### Run with Docker

The `Dockerfile` uses the official Playwright image (already with Chromium, Firefox and WebKit installed), so there's no need to install browsers locally.

```bash
docker build -t qa-playwright-sd .

docker run --rm --env-file .env -v "$(pwd)/reports:/app/reports" qa-playwright-sd
```

`--env-file .env` passes the test credentials to the container, and the volume on `reports/` brings the generated HTML report back to the host machine. To run on a different browser or just the smoke subset, override the variable or the command on top of the default `CMD`, for example:

```bash
docker run --rm --env-file .env -e BROWSER=firefox -v "$(pwd)/reports:/app/reports" qa-playwright-sd
```

### HTML Report

Each run generates `reports/cucumber-report.html` (not versioned) with the scenario results. Failing tests automatically get a screenshot at the moment of failure attached to the report, a [Playwright trace](https://playwright.dev/docs/trace-viewer) (`traces/*.zip`, not versioned) with the full execution timeline, DOM snapshots and the source of the action that failed, and a video of the scenario run (`videos/*.webm`, not versioned). To open a trace: `npx playwright show-trace traces/<file>.zip`. Passing scenarios record a video normally too, but it's discarded at the end — only videos from failing scenarios are kept on disk.

### Allure Report

Besides the Cucumber HTML, each run also generates raw data for [Allure Report](https://allurereport.org/) in `allure-results/` (not versioned). To view it:

```bash
npm run allure:generate   # builds allure-report/ from allure-results/
npm run allure:open       # opens the generated report in the browser
```

Allure groups scenarios by feature/severity, shows run history, and is more navigable than the plain Cucumber HTML for investigating a large suite.

In CI, this report is automatically published to **[GitHub Pages](https://ThomasTDS.github.io/qa-playwright-sd/)** on every push to `main` and on the daily scheduled run — it always reflects the real state of the latest run, whether it passed or not.

> **Configuration note:** the `allure-cucumberjs/reporter` formatter does not play well with Cucumber's terminal formatters (`progress`/`summary`) — combining either of them makes the `allure-results/` files simply stop being generated, with no visible error (looks like an integration bug between the two libraries). That's why `cucumber.js` only uses `allure-cucumberjs/reporter` + `html`, with no terminal progress formatter — the trade-off is not seeing the `"N scenarios (N passed)"` summary directly in the terminal/CI log anymore, only in the generated reports.

---

### Test Structure and Patterns Applied

- BDD / Gherkin: Clear, readable scenarios in `.feature` files.

- Page Object Model (POM): Separation of concerns, with Pages encapsulating elements and actions.

- End-to-End (E2E) Tests: Simulates real user flows — login, sign-up, logout, product search, cart, checkout, contact and newsletter.

- Multi-device: besides the three desktop browsers, the scenarios most sensitive to layout (login, search, cart, checkout) also run with Pixel 7 emulation (`@mobile` tag), validating that the critical flow works on a mobile viewport.

- Dynamic test data with [Faker.js](https://fakerjs.dev/) (pt-BR locale): the sign-up scenario generates a different name, email, company, address and phone number on every run, avoiding collisions with accounts from previous runs without relying on a timestamp in the email.

- Security QA (passive/defensive): HTTP security headers, forced HTTPS redirect, password field masking and the `HttpOnly` flag on the session cookie. No active exploitation attempts against the third-party application — just observation of what it already exposes publicly.

- Accessibility (passive, with [axe-core](https://github.com/dequelabs/axe-core-npm)): checks for `critical`/`serious` violations on the login and products pages. Since the application under test belongs to a third party, the scenario doesn't fail the build — the violations found are attached to the HTML report for documentation, in the same spirit as the security suite.

- API Verification: calls the automationexercise.com public API directly (products, brands, search, login, user account), without going through the UI. Every response is validated against a schema ([Zod](https://zod.dev/), in `pages/api.schemas.ts`) built from real responses — not just the fields used in the assertions, the entire structure. If the API changes a field that no test checks directly, the schema still catches it.

---

### QA Documentation

- Bug report template in `.github/ISSUE_TEMPLATE/bug_report.md`, with severity (technical impact) and priority (urgency to fix) treated as separate fields, and root cause filled in only after real investigation.

- Traceability matrix in `docs/test-cases.md`, linking each test case to its corresponding `.feature` scenario via the `@TC-XXX` tag.

- Acceptance criteria in [docs/criterios-aceite/](docs/criterios-aceite/), one file per feature, documenting the user story and the business rules in Given/When/Then format — the "why" behind each scenario, complementing the "where" of the traceability matrix.

---

### Best Practices Applied

- Element validation with `expect`.

- Modular structure that makes maintenance and evolution easier.

---

### CI/CD

The project runs automatically via GitHub Actions (`.github/workflows/tests.yml`) on every push/PR to `main` and daily at 06:00 UTC. Before the tests, CI validates lint (`eslint`), formatting (`prettier --check`) and types (`tsc --noEmit`), failing the build if anything is out of line. Scenarios run in parallel (`parallel: 4` in `cucumber.js` — each worker opens its own isolated browser/context, with no shared state between them), significantly reducing total run time. The HTML report, the Allure report and failure traces are published as artifacts of each run; the Allure report from `main` is also published to GitHub Pages (link at the top of this README). `main` is protected: changes must go through a Pull Request with a green test check. Failing scenarios are automatically retried once (`--retry 1`), to absorb one-off network instability without masking real code bugs.

> **The real investigation behind this decision:** I ran the full suite 4 times on each browser, with no retry, to understand where the instability actually comes from (instead of just trusting the retry without questioning it). Chromium and WebKit stayed 100% stable across all 4 runs each. Firefox failed in 2 of 4, always at the same step (`deleteAccount`) — at first it looked like a browser-specific bug, but digging deeper (reproducing it repeatedly and capturing the actual page at the moment of failure) revealed it was a **Cloudflare 520 error** ("Web server is returning an unknown error"), intermittent (~1 in 10 runs), coming from automationexercise.com itself — not a race condition in the code or the browser. Since it's a genuinely transient third-party infrastructure failure, the scenario-level `--retry 1` is already the right mechanism to absorb it (it re-runs the whole flow, including a fresh navigation, which in practice always resolves it). There was no code bug to fix here — the investigation confirmed the retry strategy already in place was correct.

### Pipeline Security

- `npm audit --audit-level=high` runs in CI on every execution, failing the build if there's a high/critical vulnerability in a dependency.
- **Dependabot** active (`.github/dependabot.yml`): automatic weekly updates for npm dependencies and workflow actions, plus GitHub's native security alerts.
- Vulnerability disclosure policy in [SECURITY.md](SECURITY.md).

---

## License

Distributed under the MIT license. See [LICENSE](LICENSE) for details.
