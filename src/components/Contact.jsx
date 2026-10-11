import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check, 
  Clock, 
  Globe 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, DiscordIcon } from './Icons';
import confetti from 'canvas-confetti';
import { personalData, socialLinks } from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // Simulate sending message
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2c67ed', '#38bdf8', '#60a5fa', '#ffffff'],
        });
      } catch (err) {
        // ignore
      }

      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => {
        setSubmitted(false);
      }, 6000);
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient nebula glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-[#2c67ed]/15 rounded-full blur-[170px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2c67ed]/15 border border-[#2c67ed]/30 text-[#93c5fd] text-xs font-semibold mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span>Koneksi Transmisi</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight mb-4"
        >
          Hubungi <span className="bg-gradient-to-r from-white via-[#93c5fd] to-[#2c67ed] bg-clip-text text-transparent">Saya</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-300 text-sm sm:text-base leading-relaxed"
        >
          Punya tawaran proyek, peluang magang, atau sekadar ingin menyapa dan berdiskusi teknologi? 
          Kirimkan pesan transmisi Anda sekarang!
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info & Socials (5 Cols) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 space-y-6"
        >
          {/* Direct Communication Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#070e22]/85 backdrop-blur-xl border border-[#2c67ed]/30 shadow-[0_0_30px_rgba(44,103,237,0.15)]">
            <h3 className="text-xl font-heading font-bold text-white mb-2">
              Mari Terhubung & Berkolaborasi
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Saya selalu bersemangat menyambut tantangan baru dan berkolaborasi dalam proyek web inovatif.
            </p>

            <div className="space-y-4">
              {/* Email item with copy button */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#2c67ed]/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#2c67ed]/20 border border-[#2c67ed]/40 flex items-center justify-center text-[#38bdf8]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Email Resmi</span>
                    <span className="text-xs sm:text-sm font-semibold text-white">{personalData.email}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-white/5 hover:bg-[#2c67ed]/30 text-slate-300 hover:text-white transition-all cursor-pointer"
                  title="Salin Email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location item */}
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-[#2c67ed]/20 border border-[#2c67ed]/40 flex items-center justify-center text-[#38bdf8]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Lokasi Domisili</span>
                  <span className="text-xs sm:text-sm font-semibold text-white">{personalData.location}</span>
                </div>
              </div>

              {/* Response Time pill */}
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Waktu Respon</span>
                  <span className="text-xs sm:text-sm font-semibold text-white">Rata-rata balasan &lt; 24 jam</span>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Jejaring Sosial Media
              </h4>
              <div className="grid grid-cols-2 gap-2.5">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.03] hover:bg-[#2c67ed]/20 border border-white/5 hover:border-[#2c67ed]/50 transition-all text-xs font-semibold text-slate-200 hover:text-white group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-black/40 flex items-center justify-center text-slate-300 group-hover:text-cyan-300 transition-colors">
                      {item.icon === 'Github' && <GithubIcon className="w-4 h-4" />}
                      {item.icon === 'Linkedin' && <LinkedinIcon className="w-4 h-4" />}
                      {item.icon === 'Instagram' && <InstagramIcon className="w-4 h-4" />}
                      {item.icon === 'Mail' && <Mail className="w-4 h-4" />}
                      {item.icon === 'MessageSquare' && <DiscordIcon className="w-4 h-4" />}
                    </div>
                    <span>{item.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form (7 Cols) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <div className="p-6 sm:p-10 rounded-3xl bg-[#070e22]/85 backdrop-blur-xl border border-[#2c67ed]/30 shadow-[0_0_35px_rgba(44,103,237,0.18)]">
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-2 flex items-center gap-2">
              <Send className="w-5 h-5 text-[#38bdf8]" />
              Formulir Pesan Cepat
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mb-6">
              Silakan isi formulir di bawah ini, saya akan segera membalas ke email Anda.
            </p>

            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 flex items-center gap-3 text-sm"
                >
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                  <div>
                    <span className="font-semibold block">Pesan Berhasil Terkirim!</span>
                    <span className="text-xs text-emerald-200/80">Terima kasih atas pesan Anda. Saya akan segera merespon sesegera mungkin.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name field */}
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Nama Lengkap <span className="text-[#38bdf8]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full px-4 py-3 rounded-xl bg-[#040816]/90 border border-white/10 focus:border-[#2c67ed] focus:ring-1 focus:ring-[#2c67ed] text-white text-sm placeholder:text-slate-500 outline-none transition-all"
                  />
                </div>

                {/* Email field */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Alamat Email <span className="text-[#38bdf8]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nama@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#040816]/90 border border-white/10 focus:border-[#2c67ed] focus:ring-1 focus:ring-[#2c67ed] text-white text-sm placeholder:text-slate-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Subject field */}
              <div>
                <label htmlFor="subject" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Subjek Pesan
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Peluang Proyek / Tawaran Kerja / Tanya-tanya"
                  className="w-full px-4 py-3 rounded-xl bg-[#040816]/90 border border-white/10 focus:border-[#2c67ed] focus:ring-1 focus:ring-[#2c67ed] text-white text-sm placeholder:text-slate-500 outline-none transition-all"
                />
              </div>

              {/* Message field */}
              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Isi Pesan <span className="text-[#38bdf8]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tuliskan detail pesan, rencana proyek, atau kebutuhan yang ingin didiskusikan..."
                  className="w-full px-4 py-3 rounded-xl bg-[#040816]/90 border border-white/10 focus:border-[#2c67ed] focus:ring-1 focus:ring-[#2c67ed] text-white text-sm placeholder:text-slate-500 outline-none transition-all resize-none"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#2c67ed] to-[#1e40af] hover:from-[#3b82f6] hover:to-[#2563eb] shadow-[0_0_25px_rgba(44,103,237,0.5)] hover:shadow-[0_0_35px_rgba(44,103,237,0.8)] transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-98 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Mentransmisikan Pesan...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-cyan-200 group-hover:translate-x-1 transition-transform" />
                    <span>Kirim Pesan Transmisi</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
