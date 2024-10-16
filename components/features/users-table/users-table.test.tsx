import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import UsersTable from './users-table';
import { userData } from '@/app/users/userData';

function createMockUsers(page: number, totalItems: number) {
  return userData.slice((page - 1) * totalItems, page * totalItems);
}

it('UsersTable renders', () => {
  const currentPage = 1;
  const totalPages = 7;
  const mockUsers = createMockUsers(currentPage, totalPages);

  render(
    <UsersTable
      users={mockUsers}
      isLoading={false}
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChange={() => {}}
    />
  );
});

describe('UsersTable', () => {
  beforeEach(() => {
    const currentPage = 1;
    const totalPages = 7;
    const mockUsers = createMockUsers(currentPage, totalPages);

    render(
      <UsersTable
        users={mockUsers}
        isLoading={false}
        totalPages={totalPages}
        currentPage={currentPage}
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

  it('renders user rows', () => {
    expect(screen.getByText('user1@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('user7@gmail.com')).toBeInTheDocument();
    expect(screen.queryByText('user8@gmail.com')).not.toBeInTheDocument();
    expect(screen.queryByText('user0@gmail.com')).not.toBeInTheDocument();
  });
});

it('renders third page rows', () => {
  const currentPage = 3;
  const totalPages = 10;
  const mockUsers = createMockUsers(currentPage, totalPages);

  render(
    <UsersTable
      users={mockUsers}
      isLoading={false}
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChange={() => {}}
    />
  );
  expect(screen.getByText('user21@gmail.com')).toBeInTheDocument();
  expect(screen.getByText('user30@gmail.com')).toBeInTheDocument();
  expect(screen.queryByText('user1@gmail.com')).not.toBeInTheDocument();
  expect(screen.queryByText('user20@gmail.com')).not.toBeInTheDocument();
  expect(screen.queryByText('user31@gmail.com')).not.toBeInTheDocument();
});
