# Testing Guide

## Overview

This project uses **Jest** and **React Testing Library** for unit and component testing. Tests help ensure code quality and prevent regressions when refactoring.

## Setup

Testing dependencies are already installed:
- `jest` - Testing framework
- `@testing-library/react` - React component testing utilities
- `@testing-library/jest-dom` - Custom Jest matchers for DOM assertions
- `@testing-library/user-event` - User interaction simulation
- `jest-environment-jsdom` - DOM environment for tests

## Running Tests

```bash
# Run tests in watch mode (recommended for development)
npm test

# Run tests once (CI mode)
npm run test:ci

# Generate coverage report
npm run test:coverage
```

## Project Structure

Tests are organized in `__tests__` directories next to the components they test:

```
src/
  components/
    __tests__/
      Footer.test.tsx
      CookieConsent.test.tsx
    Footer.tsx
    CookieConsent.tsx
  lib/
    __tests__/
      config.test.ts
    config.ts
```

## Writing Tests

### Component Test Example

```typescript
import { render, screen } from '@testing-library/react';
import { MyComponent } from '@/components/MyComponent';

describe('MyComponent', () => {
  it('should render text', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Testing Best Practices

1. **Test User Behavior, Not Implementation**
   - Focus on what users see and do
   - Avoid testing internal state or implementation details

2. **Use Semantic Queries**
   ```typescript
   // ✅ Good - tests what users see
   screen.getByRole('button', { name: /submit/i })
   screen.getByText('Welcome')
   
   // ❌ Avoid - implementation details
   screen.getByTestId('submit-button')
   wrapper.state().isOpen
   ```

3. **Mock External Dependencies**
   ```typescript
   jest.mock('@/lib/api', () => ({
     fetchData: jest.fn()
   }));
   ```

4. **Use Setup and Teardown**
   ```typescript
   beforeEach(() => {
     // Reset before each test
     localStorage.clear();
   });

   afterEach(() => {
     // Cleanup after each test
     jest.clearAllMocks();
   });
   ```

## Key Test Files

### `jest.config.ts`
Main Jest configuration:
- TypeScript support via Next.js
- Module path aliases (`@/`)
- Coverage thresholds
- Test environment setup

### `jest.setup.ts`
Shared test setup:
- Imports Testing Library matchers
- Mocks Next.js router
- Environment variables

### Example Tests

1. **Footer.test.tsx** - Component rendering and navigation
2. **CookieConsent.test.tsx** - User interactions and localStorage
3. **config.test.ts** - Configuration constants validation

## Mocking

### Mocking Next.js Modules

```typescript
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
  }),
}));
```

### Mocking External Dependencies

```typescript
jest.mock('@/lib/auth', () => ({
  signIn: jest.fn().mockResolvedValue({ user: { id: '123' } }),
}));
```

## Coverage

Coverage thresholds are set in `jest.config.ts`:

```typescript
coverageThreshold: {
  global: {
    branches: 50,
    functions: 50,
    lines: 50,
    statements: 50,
  },
}
```

Run coverage reports:

```bash
npm run test:coverage
```

This generates an HTML report in `coverage/` directory.

## Common Testing Patterns

### Testing Forms

```typescript
it('should submit form data', () => {
  render(<ContactForm />);
  
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'test@example.com' }
  });
  
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  
  expect(mockSubmit).toHaveBeenCalled();
});
```

### Testing Async Operations

```typescript
it('should fetch and display data', async () => {
  render(<DataComponent />);
  
  expect(await screen.findByText(/loading/i)).toBeInTheDocument();
  expect(await screen.findByText(/data loaded/i)).toBeInTheDocument();
});
```

### Testing Hooks

```typescript
import { renderHook, act } from '@testing-library/react';
import { useMyHook } from '@/hooks/useMyHook';

it('should increment counter', () => {
  const { result } = renderHook(() => useMyHook());
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});
```

## Debugging Tests

### View DOM Output

```typescript
import { screen, debug } from '@testing-library/react';

render(<MyComponent />);
debug(); // Prints DOM to console
```

### Check Accessibility

```typescript
import { screen } from '@testing-library/react';

render(<MyComponent />);
screen.getByRole('button'); // Throws error if button not accessible
```

## CI/CD Integration

In CI/CD pipelines, use:

```bash
npm run test:ci
```

This runs tests once with coverage reporting, suitable for automated testing.

## Resources

- [Jest Documentation](https://jestjs.io)
- [React Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
