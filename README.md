
# DROPSEND - Cypress Test Automation

This repository contains the test automation framework for the DropSend Web app project, built using Cypress in JavaScript. The framework is designed to automate end-to-end testing scenarios, ensuring the reliability and stability of the application.

## Project Structure

```
DROPSEND/
├── cypress/
│   ├── e2e/                # Test specifications
│   ├── fixtures/           # Test data
│   ├── pageObjects/        # Page Object Modal implemented
│   ├── support/            # Custom commands and helpers
├── node_modules/           # Project dependencies
├── cypress.config.js       # Cypress configuration file
├── package.json            # Project metadata and dependencies
├── README.md               # Project documentation
```

## Getting Started

### Prerequisites

Ensure the following software is installed on your machine:
- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd DROPSEND
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running Tests

#### Open Cypress Test Runner
```bash
npx cypress open
```

#### Run Tests in Headless Mode
```bash
npx cypress run
```
```
## Configuration

Customize your project settings in `cypress.config.js`. For example:

```javascript
module.exports = {
    e2e: {
        baseUrl: 'https://www-dev2.dropsend.com"', 
        viewportWidth: 1280,
        viewportHeight: 720,
    },
};
```

## Folder Structure Details

- **e2e/**: Contains test case files grouped by feature or module.
- **fixtures/**: Stores static data files (e.g., JSON).
- **support/**: Includes reusable custom commands or utilities.

## Reporting

Test results and screenshots/videos are automatically generated for failed tests in the `cypress/reports` directory. Configure reporting options in the Cypress configuration file.

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See `LICENSE` for details.

---

**Happy Testing! 🚀**
