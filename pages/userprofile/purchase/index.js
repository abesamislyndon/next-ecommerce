import { useEffect, useState } from "react";
import Sidebar from "../../../components/customer/topnavbar";
import { getPurchaseOrder } from "../../../utils/customerAPI";
import LoadingSpinner from "../../../components/loading/LoadingSpinner";

const Order = () => {
  const [Purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const get_user_loggedIn = sessionStorage.getItem("BasicInfo");
        const parsedUserInfo = JSON.parse(get_user_loggedIn);
        const data = await getPurchaseOrder(parsedUserInfo);
        setPurchases(data || []);
        setLoading(false); // Mark loading as false after data is fetched
      } catch (error) {
        setError(error.message);
        setLoading(false); // Mark loading as false on error as well
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <LoadingSpinner/>
      </>
    ); // Replace with a spinner or loading indicator as needed
  }

  if (error) {
    return <p>Error: {error}</p>; // Display error message if API call fails
  }

  console.log(Purchases.data);
  return (
    <>
      <div className="mx-auto container">
        <Sidebar />
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <section className="py-1 antialiased bg-[#fcf7f0] md:py-2">
            {Purchases && Purchases.data.length > 0 ? (
              Purchases.data.map((purchase) => (
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                  <div className=" mt-6 sm:mt-8 lg:flex lg:gap-8">
                    <div className="w-full divide-gray-200 overflow-hidden rounded-lg border border-gray-200">
                      <h2 className="text-md p-5 font-semibold">
                        Order #{purchase.id}
                      </h2>
                      <h2 className="text-xs p-1 ml-4 -mt-4 font-semibold">
                        Date {purchase.created_at}
                      </h2>
                      <span className="text-sm float-end p-1 -mt-5  mr-2 bg-blue-300 rounded-md">
                        {purchase.status}
                      </span>
                      {purchase.items.map((item) => (
                        <div className="space-y-4 p-6">
                          <div className="flex items-center gap-6">
                            <img
                              src={item.product.images.map(
                                (img) => img.small_image_url
                              )}
                              className="w-10 h-10"
                              alt={item.name}
                            />
                            <a
                              href="#"
                              className="min-w-0 flex-1 font-medium text-gray-900 hover:underline text-dark"
                            >
                              {item.name}
                            </a>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center justify-end gap-4">
                              <p className="text-base font-normal text-gray-900 text-dark">
                                x {item.qty_ordered}
                              </p>

                              <p className="text-xl font-bold leading-tight text-gray-900 text-dark">
                                {item.formated_base_total}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="space-y-4 bg-gray-50 p-6 dark:bg-[#fff]">
                        <dl className="flex items-center justify-between gap-4  pt-2 ">
                          <dt className="text-lg font-bold text-gray-500">
                            Totals
                          </dt>
                          <dd className="text-lg font-bold text-gray-500">
                            {purchase.formated_base_grand_total}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <span>empty</span>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default Order;
