import './App.css'
import { useState } from 'react';

const Sidenav = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    return (
        <div className="flex h-screen">
            <nav className="bg-gray-800 text-white p-6 h-full 0">
                <ul className="hover:bg-gray-70 h-full space-y-2">
                    <li>
                        <a
                            href="#"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                            aria-current="page"
                            >Dashboard
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                            aria-current="page"
                            >Equipment
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                            aria-current="page"
                        >Job Sites
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                            aria-current="page"
                            >Warehouse
                        </a>
                    </li>
                    <li
                        className="relative"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}>
                        <span
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                        >New
                        </span>
                        <div
                            className={`absolute bg-white mt-2 p-2 rounded shadow-lg ${isHovered ? 'block' : 'hidden'}`}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <a href="/types/create" className="block text-gray-800 hover:text-blue-500">Equipment Type</a>
                            <a href="/equipment/create" className="block text-gray-800 hover:text-blue-500">Equipment</a>
                            <a href="/jobsites/create" className="block text-gray-800 hover:text-blue-500">Job Site</a>
                            <a href="/storagesites/create" className="block text-gray-800 hover:text-blue-500">Warehouse</a>
                            <a href="#" className="block text-gray-800 hover:text-blue-500">Contract</a>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
        // <div className="flex h-screen">
        //     <nav className="bg-gray-800 text-white p-6 h-full 0">
        //         <ul className="hover:bg-gray-70 h-full space-y-2">
        //             <li>
        //                 <a
        //                     href="#"
        //                     className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
        //                     aria-current="page"
        //                     >Dashboard
        //                 </a>
        //             </li>
        //             <li>
        //                 <a
        //                     href="#"
        //                     className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
        //                     aria-current="page"
        //                     >Equipment
        //                 </a>
        //             </li>
        //             <li>
        //                 <a
        //                     href="#"
        //                     className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
        //                     aria-current="page"
        //                     >Job Sites
        //                 </a>
        //             </li>
        //             <li>
        //                 <a
        //                     href="#"
        //                     className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
        //                     aria-current="page"
        //                     >Warehouse
        //                 </a>
        //             </li>
        //              <li className="relative">
        //                 <div
        //                     href="#"
        //                     className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
        //                     aria-current="page"
        //                     >New
        //                     <div className="absolute bg-white mt-2 p-2 rounded shadow-lg">
        //                         <a href="#" className="block text-gray-800 hover:text-blue-500">Home</a>
        //                         <a href="#" className="block text-gray-800 hover:text-blue-500">About</a>
        //                         <a href="#" className="block text-gray-800 hover:text-blue-500">Contact</a>
        //                     </div>
        //                 </div>
        //             </li>
        //         </ul>
        //     </nav>
        // </div>
    )
 }
export default Sidenav;
