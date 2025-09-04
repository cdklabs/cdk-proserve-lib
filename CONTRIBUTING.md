# Contributing to CDK-ProServe-Lib

Thank you for your interest in contributing to our AWS CDK library! We want to make contributing to this project as easy and transparent as possible and welcome bug reports, submissions of fixes, new features, and more. This document outlines the standards and requirements for contributions.

## Development Workflow and Pull Requests

Any proposed code changes must occur through a pull request.

1. Fork the repo and create your branch from `main`.
2. Add in changes + test files (if applicable).
3. Ensure the test suite passes.
4. Keep your branch up-to-date by regularly rebasing on `main`.
5. Add in documentation by updating the README and adding additional usage examples for aspects/constructs/patterns in their definition files.
6. Issue your pull request.

## PR Naming Convention

PRs must follow this naming pattern:

- chore: description (for maintenance tasks)
- feat: [type] description (for new features)
  - Types: construct, aspect, pattern
  - Example: feat(construct): s3-secure-bucket
- fix: description (for bug fixes)

## Code Quality Requirements

### Testing

- All contributions (constructs, aspects, patterns) must include unit tests
- 100% code coverage is required for all new code
- Tests should cover both success and failure scenarios
- Integration tests are encouraged for complex patterns

### Code Standards

- All source files must include the license header at the top

  // Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  // SPDX-License-Identifier: Apache-2.0

- Any Lambda functions must use the SecureFunction Construct.
- Follow TypeScript best practices and existing code style.

## Code of Conduct

This project has adopted the [Amazon Open Source Code of Conduct](https://aws.github.io/code-of-conduct). For more information see the [Code of Conduct FAQ](https://aws.github.io/code-of-conduct-faq) or contact opensource-codeofconduct@amazon.com with any additional questions or comments.

## Report bugs, propose feature additions using Github's [issues]{https://github.com/cdklabs/cdk-proserve-lib/issues}
