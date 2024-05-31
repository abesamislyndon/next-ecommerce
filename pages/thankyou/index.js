export default function ThankYouPage() {
  return (
    <div className="font-[sans-serif] bg-white p-4 min-h-screen">
      <div className="lg:max-w-6xl max-w-xl mx-auto pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-[#333] mb-6">
            Thank You for Your Order!
          </h1>
          <p className="text-xl text-[#333] mb-4">
            Your order has been successfully placed.
          </p>
          <p className="text-md text-[#333] mb-8">
            We appreciate your business and will process your order shortly.
          </p>
          <a
            href="/"
            className="mt-6 inline-block py-3.5 px-8 text-sm bg-black text-white rounded-md hover:bg-black-700"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  );
}
