 import { useGetTokenQuery } from "./app/apiSlice.js";
 import './App.css'

 const Sidenav = () => {
    const { data: account } = useGetTokenQuery()
    return (
        <div className="flex h-screen">
            <nav className="bg-gray-800 text-white p-4 h-full">
                <ul className="h-full space-y-2">
                    <li><a href="#">Dashboard</a></li>
                    <li><a href="#">Equipment</a></li>
                    <li><a href="#">Job Sites</a></li>
                    <li><a href="#">Warehouse</a></li>
                </ul>
            </nav>
        </div>
    )
 }
export default Sidenav;
