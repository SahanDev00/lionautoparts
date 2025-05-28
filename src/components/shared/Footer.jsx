import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-gray-300 pt-12 pb-8 px-6 md:px-20 font-overpass mt-2">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <h2 className="text-yellow-400 text-2xl font-bold mb-4">Lion Auto Parts</h2>
          <p className="text-sm">
            Your one-stop shop for high-performance auto parts. Quality you trust. Speed you need.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/shop" className="hover:text-yellow-400">Shop</a></li>
            <li><a href="/about" className="hover:text-yellow-400">About Us</a></li>
            <li><a href="/contact" className="hover:text-yellow-400">Contact</a></li>
            <li><a href="/faq" className="hover:text-yellow-400">FAQ</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-white font-semibold mb-3">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/returns" className="hover:text-yellow-400">Returns</a></li>
            <li><a href="/shipping" className="hover:text-yellow-400">Shipping</a></li>
            <li><a href="/privacy" className="hover:text-yellow-400">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-yellow-400">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Contact + Socials */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact Us</h3>
          <p className="text-sm mb-2">📍 NO.82A, Heraliyawala Industrial Zone, Malkaduwawa, Kurunegala.</p>
          <p className="text-sm mb-2">📞 Phone: +94 77 91 57 910</p>
          <p className="text-sm mb-2">📞 Whatsapp: +94 77 91 57 910</p>
          <p className="text-sm mb-4">✉️ support@autopartspro.com</p>
          <div className="flex gap-4">
            <a href="/" className="text-yellow-400 hover:text-white"><FaFacebookF /></a>
            <a href="/" className="text-yellow-400 hover:text-white"><FaInstagram /></a>
            <a href="/" className="text-yellow-400 hover:text-white"><FaTwitter /></a>
            <a href="/" className="text-yellow-400 hover:text-white"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-10 border-t border-gray-500 pt-6 text-center text-sm text-gray-200">
        © {new Date().getFullYear()} Lion Auto Parts. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
