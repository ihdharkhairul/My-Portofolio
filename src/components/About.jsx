import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight,
  Flame,
  Layers
} from 'lucide-react';
import { personalData, statsData, educationData, experienceData } from '../data/portfolioData';

export default function About() {
  const [activeTimelineTab, setActiveTimelineTab] = useState('experience');

  return (
    <section 
      id="about" 
      className="relative py-20 sm:py-24 px-3 xs:px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#2c67ed]/10 rounded-full blur-[140px] pointer-events-none -z-10 max-w-[80vw]" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2c67ed]/15 border border-[#2c67ed]/30 text-[#93c5fd] text-[11px] xs:text-xs font-semibold mb-3 sm:mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
          <span>Eksplorasi Pribadi & Perjalanan</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight mb-3 sm:mb-4"
        >
          About <span className="bg-gradient-to-r from-white via-[#93c5fd] to-[#2c67ed] bg-clip-text text-transparent">Me</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-300 text-xs xs:text-sm sm:text-base leading-relaxed px-2"
        >
          Mengenal lebih dekat latar belakang akademis, rekam jejak pengalaman, dan dedikasi saya dalam dunia software engineering.
        </motion.p>
      </div>

      {/* Profile Bio & Stats Grid (1 Col Mobile, 2 Col Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start mb-16 sm:mb-20">
        {/* Profile Card & Avatar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 rounded-3xl p-5 xs:p-6 sm:p-8 bg-[#070e22]/85 backdrop-blur-xl border border-[#2c67ed]/30 shadow-[0_0_30px_rgba(44,103,237,0.15)] hover:border-[#2c67ed]/60 transition-all w-full"
        >
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            {/* Avatar with glowing orbital ring */}
            <div className="relative mb-5 sm:mb-6">
              <div className="w-32 h-32 xs:w-36 xs:h-36 sm:w-44 sm:h-44 rounded-2xl p-1 bg-gradient-to-tr from-[#2c67ed] via-cyan-400 to-[#1e40af] shadow-[0_0_25px_rgba(44,103,237,0.5)]">
                <img
                  src={personalData.avatarUrl}
                  alt={personalData.name}
                  className="w-full h-full object-cover rounded-[14px]"
                  loading="lazy"
                />
              </div>

              {/* Status floating badge */}
              <div className="absolute -bottom-2.5 -right-2 bg-[#02050e] border border-[#2c67ed] px-2.5 py-0.5 rounded-full shadow-[0_0_12px_rgba(44,103,237,0.6)] flex items-center gap-1.5">
                <Flame className="w-3 h-3 text-amber-400" />
                <span className="text-[10px] xs:text-[11px] font-semibold text-slate-100">Passionate</span>
              </div>
            </div>

            <h3 className="text-xl xs:text-2xl font-heading font-bold text-white mb-1">
              {personalData.name}
            </h3>
            <p className="text-[#38bdf8] text-xs xs:text-sm font-medium mb-2.5">
              {personalData.title}
            </p>

            <div className="flex items-center gap-1.5 text-slate-400 text-xs sm:text-sm mb-4">
              <MapPin className="w-3.5 h-3.5 text-[#2c67ed] shrink-0" />
              <span>{personalData.location}</span>
            </div>

            <p className="text-slate-300 text-xs xs:text-sm leading-relaxed mb-6">
              {personalData.bio}
            </p>

            {/* Action buttons inside Profile Card */}
            <div className="w-full flex flex-col xs:flex-row gap-2.5 sm:gap-3">
              <a
                href="#contact"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3.5 rounded-xl text-xs xs:text-sm font-semibold text-white bg-[#2c67ed] hover:bg-[#1d4ed8] shadow-[0_0_20px_rgba(44,103,237,0.4)] transition-all hover:scale-[1.02] active:scale-95"
              >
                <span>Ajak Kerjasama</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </a>

              <a
                href="#portfolio"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3.5 rounded-xl text-xs xs:text-sm font-semibold text-slate-200 bg-[#0c152e] hover:bg-[#12224d] border border-[#2c67ed]/30 hover:border-[#2c67ed]/70 transition-all active:scale-95"
              >
                <Layers className="w-4 h-4 text-[#38bdf8] shrink-0" />
                <span>Lihat Karya</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Project Statistics & Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 flex flex-col gap-5 sm:gap-6 w-full"
        >
          {/* Stats Cards Grid (Statistik Project) */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
            {statsData.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group p-3.5 xs:p-4 sm:p-5 lg:p-6 rounded-2xl bg-[#070e22]/75 backdrop-blur-md border border-[#2c67ed]/20 hover:border-[#2c67ed]/60 shadow-[0_0_20px_rgba(44,103,237,0.08)] hover:shadow-[0_0_30px_rgba(44,103,237,0.22)] transition-all flex flex-col justify-between"
              >
                <div className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-[#2c67ed] mb-1 group-hover:scale-105 transition-transform origin-left">
                  {stat.number}
                </div>
                <div>
                  <div className="text-white text-xs xs:text-sm sm:text-base font-semibold mb-0.5 leading-snug">
                    {stat.label}
                  </div>
                  <div className="text-slate-400 text-[10px] xs:text-xs leading-tight">
                    {stat.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Pillars highlight card */}
          <div className="rounded-2xl p-4 xs:p-5 sm:p-6 bg-gradient-to-r from-[#060c1d] to-[#0a1636] border border-[#2c67ed]/30 w-full">
            <h4 className="text-white font-heading font-semibold text-sm sm:text-base mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#38bdf8] shrink-0" />
              Fokus & Nilai Kerja
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-xs font-bold text-cyan-300 block mb-1">Clean & Modern Code</span>
                <span className="text-[11px] text-slate-300 leading-snug block">Struktur rapi, reusable components, dan mudah dipelihara.</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-xs font-bold text-blue-400 block mb-1">Responsive First</span>
                <span className="text-[11px] text-slate-300 leading-snug block">Tampilan mulus sempurna dari layar ponsel hingga monitor lebar.</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-xs font-bold text-indigo-300 block mb-1">Continuous Learning</span>
                <span className="text-[11px] text-slate-300 leading-snug block">Selalu mengadopsi tren teknologi dan best practices terbaru.</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Experience & Education Section */}
      <div className="mt-4 sm:mt-8 w-full">
        {/* Toggle Pills between Pengalaman & Riwayat Pendidikan */}
        <div className="flex items-center justify-center mb-8 sm:mb-10 w-full">
          <div className="w-full max-w-lg flex p-1 sm:p-1.5 rounded-2xl sm:rounded-full bg-[#070e22] border border-[#2c67ed]/30 shadow-[0_0_20px_rgba(44,103,237,0.2)]">
            <button
              type="button"
              onClick={() => setActiveTimelineTab('experience')}
              className={`
                flex-1 flex items-center justify-center gap-1.5 xs:gap-2 px-3 sm:px-6 py-2 rounded-xl sm:rounded-full text-xs xs:text-sm font-semibold transition-all duration-300 cursor-pointer
                ${activeTimelineTab === 'experience'
                  ? 'bg-gradient-to-r from-[#2c67ed] to-[#1e40af] text-white shadow-[0_0_20px_rgba(44,103,237,0.5)]'
                  : 'text-slate-400 hover:text-white'
                }
              `}
            >
              <Briefcase className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" />
              <span className="hidden xs:inline">Pengalaman Kerja & Organisasi</span>
              <span className="xs:hidden">Pengalaman</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTimelineTab('education')}
              className={`
                flex-1 flex items-center justify-center gap-1.5 xs:gap-2 px-3 sm:px-6 py-2 rounded-xl sm:rounded-full text-xs xs:text-sm font-semibold transition-all duration-300 cursor-pointer
                ${activeTimelineTab === 'education'
                  ? 'bg-gradient-to-r from-[#2c67ed] to-[#1e40af] text-white shadow-[0_0_20px_rgba(44,103,237,0.5)]'
                  : 'text-slate-400 hover:text-white'
                }
              `}
            >
              <GraduationCap className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" />
              <span className="hidden xs:inline">Riwayat Pendidikan</span>
              <span className="xs:hidden">Pendidikan</span>
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
              className="space-y-5 sm:space-y-6 max-w-4xl mx-auto w-full"
            >
              {experienceData.map((exp) => (
                <div
                  key={exp.id}
                  className="relative pl-5 xs:pl-6 sm:pl-8 border-l-2 border-[#2c67ed]/40 hover:border-[#2c67ed] transition-colors group w-full"
                >
                  {/* Glowing Node Dot */}
                  <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-[#050b1d] border-2 border-[#2c67ed] group-hover:bg-[#38bdf8] group-hover:shadow-[0_0_12px_#38bdf8] transition-all" />

                  <div className="p-4 xs:p-5 sm:p-6 rounded-2xl bg-[#081026]/75 backdrop-blur-md border border-[#2c67ed]/20 group-hover:border-[#2c67ed]/50 shadow-[0_0_25px_rgba(44,103,237,0.08)] group-hover:shadow-[0_0_30px_rgba(44,103,237,0.2)] transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 mb-2">
                      <div>
                        <h4 className="text-base xs:text-lg sm:text-xl font-heading font-bold text-white group-hover:text-[#93c5fd] transition-colors leading-snug">
                          {exp.role}
                        </h4>
                        <p className="text-[#38bdf8] text-xs xs:text-sm font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1 sm:mt-0">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-medium bg-[#2c67ed]/15 border border-[#2c67ed]/30 text-[#93c5fd]">
                          {exp.period}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {exp.type}
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-300 text-xs xs:text-sm leading-relaxed mb-3 sm:mb-4">
                      {exp.description}
                    </p>

                    <div className="space-y-1.5 sm:space-y-2">
                      {exp.highlights.map((item, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
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
              className="space-y-5 sm:space-y-6 max-w-4xl mx-auto w-full"
            >
              {educationData.map((edu) => (
                <div
                  key={edu.id}
                  className="relative pl-5 xs:pl-6 sm:pl-8 border-l-2 border-[#2c67ed]/40 hover:border-[#2c67ed] transition-colors group w-full"
                >
                  {/* Glowing Node Dot */}
                  <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-[#050b1d] border-2 border-[#2c67ed] group-hover:bg-cyan-400 group-hover:shadow-[0_0_12px_#38bdf8] transition-all" />

                  <div className="p-4 xs:p-5 sm:p-6 rounded-2xl bg-[#081026]/75 backdrop-blur-md border border-[#2c67ed]/20 group-hover:border-[#2c67ed]/50 shadow-[0_0_25px_rgba(44,103,237,0.08)] group-hover:shadow-[0_0_30px_rgba(44,103,237,0.2)] transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 mb-2">
                      <div>
                        <h4 className="text-base xs:text-lg sm:text-xl font-heading font-bold text-white group-hover:text-[#93c5fd] transition-colors leading-snug">
                          {edu.degree}
                        </h4>
                        <p className="text-[#38bdf8] text-xs xs:text-sm font-medium">
                          {edu.institution}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1 sm:mt-0">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-medium bg-[#2c67ed]/15 border border-[#2c67ed]/30 text-[#93c5fd]">
                          {edu.period}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          {edu.grade}
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-300 text-xs xs:text-sm leading-relaxed mb-3">
                      {edu.description}
                    </p>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 text-[10px] xs:text-[11px] font-mono text-slate-300">
                      <GraduationCap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
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
