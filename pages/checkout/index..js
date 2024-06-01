import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  setCart,
  saveAddress,
  saveShiping,
  savePayment,
  saveOrder,
  getCurrentCart,
} from "../../features/cart/cartSlice";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const globalstate = useSelector((state) => state.cart);
  const router = useRouter();

  const [billingInfo, setBillingInfo] = useState({
    address1: "",
    use_for_shipping: "true",
    first_name: "",
    last_name: "",
    email: "",
    city: "cdo",
    state: "cdo",
    postcode: "9000",
    country: "PHIL",
    phone: "",
  });

  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const cartItems = localStorage.getItem("ApiCartDetails");
    if (cartItems) {
      dispatch(setCart(JSON.parse(cartItems)));
    }
  }, [dispatch]);

  useEffect(() => {
    setDeliveryMethod(localStorage.getItem("deliveryMethod") || "");
    setPaymentMethod(localStorage.getItem("paymentMethod") || "");
    setPickupLocation(localStorage.getItem("pickupLocation") || "");
    setPickupDate(localStorage.getItem("pickupDate") || "");
    setPickupTime(localStorage.getItem("pickupTime") || "");
  }, []);

  const calculateSubtotal = (item) => {
    const parsedQuantity = parseInt(item.quantity);
    const parsedPrice = parseFloat(item.price.replace(/\$/g, ""));
    return isNaN(parsedQuantity) || isNaN(parsedPrice)
      ? 0
      : parsedQuantity * parsedPrice;
  };

  const calculateTotal = () =>
    globalstate.cart.reduce(
      (total, item) => total + calculateSubtotal(item),
      0
    );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { value } = e.target;
    setPaymentMethod(value);
    dispatch(savePayment());
    dispatch(getCurrentCart());
    localStorage.setItem("paymentMethod", value);
  };

  const handleDeliveryChange = (e) => {
    const { value } = e.target;
    setDeliveryMethod(value);
    localStorage.setItem("deliveryMethod", value);
  };

  const handlePickupChange = (e) => {
    const { name, value } = e.target;
    if (name === "pickupLocation") setPickupLocation(value);
    if (name === "pickupDate") setPickupDate(value);
    if (name === "pickupTime") setPickupTime(value);
    localStorage.setItem(name, value);
  };

  const validateForm = () => {
    let formErrors = {};
    if (!billingInfo.first_name)
      formErrors.first_name = "First name is required";
    if (!billingInfo.last_name) formErrors.last_name = "Last name is required";
    if (!billingInfo.email) formErrors.email = "Email is required";
    if (!billingInfo.phone) formErrors.phone = "Phone number is required";
    if (!billingInfo.address1) formErrors.address1 = "Address is required";
    if (!deliveryMethod)
      formErrors.deliveryMethod = "Delivery method is required";
    if (deliveryMethod === "pickup") {
      if (!pickupLocation)
        formErrors.pickupLocation = "Pickup location is required";
      if (!pickupDate) formErrors.pickupDate = "Pickup date is required";
      if (!pickupTime) formErrors.pickupTime = "Pickup time is required";
    }
    if (!paymentMethod) formErrors.paymentMethod = "Payment method is required";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const formattedBillingInfo = {
      billing: { ...billingInfo, address1: { 0: billingInfo.address1 } },
      shipping: { address1: { 0: "" } },
      payment_method: paymentMethod,
      pickup_location: paymentMethod === "pickup" ? pickupLocation : "",
      pickup_date: paymentMethod === "pickup" ? pickupDate : "",
      pickup_time: paymentMethod === "pickup" ? pickupTime : "",
      delivery_method: deliveryMethod,
    };

    try {
      const saveAddressResult = await dispatch(
        saveAddress(formattedBillingInfo)
      );
      if (saveAddress.fulfilled.match(saveAddressResult)) {
        await dispatch(saveShiping());
        const cartInfo = localStorage.getItem("pickupLocation");
        await dispatch(saveOrder(cartInfo));
        router.push("/thankyou");
      } else {
        console.error("Failed to save address:", saveAddressResult.payload);
      }
    } catch (error) {
      console.error("Error during address or shipping save:", error);
    }
  };

  return (
    <div className="font-[sans-serif] bg-white p-4 min-h-screen">
      <form onSubmit={handleSubmit} className="mt-0 max-w-full">
        <div className="lg:max-w-7xl max-w-xl mx-auto p-2 lg:p-20 mb-2 lg:mb-10">
          <div className="grid lg:grid-cols-3 gap-0">
            <div className="lg:col-span-2 max-lg:order-1  lg:p-10">
              <h2 className="text-2xl font-extrabold text-[#333] mb-7 mt-10">
                Customer Details
              </h2>
              <hr className="h-px my-8 mt-[-17px] bg-gray-200 border-0 dark:bg-gray-100" />
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-6">
                  {["first_name", "last_name"].map((field) => (
                    <div key={field}>
                      <input
                        type="text"
                        name={field}
                        placeholder={field
                          .split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                        value={billingInfo[field]}
                        onChange={handleChange}
                        className={`px-4 py-3.5 bg-gray-100 text-[#333] w-full text-sm border rounded-md focus:border-black outline-none ${
                          errors[field] ? "border-red-500" : ""
                        }`}
                      />
                      {errors[field] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors[field]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                {["address1", "email", "phone"].map((field) => (
                  <div key={field}>
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      placeholder={
                        field.charAt(0).toUpperCase() +
                        field.slice(1).replace("1", "")
                      }
                      value={billingInfo[field]}
                      onChange={handleChange}
                      className={`px-4 py-3.5 bg-gray-100 text-[#333] w-full text-sm border rounded-md focus:border-black outline-none ${
                        errors[field] ? "border-red-500" : ""
                      }`}
                    />
                    {errors[field] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[field]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-extrabold text-[#333] mb-7 mt-7">
                Delivery Details
              </h2>
              <hr className="h-px my-8 mt-[-17px] bg-gray-200 border-0 dark:bg-gray-100" />
              <div className="grid grid-cols-2 gap-4 items-center mt-6">
                {["delivery", "pickup"].map((method) => (
                  <label
                    key={method}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value={method}
                      checked={deliveryMethod === method}
                      onChange={handleDeliveryChange}
                      className="form-radio h-6 w-6 text-black border-gray-300"
                    />
                    <span>
                      {method.charAt(0).toUpperCase() + method.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
              {deliveryMethod === "pickup" && (
                <>
                  {["Pickup Location", "Pickup Date", "Pickup Time"].map(
                    (label, index) => (
                      <div key={label} className="mt-6">
                        <label className="block text-[#333] mb-2">
                          {label}
                        </label>
                        {index === 0 ? (
                          <select
                            name="pickupLocation"
                            value={pickupLocation}
                            onChange={handlePickupChange}
                            className={`px-4 py-3.5 bg-gray-100 text-[#333] w-full text-sm border rounded-md focus:border-black outline-none ${
                              errors.pickupLocation ? "border-red-500" : ""
                            }`}
                          >
                            <option value="">Select {label}</option>
                            <option value="upper_carmen">Upper Carmen</option>
                            <option value="kauswagan">Kauswagan</option>
                            <option value="bonbon">Bonbon</option>
                          </select>
                        ) : (
                          <input
                            type={index === 1 ? "date" : "time"}
                            name={index === 1 ? "pickupDate" : "pickupTime"}
                            value={index === 1 ? pickupDate : pickupTime}
                            onChange={handlePickupChange}
                            className={`px-4 py-3.5 bg-gray-100 text-[#333] w-full text-sm border rounded-md focus:border-black outline-none ${
                              errors[index === 1 ? "pickupDate" : "pickupTime"]
                                ? "border-red-500"
                                : ""
                            }`}
                          />
                        )}
                      </div>
                    )
                  )}
                </>
              )}

              <h2 className="text-2xl font-extrabold text-[#333] mb-7 mt-20">
                Payment Details
              </h2>
              <hr className="h-px my-8 mt-[-17px] bg-gray-200 border-0 dark:bg-gray-100" />
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={handlePaymentChange}
                  className={`form-radio h-6 w-6 text-black border-gray-300 focus:ring-black ${
                    errors.paymentMethod ? "border-red-500" : ""
                  }`}
                />
                <span>Cash on Delivery</span>
              </label>
            </div>
            <div className="p-7 bg-slate-50 rounded-md  border border-slate/10 shadow-lg shadow-b-2.5 -shadow-spread-2 shadow-slate-900/15">
              <h2 className="text-2xl font-extrabold text-[#333]">Summary</h2>
              {Array.isArray(globalstate.cart) &&
                globalstate.cart.map((item) => (
                  <ul key={item.id} className="text-[#333] mt-3 space-y-6">
                    <li className="flex flex-wrap gap-4 text-base">
                      {item.product.base_image &&
                        item.product.base_image.small_image_url && (
                          <img
                            src={item.product.base_image.small_image_url}
                            alt=""
                          className="w-10 h2 rounded-sm" />
                        )}
                      {item.name}
                      <span className="font-bold">X {item.quantity}</span>
                      <span className="ml-auto font-bold">
                        ₱{calculateSubtotal(item).toFixed(2)}
                      </span>
                    </li>
                  </ul>
                ))}
              <div className="sticky top-[100vh] ">
                <h2 className="text-4xl mt-12 font-extrabold text-[#333]">
                  Total: ₱{calculateTotal().toFixed(2)}
                </h2>
                <button
                  type="submit"
                  className="mt-10 w-[100%] py-3.5 text-[1.3rem] bg-black text-white rounded-md hover:bg-black-700"
                >
                  Complete Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
