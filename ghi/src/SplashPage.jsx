const SplashPage = () => {
    return (
        <div className="container mx-auto flex flex-col items-center justify-center pt-20">
            <h2 className="text-4xl font-bold mb-8">Welcome to Where's My Stuff</h2>
            <div className="flex items-center justify-center mb-8">
                <div className="flex-shrink-0 w-1/3 mr-8">
                    <img src="https://satrack.com/us/wp-content/uploads/sites/5/2023/09/1.jpg" alt="Inventory image" className="w-full h-auto"/>
                </div>
                <div className="flex-shrink-0 w-1/3 p-8">
                    <div className="mb-4">
                        <p className="mb-4">
                            Manage your inventory smarter, faster, and with ease. Where's My Stuff offers powerful tools tailored to your business needs, enabling you to streamline operations, reduce costs, and improve overall performance.
                        </p>
                        <p className="mb-4">
                            With our user-friendly interface, you can effortlessly track equipment, manage contracts, categorize equipment types, monitor job sites, and optimize storage sites. Our integration with Google Maps provides visual insights into your job sites and warehouses.
                        </p>
                        <p>
                            Take control of your inventory management today. Sign up for an account and start tracking your equipment efficiently.
                        </p>
                    </div>
                    <a href='/accounts' className="bg-blue-500 text-white py-2 px-4 rounded">Create Account</a>
                </div>
            </div>
        </div>
    );
}

export default SplashPage;
