import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page from './page';

jest.mock('next/navigation', () => {
  return {
    useSearchParams: () => ({
      get: () => {},
    }),
    useRouter: jest.fn(),
  };
});

describe('Users', () => {
  it('renders', () => {
    render(<Page />);
  });
});
