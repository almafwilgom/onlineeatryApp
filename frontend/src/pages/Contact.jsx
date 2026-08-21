import { useState } from 'react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 bg-slate-100">
      
      <div className="text-center space-y-3">
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900">Contact Us</h1>
        <p className="text-slate-500 text-sm max-w-md mx-auto">
          Have questions about your order, bulk catering, or menu inquiries? Get in touch with us!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Contact Info Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-6 shadow-sm flex flex-col justify-between text-slate-700">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Get In Touch</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Our customer support team is available 7 days a week to assist you with your orders and inquiries.
            </p>

            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center text-lg">📍</span>
                <div>
                  <p className="font-bold text-slate-900">Address</p>
                  <p className="text-slate-500">12 Marina Street, Victoria Island, Lagos, Nigeria</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-lg">📞</span>
                <div>
                  <p className="font-bold text-slate-900">Phone</p>
                  <p className="text-slate-500">+234 801 234 5678 / +234 809 876 5432</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">✉️</span>
                <div>
                  <p className="font-bold text-slate-900">Email</p>
                  <p className="text-slate-500">support@onlineeatery.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 font-semibold">
            ⏰ <strong>Support Hours:</strong> Mon – Sun, 8:00 AM – 10:00 PM
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl">
                ✅
              </div>
              <h3 className="text-xl font-bold text-slate-900">Message Sent!</h3>
              <p className="text-xs text-slate-500 max-w-xs">
                Thank you for reaching out. Our support team will get back to you within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-slate-700">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Send a Message</h2>
              
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ada Okafor"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. ada@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Catering Inquiry"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/10 transition-all"
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
