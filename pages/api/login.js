// pages/api/login.js

export default async function handler(req, res) {
  const { email, password } = req.body;

  // Simulate an API call to your authentication service
  // Replace with your actual authentication logic
  const loginResponse = await fetch("/api/customer/login?token=true", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await loginResponse.json();

  if (loginResponse.ok) {
    // Set the token in an HTTP-only cookie
    res.setHeader(
      "Set-Cookie",
      `token=${data.token}; HttpOnly; Max-Age=604800; Secure; SameSite=Strict; Path=/`
    );

    // Send back some user information to the client (but not the token)
    return res.status(200).json({
      message: "Login successful",
      data: data.data, // Assuming data.data contains user info (e.g., id, name)
    });
  } else {
    return res.status(401).json({ message: "Invalid login credentials" });
  }
}
