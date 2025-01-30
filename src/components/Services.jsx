import { useState } from "react";
import emailjs from "@emailjs/browser";
import Section from "./Section";
import Heading from "./Heading";
import { service1 } from "../assets";
import { Gradient } from "./design/Services";
import Generating from "./Generating";

const Services = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;

    emailjs
      .send(serviceId, templateId, formData, publicKey)
      .then(() => {
        setMessage("Thank you! Your request has been sent.");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => {
        setMessage("Failed to send message. Please try again.");
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <Section id="how-to-use">
      <div className="container">
        <Heading
          title="Enhancing Library With Revolvo"
          text="Help us enhance our library by suggesting a book. We will add it for everyone."
        />

        <div className="flex flex-col lg:flex-row relative">
          <div className="flex-1 flex items-center justify-center h-[39rem] mb-5 p-8 border border-n-1/10 rounded-3xl overflow-hidden lg:p-20 xl:h-[46rem]">
            <div className="w-full max-w-md bg-gradient-to-r from-purple-900/90 to-purple-800/90 backdrop-blur-sm border border-purple-700 rounded-lg p-6 shadow-xl">
              <h3 className="text-center text-purple-100 text-xl font-medium mb-6">
                If you want to add a book, send us a message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-md bg-purple-800/20 border border-purple-700 focus:outline-none focus:border-purple-400 text-gray-200 placeholder-purple-300"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-md bg-purple-800/20 border border-purple-700 focus:outline-none focus:border-purple-400 text-gray-200 placeholder-purple-300"
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    placeholder="Your message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-md bg-purple-800/20 border border-purple-700 focus:outline-none focus:border-purple-400 text-gray-200 placeholder-purple-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-purple-700 hover:bg-purple-800 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Submit"}
                </button>

                {message && (
                  <p className={`mt-2 text-sm ${
                    message.includes("Failed") ? "text-red-300" : "text-green-300"
                  }`}>
                    {message}
                  </p>
                )}
              </form>
            </div>
          </div>

          <div className="flex-1 relative">
            <img 
              className="w-full h-full object-cover" 
              width={800} 
              height={730} 
              alt="Smartest AI" 
              src={service1} 
            />
            <Generating className="absolute left-4 right-4 bottom-4 border-n-1/10 border lg:left-1/2 lg:right-auto lg:bottom-8 lg:-translate-x-1/2" />
          </div>
        </div>
        <Gradient />
      </div>
    </Section>
  );
};

export default Services;