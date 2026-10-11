import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  Briefcase, 
  Award, 
  Code, 
  Calendar, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight,
  Download,
  Flame,
  Layers
} from 'lucide-react';
import { personalData, statsData, educationData, experienceData } from '../data/portfolioData';

export default function About() {
  const [activeTimelineTab, setActiveTimelineTab] = useState('experience'); // 'experience' or 'education'

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#2c67ed]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

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
          <span>Eksplorasi Pribadi & Perjalanan</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight mb-4"
        >
          About <span className="bg-gradient-to-r from-white via-[#93c5fd] to-[#2c67ed] bg-clip-text text-transparent">Me</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-300 text-sm sm:text-base leading-relaxed"
        >
          Mengenal lebih dekat latar belakang akademis, rekam jejak pengalaman, dan dedikasi saya dalam dunia software engineering.
        </motion.p>
      </div>

      {/* Profile Bio & Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
        {/* Profile Card & Avatar */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 rounded-3xl p-6 sm:p-8 bg-[#070e22]/80 backdrop-blur-xl border border-[#2c67ed]/30 shadow-[0_0_30px_rgba(44,103,237,0.15)] hover:border-[#2c67ed]/60 transition-all"
        >
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            {/* Avatar with glowing orbital ring */}
            <div className="relative mb-6">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl p-1 bg-gradient-to-tr from-[#2c67ed] via-cyan-400 to-[#1e40af] shadow-[0_0_30px_rgba(44,103,237,0.5)]">
                <img
                  src={personalData.avatarUrl}
                  alt={personalData.name}
                  className="w-full h-full object-cover rounded-[14px]"
                />
              </div>

              {/* Status floating badge */}
              <div className="absolute -bottom-3 -right-2 bg-[#02050e] border border-[#2c67ed] px-3 py-1 rounded-full shadow-[0_0_15px_rgba(44,103,237,0.6)] flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] font-semibold text-slate-100">Passionate</span>
              </div>
            </div>

            <h3 className="text-2xl font-heading font-bold text-white mb-1">
              {personalData.name}
            </h3>
            <p className="text-[#38bdf8] text-sm font-medium mb-3">
              {personalData.title}
            </p>

            <div className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm mb-5">
              <MapPin className="w-4 h-4 text-[#2c67ed]" />
              <span>{personalData.location}</span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {personalData.bio}
            </p>

            {/* Action buttons inside Profile Card */}
            <div className="w-full flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#2c67ed] hover:bg-[#1d4ed8] shadow-[0_0_20px_rgba(44,103,237,0.4)] transition-all hover:scale-[1.02] active:scale-95"
              >
                <span>Ajak Kerjasama</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#portfolio"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 bg-[#0c152e] hover:bg-[#12224d] border border-[#2c67ed]/30 hover:border-[#2c67ed]/70 transition-all"
              >
                <Layers className="w-4 h-4 text-[#38bdf8]" />
                <span>Lihat Karya</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Project Statistics & Highlights */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          {/* Stats Cards Grid (Statistik Project) */}
          <div className="grid grid-cols-2 gap-4">
            {statsData.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group p-5 sm:p-6 rounded-2xl bg-[#070e22]/70 backdrop-blur-md border border-[#2c67ed]/20 hover:border-[#2c67ed]/60 shadow-[0_0_20px_rgba(44,103,237,0.1)] hover:shadow-[0_0_30px_rgba(44,103,237,0.25)] transition-all"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-[#2c67ed] mb-1.5 group-hover:scale-105 transition-transform origin-left">
                  {stat.number}
                </div>
                <div className="text-white text-sm sm:text-base font-semibold mb-1">
                  {stat.label}
                </div>
                <div className="text-slate-400 text-xs">
                  {stat.desc}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Pillars highlight card */}
          <div className="rounded-2xl p-6 bg-gradient-to-r from-[#060c1d] to-[#0a1636] border border-[#2c67ed]/30">
            <h4 className="text-white font-heading font-semibold text-base mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#38bdf8]" />
              Fokus & Nilai Kerja
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-xs font-bold text-cyan-300 block mb-1">Clean & Modern Code</span>
                <span className="text-[11px] text-slate-300">Struktur rapi, reusable components, dan mudah dipelihara.</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-xs font-bold text-blue-400 block mb-1">Responsive First</span>
                <span className="text-[11px] text-slate-300">Tampilan mulus sempurna dari layar ponsel hingga monitor 4K.</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-xs font-bold text-indigo-300 block mb-1">Continuous Learning</span>
                <span className="text-[11px] text-slate-300">Selalu mengadopsi tren teknologi dan best practices terbaru.</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Experience & Education Section */}
      <div className="mt-8">
        {/* Toggle Pills between Pengalaman & Riwayat Pendidikan */}
        <div className="flex items-center justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-full bg-[#070e22] border border-[#2c67ed]/30 shadow-[0_0_20px_rgba(44,103,237,0.2)]">
            <button
              type="button"
              onClick={() => setActiveTimelineTab('experience')}
              className={`
                flex items-center gap-2 px-5 sm:px-7 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300
                ${activeTimelineTab === 'experience'
                  ? 'bg-gradient-to-r from-[#2c67ed] to-[#1e40af] text-white shadow-[0_0_20px_rgba(44,103,237,0.5)]'
                  : 'text-slate-400 hover:text-white'
                }
              `}
            >
              <Briefcase className="w-4 h-4" />
              <span>Pengalaman Kerja & Organisasi</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTimelineTab('education')}
              className={`
                flex items-center gap-2 px-5 sm:px-7 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300
                ${activeTimelineTab === 'education'
                  ? 'bg-gradient-to-r from-[#2c67ed] to-[#1e40af] text-white shadow-[0_0_20px_rgba(44,103,237,0.5)]'
                  : 'text-slate-400 hover:text-white'
                }
              `}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Riwayat Pendidikan</span>
            </button>
          </div>
        </div>

        {/* Timeline Content Display */}
        <AnimatePresence mode="wait">
          {activeTimelineTab === 'experience' ? (
            <motion.div
              key="experience-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 max-w-4xl mx-auto"
            >
              {experienceData.map((exp, index) => (
                <div
                  key={exp.id}
                  className="relative pl-6 sm:pl-8 border-l-2 border-[#2c67ed]/40 hover:border-[#2c67ed] transition-colors group"
                >
                  {/* Glowing Node Dot */}
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#050b1d] border-2 border-[#2c67ed] group-hover:bg-[#38bdf8] group-hover:shadow-[0_0_12px_#38bdf8] transition-all" />

                  <div className="p-5 sm:p-6 rounded-2xl bg-[#081026]/75 backdrop-blur-md border border-[#2c67ed]/20 group-hover:border-[#2c67ed]/50 shadow-[0_0_25px_rgba(44,103,237,0.08)] group-hover:shadow-[0_0_30px_rgba(44,103,237,0.2)] transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div>
                        <h4 className="text-lg sm:text-xl font-heading font-bold text-white group-hover:text-[#93c5fd] transition-colors">
                          {exp.role}
                        </h4>
                        <p className="text-[#38bdf8] text-sm font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#2c67ed]/15 border border-[#2c67ed]/30 text-[#93c5fd]">
                          {exp.period}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {exp.type}
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    <div className="space-y-2">
                      {exp.highlights.map((item, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="education-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 max-w-4xl mx-auto"
            >
              {educationData.map((edu, index) => (
                <div
                  key={edu.id}
                  className="relative pl-6 sm:pl-8 border-l-2 border-[#2c67ed]/40 hover:border-[#2c67ed] transition-colors group"
                >
                  {/* Glowing Node Dot */}
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#050b1d] border-2 border-[#2c67ed] group-hover:bg-cyan-400 group-hover:shadow-[0_0_12px_#38bdf8] transition-all" />

                  <div className="p-5 sm:p-6 rounded-2xl bg-[#081026]/75 backdrop-blur-md border border-[#2c67ed]/20 group-hover:border-[#2c67ed]/50 shadow-[0_0_25px_rgba(44,103,237,0.08)] group-hover:shadow-[0_0_30px_rgba(44,103,237,0.2)] transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div>
                        <h4 className="text-lg sm:text-xl font-heading font-bold text-white group-hover:text-[#93c5fd] transition-colors">
                          {edu.degree}
                        </h4>
                        <p className="text-[#38bdf8] text-sm font-medium">
                          {edu.institution}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#2c67ed]/15 border border-[#2c67ed]/30 text-[#93c5fd]">
                          {edu.period}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          {edu.grade}
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-3">
                      {edu.description}
                    </p>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 text-[11px] font-mono text-slate-300">
                      <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{edu.badge}</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
