import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  add,
  addItemToCart,
  setCart
} from "../features/cart/cartSlice";

export default function ProductCard({ product }) {

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const cartItems = localStorage.getItem("ApiCartDetails");
    if (cartItems) {
      dispatch(setCart(JSON.parse(cartItems)));
    }
  }, [dispatch]);


  const handleAddToCart = (product) => {
    dispatch(add({ ...product, quantity: quantity }));
    dispatch(addItemToCart({ ...product, product_id: product.id, quantity:quantity}));
    setShowModal(false);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!mounted) return null; 

  return (
    <>
      <span onClick={() => setShowModal(true)} className="cursor-pointer">
        <div className="mt-1 my-5 rounded-lg border border-gray-100 bg-white  p-[0.7em]">
          <img
            src={product.base_image.large_image_url}
            alt=""
            className="rounded-tl-lg rounded-tr-lg"
          />
          <div className="p-2">
            <h5 className="text-md lg:text-sm font-normal  tracking-tight text-slate-900">
              {product.name}
            </h5>
          </div>

          <div className="mt-2 mb-5 flex items-center justify-between">
            <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-1">
              <span className=" text-sm px-2 lg:py-5 lg:text-lg font-bold text-slate-900">
                {product.formated_price.replace(/\$/g, "")}
              </span>
              <span className="text-xl px-2 lg:text-sm text-rose-600 font-bold line-through lg:mt-5">
                {product.formated_regular_price}
              </span>
            </div>
          </div>
          {/* <button
            className="flex w-full items-center justify-center  bg-slate-900 px-5 py-3.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            onClick={() => setShowModal(true)}
          >
            Add to Cart
          </button> */}
        </div>
      </span>
      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content ">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div>
                <img
                  src={product.base_image.large_image_url}
                  alt={product.name}
                  className="relative w-auto h-auto"
                />
              </div>
              <div className="h-[100vh">
                <h2 className="text-[1.2em] font-extrabold">{product.name}</h2>
                <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2">
                  <span className="py-5 text-5xl font-bold text-slate-900">
                    {product.formated_price.replace(/\$/g, "")}
                  </span>
                  <span className="text-lg text-rose-600 font-bold line-through">
                    {product.regular_price}
                  </span>
                </div>

                <p className="p-0 mt-4"  dangerouslySetInnerHTML={{ __html: product.description }}/>

                <div className="grid grid-cols-2 lg:grid-cols-2">
                  <div className="mt-10">
                    <button className="pt-4 pb-4 pl-6 pr-6 -ml-0 lg:ml-0 bg-black text-[#fff]" onClick={decreaseQuantity}>-</button>
                    <input
                      type="text"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      // max={totalQuantity}
                      //                        max={toString}
                      className="w-12 text-center text-lg font-extrabold"
                    />
                    <button className="pt-4 pb-4 pl-6 pr-6 bg-black text-[#fff]" onClick={() => increaseQuantity()}>+</button>
                  </div>
                  <div>
                    <button
                      className=" h-[55px] mt-[40px] ml-2 flex w-full items-center justify-center  bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                      onClick={() => handleAddToCart(product)}
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
           border: 1px solid #888;
          width: 100%;
          max-width: 800px;
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
    </>
  );
}
