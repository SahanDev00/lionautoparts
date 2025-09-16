import { useState } from "react";
import axios from "axios";
import emailjs from "emailjs-com";

const ContactComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const serviceID = "service_x50ywfz";
    const templateID = "template_9i55ybf";
    const userID = "bzZfCVNWDRfnXaHKr"; // OR use `publicKey` if using newer EmailJS SDK

    const templateParams = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, userID);

      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Send failed:", error);
      setStatus("❌ Something went wrong. Please try again!");
    }
  };

  return (
    <div className="bg-gray-100 py-16 pt-[100px] md:pt-[150px] px-6 font-overpass text-gray-800">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Contact Info & Map */}
        <div>
          <h2 className="text-4xl font-bold text-orange-600 mb-6">
            Get in Touch
          </h2>
          <p className="mb-4 text-lg">
            Got a question? Need help with a part? Holler at us anytime, and the
            pride will answer back 🦁🔥
          </p>

          <div className="mb-6">
            <p>
              <span className="font-semibold">📍 Address:</span> NO.243/A,
              Colombo road, Wanduragala, Kurunegala
            </p>
            <p>
              <span className="font-semibold">📞 Phone:</span> +94 77 91 57 910
            </p>
            <p>
              <span className="font-semibold">📞 Whatsapp:</span> +94 77 91 57
              910
            </p>
            <p>
              <span className="font-semibold">✉️ Email:</span>{" "}
              info@lionautoparts.lk
            </p>
            <p>
              <span className="font-semibold">🕒 Hours:</span> Mon–Sat: 9AM –
              6PM
            </p>
          </div>

          <div className="w-full h-64 rounded-xl overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?...your-location..."
              allowFullScreen=""
              loading="lazy"
              title="Lion Auto Parts Location"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-3xl font-bold text-orange-600 mb-6">
            Send Us a Message 💌
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-6 bg-white p-6 rounded-xl shadow-md"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            ></textarea>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
            >
              Send Message 🚀
            </button>
            {status && <p className="text-sm text-gray-600 mt-2">{status}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactComponent;
