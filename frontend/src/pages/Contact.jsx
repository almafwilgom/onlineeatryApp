import { useState } from 'react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      
      <div className="text-center space-y-3">
        <h1 className="text-4xl sm:text-5xl font-black text-white">Contact Us</h1>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          Have questions about your order, bulk catering, or menu inquiries? Get in touch with us!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Contact Info Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Get In Touch</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our customer support team is available 7 days a week to assist you with your orders and inquiries.
            </p>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center text-lg">📍</span>
                <div>
                  <p className="font-bold text-white">Address</p>
                  <p className="text-slate-400">12 Marina Street, Victoria Island, Lagos, Nigeria</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-lg">📞</span>
                <div>
                  <p className="font-bold text-white">Phone</p>
                  <p className="text-slate-400">+234 801 234 5678 / +234 809 876 5432</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-lg">✉️</span>
                <div>
                  <p className="font-bold text-white">Email</p>
                  <p className="text-slate-400">support@onlineeatery.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400">
            ⏰ <strong>Support Hours:</strong> Mon – Sun, 8:00 AM – 10:00 PM
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-3xl">
                ✅
              </div>
              <h3 className="text-xl font-bold text-white">Message Sent!</h3>
              <p className="text-xs text-slate-400 max-w-xs">
                Thank you for reaching out. Our support team will get back to you within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-slate-800 text-white font-bold text-xs rounded-xl"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-bold text-white mb-4">Send a Message</h2>
              
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ada Okafor"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. ada@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Catering Inquiry"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/20 transition-all"
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
