import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, User, Send, CheckCircle2, ArrowUpRight } from 'lucide-react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 pb-12">
      
      {/* ── 1. Contact Hero Section (Matching Image 2) ────────────────── */}
      <section className="relative bg-gradient-to-b from-[#FFF7ED] via-[#FFF7ED]/40 to-white pt-10 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-4 text-left">
              <span className="text-xs font-black text-orange-600 uppercase tracking-widest block">
                CONTACT US
              </span>
              <h1 className="font-display text-4xl sm:text-6xl font-black text-stone-900 leading-tight tracking-tight">
                We'd love to hear <br />
                from <span className="text-orange-500 underline decoration-orange-300 decoration-wavy">you!</span>
              </h1>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-lg">
                Have a question, suggestion or need support? Reach out to us and we'll get back to you as soon as possible.
              </p>
            </div>

            {/* Right Food Feast Hero Image (Matching Image 2) */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-200 aspect-4/3 bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
                alt="Choply Food Feast"
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* ── 2. Top 4 Contact Info Cards (Matching Image 2) ─────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 border border-orange-200 flex items-center justify-center text-xl flex-shrink-0">
              <Phone className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="font-display text-xs font-bold text-stone-900">Phone</h3>
              <p className="text-[11px] text-stone-600 font-semibold mt-0.5">0801 234 5678</p>
              <p className="text-[11px] text-stone-500">0909 876 5432</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 border border-orange-200 flex items-center justify-center text-xl flex-shrink-0">
              <Mail className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="font-display text-xs font-bold text-stone-900">Email</h3>
              <p className="text-[11px] text-stone-600 font-semibold mt-0.5">hello@choply.com</p>
              <p className="text-[11px] text-stone-500">support@choply.com</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 border border-orange-200 flex items-center justify-center text-xl flex-shrink-0">
              <MapPin className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="font-display text-xs font-bold text-stone-900">Location</h3>
              <p className="text-[11px] text-stone-600 font-semibold mt-0.5">12 Adekunle Street, Surulere, Lagos, Nigeria.</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 border border-orange-200 flex items-center justify-center text-xl flex-shrink-0">
              <Clock className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="font-display text-xs font-bold text-stone-900">Opening Hours</h3>
              <p className="text-[11px] text-stone-600 font-semibold mt-0.5">Mon – Sun: 8:00 AM – 10:00 PM</p>
              <p className="text-[10px] text-orange-600 font-bold">We're open every day!</p>
            </div>
          </div>

        </div>

        {/* ── 3. Main Two-Column Grid (Matching Image 2) ────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Send us a Message Card */}
          <div className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm text-left space-y-6">
            <h2 className="font-display text-xl font-bold text-stone-900">Send us a message</h2>

            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-lg font-bold text-stone-900">Message Sent!</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Thank you for contacting Choply. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-stone-100 text-stone-700 font-bold text-xs rounded-xl hover:bg-stone-200"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Full Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-orange-500"
                      />
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Email Address</label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-orange-500"
                      />
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-orange-500"
                    />
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs font-semibold focus:outline-none focus:border-orange-500 cursor-pointer"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Order Support">Order Support</option>
                    <option value="Catering Inquiry">Catering Inquiry</option>
                    <option value="Feedback">Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Your Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>

                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>We'll get back to you within 24 hours</span>
                  </div>
                </div>

              </form>
            )}
          </div>

          {/* Right Column: Find Us Here Map Card */}
          <div className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm text-left space-y-6">
            <h2 className="font-display text-xl font-bold text-stone-900">Find us here</h2>

            {/* Map Visualizer */}
            <div className="relative h-72 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-inner flex flex-col justify-end p-4">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80"
                alt="Choply Location Map"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              
              {/* Map pin marker overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-2xl animate-bounce">
                <MapPin className="w-6 h-6 stroke-[3]" />
              </div>

              {/* Bottom Card Overlay (Matching Image 2) */}
              <div className="relative bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-stone-200 shadow-lg flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-display text-xs font-bold text-stone-900">Choply Restaurant & Kitchen</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">12 Adekunle Street, Surulere, Lagos, Nigeria.</p>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-xl bg-orange-50 text-orange-600 hover:bg-orange-100 border border-orange-200 text-[11px] font-extrabold flex items-center gap-1 flex-shrink-0 transition-colors"
                >
                  <span>Get Directions</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Contact;
