import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Modal from "../../components/modals/Modals";
import {
  setCart,
  saveAddress,
  saveShiping,
  savePayment,
  saveOrder,
  getCurrentCart,
} from "../../features/cart/cartSlice";
import { useAuth } from "../../hooks/useAuth"; 
import AutocompleteInput from "../../components/gmapAPi/AutocompleteInput";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const globalstate = useSelector((state) => state.cart);
  const router = useRouter();
  const { user, checkAuthentication } = useAuth();
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
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (user) {
      setShowModal(false);
      const defaultAddress =
        user.data.addresses.length > 0 ? user.data.addresses[0] : {};

      setBillingInfo({
        ...billingInfo,
        first_name: user.data.first_name || "",
        last_name: user.data.last_name || "",
        email: user.data.email || "",
        phone: user.data.phone || defaultAddress.phone || "",
        address1: defaultAddress.address1 ? defaultAddress.address1.join(" ") : "",
        use_for_shipping: "true",
        city: defaultAddress.city || "cdo",
        state: defaultAddress.state || "cdo",
        postcode: defaultAddress.postcode || "9000",
        country: defaultAddress.country_name || "PHIL",
      });
    }
    console.log("this", user);
  }, [user]);

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

  const handleCloseModal = () => setShowModal(false);
  const handleGuestOrder = () => {
    setShowModal(false);
    handleSubmit();
  };
  const handleRegister = () => {
    setShowModal(false);
    router.push("/signup");
  };

  const handleLogin = () =>{
    setShowModal(false);
    router.push("/login")
  }
 
  return (
    <div className="font-[sans-serif] bg-white p-4 min-h-screen">
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        onGuest={handleGuestOrder}
        onRegister={handleRegister}
        onLogin={handleLogin}
      />
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
                <AutocompleteInput
                  onChangeadd={handleChange}
                />
                {["email", "phone"].map((field) => (
                  <>
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
                  </>
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
                    {method === "delivery" ? (
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="30"
                          version="1.0"
                          viewBox="0 0 160 128"
                        >
                          <path d="M23 3l-1 8v7l-10 1-11 3c-3 2 0 4 7 5l8 2-8 2c-6 1-7 2-8 4 0 2 1 2 7 3l8 2-6 1c-8 1-9 2-9 4s1 2 6 3l11 2 5 1v11l1 12 68 1h67V59l-11-21-10-21-5-1h-4v10h-12V16l-1-12c0-2-5-2-46-2L23 3zm113 32l3 7 8 19h-27V34h8l8 1zM23 83l-1 13v12h14l1-4c3-5 7-10 11-11 7-2 17 0 21 5l4 5 1 5h20c19 0 20-1 21-2 6-11 10-14 18-14 9 0 15 4 18 12 2 3 2 4 4 4 2-1 2-1 2-14V83l-67-1c-60 0-67 0-67 2z"></path>
                          <path d="M50 100c-6 3-9 9-7 15s6 9 12 9c9 0 13-5 13-13 0-10-10-16-18-11zm77 0c-6 4-8 12-5 18 3 4 6 6 12 6 5 0 6 0 9-3 4-5 5-10 2-15-3-7-11-10-18-6z"></path>
                        </svg>
                      </span>
                    ) : (
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="30"
                          version="1.0"
                          viewBox="0 0 256 256"
                        >
                          <path d="M34 2c-3 4-2 9 1 12 2 2 3 2 93 2s91 0 93-2c4-3 4-8 1-12l-1-2H35l-1 2zM16 55L0 87l128 1 128-1-16-32-15-32H32L16 55zm49-18l2 2-8 19c-8 15-9 17-11 17s-3-1-3-3c0-3 17-36 19-36l1 1zm32 0l2 2-8 19c-8 15-9 17-11 17s-3-1-3-3c0-3 17-36 19-36l1 1zm33 0c1 1 2 4 2 17 0 17-1 21-4 21s-4-4-4-21c0-13 1-16 2-17l2-1 2 1zm31 0l10 17c9 17 10 21 5 21a254 254 0 0 1-21-35c0-2 2-4 4-4l2 1zm33 1c3 3 17 32 17 34s-1 3-3 3-3-2-10-17c-9-17-10-20-8-21s3-1 4 1zM0 104c1 8 1 10 4 15 3 6 10 12 16 15l4 1v104H14c-9 1-10 1-12 3-3 4-3 9 1 12 2 2 2 2 125 2s123 0 125-2c4-3 4-8 1-12-2-2-3-2-12-3h-10V135l4-1c6-3 13-9 17-15 2-5 3-7 3-15v-9H0v9zm65 9c0 3 6 12 10 15l9 6 4 1v104H40V135l4-1 9-6c4-3 10-12 10-15l1-2 1 2zm132 8c3 5 9 11 15 13l4 1v104H96V136h5c10-2 20-9 24-19l3-5 3 6c3 6 9 12 16 15 3 2 6 3 13 3s10-1 13-3c7-3 13-9 17-16l2-6 2 3 3 7z"></path>
                          <path d="M68 160c-4 2-6 10-2 14 2 1 2 3 2 9 0 7 0 9-2 11-3 3-3 9 1 12 5 4 13 1 13-6l-2-6c-2-2-2-4-2-11 0-6 0-8 2-10 3-2 3-8 0-11-2-2-7-3-10-2zM145 162l-11 11 3 3 3 3 12-11 11-12-3-3-3-3-12 12zM157 173l-23 23 3 3 4 3 23-23 22-23-2-3-4-3-23 23zM168 183l-11 13 3 3 3 3 11-12 12-12-3-3-4-3-11 11z"></path>
                        </svg>
                      </span>
                    )}
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
                            className="w-10 h2 rounded-sm"
                          />
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
