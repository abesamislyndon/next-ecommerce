import React from "react";

const CustomerDetails = ({ billingInfo = {}, handleChange, errors }) => {
  return (
    <>
      <div className="grid gap-6">
        <div className="grid grid-cols-2 gap-6 text-sm">
          <label className="block text-[#333] mb-2">
            First Name
            <input
              type="text"
              name="first_name"
              value={billingInfo.first_name || ""}
              onChange={handleChange}
              className={`px-4 py-3.5 bg-gray-100 text-[#333] w-full text-sm border rounded-md focus:border-black outline-none ${
                errors.first_name ? "border-red-500" : ""
              }`}
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
            )}
          </label>
          <label className="block text-[#333] mb-2">
            Last Name
            <input
              type="text"
              name="last_name"
              value={billingInfo.last_name || ""}
              onChange={handleChange}
              className={`px-4 py-3.5 bg-gray-100 text-[#333] w-full text-sm border rounded-md focus:border-black outline-none ${
                errors.last_name ? "border-red-500" : ""
              }`}
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
            )}
          </label>
          <label className="block text-[#333] mb-2">
            Address
            <input
              type="text"
              name="address1"
              value={billingInfo.address1 || ""}
              onChange={handleChange}
              className={`px-4 py-3.5 bg-gray-100 text-[#333] w-full text-sm border rounded-md focus:border-black outline-none ${
                errors.address1 ? "border-red-500" : ""
              }`}
            />
            {errors.address1 && (
              <p className="text-red-500 text-sm mt-1">{errors.address1}</p>
            )}
          </label>
          <label className="block text-[#333] mb-2">
            Email
            <input
              type="email"
              name="email"
              value={billingInfo.email || ""}
              onChange={handleChange}
              className={`px-4 py-3.5 bg-gray-100 text-[#333] w-full text-sm border rounded-md focus:border-black outline-none ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </label>
          <label className="block text-[#333] mb-2">
            Phone
            <input
              type="text"
              name="phone"
              value={billingInfo.phone || ""}
              onChange={handleChange}
              className={`px-4 py-3.5 bg-gray-100 text-[#333] w-full text-sm border rounded-md focus:border-black outline-none ${
                errors.phone ? "border-red-500" : ""
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </label>
        </div>
      </div>
    </>
  );
};

export default CustomerDetails;
