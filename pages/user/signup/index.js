import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const Signup = () => {
  const [first_name, setFName] = useState("");
  const [last_name, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();



  // const validateForm = () => {
  //   let isValid = true;

  //   if (!first_name) {
  //     setNameError("Please enter your first name");
  //     isValid = false;
  //   } else {
  //     setNameError("");
  //   }

  //   if (!last_name) {
  //     setNameError("Please enter your last name");
  //     isValid = false;
  //   } else {
  //     setNameError("");
  //   }

  //   if (!/^[a-zA-Z\s]*$/.test(first_name)) {
  //     setNameError("Name can only contain letters and spaces");
  //     isValid = false;
  //   }

  //   if (!/^[a-zA-Z\s]*$/.test(last_name)) {
  //     setNameError("Name can only contain letters and spaces");
  //     isValid = false;
  //   }

  //   if (!password) {
  //     setPasswordError("Please enter a password");
  //     isValid = false;
  //   } else {
  //     setPasswordError("");
  //   }

  //   if (!/(?=.*\d)(?=.*[A-Z]).{6,}/.test(password)) {
  //     setPasswordError(
  //       "Password must be at least 6 characters long and contain at least one capital letter and one number"
  //     );
  //     isValid = false;
  //   }

  //   if (password !== confirmPassword) {
  //     setConfirmPasswordError("Passwords do not match");
  //     isValid = false;
  //   } else {
  //     setConfirmPasswordError("");
  //   }

  //   if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
  //     setEmailError("Please enter a valid email address");
  //     isValid = false;
  //   } else {
  //     setEmailError("");
  //   }

  //   return isValid;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    // if (!validateForm()) {
    //   return;
    // }

    try {
      const response = await fetch("/api/customer/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password,
          password_confirmation: confirmPassword,
        }),
      });
      console.log(response);
      const data = await response.json();

      if (response.ok) {
        // Registration successful
        router.push("/login");
      } else {
        // Registration failed
        setError(data.message); // Assuming the error message is provided in the response
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setError("An error occurred during registration");
    }
  };
  return (
    <div className="h-24 min-h-screen  flex fle-col items-center justify-center py-6 px-4">
      <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
        <div>
          <div className="h-screen flex items-center justify-cente">
            <p className="mt-1 font-bold text-3xl">
              Join us today for a personalized shopping experience—sign up in
              seconds and unlock exclusive deals and seamless checkouts!
            </p>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="was-validated">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <div className="mb-3">
              <input
                type="text"
                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md border border-black-100"
                placeholder="Enter your first name"
                value={first_name}
                onChange={(e) => setFName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md border border-black-100"
                placeholder="Enter your last name"
                value={last_name}
                onChange={(e) => setLName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md border border-black-100"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md border border-black-100"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md border border-black-100"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-flex gap-2">
              <button
                type="submit"
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-black hover:bg-gray-700 focus:outline-none"
              >
                <Link href="/login">Sign Up</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
