import { useState } from "react";
import { useRouter } from "next/router";

const Signup = () => {
  const [first_name, setFName] = useState("");
  const [last_name, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const validateForm = () => {
    let isValid = true;

    if (!first_name) {
      setNameError("Please enter your first name");
      isValid = false;
    } else if (!/^[a-zA-Z\s]*$/.test(first_name)) {
      setNameError("First name can only contain letters and spaces");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!last_name) {
      setNameError("Please enter your last name");
      isValid = false;
    } else if (!/^[a-zA-Z\s]*$/.test(last_name)) {
      setNameError("Last name can only contain letters and spaces");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!email) {
      setEmailError("Please enter your email address");
      isValid = false;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Please enter a password");
      isValid = false;
    } else if (!/(?=.*\d)(?=.*[A-Z]).{6,}/.test(password)) {
      setPasswordError(
        "Password must be at least 6 characters long and contain at least one capital letter and one number"
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("/api/customer/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          password,
          password_confirmation: confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/login");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setError("An error occurred during registration");
    }
  };

  const handleFirstNameChange = (e) => {
    setFName(e.target.value);
    if (e.target.value) setNameError(""); // Clear error if input is not empty
  };

  const handleLastNameChange = (e) => {
    setLName(e.target.value);
    if (e.target.value) setNameError(""); // Clear error if input is not empty
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value) setEmailError(""); // Clear error if input is not empty
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value) setPasswordError(""); // Clear error if input is not empty
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value) setConfirmPasswordError(""); // Clear error if input is not empty
  };

  return (
    <div className="h-24 min-h-screen flex flex-col items-center justify-center py-6 px-4 bg-login">
      <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
        <div>
          <div className="h-screen flex items-center justify-center">
            <p className="mt-1 font-bold text-3xl">
              Join us today for a personalized shopping experience—sign up in
              seconds and unlock exclusive deals and seamless checkouts!
            </p>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit} noValidate>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <div className="mb-3">
              <input
                type="text"
                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md border border-black"
                placeholder="Enter your first name"
                value={first_name}
                onChange={handleFirstNameChange}
                required
              />
              {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md border border-black"
                placeholder="Enter your last name"
                value={last_name}
                onChange={handleLastNameChange}
                required
              />
              {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md border border-black"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md border border-black"
                placeholder="Enter Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md border border-black"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              {confirmPasswordError && (
                <p className="text-red-500 text-sm">{confirmPasswordError}</p>
              )}
            </div>
            <div className="d-flex gap-2">
              <button
                type="submit"
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-black hover:bg-gray-700 focus:outline-none"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
