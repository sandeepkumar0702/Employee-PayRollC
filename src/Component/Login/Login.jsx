import React, { Component } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Header from "../Header/Header";
import { jwtDecode } from "jwt-decode";

const clientId =
  "910384708704-teove9l8tcstqorgvg700s3dnv1c877o.apps.googleusercontent.com";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      rememberMe: false,
      isLoading: false,
      errorMessage: "",
    };
  }

  handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    this.setState({ [name]: type === "checkbox" ? checked : value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true, errorMessage: "" });

    setTimeout(() => {
      if (this.state.email && this.state.password) {
        console.log("Login successful", this.state);
      } else {
        this.setState({ errorMessage: "Please enter both email and password" });
      }
      this.setState({ isLoading: false });
    }, 1000);
  };

  handleSuccess = (response) => {
    const userData = response.credential;
    try {
      const decodedUser = jwtDecode(userData);
      const filteredUserData = {
        email: decodedUser.email,
        given_name: decodedUser.given_name,
        family_name: decodedUser.family_name,
        email_verified: decodedUser.email_verified,
      };
      // Store the filtered user data in localStorage
      localStorage.setItem("googleUser", JSON.stringify(filteredUserData));
      console.log("Stored User Data:", filteredUserData);
    } catch (error) {
      console.error("Error decoding JWT:", error);
    }
  };

  handleError = () => {
    console.log("Login Failed");
  };

  render() {
    const { email, password, rememberMe, isLoading, errorMessage } = this.state;
    return (
      <main>
        <Header />
          <div className="w-full p-8 flex-1 mt-4 bg-gray-50 font-sans min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                {errorMessage && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                    <p className="text-sm text-red-700">{errorMessage}</p>
                  </div>
                )}

                <form className="space-y-6" onSubmit={this.handleSubmit}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={this.handleInputChange}
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={this.handleInputChange}
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="rememberMe"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={this.handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 text-sm text-gray-900"
                      >
                        Remember me
                      </label>
                    </div>
                    <a
                      href="#"
                      className="text-sm text-blue-600 hover:text-blue-500"
                    >
                      Forgot your password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {isLoading ? "Signing in..." : "Sign in"}
                  </button>
                </form>

                <div className="mt-6">
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or</span>
                  </div>
                  <div className="mt-2 flex justify-center">
                    <GoogleOAuthProvider clientId={clientId}>
                      <GoogleLogin
                        onSuccess={this.handleSuccess}
                        onError={this.handleError}
                      />
                    </GoogleOAuthProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </main>
    );
  }
}

export default Login;
