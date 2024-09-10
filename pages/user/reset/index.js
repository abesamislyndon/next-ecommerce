import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useSession, signIn, signOut } from "next-auth/react";


const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");9
  const [apiResponse, setApiResponse] = useState(null);
  const router = useRouter();

  const validateForm = () => {
    let valid = true;

    // Reset error messages
    setEmailError("");
    setPasswordError("");

    if (email.trim() === "") {
      setEmailError("Email is required.");
      valid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Password is required.");
      valid = false;
    }

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    // Perform validation
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    try {
      const res = await fetch("/api/customer/login?token=true", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        Cookies.set("token", data.token, { expires: 1 });
        const basicInfo = {
          id: data.data.id,
          first_name: data.data.first_name,
        };
        sessionStorage.setItem("BasicInfo", JSON.stringify(basicInfo));
        setApiResponse("Redirecting...");
        router.push("/");
      } else {
        setApiResponse(data.message);
      }
    } catch (error) {
      setApiResponse("Server error");
    }
  };

  return (
    <>
      <div className="font-[sans-serif] text-[#333]">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4 bg-login">
          <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
            <div className="max-md:text-center">
              <h2 className="lg:text-5xl text-4xl font-extrabold lg:leading-[55px]">
                Grocery Online
              </h2>
              <p className="text-sm mt-6">
                Immerse yourself in a hassle-free login journey with our
                intuitively designed login form. Effortlessly access your
                account.
              </p>
              <p className="text-sm mt-10">
                Don't have an account?{" "}
                <Link
                  href="signup"
                  className="text-blue-600 font-semibold hover:underline ml-1"
                >
                  Sign up here
                </Link>
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 max-w-md md:ml-auto max-md:mx-auto w-full"
            >
              {apiResponse && (
                <div className="alert alert-danger" role="alert">
                  {apiResponse}
                </div>
              )}
              <h3 className="text-3xl font-extrabold mb-8 max-md:text-center">
              Reset Password
              </h3>
              <div>
                <input
                  className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600 border border-black"
                  id="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-2">{emailError}</p>
                )}
              </div>
              
              <div className="!mt-10">
                <button
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-black hover:bg-gray-700 focus:outline-none"
                >
                  Send
                </button>
              </div>
              {/* <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={() => signIn()}
                  className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-500 focus:outline-none"
                >
                  Sign in with Google
                </button>
                <button
                  onClick={() => signIn("facebook")}
                  className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-800 hover:bg-blue-700 focus:outline-none"
                >
                  Sign in with Facebook
                </button>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;