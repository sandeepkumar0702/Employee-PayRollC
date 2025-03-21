import React from 'react';
import { render, screen } from '@testing-library/react';
import PayrollForm from '../Components/PayrollForm/PayrollForm';

describe('Rendering PayrollForm', () => {
  test('renders the form title', () => {
    render(<PayrollForm />);
    expect(screen.getByText('Employee Payroll Form')).toBeInTheDocument();
  });

  test('renders the Name input field', () => {
    render(<PayrollForm />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  });

  test('renders the Profile Image section', () => {
    render(<PayrollForm />);
    expect(screen.getByText(/profile image/i)).toBeInTheDocument();
  });

  test('renders the Male gender radio button', () => {
    render(<PayrollForm />);
    expect(screen.getByLabelText(/male/i)).toBeInTheDocument();
  });

  test('renders the Female gender radio button', () => {
    render(<PayrollForm />);
    expect(screen.getByLabelText(/female/i)).toBeInTheDocument();
  });

  test('renders the HR department checkbox', () => {
    render(<PayrollForm />);
    expect(screen.getByLabelText(/hr/i)).toBeInTheDocument();
  });

  test('renders the Sales department checkbox', () => {
    render(<PayrollForm />);
    expect(screen.getByLabelText(/sales/i)).toBeInTheDocument();
  });

  test('renders the Finance department checkbox', () => {
    render(<PayrollForm />);
    expect(screen.getByLabelText(/finance/i)).toBeInTheDocument();
  });

  test('renders the Engineer department checkbox', () => {
    render(<PayrollForm />);
    expect(screen.getByLabelText(/engineer/i)).toBeInTheDocument();
  });

  test('renders the Others department checkbox', () => {
    render(<PayrollForm />);
    expect(screen.getByLabelText(/others/i)).toBeInTheDocument();
  });

  test('renders the Salary dropdown', () => {
    render(<PayrollForm />);
    expect(screen.getByLabelText(/salary/i)).toBeInTheDocument();
  });

  test('renders the Start Date Day dropdown', () => {
    render(<PayrollForm />);
    expect(screen.getByLabelText(/day/i)).toBeInTheDocument();
  });

  test('renders the Start Date Month dropdown', () => {
    render(<PayrollForm />);
    expect(screen.getByLabelText(/month/i)).toBeInTheDocument();
  });

  test('renders the Start Date Year dropdown', () => {
    render(<PayrollForm />);
    expect(screen.getByLabelText(/year/i)).toBeInTheDocument();
  });

  test('renders the Notes textarea', () => {
    render(<PayrollForm />);
    expect(screen.getByLabelText(/notes/i)).toBeInTheDocument();
  });

  test('renders the Cancel button', () => {
    render(<PayrollForm />);
    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
  });

  test('renders the Submit button', () => {
    render(<PayrollForm />);
    expect(screen.getByText(/submit/i)).toBeInTheDocument();
  });

  test('renders the Reset button', () => {
    render(<PayrollForm />);
    expect(screen.getByText(/reset/i)).toBeInTheDocument();
  });
});
