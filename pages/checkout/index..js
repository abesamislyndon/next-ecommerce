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
} from "../../features/cart/cartSlice";
import { useAuth } from "../../hooks/useAuth";
import AutocompleteInput from "../../components/gmapAPi/AutocompleteInput";
import { TruckIcon, BuildingStorefrontIcon } from "@heroicons/react/24/solid";

const StepHeader = ({ currentStep }) => {
  const steps = ["Customer Details", "Delivery Details", "Payment Details"];

  return (
    <div className="flex justify-between mb-8">
      {steps.map((step, index) => (
        <div key={index} className="relative">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              index + 1 === currentStep
                ? "bg-black text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            {index + 1}
          </div>
          <div
            className={`absolute top-0 text-sm ${
              index + 1 === currentStep ? "text-black" : "text-gray-500"
            }`}
          >
            <span className="mt-8 absolute -ml-2"> {step}</span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-1 h-8 ${
                index + 1 < currentStep ? "bg-black" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

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
  const [currentStep, setCurrentStep] = useState(1); // Track the current step

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

    setDeliveryMethod(storedDeliveryMethod || "");
    setPaymentMethod(storedPaymentMethod || "");
    setPickupLocation(storedpickupLocation || "");
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
  };

  const handlePickupChange = (e) => {
    const { name, value } = e.target;
    if (name === "pickupLocation") setPickupLocation(value);
    if (name === "pickupDate") setPickupDate(value);
    if (name === "pickupTime") setPickupTime(value);
    localStorage.setItem(name, value);
  };

  const validateCustomerDetails = () => {
    let formErrors = {};

    if (!billingInfo.first_name)
      formErrors.first_name = "First name is required";
    if (!billingInfo.last_name) formErrors.last_name = "Last name is required";
    if (!billingInfo.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(billingInfo.email)) {
      formErrors.email = "Invalid email format";
    }
    if (!billingInfo.phone) formErrors.phone = "Phone number is required";
    if (!billingInfo.address1) formErrors.address1 = "Address is required";
    if (!billingInfo.city) formErrors.city = "City is required";
    if (!billingInfo.state) formErrors.state = "State is required";
    if (!billingInfo.postcode) formErrors.postcode = "Postcode is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validateCustomerDetails()) {
        setCurrentStep(2);
      }
    } else {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateCustomerDetails()) {
      return;
    }

    try {
      const pickup_location = localStorage.getItem("pickupLocation");
      const delivery_method = localStorage.getItem("deliveryMethod");

      await dispatch(saveOrder({ pickup_location, delivery_method }));
      router.push("/thankyou");
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-extrabold text-[#333] mb-7">
              Customer Details
            </h2>
            <CustomerDetails
              billingInfo={billingInfo}
              handleChange={handleChange}
              errors={errors} // Pass down errors for inline validation
            />
            <button
              type="button"
              onClick={handleNextStep} // Use handleNextStep for validation
              className="mt-4 px-6 py-2 bg-black text-white rounded-md"
            >
              Next: Delivery Details
            </button>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-extrabold text-[#333] mb-7">
              Delivery Details
            </h2>
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
                    className="form-radio h-6 w-6 text-black border-gray-300"
                  />
                  {method === "delivery" ? (
                    <TruckIcon className="w-7 h-7 text-black-500 mx-auto mt-[0px]" />
                  ) : (
                    <BuildingStorefrontIcon className="w-7 h-7 text-black mx-auto" />
                  )}
                  <span>
                    {method.charAt(0).toUpperCase() + method.slice(1)}
                  </span>
                </label>
              ))}
            </div>
            {errors.deliveryMethod && (
              <p className="text-red-500 text-sm">{errors.deliveryMethod}</p>
            )}
            {deliveryMethod === "pickup" && (
              <div className="mt-6">
                <label className="block text-[#333] mb-2">
                  Pickup Location
                </label>
                <select
                  name="pickupLocation"
                  value={pickupLocation}
                  onChange={handlePickupChange}
                  className={`px-4 py-2 border rounded-md w-full ${
                    errors.pickupLocation ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Location</option>
                  <option value="location1">Location 1</option>
                  <option value="location2">Location 2</option>
                </select>
                {errors.pickupLocation && (
                  <p className="text-red-500 text-sm">
                    {errors.pickupLocation}
                  </p>
                )}
                <div className="mt-4">
                  <label className="block text-[#333] mb-2">Pickup Date</label>
                  <input
                    type="date"
                    name="pickupDate"
                    value={pickupDate}
                    onChange={handlePickupChange}
                    className={`px-4 py-2 border rounded-md w-full ${
                      errors.pickupDate ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.pickupDate && (
                    <p className="text-red-500 text-sm">{errors.pickupDate}</p>
                  )}
                </div>
                <div className="mt-4">
                  <label className="block text-[#333] mb-2">Pickup Time</label>
                  <input
                    type="time"
                    name="pickupTime"
                    value={pickupTime}
                    onChange={handlePickupChange}
                    className={`px-4 py-2 border rounded-md w-full ${
                      errors.pickupTime ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.pickupTime && (
                    <p className="text-red-500 text-sm">{errors.pickupTime}</p>
                  )}
                </div>
              </div>
            )}
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="mt-4 px-6 py-2 bg-gray-300 text-black rounded-md"
            >
              Back: Customer Details
            </button>
            <button
              type="button"
              onClick={handleNextStep} // Use handleNextStep for validation
              className="mt-4 px-6 py-2 bg-black text-white rounded-md"
            >
              Next: Payment
            </button>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-2xl font-extrabold text-[#333] mb-7">
              Payment Method
            </h2>
            <div className="grid grid-cols-2 gap-4 items-center mt-6">
              {(deliveryMethod === "pickup"
                ? ["In Store"]
                : ["In Store", "cod"]
              ).map((method) => (
                <label
                  key={method}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={handlePaymentChange}
                    className="form-radio h-6 w-6 text-black border-gray-300"
                  />
                  <span>{method.toUpperCase()}</span>
                </label>
              ))}
            </div>
            {errors.paymentMethod && (
              <p className="text-red-500 text-sm">{errors.paymentMethod}</p>
            )}
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="mt-4 px-6 py-2 bg-gray-300 text-black rounded-md"
            >
              Back: Delivery Details
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="mt-4 px-6 py-2 bg-black text-white rounded-md"
            >
              Place Order
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 py-8">
        <div className="lg:w-2/3">
          {showModal && (
            <Modal
              handleCloseModal={handleCloseModal}
              handleGuestOrder={handleGuestOrder}
              handleRegister={handleRegister}
              handleLogin={handleLogin}
            />
          )}

          {/* Add StepHeader component */}
          <div className="p-10 bg-slate-200">
            <StepHeader currentStep={currentStep} />
            {renderStep()}
          </div>
        </div>

        {/* Cart Summary Section */}
        <div className="lg:w-1/2 bg-gray-50 p-6 rounded-lg shadow-lg sticky top-8">
          <h2 className="text-2xl font-extrabold text-[#333] mb-7">
            Order Summary
          </h2>
          {globalstate.cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-semibold text-lg text-[#333]">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {item.quantity} x ${item.price}
                </p>
              </div>
              <p className="font-semibold text-lg text-[#333]">
                ${calculateSubtotal(item).toFixed(2)}
              </p>
            </div>
          ))}
          <hr className="my-4" />
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-[#333]">Total</h3>
            <p className="text-xl font-semibold text-[#333]">
              ${calculateTotal().toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
