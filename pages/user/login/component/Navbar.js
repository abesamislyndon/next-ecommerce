import Link from "next/link";
import Image from "next/image";


const NavbarLogin = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 z-20">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
               
        </Link>

        {/* Navigation Links */}
        <div className="space-x-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavbarLogin;
