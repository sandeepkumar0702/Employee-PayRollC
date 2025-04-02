/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../Component/Dashboard';

jest.mock('../Component/Header', () => () => <div data-testid="mock-header">Header</div>);


global.fetch = jest.fn();

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));


const renderWithRouter = (component) =>
  render(<MemoryRouter>{component}</MemoryRouter>);

describe('Dashboard Component', () => {
  beforeEach(() => {
    fetch.mockClear();
    mockNavigate.mockClear();
  });

  test('renders loading state initially', () => {
    fetch.mockImplementationOnce(() => new Promise(() => { }));
    renderWithRouter(<Dashboard />);
    expect(screen.getByText('Loading employees...')).toBeInTheDocument();
  });

  test('renders employee list successfully', async () => {
    const mockEmployees = [
      {
        id: 1,
        name: 'Sandeep',
        gender: 'Male',
        departments: ['IT'],
        salary: 50000,
        startDate: '2023-01-01',
        profileImage: 'http://example.com/john.jpg',
      },
    ];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockEmployees),
    });

    renderWithRouter(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Sandeep')).toBeInTheDocument();
      expect(screen.getByText('Male')).toBeInTheDocument();
      expect(screen.getByText('IT')).toBeInTheDocument();
      expect(screen.getByText('50000')).toBeInTheDocument();
      expect(screen.getByText('2023-01-01')).toBeInTheDocument();
    });
  });

  test('displays error message when fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    renderWithRouter(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Error: Network error')).toBeInTheDocument();
    });
  });
test('filters employees based on search term when search bar is visible', async () => {
  const mockEmployees = [
    { id: 1, name: 'Sandeep', gender: 'Male', departments: ['IT'], salary: 50000, startDate: '2023-01-01' },
    { id: 2, name: 'Harsh', gender: 'Female', departments: ['HR'], salary: 55000, startDate: '2023-02-01' },
  ];
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockEmployees),
    })
  );
  renderWithRouter(<Dashboard />);
  await waitFor(() => {
    expect(screen.getByText('Sandeep')).toBeInTheDocument();
    expect(screen.getByText('Harsh')).toBeInTheDocument();
  });
  expect(screen.queryByPlaceholderText('Enter name..')).not.toBeInTheDocument();
  fireEvent.click(screen.getByTestId('toggle-search'));
  await waitFor(() => {
    expect(screen.getByPlaceholderText('Enter name..')).toBeInTheDocument();
  });
  fireEvent.change(screen.getByPlaceholderText('Enter name..'), {
    target: { value: 'Sandeep' },
  });
  await waitFor(() => {
    expect(screen.getByText('Sandeep')).toBeInTheDocument();
    expect(screen.queryByText('Harsh')).not.toBeInTheDocument();
  });
});
  test('handles add user button click', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]), // Ensure empty response
    });
  
    renderWithRouter(<Dashboard />);
  
    await waitFor(() => {
      expect(screen.getByText('Loading employees...')).toBeInTheDocument();
    });
  
    await waitFor(() => {
      expect(screen.getByText('No employees found')).toBeInTheDocument();
    });
  
    fireEvent.click(screen.getByText('Add User'));
  
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/registration');
    });
  });
  test('renders header component', () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    renderWithRouter(<Dashboard />);

    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });

  test('handles edit button click', async () => {
    const mockEmployee = {
      id: 1,
      name: 'Sandeep',
      gender: 'Male',
      departments: ['IT'],
      salary: 50000,
      startDate: '2023-01-01',
    };
  
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([mockEmployee]),
    });
  
    renderWithRouter(<Dashboard />);
  
    await waitFor(() => {
      expect(screen.getByText('Sandeep')).toBeInTheDocument();
    });
  
    fireEvent.click(screen.getByLabelText('Edit employee'));
    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith('/registration', expect.objectContaining({
        state: expect.objectContaining({ employee: mockEmployee, isEdit: true }),
      }))
    );
  });
  test('handles delete button click with confirmation', async () => {
    const mockEmployee = {
      id: 1,
      name: 'Sandeep',
      gender: 'Male',
      departments: ['IT'],
      salary: 50000,
      startDate: '2023-01-01',
    };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([mockEmployee]),
    });
    fetch.mockResolvedValueOnce({
      ok: true, 
    });
    renderWithRouter(<Dashboard />);
    await waitFor(() => {
      expect(screen.getByText('Sandeep')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByLabelText('Delete employee'));
    await waitFor(() => {
      expect(screen.getByText('Are you sure you want to delete the employee?')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Delete'));  
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:3000/EmpList/1', { method: 'DELETE' });
      expect(screen.queryByText('Sandeep')).not.toBeInTheDocument();
    });
  });
  

test('closes modal when cancel button is clicked', async () => {
  const mockEmployee = {
    id: 1,
    name: 'Sandeep',
    gender: 'Male',
    departments: ['IT'],
    salary: 50000,
    startDate: '2023-01-01',
  };

  fetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve([mockEmployee]), // Initial employee list
  });

  renderWithRouter(<Dashboard />);

  await waitFor(() => {
    expect(screen.getByText('Sandeep')).toBeInTheDocument();
  });

  fireEvent.click(screen.getByLabelText('Delete employee'));

  await waitFor(() => {
    expect(screen.getByText('Are you sure you want to delete the employee?')).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText('Cancel'));

  await waitFor(() => {
    expect(screen.queryByText('Are you sure you want to delete the employee?')).not.toBeInTheDocument();
  });
});

});