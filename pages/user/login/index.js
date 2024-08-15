import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      "----- From Submitted------\n",
      "\nEmail : ",
      email,
      "\nPassword : ",
      password
    );
    try {
      const res = await fetch("/api/customer/login?token=true", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // This will include the cookies in the request
      });
      const data = await res.json();
      if (res.ok) {
        Cookies.set("token", data.token, { expires: 1 }); // expires in 1 day
        const basicInfo = {
  id: data.data.id,
  first_name: data.data.first_name
};

sessionStorage.setItem("BasicInfo", JSON.stringify(basicInfo));
        
        setApiResponse("Redirecting . . . .");
        router.back();
        // router.push("/");
      } else {
        setApiResponse(data.message);
      }
    } catch (error) {
      setApiResponse("Server error");
    }
  };

  return (
    <div className="font-[sans-serif] text-[#333]">
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
          <div className="max-md:text-center">
            <h2 className="lg:text-5xl text-4xl font-extrabold lg:leading-[55px]">
              Grocery Online
            </h2>
            <p className="text-sm mt-6">
              Immerse yourself in a hassle-free login journey with our
              intuitively designed login form. Effortlessly access your account.
            </p>
            <p className="text-sm mt-10">
              Don't have an account{" "}
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
              Sign in
            </h3>
            <div>
              <input
                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600 border border-black-50"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              
              </div>
              <div className="text-sm">
                <a
                  href="jajvascript:void(0);"
                  className="text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div className="!mt-10">
              <button
                type="submit"
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-black hover:bg-gray-700 focus:outline-none"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
