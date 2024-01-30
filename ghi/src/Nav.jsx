import { Link, Outlet} from "react-router-dom";
import { useGetTokenQuery } from "./app/apiSlice.js";
import './App.css'

const Nav = () => {
    const { data: account } = useGetTokenQuery()
    return (
        <nav className="bg-gray-800">
            {/* <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8"> */}

                <div className="flex pl-10 flex-1 items-center justify-start sm:items-stretch sm:justify-start">
                    <div className="flex flex-shrink-0 items-center">
                        <img
                            className="h-48"
                            src="./public/wheres_my_stuff-removebg-preview.png"
                            alt="Where's My Stuff Logo"
                        />
                    </div>
                    <div className="nav-bar-font pr-10 pl-5 hidden sm:ml-6 sm:block">
                        Where's My Stuff?
                    </div>
                </div>
                <div className="flex justify-end pr-10 space-x-4">

                    <a href="#" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Home</a>
                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">About</a>
                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Login</a>
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

        // <nav classNameName="Navbar">
        //     <h1 classNameName="text-3xl font-bold underline">
        //         Hello world!
        //     </h1>
        //     <div>
        //         {account && <img classNameName="logo" src={"./wheres_my_stuff-removebg-preview.png"} />}
        //     </div>
        //     <div>
        //         <div>
        //             Where's My Stuff
        //         </div>
        //         <div>
        //             Tag line tag line tag line
        //         </div>
        //     </div>
        //     <li>
        //         <ul> </ul>
        //         <ul>Home</ul>
        //         <ul>About</ul>

        //     </li>

        // </nav>
    )
}

export default Nav;
