import Image from "next/image";
import ent3logoWhite from "../public/image/ent3-logo-white.png";
import imehRich from "../public/image/logo-imerich.webp";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="bg-white dark:bg-[#cc0404] mt-auto p-9 lg:p-2">
        <div className="w-full mx-auto container  p-4 py-6 ">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="/" className="flex items-center">
                <Image className="h-20 w-auto" src={imehRich}  alt="logo"/>
              </a>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-lg font-semibold text-gray-900 uppercase dark:text-white">
                  Resources
                </h2>
                <ul className="text-[#fc9595] font-light text-sm">
                  <li className="mb-4">
                    <Link href="about">About us</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-lg font-semibold text-gray-900 uppercase dark:text-white">
                  Follow us
                </h2>
                <ul className="text-[#fc9595] font-light text-sm">
                  <li>
                    <Link
                      href="https://www.facebook.com/ImerichRovingMarket2021"
                      target="_blank"
                    >
                      Facebook
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.instagram.com/imerichrovingmarket/"
                      target="_blank"
                    >
                      Messenger
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.instagram.com/imerichrovingmarket/"
                      target="_blank"
                    >
                      Instagram
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-lg font-semibold text-gray-900 uppercase dark:text-white">
                  Legal
                </h2>
                <ul className="text-[#fc9595] font-light text-sm">
                  <li className="mb-4">
                    <Link href="/replacement-policy">Replacement Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-[#ed1f1f] sm:mx-auto lg:my-10" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-xs text-[#fc9595]">
              © 2024 Imerich Roving Market . All Rights Reserved.
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0">
              <span className="text-xs text-[#fc9595] mr-2">Powered by:</span>
              <Link
                href="https://www.facebook.com/ImerichRovingMarket2021"
                target="_blank"
                className="text-[#fc9595] hover:text-gray-900 dark:hover:text-white"
              >
                <Image className="h-3 w-auto" src={ent3logoWhite}  alt="logo"/>

                <span className="sr-only">Facebook page</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
