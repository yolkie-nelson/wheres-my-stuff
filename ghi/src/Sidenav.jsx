import './App.css'
import { useState } from 'react';


const Sidenav = () => {
    return (
        <div className="flex h-screen">
            <nav className="bg-gray-800 text-white p-6 h-full w-60">
                <ul className="h-full space-y-2">
                    <li className="px-4 py-4 text-white hover:text-amber-600 cursor-pointer font-bold text-base uppercase tracking-wide">
                        <a href="/">Dashboard</a>
                    </li>
                    <li className="px-4 py-4 text-white hover:text-amber-600 cursor-pointer font-bold text-base uppercase tracking-wide">
                        <a href="/equipment">Equipment</a>
                    </li>
                    <li className="px-4 py-4 text-white hover:text-amber-600 cursor-pointer font-bold text-base uppercase tracking-wide">
                        <a href="/contracts">Contracts</a>
                    </li>
                    <li className="px-4 py-4 text-white hover:text-amber-600 cursor-pointer font-bold text-base uppercase tracking-wide">
                        <a href="/jobsites">Job Sites</a>
                    </li>
                    <li className="px-4 py-4 text-white hover:text-amber-600 cursor-pointer font-bold text-base uppercase tracking-wide">
                        <a href="/storagesites">Warehouses</a>
                    </li>
                    <li className="group relative group  relative dropdown  px-4 py-4 text-white hover:text-amber-600 cursor-pointer font-bold text-base uppercase tracking-wide">
                        <a>Create New</a>
                        <div className="group-hover:block dropdown-menu absolute hidden h-auto w-auto">
                        <ul className="top-0 w-48 bg-white shadow px-6 py-8">
                            <li className="py-1"><a href="/types/create" className="block text-sky-500 font-bold text-base uppercase hover:text-amber-600 cursor-pointer">Equipment Type</a></li>
                            <li className="py-1"><a href="/equipment/create" className="block text-sky-500 font-bold text-base uppercase hover:text-amber-600 cursor-pointer">Equipment Item</a></li>
                            <li className="py-1"><a href="/jobsites/create" className="block text-sky-500 font-bold text-base uppercase hover:text-amber-600 cursor-pointer">Job Site</a></li>
                            <li className="py-1"><a href="/storagesites/create" className="block text-sky-500 font-bold text-base uppercase hover:text-amber-600 cursor-pointer">Warehouse</a></li>
                            <li className="py-1"><a href="/contracts/create" className="block text-sky-500 font-bold text-base uppercase hover:text-amber-600 cursor-pointer">Contract</a></li>
                        </ul>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidenav;








// const Sidenav = () => {
//     const [isHovered, setIsHovered] = useState(false);

//     const handleMouseEnter = () => {
//         setIsHovered(true);
//     };

//     const handleMouseLeave = () => {
//         setIsHovered(false);
//     };
//     return (
//         <div className="flex h-screen">
//             <nav className="bg-gray-800 text-white p-6 h-full 0">
//                 <ul className="hover:bg-gray-70 h-full space-y-2">
//                     <li>
//                         <a
//                             href="#"
//                             className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
//                             aria-current="page"
//                             >Dashboard
//                         </a>
//                     </li>
//                     <li>
//                         <a
//                             href="#"
//                             className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
//                             aria-current="page"
//                             >Equipment
//                         </a>
//                     </li>
//                     <li>
//                         <a
//                             href="#"
//                             className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
//                             aria-current="page"
//                         >Job Sites
//                         </a>
//                     </li>
//                     <li>
//                         <a
//                             href="#"
//                             className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
//                             aria-current="page"
//                             >Warehouse
//                         </a>
//                     </li>
//                     <li
//                         className="relative"
//                         onMouseEnter={handleMouseEnter}
//                         onMouseLeave={handleMouseLeave}>
//                         <span
//                             className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
//                         >New
//                         </span>
//                         <div
//                             className={`absolute bg-white mt-2 p-2 rounded shadow-lg ${isHovered ? 'block' : 'hidden'}`}
//                             onMouseEnter={handleMouseEnter}
//                             onMouseLeave={handleMouseLeave}
//                         >
//                             <a href="/types/create" className="block text-gray-800 hover:text-blue-500">Equipment Type</a>
//                             <a href="/equipment/create" className="block text-gray-800 hover:text-blue-500">Equipment</a>
//                             <a href="/jobsites/create" className="block text-gray-800 hover:text-blue-500">Job Site</a>
//                             <a href="/storagesites/create" className="block text-gray-800 hover:text-blue-500">Warehouse</a>
//                             <a href="#" className="block text-gray-800 hover:text-blue-500">Contract</a>
//                         </div>
//                     </li>
//                 </ul>
//             </nav>
//         </div>
//     )
//  }
// export default Sidenav;
