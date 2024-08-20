const StepHeader = ({ currentStep }) => {
  const steps = ["Customer Details", "Delivery Details", "Payment Details"];

  return (
    <div className="flex justify-between mb-8 bg-white pt-4 pb-4 pl-10 pr-10">
      {steps.map((step, index) => (
        <div key={index} className="relative">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              index + 1 === currentStep
                ? "bg-black text-white"
                : "bg-blue-50 text-black"
            }`}
          >
            {index + 1}
          </div>
          <div
            className={`absolute top-0 ml-4 text-sm ${
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

export default StepHeader;