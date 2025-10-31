# Contributing to GitBoxd

Thank you for your interest in contributing! This document provides guidelines for contributing to GitBoxd.

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Make your changes
5. Run tests: `npm test`
6. Run linter: `npm run lint`

## Code Style

- Use TypeScript for all new code
- Follow existing code formatting (Prettier/ESLint)
- Write meaningful commit messages
- Add tests for new features

## Pull Request Process

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes with clear commits
3. Update documentation if needed
4. Ensure all tests pass
5. Submit PR with description of changes

## Testing

- Write unit tests for utility functions
- Test edge cases (missing data, malformed CSVs)
- Verify UI changes in multiple browsers

## Areas for Contribution

### High Priority
- TMDB integration for poster images
- Profile comparison feature
- Rating distribution charts
- Accessibility improvements

### Medium Priority
- Additional export formats (PDF, HTML)
- Custom color themes
- Mobile UI optimization
- Performance optimizations

### Low Priority
- Social sharing features
- Backend implementation (opt-in)
- User authentication
- List collaboration

## Bug Reports

Include:
- Steps to reproduce
- Expected vs actual behavior
- Browser/OS information
- Sample export (if applicable)

## Feature Requests

Open an issue with:
- Clear description of feature
- Use case/motivation
- Proposed implementation (optional)

## Privacy Considerations

All contributions must maintain privacy-first approach:
- Client-side processing by default
- No tracking or analytics without consent
- Clear privacy notices for any data collection

## License

By contributing, you agree your contributions will be licensed under the MIT License.

## Questions?

Open an issue or discussion on GitHub.
