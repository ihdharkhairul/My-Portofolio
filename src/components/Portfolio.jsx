import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderGit2, 
  Award, 
  Cpu, 
  ExternalLink, 
  Sparkles, 
  CheckCircle, 
  Eye, 
  Code2, 
  FileCode2, 
  Palette, 
  Layout, 
  Server, 
  Database, 
  Layers, 
  Globe, 
  GitBranch, 
  Zap, 
  Terminal, 
  Send, 
  PenTool, 
  Cloud,
  X,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { projectsData, certificatesData, techStackData } from '../data/portfolioData';

// Dynamic icon mapper for tech stack
const iconMap = {
  Code2: Code2,
  FileCode2: FileCode2,
  FileCode: FileCode2,
  Palette: Palette,
  Layout: Layout,
  Sparkles: Sparkles,
  Server: Server,
  Cpu: Cpu,
  Database: Database,
  Layers: Layers,
  Globe: Globe,
  GitBranch: GitBranch,
  Zap: Zap,
  Terminal: Terminal,
  Send: Send,
  PenTool: PenTool,
  Cloud: Cloud,
};

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('projects'); // 'projects', 'certificates', 'techstack'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const tabs = [
    { id: 'projects', label: 'Projects', icon: FolderGit2, count: projectsData.length },
    { id: 'certificates', label: 'Certificates', icon: Award, count: certificatesData.length },
    { id: 'techstack', label: 'Tech Stack', icon: Cpu, count: '17+' },
  ];

  // Category filter for projects
  const projectCategories = ['All', 'Fullstack / Web App', 'E-Commerce', 'Productivity', 'Fintech', 'Utility / Web App'];
  const filteredProjects = selectedCategory === 'All' 
    ? projectsData 
    : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="portfolio" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Cosmic Glow */}
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-[#2c67ed]/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2c67ed]/15 border border-[#2c67ed]/30 text-[#93c5fd] text-xs font-semibold mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span>Koleksi Karya & Keahlian</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight mb-4"
        >
          Galeri <span className="bg-gradient-to-r from-white via-[#93c5fd] to-[#2c67ed] bg-clip-text text-transparent">Portfolio</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-300 text-sm sm:text-base leading-relaxed"
        >
          Eksplorasi proyek-proyek inovatif yang telah saya selesaikan, lisensi sertifikasi resmi, serta persenjataan teknologi yang saya gunakan sehari-hari.
        </motion.p>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center justify-center mb-12">
        <div className="inline-flex p-1.5 rounded-full bg-[#070e22]/90 backdrop-blur-xl border border-[#2c67ed]/30 shadow-[0_0_25px_rgba(44,103,237,0.25)]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative flex items-center gap-2 sm:gap-2.5 px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300
                  ${isActive 
                    ? 'text-white' 
                    : 'text-slate-400 hover:text-white'
                  }
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePortfolioTab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2c67ed] to-[#1e40af] shadow-[0_0_20px_rgba(44,103,237,0.6)] -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-300' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-400'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB CONTENT: PROJECTS */}
      <AnimatePresence mode="wait">
        {activeTab === 'projects' && (
          <motion.div
            key="tab-projects"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {projectCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`
                    px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200
                    ${selectedCategory === cat
                      ? 'bg-[#2c67ed]/25 text-[#93c5fd] border border-[#2c67ed] shadow-[0_0_15px_rgba(44,103,237,0.4)]'
                      : 'bg-[#081026]/70 text-slate-400 border border-white/5 hover:border-white/20 hover:text-white'
                    }
                  `}
                >
                  {cat === 'All' ? 'Semua Proyek' : cat}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="group rounded-3xl overflow-hidden bg-[#070e22]/80 backdrop-blur-md border border-[#2c67ed]/20 hover:border-[#2c67ed]/60 shadow-[0_0_20px_rgba(44,103,237,0.08)] hover:shadow-[0_0_35px_rgba(44,103,237,0.3)] transition-all duration-300 flex flex-col"
                >
                  {/* Thumbnail Preview with hover overlay */}
                  <div className="relative aspect-video overflow-hidden bg-slate-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070e22] via-[#070e22]/40 to-transparent" />
                    
                    {/* Featured / Category Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#030712]/80 backdrop-blur-md text-[#93c5fd] border border-[#2c67ed]/40">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          ★ Featured
                        </span>
                      )}
                    </div>

                    {/* Quick Preview Icon Overlay */}
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#030712]/80 border border-[#2c67ed] text-cyan-300 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-[0_0_20px_rgba(44,103,237,0.7)] cursor-pointer"
                      aria-label="Preview Project"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Project Info */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-heading font-bold text-white mb-2 group-hover:text-[#93c5fd] transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-[#2c67ed]/10 text-blue-300 border border-[#2c67ed]/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Links & CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="text-xs font-semibold text-[#38bdf8] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>Detail Info</span>
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-2">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#2c67ed]/20 border border-white/10 hover:border-[#2c67ed] flex items-center justify-center text-slate-300 hover:text-white transition-all"
                          title="Lihat Kode di GitHub"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-[#2c67ed] hover:bg-[#1d4ed8] shadow-[0_0_15px_rgba(44,103,237,0.4)] transition-all hover:scale-105"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB CONTENT: CERTIFICATES */}
        {activeTab === 'certificates' && (
          <motion.div
            key="tab-certificates"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {certificatesData.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group rounded-3xl overflow-hidden bg-[#070e22]/80 backdrop-blur-md border border-[#2c67ed]/20 hover:border-[#2c67ed]/60 shadow-[0_0_20px_rgba(44,103,237,0.08)] hover:shadow-[0_0_35px_rgba(44,103,237,0.25)] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Certificate Image Banner */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070e22] via-[#070e22]/50 to-transparent" />
                    
                    {/* Issuer Tag */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#030712]/90 backdrop-blur-md text-[#93c5fd] border border-[#2c67ed]/40">
                        <Award className="w-3.5 h-3.5 text-amber-400" />
                        <span>{cert.issuer}</span>
                      </span>
                    </div>

                    {/* Verified badge */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-medium backdrop-blur-md">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Terverifikasi</span>
                    </div>
                  </div>

                  {/* Cert details */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                      <Calendar className="w-3.5 h-3.5 text-[#2c67ed]" />
                      <span>Diterbitkan: {cert.date}</span>
                    </div>

                    <h3 className="text-lg font-heading font-bold text-white mb-2 group-hover:text-[#93c5fd] transition-colors leading-snug">
                      {cert.title}
                    </h3>

                    <div className="text-[11px] font-mono text-slate-400 mb-4 bg-white/[0.03] p-2 rounded-lg border border-white/5">
                      ID: <span className="text-cyan-300">{cert.credentialId}</span>
                    </div>

                    {/* Skill tags */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#2c67ed]/15 text-[#93c5fd] border border-[#2c67ed]/25"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer action */}
                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setSelectedCertificate(cert)}
                    className="text-xs font-semibold text-[#38bdf8] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Lihat Preview</span>
                    <Eye className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-[#0f1d40] hover:bg-[#2c67ed] border border-[#2c67ed]/40 transition-all hover:scale-105"
                  >
                    <span>Validasi</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* TAB CONTENT: TECH STACK */}
        {activeTab === 'techstack' && (
          <motion.div
            key="tab-techstack"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="space-y-10"
          >
            {techStackData.map((categoryGroup) => (
              <div
                key={categoryGroup.category}
                className="p-6 sm:p-8 rounded-3xl bg-[#070e22]/80 backdrop-blur-md border border-[#2c67ed]/20 shadow-[0_0_25px_rgba(44,103,237,0.1)]"
              >
                <div className="mb-6">
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-white flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2c67ed] shadow-[0_0_10px_#2c67ed]" />
                    {categoryGroup.category}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    {categoryGroup.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {categoryGroup.skills.map((skill) => {
                    const IconComponent = iconMap[skill.icon] || Code2;
                    return (
                      <motion.div
                        key={skill.name}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="p-4 rounded-2xl bg-[#040816]/90 border border-white/5 hover:border-[#2c67ed]/50 hover:shadow-[0_0_20px_rgba(44,103,237,0.25)] transition-all flex flex-col items-center text-center group cursor-default"
                      >
                        <div className={`w-12 h-12 rounded-xl mb-3 flex items-center justify-center bg-gradient-to-tr ${skill.badgeColor} p-[1px] shadow-[0_0_15px_rgba(44,103,237,0.3)] group-hover:shadow-[0_0_25px_rgba(44,103,237,0.6)]`}>
                          <div className="w-full h-full bg-[#030712] rounded-[11px] flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                          </div>
                        </div>

                        <span className="text-white text-xs sm:text-sm font-semibold mb-1 group-hover:text-[#93c5fd] transition-colors">
                          {skill.name}
                        </span>

                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/5 text-slate-400 group-hover:bg-[#2c67ed]/20 group-hover:text-[#38bdf8] transition-colors">
                          {skill.level}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROJECT DETAILS MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl rounded-3xl bg-[#060c1d] border border-[#2c67ed]/50 shadow-[0_0_50px_rgba(44,103,237,0.4)] overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-[#2c67ed] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060c1d] via-transparent to-transparent" />
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#2c67ed]/20 text-[#93c5fd] border border-[#2c67ed]/30">
                    {selectedProject.category}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-3">
                  {selectedProject.title}
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  {selectedProject.description}
                </p>

                <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2">
                  Teknologi yang Digunakan
                </h4>
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 border border-[#2c67ed]/30 text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                  <a
                    href={selectedProject.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm text-white bg-[#2c67ed] hover:bg-[#1d4ed8] shadow-[0_0_20px_rgba(44,103,237,0.5)] transition-all"
                  >
                    <span>Kunjungi Live Demo</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm text-slate-200 bg-[#0c152e] hover:bg-[#162752] border border-[#2c67ed]/30 transition-all"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>Lihat Repository</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CERTIFICATE DETAILS MODAL */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-3xl bg-[#060c1d] border border-[#2c67ed]/50 shadow-[0_0_50px_rgba(44,103,237,0.4)] overflow-hidden max-h-[90vh] flex flex-col p-6 sm:p-8"
            >
              <button
                type="button"
                onClick={() => setSelectedCertificate(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-[#2c67ed] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-video w-full rounded-2xl overflow-hidden mb-6 border border-white/10">
                <img
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#2c67ed]/20 text-[#93c5fd] border border-[#2c67ed]/30">
                  {selectedCertificate.issuer}
                </span>
                <span className="text-xs text-slate-400">
                  • {selectedCertificate.date}
                </span>
              </div>

              <h3 className="text-2xl font-heading font-bold text-white mb-2">
                {selectedCertificate.title}
              </h3>

              <p className="text-xs font-mono text-cyan-300 mb-4">
                Credential ID: {selectedCertificate.credentialId}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {selectedCertificate.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg text-xs bg-white/5 border border-white/10 text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <a
                href={selectedCertificate.verifyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full font-semibold text-sm text-white bg-[#2c67ed] hover:bg-[#1d4ed8] shadow-[0_0_20px_rgba(44,103,237,0.5)] transition-all"
              >
                <span>Verifikasi di Halaman Resmi</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
