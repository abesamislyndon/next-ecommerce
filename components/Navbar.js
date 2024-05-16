// components/Navbar.js
import Link from "next/link";
import { useSelector } from "react-redux"; // Importing useSelector

export default function Navbar() {
  const cart = useSelector((state) => state.cart); // Selecting the cart state from the Redux store

  // Calculate total quantity in the cart
  const totalQuantity = cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="border-b border-palette-lighter sticky top-0 z-20 bg-white ">
      <nav className="navbar relative navbar-expand-lg lg:flex lg:flex-wrap items-center content-between text-black navbar-default">
        <ul className="m-1 flex">
          <li className="m-4">
            <Link href="/">Home</Link>
          </li>
          <li className="m-4">
            <Link href="/categories/1">Category 1</Link>
          </li>
          <li className="m-4">
            <Link href="/categories/2">Category 2</Link>
          </li>
          <li className="m-4">
            {/* Display total quantity in the cart */}
            <Link href="/cart">Cart ({totalQuantity})</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
