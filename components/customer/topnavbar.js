import withAuth from "../../hooks/withAuth";
import Link from "next/link";
import {
  ShoppingCartIcon,
  ClipboardDocumentCheckIcon,
  UserCircleIcon,
  Cog8ToothIcon
} from "@heroicons/react/24/solid";

const Sidebar = () => {
  return (
    <>
      <nav className="relative flex w-full flex-wrap items-center justify-between bg-zinc-50 py-2 shadow-dark-mild dark:bg-[#e8e8e8] lg:py-4">
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <nav className="w-full rounded-md" aria-label="breadcrumb">
            <ol className="list-reset ms-2 flex text-sm">
              <li>
                <Link
                  href="/userprofile"
                  className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none  dark:hover:text-black/80 dark:focus:text-black/80 dark:active:text-black/80 inline-flex items-baseline"
                >
                  <UserCircleIcon className="w-3 h-3 self-center mx-2" />
                  My Account
                </Link>
              </li>
              <li>
                <span className="mx-3 text-black/60"></span>
              </li>
              <li>
                <Link
                  href="/userprofile/purchase"
                  className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none  dark:hover:text-black/80 dark:focus:text-black/80 dark:active:text-black/80 inline-flex items-baseline"
                >
                  <ClipboardDocumentCheckIcon className="w-3 h-3 self-center mx-2" />
                  <span>My Purchase</span>
                </Link>
              </li>
              <li>
                <span className="mx-3 text-black/60"></span>
              </li>
              {/* <li>
                <a
                  href="#"
                  className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-dark/60 dark:hover:text-dark/80 dark:focus:text-dark/80 dark:active:text-white/80 inline-flex items-baseline"
                >
                  <Cog8ToothIcon className="w-3 h-3 self-center mx-2" />
                  Settings
                </a>
              </li> */}
            </ol>
          </nav>
        </div>
      </nav>
    </>
  );
};
export default withAuth(Sidebar);
