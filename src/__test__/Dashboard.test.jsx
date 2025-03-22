import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from '../Component/Dashboard/Dashboard';
import { fetchEmployees, deleteEmployee } from '../../Api';

jest.mock('../../Api', () => ({
  fetchEmployees: jest.fn(),
  deleteEmployee: jest.fn()
}));

jest.mock('../Component/Header/Header.jsx', () => () => <div data-testid="header-component">Header</div>);

window.confirm = jest.fn();

describe('Dashboard Component', () => {
  const mockEmployees = [
    { id: 1, name: 'John Doe', gender: 'Male', departments: ['HR', 'Finance'], salary: '$50,000', startDate: '2022-01-01', profileImage: 'profile1.jpg' },
    { id: 2, name: 'Jane Smith', gender: 'Female', departments: ['Engineering'], salary: '$80,000', startDate: '2021-05-15', profileImage: 'profile2.jpg' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    fetchEmployees.mockResolvedValue(mockEmployees);
  });

  test('renders loading state', () => {
    render(<Dashboard />);
    expect(screen.getByText('Loading employees...')).toBeInTheDocument();
  });

  test('renders employee data', async () => {
    render(<Dashboard />);
    await waitFor(() => expect(screen.queryByText('Loading employees...')).not.toBeInTheDocument());
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  test('displays error on API failure', async () => {
    fetchEmployees.mockRejectedValue(new Error('Failed to fetch employees'));
    render(<Dashboard />);
    await waitFor(() => expect(screen.getByText('Error: Failed to fetch employees')).toBeInTheDocument());
  });

  test('filters employees', async () => {
    render(<Dashboard />);
    await waitFor(() => expect(screen.queryByText('Loading employees...')).not.toBeInTheDocument());
    fireEvent.change(screen.getByPlaceholderText('Search by name...'), { target: { value: 'john' } });
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });

  test('shows confirmation dialog on delete', async () => {
    window.confirm.mockImplementation(() => false);
    render(<Dashboard />);
    await waitFor(() => expect(screen.queryByText('Loading employees...')).not.toBeInTheDocument());
    fireEvent.click(screen.getAllByText('Delete')[0]);
    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this employee?');
  });

  test('deletes employee on confirmation', async () => {
    window.confirm.mockImplementation(() => true);
    deleteEmployee.mockResolvedValue({});
    render(<Dashboard />);
    await waitFor(() => expect(screen.queryByText('Loading employees...')).not.toBeInTheDocument());
    fireEvent.click(screen.getAllByText('Delete')[0]);
    expect(deleteEmployee).toHaveBeenCalledWith(1);
    await waitFor(() => expect(screen.queryByText('John Doe')).not.toBeInTheDocument());
  });

  test('shows alert on delete failure', async () => {
    window.confirm.mockImplementation(() => true);
    deleteEmployee.mockRejectedValue(new Error('Failed to delete'));
    window.alert = jest.fn();
    render(<Dashboard />);
    await waitFor(() => expect(screen.queryByText('Loading employees...')).not.toBeInTheDocument());
    fireEvent.click(screen.getAllByText('Delete')[0]);
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Failed to delete employee'));
  });

  test('displays correct number of employees', async () => {
    render(<Dashboard />);
    await waitFor(() => expect(screen.queryByText('Loading employees...')).not.toBeInTheDocument());
    expect(screen.getAllByRole('row').length).toBe(mockEmployees.length + 1);
  });

  test('displays no employees message', async () => {
    fetchEmployees.mockResolvedValue([]);
    render(<Dashboard />);
    await waitFor(() => expect(screen.getByText('No employees found')).toBeInTheDocument());
  });

  test('renders Add User button', async () => {
    render(<Dashboard />);
    await waitFor(() => expect(screen.queryByText('Loading employees...')).not.toBeInTheDocument());
    expect(screen.getByText('Add User').closest('a')).toHaveAttribute('href', '/Pages/form.html');
  });

  test('renders table headers', async () => {
    render(<Dashboard />);
    await waitFor(() => expect(screen.queryByText('Loading employees...')).not.toBeInTheDocument());
    ['NAME', 'GENDER', 'DEPARTMENT', 'SALARY', 'START DATE', 'ACTIONS'].forEach(header =>
      expect(screen.getByText(header)).toBeInTheDocument()
    );
  });

  test('renders department tags', async () => {
    render(<Dashboard />);
    await waitFor(() => expect(screen.queryByText('Loading employees...')).not.toBeInTheDocument());
    ['HR', 'Finance', 'Engineering'].forEach(dept => expect(screen.getByText(dept)).toBeInTheDocument());
  });

  test('handles image error fallback', async () => {
    render(<Dashboard />);
    await waitFor(() => expect(screen.queryByText('Loading employees...')).not.toBeInTheDocument());
    fireEvent.error(screen.getAllByRole('img')[0]);
    expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', 'https://via.placeholder.com/40');
  });

  test('search is case insensitive', async () => {
    render(<Dashboard />);
    await waitFor(() => expect(screen.queryByText('Loading employees...')).not.toBeInTheDocument());
    const searchInput = screen.getByPlaceholderText('Search by name...');
    ['john', 'JOHN', 'JoHn'].forEach(value => {
      fireEvent.change(searchInput, { target: { value } });
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  test('updates on search term change', async () => {
    render(<Dashboard />);
    await waitFor(() => expect(screen.queryByText('Loading employees...')).not.toBeInTheDocument());
    const searchInput = screen.getByPlaceholderText('Search by name...');
    fireEvent.change(searchInput, { target: { value: 'john' } });
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: 'jane' } });
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: '' } });
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });
});
