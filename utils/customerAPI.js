import Cookies from "js-cookie";

export const getPurchaseOrder = async (parsedUserInfo) => {
  const token = Cookies.get("token");
  const endpoint = `/api/orders?token=${token}&customer_id=${parsedUserInfo.id}&limit=10&page=1&pagination=1`;

  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(endpoint, options);

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error(
        `Failed to get customer orders. Status: ${response.status}, Details: ${errorDetails}`
      );
      throw new Error("Failed to get customer orders");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching purchase orders:", error);
    throw error;
  }
};

export const userInfo = async () => {
  const token = Cookies.get("token");

  const get_user_id = () => {
    if (typeof window !== "undefined") {
      // Get the item from sessionStorage
      const userData = sessionStorage.getItem("BasicInfo");

      // Parse the JSON string if it exists
      if (userData) {
        const parsedUserData = JSON.parse(userData);

        // Access the `id` field
        return parsedUserData.id;
      }
    }

    return null; // Return null if there's no data or during SSR
  };

  const userId = get_user_id();

  const endpoint = `/api/customers/${userId}?token=${token}`;

  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(endpoint, options);

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Failed to get customer details: ${errorDetails}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching customer details:", error);
    return null; // Return null or handle the error as needed
  }
};

