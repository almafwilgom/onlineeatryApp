import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="text-center space-y-3">
        <h1 className="font-display text-3xl sm:text-5xl font-black text-stone-900">Contact Us</h1>
        <p className="text-stone-500 text-xs sm:text-sm max-w-md mx-auto">
          Have questions about your order, catering, or menu inquiries? Get in touch with Choply support!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Contact Info Card */}
        <div className="bg-white border border-stone-200 rounded-3xl p-8 space-y-6 shadow-sm flex flex-col justify-between text-stone-700">
          <div className="space-y-6">
            <h2 className="font-display text-xl font-bold text-stone-900">Get In Touch</h2>
            <p className="text-xs text-stone-500 leading-relaxed">
              Our customer support team is available 7 days a week to assist you with your orders and inquiries.
            </p>

            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 border border-orange-200 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-stone-900">Address</p>
                  <p className="text-stone-500">12 Allen Avenue, Surulere, Lagos, Nigeria</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-stone-900">Phone</p>
                  <p className="text-stone-500">+234 801 234 5678 / +234 809 876 5432</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-stone-900">Email</p>
                  <p className="text-stone-500">support@choply.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-600 flex items-center gap-2">
            <Clock className="w-4 h-4 text-stone-400" />
            <span><strong>Support Hours:</strong> Mon – Sun, 8:00 AM – 10:00 PM</span>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl font-bold text-stone-900">Message Sent!</h3>
              <p className="text-xs text-stone-500 max-w-xs">
                Thank you for reaching out to Choply. Our team will respond within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl transition-all"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs text-stone-700">
              <h2 className="font-display text-xl font-bold text-stone-900 mb-2">Send a Message</h2>
              
              <div>
                <label className="block font-bold text-stone-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bulk Catering Inquiry"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-500/20 transition-all"
              >
                Send Message ➔
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};

export default Contact;
