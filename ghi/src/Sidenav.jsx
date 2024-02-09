import { Link } from 'react-router-dom';
import './App.css'


const Sidenav = () => {
    return (
        <div className="flex h-screen">
            <nav className="bg-gray-800 text-white p-6 h-full w-60">
                <ul className="h-full space-y-2">
                    <li className="px-4 py-4 text-white hover:text-amber-600 cursor-pointer font-bold text-base uppercase tracking-wide">
                        <Link to="/">Dashboard</Link>
                    </li>
                    <li className="px-4 py-4 text-white hover:text-amber-600 cursor-pointer font-bold text-base uppercase tracking-wide">
                        <Link to="/equipment">Equipment</Link>
                    </li>
                    <li className="px-4 py-4 text-white hover:text-amber-600 cursor-pointer font-bold text-base uppercase tracking-wide">
                        <Link to="/contracts">Contracts</Link>
                    </li>
                    <li className="px-4 py-4 text-white hover:text-amber-600 cursor-pointer font-bold text-base uppercase tracking-wide">
                        <Link to="/jobsites">Job Sites</Link>
                    </li>
                    <li className="px-4 py-4 text-white hover:text-amber-600 cursor-pointer font-bold text-base uppercase tracking-wide">
                        <Link to="/storagesites">Warehouses</Link>
                    </li>
                    <li className="group relative group  relative dropdown  px-4 py-4 text-white hover:text-amber-600 cursor-pointer font-bold text-base uppercase tracking-wide">
                        <Link>Create New</Link>
                        <div className="group-hover:block dropdown-menu absolute hidden h-auto w-auto">
                        <ul className="top-0 w-48 bg-white shadow px-6 py-8">
                            <li className="py-1"><Link to="/types/create" className="block text-sky-500 font-bold text-base uppercase hover:text-amber-600 cursor-pointer">Equipment Type</Link></li>
                            <li className="py-1"><Link to="/equipment/create" className="block text-sky-500 font-bold text-base uppercase hover:text-amber-600 cursor-pointer">Equipment Item</Link></li>
                            <li className="py-1"><Link to="/jobsites/create" className="block text-sky-500 font-bold text-base uppercase hover:text-amber-600 cursor-pointer">Job Site</Link></li>
                            <li className="py-1"><Link to="/storagesites/create" className="block text-sky-500 font-bold text-base uppercase hover:text-amber-600 cursor-pointer">Warehouse</Link></li>
                            <li className="py-1"><Link to="/contracts/create" className="block text-sky-500 font-bold text-base uppercase hover:text-amber-600 cursor-pointer">Contract</Link></li>
                        </ul>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidenav;
