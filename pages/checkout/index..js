import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Modal from "../../components/modals/Modals";
import CustomerDetails from "./customer_details";
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
import { TruckIcon, BuildingStorefrontIcon } from "@heroicons/react/24/solid";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const globalstate = useSelector((state) => state.cart);
  const router = useRouter();
  const { user } = useAuth();
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

      setBillingInfo((prevInfo) => ({
        ...prevInfo,
        first_name: user.data.first_name || "",
        last_name: user.data.last_name || "",
        email: user.data.email || "",
        phone: user.data.phone || defaultAddress.phone || "",
        address1: defaultAddress.address1
          ? defaultAddress.address1.join(" ")
          : "",
        city: defaultAddress.city || "cdo",
        state: defaultAddress.state || "cdo",
        postcode: defaultAddress.postcode || "9000",
        country: defaultAddress.country_name || "PHIL",
      }));
    }
  }, [user]);

  useEffect(() => {
    const cartItems = localStorage.getItem("ApiCartDetails");
    if (cartItems) {
      dispatch(setCart(JSON.parse(cartItems)));
    }
  }, [dispatch]);

  useEffect(() => {
    const storedDeliveryMethod = localStorage.getItem("deliveryMethod");
    const storedPaymentMethod = localStorage.getItem("paymentMethod");
    const storedpickupLocation = localStorage.getItem("pickupLocation");

    console.log("Stored Delivery Method:", storedDeliveryMethod); // Debug log
    console.log("Stored Payment Method:", storedPaymentMethod); // Debug log
    console.log("Stored Location Method:", storedpickupLocation); // Debug log

    setDeliveryMethod(storedDeliveryMethod || "");
    setPaymentMethod(storedPaymentMethod || "");

    setDeliveryMethod(localStorage.getItem("deliveryMethod") || "");
    setPaymentMethod(localStorage.getItem("paymentMethod") || "");
    setPickupLocation(localStorage.getItem("pickupLocation") || "");
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
    console.log("Payment method changed to:", value);
    setPaymentMethod(value);
    dispatch(savePayment()); // Make sure this doesn’t interfere with validation
    localStorage.setItem("paymentMethod", value);
      const formattedBillingInfo = {
        billing: { ...billingInfo, address1: { 0: billingInfo.address1 } },
        shipping: { address1: { 0: "" } },
      };

    dispatch(saveAddress(formattedBillingInfo));
    dispatch(saveShiping({ deliveryMethod, pickupLocation }));
  };

  const handleDeliveryChange = (e) => {
    const { value } = e.target;
    setDeliveryMethod(value);
    localStorage.setItem("deliveryMethod", value);

    const formattedBillingInfo = {
      billing: { ...billingInfo, address1: { 0: billingInfo.address1 } },
      shipping: { address1: { 0: "" } },
    };
    // dispatch(saveAddress(formattedBillingInfo));
    // dispatch(saveShiping({ deliveryMethod, pickupLocation }));
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

    const location = localStorage.getItem("pickupLocation");

    // Existing validations
    if (!billingInfo.first_name)
      formErrors.first_name = "First name is required";
    if (!billingInfo.last_name) formErrors.last_name = "Last name is required";
    // if (!billingInfo.email) formErrors.email = "Email is required";
    if (!billingInfo.phone) formErrors.phone = "Phone number is required";
    // if (!billingInfo.address1) formErrors.address1 = "Address is required";

    console.log(deliveryMethod);

    if (!deliveryMethod || deliveryMethod === "[]") {
      formErrors.deliveryMethod = "Delivery method is required";
    }

    if (deliveryMethod === "pickup") {
      if (!pickupLocation || pickupLocation === "[]") {
        formErrors.pickupLocation = "Delivery method is required";
      }
    }

    if (!paymentMethod || paymentMethod === "[]") {
      formErrors.paymentMethod = "Payment method is required";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Form validation failed"); // Logs if validation fails
      return; // Prevent form submission if validation fails
    }

    try {
      const pickup_location = localStorage.getItem("pickupLocation");
      const delivery_method = localStorage.getItem("deliveryMethod");

      if (!pickupLocation) {
        console.error("No cart info found");
        return; // Prevent further execution if cart info is missing
      }

      console.log("Dispatching saveOrder");
      await dispatch(saveOrder({ pickup_location, delivery_method })); // Await the dispatch to handle async correctly
      router.push("/thankyou"); // Redirect on successful submission
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

  const handleLogin = () => {
    setShowModal(false);
    router.push("/login");
  };

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
            <div className="lg:col-span-2 max-lg:order-1 lg:p-10">
              <h2 className="text-2xl font-extrabold text-[#333] mb-7 mt-10">
                Customer Details
              </h2>
              <hr className="h-px my-8 mt-[-17px] bg-gray-200 border-0 dark:bg-gray-100" />

              <CustomerDetails
                billingInfo={billingInfo}
                handleChange={handleChange}
                errors={errors}
              />

              <h2 className="text-2xl font-extrabold text-[#333] mb-7 mt-7">
                Delivery Details{" "}
                {errors.deliveryMethod && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.deliveryMethod}
                  </p>
                )}
              </h2>

              <hr className="h-px my-8 mt-[-17px] bg-gray-200 border-0 dark:bg-gray-100" />
              <div className="grid grid-cols-2 gap-4 items-center mt-6">
                {["pickup", "delivery"].map((method) => (
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
                      className={`form-radio h-6 w-6 text-black border-gray-300 ${errors.deliveryMethod ? "border-red-500" : ""
                        }`}
                    />
                    {method === "delivery" ? (
                      <span>
                        <TruckIcon className="w-7 h-7 text-black-500 mx-auto mt-[0px]" />
                      </span>
                    ) : (
                      <span>
                        <BuildingStorefrontIcon className="w-7 h-7 text-black mx-auto" />
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
                  {["Pickup Location"].map((label, index) => (
                    <div key={label} className="mt-6">
                      <label className="block text-[#333] mb-2">{label}</label>
                      <select
                        name="pickupLocation"
                        value={pickupLocation}
                        onChange={handlePickupChange}
                        className={`px-4 py-3.5 bg-gray-100 text-[#333] w-full text-sm border rounded-md focus:border-black outline-none ${errors.pickupLocation ? "border-red-500" : ""
                          }`}
                      >
                        <option value="">Select {label}</option>
                        <option value="upper_carmen">Upper Carmen</option>
                        <option value="kauswagan">Kauswagan</option>
                        <option value="bonbon">Bonbon</option>
                      </select>
                    </div>
                  ))}
                  <p className="p-10 bg-[#ecf0fc] mt-2 border border-l-indigo-700">
                    Pickup instructions Please wait for a notification /
                    confirmation via call or text for pick-up.
                  </p>
                </>
              )}
              <h2 className="text-2xl font-extrabold text-[#333] mb-7 mt-20">
                Payment Details
                {errors.paymentMethod && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.paymentMethod}
                  </p>
                )}
              </h2>
              {errors.paymentMethod && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.paymentMethodMethod}
                </p>
              )}
              <hr className="h-px my-8 mt-[-17px] bg-gray-200 border-0 dark:bg-gray-100" />
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={handlePaymentChange}
                  className={`form-radio h-6 w-6 text-black border-gray-300 focus:ring-black ${errors.paymentMethod ? "border-red-500" : ""
                    }`}
                />
                <span>In Store</span>
              </label>
            </div>
            <div className="p-7 bg-slate-50 rounded-md border border-slate/10 shadow-lg shadow-b-2.5 -shadow-spread-2 shadow-slate-900/15">
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
              <div className="sticky top-[100vh]">
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
