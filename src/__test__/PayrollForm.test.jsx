import React from 'react';
import '@testing-library/jest-dom';
import PayrollForm from '../Component/PayrollForm/PayrollForm';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
jest.mock('axios');
jest.mock('../../assets/logo.jpeg', () => 'mocked-logo');
jest.mock('../../assets/person1.jpeg', () => 'mocked-person1');
jest.mock('../../assets/person2.jpeg', () => 'mocked-person2');
jest.mock('../../assets/person3.jpeg', () => 'mocked-person3');
jest.mock('../../assets/person4.jpeg', () => 'mocked-person4');
delete window.location;
window.location = { href: jest.fn() };
describe('Registration Component', () => {
  test("renders Employee Payroll Form title", () => {
    render(<PayrollForm/>);
    expect(screen.getByText("Employee Payroll Form")).toBeInTheDocument();
  });

  test('renders the Name label', () => {
    render(<PayrollForm/>);
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  test('renders gender radio buttons', () => {
    render(<PayrollForm />);
    const maleRadio = screen.getByLabelText('Male');
    const femaleRadio = screen.getByLabelText('Female');

    expect(maleRadio).toBeInTheDocument();
    expect(femaleRadio).toBeInTheDocument();
  });

  test("selects a department", () => {
    render(<PayrollForm />);
    const hrCheckbox = screen.getByLabelText('HR');
    fireEvent.click(hrCheckbox);
    expect(hrCheckbox).toBeChecked();
  });

  test("select salary using getAllByRole", () => {
    render(<PayrollForm />);
    const selects = screen.getAllByRole("combobox");
    const salarySelect = selects.find(select => select.id === 'salary');
    
    fireEvent.change(salarySelect, { target: { value: "₹10,000" } });
    expect(salarySelect).toHaveValue("₹10,000"); // Use toHaveValue for controlled components
  });

  test('should render textarea and allow user to type', () => {
    render(<PayrollForm />);
  
    const textarea = screen.getByLabelText(/notes/i);
    expect(textarea).toBeInTheDocument();
  
    fireEvent.change(textarea, { target: { value: 'Test note' } });
    expect(screen.getByDisplayValue('Test note')).toBeInTheDocument();
  });
  // test('selects a profile image', () => {
  //   render(<PayrollForm />);
  //   const profileRadio = screen.getByRole('radio', { name: /person1/i });
  //   fireEvent.click(profileRadio);
  //   expect(profileRadio).toBeChecked();
  // });

  // test('resets all form fields when reset button is clicked', () => {
  //   render(<PayrollForm />);
  //   const nameInput = screen.getByLabelText('Name');
  //   const hrCheckbox = screen.getByLabelText('HR');
  //   const resetButton = screen.getByRole('button', { name: /reset/i });

  //   fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  //   fireEvent.click(hrCheckbox);
  //   fireEvent.click(resetButton);

  //   expect(nameInput).toHaveValue('');
  //   expect(hrCheckbox).not.toBeChecked();
  // });

  // test('submits form successfully with valid data', async () => {
  //   axios.post.mockResolvedValue({ status: 201 });
  //   render(<PayrollForm />);

  //   fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Jane Doe' } });
  //   fireEvent.click(screen.getByLabelText('Female'));
  //   fireEvent.click(screen.getByLabelText('HR'));
  //   fireEvent.change(screen.getByLabelText(/select salary/i), { target: { value: '₹20,000' } });
  //   fireEvent.change(screen.getByLabelText(/day/i), { target: { value: '01' } });
  //   fireEvent.change(screen.getByLabelText(/month/i), { target: { value: '01' } });
  //   fireEvent.change(screen.getByLabelText(/year/i), { target: { value: '2023' } });
  //   fireEvent.click(screen.getByRole('radio', { name: /person1/i }));

  //   fireEvent.click(screen.getByRole('button', { name: /submit/i }));

  //   await waitFor(() => {
  //     expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/employees', expect.any(Object));
  //     expect(window.location.href).toBe('/Pages/dashboard.html');
  //   });
  // });

  // test('shows alert when submitting with missing required fields', () => {
  //   const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
  //   render(<PayrollForm />);

  //   fireEvent.click(screen.getByRole('button', { name: /submit/i }));

  //   expect(alertSpy).toHaveBeenCalledWith('Please fill in all required fields.');
  //   alertSpy.mockRestore();
  // });

  // test('allows selecting multiple departments', () => {
  //   render(<PayrollForm />);
  //   const hrCheckbox = screen.getByLabelText('HR');
  //   const salesCheckbox = screen.getByLabelText('Sales');

  //   fireEvent.click(hrCheckbox);
  //   fireEvent.click(salesCheckbox);

  //   expect(hrCheckbox).toBeChecked();
  //   expect(salesCheckbox).toBeChecked();
  // });

  // test('selects a valid start date', () => {
  //   render(<PayrollForm />);
  //   const daySelect = screen.getByLabelText(/day/i);
  //   const monthSelect = screen.getByLabelText(/month/i);
  //   const yearSelect = screen.getByLabelText(/year/i);

  //   fireEvent.change(daySelect, { target: { value: '15' } });
  //   fireEvent.change(monthSelect, { target: { value: '03' } });
  //   fireEvent.change(yearSelect, { target: { value: '2024' } });

  //   expect(daySelect).toHaveValue('15');
  //   expect(monthSelect).toHaveValue('03');
  //   expect(yearSelect).toHaveValue('2024');
  // });

  // test('handles submission error gracefully', async () => {
  //   axios.post.mockRejectedValue(new Error('Network Error'));
  //   const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
  //   render(<PayrollForm />);

  //   fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Jane Doe' } });
  //   fireEvent.click(screen.getByLabelText('Female'));
  //   fireEvent.click(screen.getByLabelText('HR'));
  //   fireEvent.change(screen.getByLabelText(/select salary/i), { target: { value: '₹20,000' } });
  //   fireEvent.change(screen.getByLabelText(/day/i), { target: { value: '01' } });
  //   fireEvent.change(screen.getByLabelText(/month/i), { target: { value: '01' } });
  //   fireEvent.change(screen.getByLabelText(/year/i), { target: { value: '2023' } });
  //   fireEvent.click(screen.getByRole('radio', { name: /person1/i }));

  //   fireEvent.click(screen.getByRole('button', { name: /submit/i }));

  //   await waitFor(() => {
  //     expect(alertSpy).toHaveBeenCalledWith('Something went wrong while saving employee data.');
  //   });
  //   alertSpy.mockRestore();
  // });

  // test('name input rejects numbers', () => {
  //   render(<PayrollForm />);
  //   const nameInput = screen.getByLabelText('Name');

  //   fireEvent.change(nameInput, { target: { value: 'John123' } });
  //   expect(nameInput).not.toHaveValue('John123');
  //   expect(nameInput).toHaveAttribute('pattern', '[A-Za-z\\s]+');
  // });

  // test('cancel button redirects to dashboard', () => {
  //   render(<PayrollForm />);
  //   const cancelButton = screen.getByRole('button', { name: /cancel/i });

  //   fireEvent.click(cancelButton);
  //   expect(cancelButton.closest('a')).toHaveAttribute('href', 'Dashboard.html');
  // });

  // test('all required fields have required attribute', () => {
  //   render(<PayrollForm />);
  //   const nameInput = screen.getByLabelText('Name');
  //   const salarySelect = screen.getByLabelText(/select salary/i);
  //   const daySelect = screen.getByLabelText(/day/i);
  //   const monthSelect = screen.getByLabelText(/month/i);
  //   const yearSelect = screen.getByLabelText(/year/i);

  //   expect(nameInput).toHaveAttribute('required');
  //   expect(salarySelect).toHaveAttribute('required');
  //   expect(daySelect).toHaveAttribute('required');
  //   expect(monthSelect).toHaveAttribute('required');
  //   expect(yearSelect).toHaveAttribute('required');
  // });
});
