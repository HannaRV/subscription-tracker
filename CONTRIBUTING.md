# Contributing to Subscription Tracker

Contributions to the Subscription Tracker library are welcome! This document provides guidelines for contributing to the project.

## Getting Started

For basic setup and installation instructions, see [README.md](README.md).

### Development Setup
1. Fork the repository on GitHub
2. Clone your fork locally
3. Follow the installation steps in README.md
4. Verify everything works by running the tests:
   ```bash
   npm start
   ```

## How to Contribute

### Reporting Bugs
Before creating a bug report, please check if the issue already exists in our [GitHub Issues](https://github.com/HANNARV/subscription-tracker/issues).

When creating a bug report, include:
- Clear description of the problem
- Steps to reproduce the issue
- Expected vs actual behavior
- Code examples (if applicable)
- Environment details (Node.js version, OS)

### Suggesting Features
Feature suggestions are welcome! Please:
- Check existing issues first to avoid duplicates
- Describe the feature and its use case
- Explain why it would be valuable for other users
- Consider providing a basic implementation proposal

### Submitting Code Changes

#### Pull Request Process
1. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes following our coding standards
3. Add or update tests as needed
4. Ensure all tests pass
5. Commit with descriptive messages
6. Push to your fork and submit a pull request

#### Code Standards
This project follows Clean Code principles:

**Naming Conventions:**
- Use descriptive, intention-revealing names
- Avoid abbreviations and mental mapping
- Use pronounceable names
- Use searchable names for important concepts

**Functions/Methods:**
- Keep functions small (ideally under 20 lines)
- Functions should do one thing
- Use descriptive names that explain what the function does
- Minimize function arguments (prefer 0-2 parameters)

**Comments:**
- Write code that documents itself through clear naming
- Use comments sparingly - only where they add value
- JSDoc is used for public API documentation
- Explain "why" not "what" when comments are needed

**General Guidelines:**
- Follow existing code style and patterns
- Write tests for new functionality
- Keep classes focused and cohesive
- Use meaningful variable names
- Avoid deep nesting

#### Testing Requirements
- All public methods must have tests
- Include both positive and negative test cases
- Test edge cases and error conditions
- Maintain or improve test coverage

#### Documentation
- Update README.md if your changes affect usage
- Add JSDoc comments for new public methods
- Update examples if API changes

## Code of Conduct

### Standards
- Use welcoming and inclusive language
- Respect differing viewpoints and experiences
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other contributors

### Enforcement
Unacceptable behavior may result in temporary or permanent removal from the project community.

## Development Workflow

### Running Tests
```bash
npm start
```

This executes the comprehensive test suite in `test-app/app.js` which includes:
- Basic functionality tests
- Error handling validation  
- Edge case testing
- Usage analysis examples

The test file also provides comprehensive examples of how to use the library, making it useful for understanding the API while developing.

## Questions?

For usage questions, see the main [README.md](README.md). For development questions, create an issue with the "question" label.

## License

By contributing, you agree that your contributions will be licensed under the project's existing license, MIT. See [LICENSE](LICENSE) for details.

## Acknowledgments

Thank you for taking the time to contribute to Subscription Tracker! Your efforts help make this library better for everyone.