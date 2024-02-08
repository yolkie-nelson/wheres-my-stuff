const About = () => {
    return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4 pt-4">About Our Application</h1>
                <p className="mb-6">
                    Welcome to our platform, where we provide comprehensive solutions for equipment management tailored to the needs of your business. Our application offers a user-friendly interface designed to streamline the process of tracking and managing equipment, ensuring efficiency and convenience for your company.
                </p>
                <div className="flex pt-4">
                    <div className="">
                    <img src="https://cdn.shopify.com/s/files/1/1246/6441/files/Inventory_Specialist.png?format=jpg&quality=90&v=1659475932" alt="About Image" className="w-full float-center pt-10 max-w-[80rem] h-auto mb-8" />
                    </div>
                    <div className="pl-10">
                        <h2 className="text-2xl font-bold mb-2">Key Features:</h2>
                        <ul className="list-disc ml-6 mb-6">
                            <li>Account Creation: Users can create accounts for their companies, providing a centralized hub for managing equipment-related tasks.</li>
                            <li>Equipment Management: Our platform allows users to create and manage equipment items, keeping track of their status, location, and usage history.</li>
                            <li>Equipment Types: To facilitate organization and categorization, users can define equipment types, making it easier to classify and search for specific types of equipment within their inventory.</li>
                            <li>Job Sites: Users can add and manage job sites where equipment is deployed, providing valuable insights into the distribution and utilization of equipment across different locations.</li>
                            <li>Contract Management: Our application enables users to create contracts for renting out specific pieces of equipment, ensuring clear agreements and seamless transactions between parties involved.</li>
                            <li>Storage Sites: Users can designate storage sites where equipment items are stored, allowing for efficient tracking of inventory and optimizing storage logistics.</li>
                            <li>Google Maps Integration: Leveraging the power of Google Maps API, our platform provides visual representations of job sites and warehouses, enhancing location-based tracking and management capabilities.</li>
                            <li>Dashboard Insights: Our dashboard offers comprehensive and customizable views of essential statistics and metrics related to rented equipment, empowering users with actionable insights to make informed decisions and optimize operations.</li>
                        </ul>
                    </div>

                </div>
                <p>
                    At our core, we are committed to delivering innovative solutions that empower businesses to effectively manage their equipment assets, increase productivity, and drive success. Join us on our journey to revolutionize equipment management and take your business to new heights.
                </p>
            </div>
    );
};

export default About;
