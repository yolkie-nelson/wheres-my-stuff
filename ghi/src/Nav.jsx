import { NavLink} from "react-router-dom";
import { useGetTokenQuery, useLogoutMutation} from "./app/apiSlice.js";
import './App.css'

const Nav = () => {
    const { data: account } = useGetTokenQuery()
    const [logout] = useLogoutMutation()
    return (
        <>
            <nav className="bg-gray-800">
                <div className=" nav-bar-font grid grid-rows-5 grid-cols-12 grid-cols-[142px_w-full] gap-1 items-center ">
                    <div className="row-span-5 col-start-1 col-span-1 min-h-40 min-w-40 flex items-center justify-center">
                        <img
                            src="/wheres_my_stuff-removebg-preview.png"
                            alt="Where's My Stuff Logo"
                            className="min-h-full min-w-full "
                        />
                    </div>
                    <div className="  col-start-6 sm:col-start-3 rammetto col-start 2 col-span-8 app-name row-span-3 xl:text-7xl lg:text-5xl sm:text-xl sm:pl-9 md:pl-3 lg:pl-0">
                        
                        Where's My Stuff?
                    </div>
                    <div className=" whitespace-nowrap text-teal pl-9 col-span-3 row-start-4 col-start-3 xl:text-2xl invisible md:visible">
                        
                        You'll never ask that question again!
                    </div>
                    <div className=" justify-end pr-10 space-x-4 col-start-10 row-start-4 hidden sm:inline-block">
                        
                        <NavLink
                            to="/"
                            aria-current="page"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 md: text-[.7rem] xl:text-sm "
                        >
                            Home
                        </NavLink>
                    </div>
                    <div className="justify-end pr-10 space-x-4 col-start-11 row-start-4 hidden sm:inline-block ">
                        
                        <NavLink
                            to="/about"
                            aria-current="page"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-[.7rem] xl:text-sm "
                        >
                            About
                        </NavLink>
                    </div>
                    {!account && <div className="justify-end pr-10 space-x-4 col-start-12 row-start-4 hidden sm:inline-block">
                        
                        <NavLink
                            to="/token"
                            aria-current="page"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-[.7rem] xl:text-sm "
                        >
                            Login
                        </NavLink>
                    </div>}
                    {account && (
                        <button
                            onClick={logout}
                            className="justify-end pr-10 space-x-4 col-start-12 row-start-4 hidden sm:inline-block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-[.7rem] xl:text-sm">
                            Logout
                        </button>)}
                </div>
                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        <NavLink
                            to="#"
                            className="text-gray-300 hover:bg-gray-700 text-white block rounded-md px-3 py-2 text-base font-medium"
                            aria-current="page"
                        >
                            About
                        </NavLink>
                        <NavLink
                            to="#"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="#"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                        >
                            Login
                        </NavLink>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Nav;
