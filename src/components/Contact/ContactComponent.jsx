import React from 'react';

const ContactComponent = () => {
  return (
    <div className="bg-gray-100 py-16 pt-[100px] md:pt-[150px] px-6 font-overpass text-gray-800">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        
        {/* Left Section - Contact Info & Map */}
        <div>
          <h2 className="text-4xl font-bold text-orange-600 mb-6">Get in Touch</h2>
          <p className="mb-4 text-lg">
            Got a question? Need help with a part? Holler at us anytime, and the pride will answer back
          </p>

          <div className="mb-6">
            <p><span className="font-semibold">📍 Address:</span> 123 Lion Street, Motor City, Sri Lanka</p>
            <p><span className="font-semibold">📞 Phone:</span> +94 76 123 4567</p>
            <p><span className="font-semibold">✉️ Email:</span> support@lionautoparts.lk</p>
            <p><span className="font-semibold">🕒 Hours:</span> Mon–Sat: 9AM – 6PM</p>
          </div>

          <div className="w-full h-64 rounded-xl overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63343.32214555358!2d79.8562059!3d6.9270786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25925b715a6d7%3A0x123456789abcdef!2sColombo!5e0!3m2!1sen!2slk!4v1610000000000"
              allowFullScreen=""
              loading="lazy"
              title="Lion Auto Parts Location"
            ></iframe>
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div>
          <h2 className="text-3xl font-bold text-orange-600 mb-6">Send Us a Message 💌</h2>
          <form className="grid grid-cols-1 gap-6 bg-white p-6 rounded-xl shadow-md">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              required
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            ></textarea>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
            >
              Send Message 🚀
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactComponent;
