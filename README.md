# Web Banking Application

Welcome to the Web Banking Application project! This README file will guide you through the setup, usage, and features of our online banking platform. Whether you are a developer looking to contribute or a user interested in understanding the application, you'll find all the information you need here.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Contributors](#contributors)
- [Commit Values](#commit-values)
- [License](#license)

## Introduction

The Web Banking Application is a secure and user-friendly online banking platform designed to provide users with convenient access to their financial accounts. With a focus on security and ease of use, our application allows users to manage their finances, view transaction history, transfer funds, and much more.

## Features

- **Account Management**: View account balances and details.
- **Transaction History**: Access and filter past transactions.
- **Funds Transfer**: Transfer money between accounts securely.
- **Bill Payments**: Pay bills directly from your account.
- **User Authentication**: Secure login and multi-factor authentication.
- **Customer Support**: Integrated support for user queries.

## Dependencies

The Web Banking Application relies on the following technologies:
- **Next.js**: React framework for server-side rendering
- **TypeScript**: Typed JavaScript for scalable and robust applications
- **Appwrite**: Backend server for authentication, database, storage, and more
- **Plaid**: API for connecting to users' bank accounts
- **Dwolla**: API for ACH payments and money transfers
- **React Hook Form**: Library for managing form state
- **Zod**: TypeScript-first schema declaration and validation library
- **TailwindCSS**: Utility-first CSS framework for styling
- **Chart.js**: Library for creating interactive charts
- **ShadCN**: Design system and component library

## Installation

To get started with the Web Banking Application, follow these steps:

1. **Clone the Repository**
    ```bash
    git clone https://github.com/DanyloOhurtsov/unknown-bank
    cd unknown-bank
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Set Up Environment Variables**
    Create a `.env` file in the root directory and add the necessary environment variables:
    ```
    DB_HOST=your_database_host
    DB_USER=your_database_user
    DB_PASS=your_database_password
    JWT_SECRET=your_jwt_secret
    ```

4. **Run the Application**
    ```bash
    npm start
    ```

## Contributors

We welcome contributions from the community! If you'd like to contribute, please fork the repository and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

- **Your Name** - Initial Work - [yourusername](https://github.com/yourusername)

## Commit Values

When contributing to this project, please adhere to the following commit values to maintain a clear and consistent history:

- **fix**: A commit that fixes an error
- **feat**: Commits that add a new feature
- **docs**: Commits that affect only the documentation
- **style**: Commits that do not affect the content (whitespace, formatting, missing commas, etc.)
- **chore**: Miscellaneous commits, e.g., changing .gitignore
- **perf**: Special refactor commits that improve performance
- **refactor**: Commits that rewrite/restructure your code, but do not change any behavior
- **build**: Commits that affect build components, such as the build tool, CI pipeline, dependencies, project version
- **ops**: Commits that affect operational components, such as infrastructure, deployment, backup, recovery
- **test**: Commits that add missing tests or fix existing tests

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/DanyloOhurtsov/unknown-bank/blob/main/LICENSE.txt) file for details.

Thank you for using the Web Banking Application! If you have any questions or feedback, please feel free to reach out.
