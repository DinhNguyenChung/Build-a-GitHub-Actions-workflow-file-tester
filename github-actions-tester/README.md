# GitHub Actions Tester

## Overview
GitHub Actions Tester is a local simulator for testing GitHub Actions workflow files (`.yml`) before pushing them to GitHub. This tool allows developers to validate their workflows, ensuring that they run as expected without the need to push changes to the remote repository.

## Features
- **Local Testing**: Simulate the execution of GitHub Actions workflows locally.
- **YAML Parsing**: Read and parse `.yml` workflow files to extract structured data.
- **Action Simulation**: Run actions defined in the workflow and log the output.
- **Environment Setup**: Configure environment variables and context for action execution.
- **Detailed Logging**: Display logs in a format similar to GitHub Actions UI.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/github-actions-tester.git
   ```
2. Navigate to the project directory:
   ```
   cd github-actions-tester
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Usage
1. Start the server:
   ```
   npm start
   ```
2. Use the API to upload and test your workflow files. You can send a POST request to the `/test` endpoint with your `.yml` file.

### Example
To test a sample workflow, you can use the provided `sample-workflow.yml` located in the `tests/fixtures` directory. 

### Running Tests
To ensure everything is working correctly, you can run the tests using:
```
npm test
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.