import Image from "next/image";
import imageAbout from "../../public/image/owner.jpg";
export default function About(){
    return (
      <>
        <div className="container mx-auto lg:-mt-10  p-5 lg:p-20">
          <h1 className="text-xl text-center font-extrabold">About Us
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row  gap-1 lg:gap-10 mt-10">
            <div>
              <p className="pb-3 bg-slate-100 p-2 relative">
               Ent3 Systems is revolutionizing grocery shopping in Cagayan de Oro City with its convenient service and door-to-door delivery. As the first of its kind in the city, Ent3 Systems aims to provide a hassle-free grocery shopping experience for its customers.

With a commitment to continuously improve and expand its services, Ent3 Systems ensures the highest standards of quality and reliability.

Ent3 Systems is dedicated to serving its customers and growing its business and organization in the years to come. Experience the ease and convenience of grocery shopping with just one tap, and enjoy the convenience of doorstep delivery with Ent3 Systems.
              </p>
            
            </div>
            <div>
              <Image
                className="w-[100%] h-auto rounded-md"
                src={imageAbout}
                alt="about us"
              />
            </div>
          </div>
        </div>
      </>
    );
}