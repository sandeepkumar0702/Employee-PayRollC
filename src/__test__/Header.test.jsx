import { render, screen } from '@testing-library/react';
import Header from '../Component/Header/Header';

jest.mock('../assets/logo.jpeg', () => 'mocked-logo');

describe('Header Component', () => {
  test("renders EMPLOYEE text in header", () => {
    render(<Header />);
    const employeeText = screen.getByText('EMPLOYEE');
    expect(employeeText).toBeInTheDocument();
  });
  
  test("renders PAYROLL text in header", () => {
    render(<Header />);
    const payrollText = screen.getByText('PAYROLL');
    expect(payrollText).toBeInTheDocument();
  });
  test("renders the header with logo", () => {
    render(<Header />);
    const logoImage = screen.getByAltText('logo');
    expect(logoImage).toBeInTheDocument();
  });
});