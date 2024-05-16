import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

export default function ProductCard({ product }) {
  
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate total quantity in the cart
  const totalQuantity = cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    setShowModal(false); // Close modal after adding to cart
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!mounted) return null; // Render nothing on the server

  return (
    <>
      <div className="mt-4 my-5 rounded-lg border border-gray-100 bg-white shadow-md">
        <img src={product.image} alt="" />
        <div className="p-5">
          <h5 className="text-md tracking-tight text-slate-900">
            {product.name}
          </h5>
        </div>

        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="p-5 text-3xl font-bold text-slate-900">
              {product.price}
            </span>
            <span className="text-sm text-slate-900 line-through">$699</span>
          </p>
        </div>
        <button
          className="flex w-full items-center justify-center  bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          onClick={() => setShowModal(true)}
        >
          Add to Cart
        </button>

        {/* Modal */}
        {showModal && (
          <div className="modal">
            <div className="modal-content ">
              <span className="close" onClick={() => setShowModal(false)}>
                &times;
              </span>
              <div className="grid grid-flow-col grid-cols-1 lg:grid-cols-2 gap-5">
                <div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="relative w-auto h-auto"
                  />
                </div>
                <div className="h-[45vh">
                  <h2 className="text-[1.3em] font-extrabold">
                    {product.name}
                  </h2>
                  <p>{product.description}</p>
                  <div className="grid grid-flow-col">
                    <div className="mt-10">
                      <button
                        className="pt-4 pb-4 pl-6 pr-6 bg-black text-[#fff]"
                        onClick={decreaseQuantity}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        max={totalQuantity}
                        className="w-12 text-center text-lg font-extrabold"
                      />
                      <button
                        className="pt-4 pb-4 pl-6 pr-6 bg-black text-[#fff]"
                        onClick={increaseQuantity}
                      >
                        +
                      </button>
                    </div>
                    <div>
                      <button
                        className=" h-[55px] mt-[38px] flex w-full items-center justify-center  bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                        onClick={handleAddToCart}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal styles (you can place this in a separate CSS file) */}
        <style jsx>{`
          .modal {
            display: block;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
          }
          .modal-content {
            background-color: #fefefe;
            margin: 10% auto;
            padding: 20px;
            margin-top: 190px;
            border: 1px solid #888;
            width: 100%;
            max-width: 800px;
            max-height: 80%;
            overflow-y: auto;
          }
          .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
          }
          .close:hover,
          .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
          }
        `}</style>
      </div>
    </>
  );
}
