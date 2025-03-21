import React from 'react';
import { render, screen } from '@testing-library/react';
import PayrollForm from '../Components/PayrollForm/PayrollForm';
// import Header from '../Components/Header/Header';

describe('Rendering PayrollForm', () => {
  test('renders the form title', () => {
    render(<PayrollForm />);
    expect(screen.getByText('Employee Payroll Form')).toBeInTheDocument();
  });
  test('renders the Header component with correct ID', () => {
    render(<PayrollForm/>);
    const headerElement = screen.getByTestId('header-div');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveTextContent('Employee Payroll Form');
  });
});
