import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import Login from '../Component/Login/Login.jsx';

// Mock dependencies
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

jest.mock('jwt-decode');
jest.mock('@react-oauth/google', () => ({
  GoogleLogin: ({ onSuccess }) => (
    <button 
      data-testid="google-login-button"
      onClick={() => onSuccess({ credential: 'mockToken' })}
    >
      Sign in with Google
    </button>
  ),
  GoogleOAuthProvider: ({ children }) => <div>{children}</div>
}));
const getUserName = (userData) => {
  return userData.name || userData.given_name || "User";
};

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('renders login page', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText('Sign In to Payroll')).toBeInTheDocument();
  });

  test('handles successful Google login', async () => {
    // Mock decoded user data
    jwtDecode.mockReturnValue({
      name: 'Test User',
      email: 'test@example.com'
    });

    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => mockNavigate);

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const loginButton = screen.getByTestId('google-login-button');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(localStorage.getItem('userName')).toBe('Test User');
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });
   test('handles successful Google login', async () => {
    // Mock decoded user data
    jwtDecode.mockReturnValue({
      name: 'Test User',
      email: 'test@example.com'
    });

    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => mockNavigate);

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const loginButton = screen.getByTestId('google-login-button');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(localStorage.getItem('userName')).toBe('Test User');
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });
  test("returns 'name' when available", () => {
    const userData = { name: "John Doe", given_name: "Johnny" };
    expect(getUserName(userData)).toBe("John Doe");
  });
  test("returns 'User' if neither 'name' nor 'given_name' is available", () => {
    const userData = {};
    expect(getUserName(userData)).toBe("User");
  });
  test("returns 'given_name' if 'name' is not available", () => {
    const userData = { given_name: "Johnny" };
    expect(getUserName(userData)).toBe("Johnny");
  });
});