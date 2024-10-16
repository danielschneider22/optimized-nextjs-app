import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import UsersTable from './users-table';

const mockUsers = [
  {
    id: '1',
    email: 'warrior@orcdev.com',
    username: 'Warrior',
    createdAt: '2023-01-01',
  },
  {
    id: '2',
    email: 'wizard@orcdev.com',
    username: 'Wizard',
    createdAt: '2023-01-02',
  },
];

it('UsersTable renders', () => {
  render(
    <UsersTable
      users={mockUsers}
      isLoading={false}
      totalPages={2}
      currentPage={1}
      onPageChange={() => {}}
    />
  );
});

describe('UsersTable', () => {
  beforeEach(() => {
    render(
      <UsersTable
        users={mockUsers}
        isLoading={false}
        totalPages={2}
        currentPage={1}
        onPageChange={() => {}}
      />
    );
  });

  it('renders UsersTable with h3 "Users"', () => {
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('Users');
  });

  it('renders table headings', () => {
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
  });
});
