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
  const endpoint = `/api/customer/get?token=${token}`;

  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    };

    const response = await fetch(endpoint, options);
    console.log("customer info", response);

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

