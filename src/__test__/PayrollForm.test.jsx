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

  test('resets all form fields when reset button is clicked', () => {
    render(<PayrollForm />);
    const nameInput = screen.getByLabelText('Name');
    const hrCheckbox = screen.getByLabelText('HR');
    const resetButton = screen.getByRole('button', { name: /reset/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.click(hrCheckbox);
    fireEvent.click(resetButton);

    expect(nameInput).toHaveValue('');
    expect(hrCheckbox).not.toBeChecked();
  });
  test('allows selecting multiple departments', () => {
    render(<PayrollForm />);
    const hrCheckbox = screen.getByLabelText('HR');
    const salesCheckbox = screen.getByLabelText('Sales');

    fireEvent.click(hrCheckbox);
    fireEvent.click(salesCheckbox);

    expect(hrCheckbox).toBeChecked();
    expect(salesCheckbox).toBeChecked();
  });
  test('cancel button redirects to dashboard', () => {
    render(<PayrollForm />);
    const cancelButton = screen.getByRole('button', { name: /cancel/i });

    fireEvent.click(cancelButton);
    expect(cancelButton.closest('a')).toHaveAttribute('href', 'Dashboard.html');
  });
});
