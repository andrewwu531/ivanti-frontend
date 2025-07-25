# Frontend Testing Guide

This guide explains how to set up and run tests for the Ivanti frontend application.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install --save-dev jest @types/jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom ts-jest
```

### 2. Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (recommended for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## 📁 Test Structure

```
src/
├── components/
│   ├── __tests__/
│   │   └── TemperatureForm.test.tsx    # Component tests
│   └── TemperatureForm.tsx
├── utils/
│   ├── __tests__/
│   │   └── formatters.test.ts          # Utility function tests
│   └── formatters.ts
└── setupTests.ts                       # Global test setup
```

## 🧪 Types of Tests

### 1. Component Tests

Test React components using React Testing Library:

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TemperatureForm from '../TemperatureForm';

describe('TemperatureForm', () => {
  it('renders form fields correctly', () => {
    render(<TemperatureForm onSubmit={jest.fn()} />);

    expect(screen.getByLabelText(/person name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/temperature series/i)).toBeInTheDocument();
  });
});
```

### 2. Utility Function Tests

Test pure functions and utilities:

```typescript
import { formatTemperature } from "../formatters";

describe("formatters", () => {
  it("formats positive temperatures correctly", () => {
    expect(formatTemperature(37.2)).toBe("37.2°C");
  });
});
```

### 3. API Integration Tests

Test API calls and data handling:

```typescript
import { temperatureApi } from "../utils/temperatureApi";

// Mock fetch
global.fetch = jest.fn();

describe("temperatureApi", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches temperature records", async () => {
    const mockData = [{ id: 1, personName: "John", temperatureSeries: [37.2] }];
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: mockData }),
    });

    const result = await temperatureApi.getTemperatureRecords();
    expect(result).toEqual(mockData);
  });
});
```

## 🛠️ Testing Utilities

### React Testing Library

- `render()` - Render components for testing
- `screen` - Query elements in the rendered component
- `userEvent` - Simulate user interactions
- `waitFor()` - Wait for async operations

### Jest Matchers

- `toBe()` - Exact equality
- `toEqual()` - Deep equality
- `toContain()` - Check if array/string contains value
- `toBeInTheDocument()` - Check if element exists in DOM
- `toBeDisabled()` - Check if element is disabled

## 📊 Coverage Reports

Generate coverage reports to see test coverage:

```bash
npm run test:coverage
```

This will create a `coverage/` directory with HTML reports.

## 🔧 Configuration

### Jest Configuration (`jest.config.js`)

- **testEnvironment**: `jsdom` for DOM testing
- **setupFilesAfterEnv**: Global test setup
- **moduleNameMapping**: Path aliases
- **collectCoverageFrom**: Files to include in coverage

### Test Setup (`src/setupTests.ts`)

- Import testing-library matchers
- Mock browser APIs (fetch, matchMedia, etc.)
- Configure global test environment

## 📝 Best Practices

### 1. Test Structure

```typescript
describe("ComponentName", () => {
  // Setup
  beforeEach(() => {
    // Common setup
  });

  // Happy path tests
  it("should render correctly", () => {
    // Test implementation
  });

  // Edge cases
  it("should handle empty data", () => {
    // Test implementation
  });

  // Error cases
  it("should show error message", () => {
    // Test implementation
  });
});
```

### 2. Test Naming

- Use descriptive test names
- Follow the pattern: "should [expected behavior] when [condition]"
- Group related tests with `describe` blocks

### 3. Mocking

```typescript
// Mock functions
const mockOnSubmit = jest.fn();

// Mock modules
jest.mock("../utils/temperatureApi");

// Mock browser APIs
global.fetch = jest.fn();
```

### 4. Async Testing

```typescript
it("should handle async operations", async () => {
  const user = userEvent.setup();

  await user.click(screen.getByRole("button"));

  await waitFor(() => {
    expect(screen.getByText("Success")).toBeInTheDocument();
  });
});
```

## 🐛 Troubleshooting

### Common Issues

1. **Module not found**: Install missing dependencies
2. **Type errors**: Check TypeScript configuration
3. **Async test failures**: Use `waitFor()` or `await`
4. **Mock not working**: Clear mocks in `beforeEach`

### Debug Tests

```bash
# Run specific test file
npm test TemperatureForm.test.tsx

# Run tests with verbose output
npm test -- --verbose

# Debug mode
npm test -- --detectOpenHandles
```

## 📚 Additional Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
