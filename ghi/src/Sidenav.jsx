 import { useGetTokenQuery } from "./app/apiSlice.js";
 import './App.css'

 const Sidenav = () => {
    const { data: account } = useGetTokenQuery()
    return (
        <div className="flex h-screen">
            <nav className="bg-gray-800 text-white p-6 h-full 0">
                <ul className="hover:bg-gray-70 h-full space-y-2">
                    <li>
                        <a
                            href="#"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                            aria-current="page"
                        >
                            {' '}
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                            aria-current="page"
                        >
                            Equipment
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                            aria-current="page"
                        >
                            Job Sites
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                            aria-current="page"
                        >
                            Warehouse
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
 }
export default Sidenav;
