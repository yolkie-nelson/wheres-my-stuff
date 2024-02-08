const SplashPage = () => {
    return(
            <div className="container mx-auto flex items-center justify-center min-h-screen">
            <div className="flex-shrink-0 w-1/3">
                <img src="https://cdn.shopify.com/s/files/1/1246/6441/files/Inventory_Specialist.png?format=jpg&quality=90&v=1659475932" alt="Inventory image" className="w-full h-auto"/>
            </div>
            <div className="flex-shrink-0 w-1/3 p-8">
                <div className="mb-4">
                    <h2 className="text-3xl font-bold mb-2">About Us</h2>
                    <p>
                        Where's My Stuff can provide companies with the tools they need to efficiently manage their inventory,
                        streamline operations, reduce costs, and improve overall business performance!
                    </p>
                </div>
                <a href='/accounts' className="bg-blue-500 text-white py-2 px-4 rounded">Create Account</a>

            </div>
        </div>
    )
}

export default SplashPage
