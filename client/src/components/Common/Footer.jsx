import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Newsletter
          </h3>

          <p className="text-sm text-gray-600 mb-3">
            Be the first to hear about new products, exclusive events,
            and online offers.
          </p>

          <p className="text-sm text-gray-600 mb-4">
            Sign up and get <span className="font-medium">10% off</span> your first order.
          </p>

          <form className="flex ">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 text-sm border border-gray-300 
                         rounded-l-md focus:outline-none 
                         focus:ring-1 focus:ring-gray-500"
              required
            />
            <button
              type="submit"
              className="ml-1 px-4 py-2 text-sm font-medium 
                         bg-gray-900 text-white rounded-r-md
                         hover:bg-black transition hover:cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Shop
          </h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>
              <Link to="/men" className="hover:text-gray-900 transition">
                Men
              </Link>
            </li>
            <li>
              <Link to="/women" className="hover:text-gray-900 transition">
                Women
              </Link>
            </li>
            <li>
              <Link to="/topwear" className="hover:text-gray-900 transition">
                Topwear
              </Link>
            </li>
            <li>
              <Link to="/bottomwear" className="hover:text-gray-900 transition">
                Bottomwear
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Support
          </h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>
              <Link to="/contact" className="hover:text-gray-900 transition">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-900 transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/faqs" className="hover:text-gray-900 transition">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/features" className="hover:text-gray-900 transition">
                Features
              </Link>
            </li>
          </ul>
        </div>

        {/* Brand / Info */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Rabbit
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Premium everyday wear designed with comfort, quality,
            and timeless style in mind.
          </p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <div className="container mx-auto px-6 py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Rabbit. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
