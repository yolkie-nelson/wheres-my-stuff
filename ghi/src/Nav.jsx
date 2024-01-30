import { Link, Outlet} from "react-router-dom";
import { useGetTokenQuery } from "./app/apiSlice.js";
import './App.css'

const Nav = () => {
    const { data: account } = useGetTokenQuery()
    return (
        <><nav className="bg-gray-800">
            <div class=" nav-bar-font grid grid-rows-5 grid-cols-12 gap-1 w-full items-center justify-start sm:items-stretch sm:justify-start">
                <div class="row-span-5 col-start-1 col-span-1 ..."><img
                    className="h-40"
                    src="./public/wheres_my_stuff-removebg-preview.png"
                    alt="Where's My Stuff Logo" /> </div>
                <div className="col-start 2 col-span-6 app-name row-span-3  ..."> Where's My Stuff? </div>
                <div className="tag-line col-span-2 row-start-4 col-start-4 ..."> Not where I left it</div>
                <div className="flex justify-end pr-10 space-x-4 col-start-10 row-start-3"> <a href="#" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Home</a></div>
                <div className="flex justify-end pr-10 space-x-4 col-start-11 row-start-3"> <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">About</a> </div>
                <div className="flex justify-end pr-10 space-x-4 col-start-12 row-start-3"> <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Login</a> </div>
            </div>
            {/* <!--
            Dropdown menu, show/hide based on menu state.
            Entering: "transition ease-out duration-100"
            From: "transform opacity-0 scale-95"
            To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
            From: "transform opacity-100 scale-100"
            To: "transform opacity-0 scale-95"
        --> */}
            {/* <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
            <!-- Active: "bg-gray-100", Not Active: "" -->
            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Settings</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</a>
        </div> */}
            {/* </div> */}

            {/* <!-- Mobile menu, show/hide based on menu state. --> */}
            <div className="sm:hidden" id="mobile-menu">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                    <a
                        href="#"
                        className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                        aria-current="page"
                    >
                        Dashboard
                    </a>
                    <a
                        href="#"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                    >
                        Team
                    </a>
                    <a
                        href="#"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                    >
                        Projects
                    </a>
                    <a
                        href="#"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                    >
                        Calendar
                    </a>
                </div>
            </div>
        </nav>
         {/* <div className="flex h-screen">
                <nav className="bg-gray-800 text-white p-4 h-full">
                    <ul className="h-full space-y-2">
                        <li><a href="#">Dashboard</a></li>
                        <li><a href="#">Profile</a></li>
                        <li><a href="#">Settings</a></li>
                    </ul>
                </nav>
        </div></>  */}
        </>
    )
}

export default Nav;
