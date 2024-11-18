export default function Contact(){
    return (
      <>
        <div className="container mx-auto p-5">
          <div className="p-1 mb-10 mt-10">
            <h3 className="mt-5 mb-5 text-xl text-center font-extrabold">
              Contact Us
            </h3>
            <p>
             We, at Ent3 Systems, would like to give you a hassle-free grocery shopping experience.

Take advantage of our innovative Chat & Shop platform, which offers a door-to-door delivery service!

For your orders, please reach out to us through any of the contact information provided below for an immediate response.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 h-[50vh]">
            <div className="p-1">
              <span className="text-lg text-[#CC0404] font-extrabold">
                Contact
              </span>
                <ul>
                  <li> Globe: +63 9171579672</li>
                  <li>Email: wedevelop088@gmail.com</li>
                </ul>
            </div>
            <div>
              <span className="text-xl text-[#CC0404] font-extrabold">
                Address
              </span>
                <ul>
                  <li>Vicky Rosales Building, </li>
                  <li>Macajalar Camaman-an,Cagayan de Oro City,</li>
                  <li> Misamis Oriental, 9000 PH</li>
                </ul>
            </div>
            <div className="mb-3">
              <span className="text-xl text-[#CC0404] font-extrabold">
                Opening Hour
              </span>
                <ul>
                  <li> Mon - Sat: 08:00am - 03:00pm Sunday: CLOSED</li>
                </ul>
            </div>
          </div>
        </div>
      </>
    );
}