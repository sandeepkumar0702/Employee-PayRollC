import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import GitHub from "./Github"; // Import the new component

const clientId =
  "245893321816-uu0f7aohdad1ipo513k4cd21s9n8sfmu.apps.googleusercontent.com";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const userData = jwtDecode(token);
    const name = userData.name || userData.given_name || "User";

    localStorage.setItem("userName", name);
    console.log("Google Login Success:", userData);
    navigate("/dashboard");
  };

  const handleGitHubSuccess = () => {};

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex flex-col min-h-screen justify-center items-center h-[30vh]">
        <div className="border rounded-[3px] h-[250px] w-[400px] bg-white !py-[10px]">
          <div className="flex flex-col items-center justify-center flex-grow text-black gap-4">
            <h2 className="text-2xl mb-4">Login to Payroll</h2>
            <div className="bg-white px-4 py-2 rounded h-[70px]">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                // onError={(err) => console.log("Google Login Error:", err)}
              />
              <div className="flex flex-row justify-center mt-1"><hr className="mt-1 border-gray-300" />Or<hr></hr></div>
            </div>

            <div className="bg-white px-4 py-0 mt-0 rounded h-[70px]">
              <GitHub
                onSuccess={handleGitHubSuccess}
                // onError={(err) => console.log("GitHub Login Error:", err)}
              />
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
