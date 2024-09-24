export default function Contact() {
    return (
        <footer className="bg-[#f13a01] mt-24 text-white py-24">
            {/* Main Footer Section */}
            <div className="max-w-6xl mx-auto">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
                {/* Logo and Social Media */}
                <div className="flex flex-col items-left">
                    <h1 className="text-4xl font-bold mb-4">Nutriflex</h1>
                    <p className="mb-2">Follow us</p>
                    
                    <div className="text-left py-8">
                        <span className="font-bold">Excellent</span>
                        <span className="ml-2 text-green-500">★★★★★</span>
                        <p className="text-sm">6,520 reviews on Trustpilot</p>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col items-left md:items-start">
                    <h3 className="font-bold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:underline">Home</a></li>
                        <li><a href="#" className="hover:underline">Menu</a></li>
                        <li><a href="#" className="hover:underline">Blog</a></li>
                        <li><a href="#" className="hover:underline">Gift Cards</a></li>
                        
                    </ul>
                </div>

                {/* About Us Links */}
                <div className="flex flex-col items-center md:items-start">
                    <h3 className="font-bold mb-4">About Us</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:underline">How it Works</a></li>
                        <li><a href="#" className="hover:underline">How we Compare</a></li>
                        <li><a href="#" className="hover:underline">About Us</a></li>
                        <li><a href="#" className="hover:underline">Our Plans</a></li>
                        <li><a href="#" className="hover:underline">Meal Prep Delivery</a></li>
                    
                    </ul>
                </div>

                {/* Download App */}
                <div className="flex flex-col items-center md:items-start">
                    <h3 className="font-bold mb-4">DOWNLOAD OUR APP</h3>
                    <div className="flex flex-col space-y-4">
                        <a href="#" className="block">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                alt="Download on Google Play"
                                className="h-10"
                            />
                        </a>
                        <a href="#" className="block">
                            <img
                                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                                alt="Download on the App Store"
                                className="h-10"
                            />
                        </a>
                        
                    </div>
                </div>
            </div>
            </div>
            
        </footer>
    );
}
