import dashboard_i0 from "../assets/dashboard_i0.png";
import dashboard_i1 from "../assets/dashboard_i1.png";
import dashboard_i2 from "../assets/dashboard_i2.png";
import dashboard_i3 from "../assets/dashboard_i3.png";
import dashboard_i4 from "../assets/dashboard_i4.png";
import dashboard_i5 from "../assets/dashboard_i5.png";
import dashboard_i6 from "../assets/dashboard_i6.png";

import React, { useEffect, useState, useContext, useRef } from "react";
import { fetchCareerNews } from "../Services/newsService";

import SectionHeader from "../components/cards/Dashboard/SectionHeader";
import CareerMatchCard from "../components/cards/Dashboard/CareerMatchCard";
import CourseCard from "../components/cards/Dashboard/CourseCard";
import MentorSessionCard from "../components/cards/Dashboard/MentorSessionCard";
import CareerNewsCard from "../components/cards/Dashboard/CareerNewsCard";
import { ThemeContext } from "../context/ThemeContext";

import { useNavigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";
import { useAuth } from "../contexts/AuthContext";
import SearchBar from "../components/SearchBar";

export default function CareerGuidanceDashboard() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const isActive = (path) => location.pathname === path; // helper to detect active link
  const [careerNews, setCareerNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const notificationRef = useRef(null);

  // Get user data from localStorage
  const [user, setUser] = useState(null);

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      icon: "chat",
      iconColor: "#8b5cf6",
      iconBg: "rgba(139, 92, 246, 0.2)",
      title: "Mentor Sarah Williams sent a message",
      description: '"Hi Alex, I\'ve reviewed your latest UX portfolio pieces..."',
      time: "2 mins ago",
      isNew: true
    },
    {
      id: 2,
      icon: "work",
      iconColor: "#3b82f6",
      iconBg: "rgba(59, 130, 246, 0.2)",
      title: "New Career Match: Product Manager",
      description: "Based on your recent assessment, this role fits your profile.",
      time: "1 hour ago",
      isNew: true
    },
    {
      id: 3,
      icon: "fact_check",
      iconColor: "#10b981",
      iconBg: "rgba(16, 185, 129, 0.2)",
      title: "Your assessment result is ready",
      description: "Advanced Logic and Reasoning results have been posted.",
      time: "3 hours ago",
      isNew: true
    }
  ];

  // Close notification dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showNotifications]);

  useEffect(() => {
    const userData = getCurrentUser();
    setUser(userData);
  }, []);

  useEffect(() => {
    fetchCareerNews()
      .then((data) => {
        const articles = Array.isArray(data?.articles) ? data.articles : [];
        setCareerNews(articles.slice(0, 3));
        setNewsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setCareerNews([
          { title: "Career tips and news", description: "Check back soon for the latest career and placement updates.", url: "#", urlToImage: null },
        ]);
        setNewsLoading(false);
      });
  }, []);

  // Logout function
  const handleLogout = () => {
    auth.logout();
    navigate("/login");
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? "bg-background-dark text-white" : "bg-surface-light text-charcoal"} font-display overflow-hidden transition-colors duration-300`}>
      {/* Sidebar */}
      <aside className={`w-64 flex-shrink-0 border-r hidden lg:flex flex-col ${isDarkMode ? "border-[#2d264a] bg-[#140f26]" : "border-border-light bg-sidebar-light"}`}>
        <div className="p-6 flex flex-col h-full justify-between">
          <div className="flex flex-col gap-8">
            {/* Logo */}
            <div className={`flex items-center gap-3 ${isDarkMode ? "text-[#8b5cf6]" : "text-primary"}`}>
              <div className={`size-9 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-500/30 ${isDarkMode ? "bg-[#8b5cf6]" : "bg-primary"}`}>
                <span className="material-symbols-outlined">rocket_launch</span>
              </div>
              <h2 className={`text-xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-charcoal"}`}>
                CareerPath
              </h2>
            </div>

            {/* Profile Card */}
            <div
              className={`flex gap-3 items-center p-2 rounded-xl cursor-pointer border ${isDarkMode ? "bg-[#1a142e]/50 border-[#2d264a]/50" : "bg-white border-border-light"}`}
              onClick={() => navigate("/profile")}
            >
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-10"
                style={{
                  backgroundImage: `url(${dashboard_i0})`
                }}

              ></div>
              <div className="flex flex-col overflow-hidden">
                <h1 className={`text-sm font-semibold truncate ${isDarkMode ? "text-white" : "text-charcoal"}`}>
                  {user?.name || "User"}
                </h1>
                <p className={`text-xs font-normal ${isDarkMode ? "text-[#a094b8]" : "text-slate-500"}`}>
                  {user?.email || "Career Explorer"}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-1.5">
              <button
                onClick={() => navigate('/dashboard')}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-r-lg group transition-all ${isActive('/dashboard')
                  ? isDarkMode
                    ? 'bg-gradient-to-r from-[#8b5cf6]/15 to-[#8b5cf6]/5 border-l-3 border-[#8b5cf6] text-white'
                    : 'bg-white text-primary border-l-3 border-primary'
                  : isDarkMode
                    ? 'text-[#a094b8] hover:text-white hover:bg-white/5'
                    : 'text-gray-600 hover:text-primary hover:bg-slate-100'}`}
              >
                <span className={`material-symbols-outlined ${isDarkMode ? "text-[#8b5cf6]" : "text-primary"}`}>dashboard</span>
                <p className="text-sm font-medium">Dashboard</p>
              </button>

              <button
                onClick={() => navigate('/career-paths')}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg group transition-all ${isActive('/career-paths')
                  ? isDarkMode
                    ? 'bg-white/5 text-white'
                    : 'bg-slate-100 text-charcoal'
                  : isDarkMode
                    ? 'text-[#a094b8] hover:text-white hover:bg-white/5'
                    : 'text-gray-600 hover:text-charcoal hover:bg-slate-100'}`}
              >
                <span className="material-symbols-outlined">explore</span>
                <p className="text-sm font-medium">Career Paths</p>
              </button>

              <button
                onClick={() => navigate('/assessments')}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg group transition-all ${isActive('/assessments')
                  ? isDarkMode
                    ? 'bg-white/5 text-white'
                    : 'bg-slate-100 text-charcoal'
                  : isDarkMode
                    ? 'text-[#a094b8] hover:text-white hover:bg-white/5'
                    : 'text-gray-600 hover:text-charcoal hover:bg-slate-100'}`}
              >
                <span className="material-symbols-outlined">quiz</span>
                <p className="text-sm font-medium">Assessments</p>
              </button>

              <button
                onClick={() => navigate('/mentors')}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg group transition-all ${isActive('/mentors')
                  ? isDarkMode
                    ? 'bg-white/5 text-white'
                    : 'bg-slate-100 text-charcoal'
                  : isDarkMode
                    ? 'text-[#a094b8] hover:text-white hover:bg-white/5'
                    : 'text-gray-600 hover:text-charcoal hover:bg-slate-100'}`}
              >
                <span className="material-symbols-outlined">groups</span>
                <p className="text-sm font-medium">Mentors</p>
              </button>

              <button
                onClick={() => navigate('/settings')}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg group transition-all ${isActive('/settings')
                  ? isDarkMode
                    ? 'bg-white/5 text-white'
                    : 'bg-slate-100 text-charcoal'
                  : isDarkMode
                    ? 'text-[#a094b8] hover:text-white hover:bg-white/5'
                    : 'text-gray-600 hover:text-charcoal hover:bg-slate-100'}`}
              >
                <span className="material-symbols-outlined">settings</span>
                <p className="text-sm font-medium">Settings</p>
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg group transition-all text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                <span className="material-symbols-outlined">logout</span>
                <p className="text-sm font-medium">Logout</p>
              </button>
            </nav>
          </div>

          {/* Premium Card */}
          <div className={`${isDarkMode ? "bg-gradient-to-br from-[#8b5cf6]/20 to-transparent border-[#8b5cf6]/30" : "bg-gradient-to-br from-primary/10 to-transparent border-primary/20"} p-4 rounded-xl border relative overflow-hidden group`}>
            <div className={`absolute -right-4 -top-4 size-16 rounded-full blur-2xl transition-all ${isDarkMode ? "bg-[#8b5cf6]/10 group-hover:bg-[#8b5cf6]/20" : "bg-primary/10 group-hover:bg-primary/20"}`}></div>
            <p className={`text-xs font-bold mb-2 relative z-10 ${isDarkMode ? "text-white" : "text-charcoal"}`}>
              Unlock Premium
            </p>
            <p className={`text-[10px] mb-4 leading-relaxed relative z-10 ${isDarkMode ? "text-[#a094b8]" : "text-slate-600"}`}>
              Get unlimited mentor sessions and advanced skill tracking.
            </p>
            <button className={`w-full py-2 text-white text-xs font-bold rounded-lg transition-all shadow-lg ${isDarkMode ? "bg-[#8b5cf6] hover:bg-[#8b5cf6]/90 shadow-[#8b5cf6]/20" : "bg-primary hover:bg-primary/90 shadow-primary/20"}`}>
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto custom-scrollbar">
        {/* Header */}
        <header className={`sticky top-0 z-30 flex items-center gap-4 border-b backdrop-blur-xl px-4 sm:px-6 md:px-8 py-4 transition-colors duration-300 ${isDarkMode ? "bg-background-dark/80 border-[#2d264a]" : "bg-surface-light/80 border-border-light"}`}>
          <div className="flex items-center gap-6 flex-1">
            <SearchBar />
          </div>
          <div className="flex items-center gap-5">
            <div className="flex gap-3">
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative flex items-center justify-center size-10 rounded-xl bg-[#8b5cf6]/20 border border-[#8b5cf6]/50 text-white transition-all shadow-lg shadow-[#8b5cf6]/20"
                >
                  <span className="material-symbols-outlined text-[22px]">
                    notifications
                  </span>
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#8b5cf6] rounded-full border border-[#0f0a1e]"></span>
                </button>

                {/* Notification Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-3 w-80 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200 bg-[#1a142e]/95 backdrop-blur-xl border border-[#8b5cf6]/20">
                    <div className="p-4 border-b border-white/5 flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white">Notifications</h3>
                      <span className="text-[10px] font-bold text-[#8b5cf6] px-2 py-0.5 bg-[#8b5cf6]/10 rounded-full uppercase">
                        {notifications.filter(n => n.isNew).length} New
                      </span>
                    </div>

                    <div className="max-h-[380px] overflow-y-auto custom-scrollbar">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="p-4 hover:bg-white/5 border-b border-white/5 transition-colors cursor-pointer group"
                        >
                          <div className="flex gap-3">
                            <div
                              className="size-9 flex-shrink-0 rounded-lg flex items-center justify-center"
                              style={{
                                backgroundColor: notification.iconBg,
                                color: notification.iconColor
                              }}
                            >
                              <span className="material-symbols-outlined text-lg">
                                {notification.icon}
                              </span>
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="text-xs font-semibold text-white group-hover:text-[#8b5cf6] transition-colors">
                                  {notification.title}
                                </p>
                                {notification.isNew && (
                                  <div className="size-2 bg-[#8b5cf6] rounded-full"></div>
                                )}
                              </div>
                              <p className="text-[11px] text-[#a094b8] leading-tight">
                                {notification.description}
                              </p>
                              <p className="text-[10px] text-white/40 pt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      className="w-full p-3.5 text-center text-xs font-bold text-[#8b5cf6] hover:bg-[#8b5cf6]/10 transition-colors"
                      onClick={() => setShowNotifications(false)}
                    >
                      View All Notifications
                    </button>
                  </div>
                )}
              </div>

              <button className={`flex items-center justify-center size-10 rounded-xl border transition-all ${isDarkMode ? "bg-[#1a142e] border-[#2d264a] text-[#a094b8] hover:text-white hover:bg-white/5" : "bg-white border-border-light text-slate-500 hover:text-charcoal hover:bg-slate-50"}`}>
                <span className="material-symbols-outlined text-[22px]">
                  chat_bubble
                </span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`flex items-center justify-center size-10 rounded-xl border transition-all ${isDarkMode ? "bg-[#1a142e] border-[#2d264a] text-[#a094b8] hover:text-white hover:bg-white/5" : "bg-white border-border-light text-slate-500 hover:text-charcoal hover:bg-slate-50"}`}
              >
                <span className="material-symbols-outlined text-[22px]">
                  {isDarkMode ? "light_mode" : "dark_mode"}
                </span>
              </button>
            </div>
            <div className={`h-6 w-px ${isDarkMode ? "bg-[#2d264a]" : "bg-border-light"}`}></div>
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/profile')}>
              <div
                className={`bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 transition-all ${isDarkMode ? "border-[#8b5cf6]/30 group-hover:border-[#8b5cf6]" : "border-primary/30 group-hover:border-primary"}`}
                style={{
                  backgroundImage: `url(${dashboard_i1})`
                }}

              ></div>
            </div>
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={() => setMenuOpen(true)}
                className={`p-2 rounded-lg transition-colors ${isDarkMode ? "text-white hover:bg-white/10" : "text-charcoal hover:bg-slate-100"}`}
              >
                <span className="material-symbols-outlined text-2xl">menu</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto w-full space-y-10">
          {/* Welcome Section */}
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-col gap-2">
              <h1 className={`text-4xl font-extrabold tracking-tight ${isDarkMode ? "text-white" : "text-charcoal"}`}>
                Welcome back, <span className={isDarkMode ? "text-[#8b5cf6]" : "text-primary"}>{user?.name?.split(' ')[0] || "User"}!</span>
              </h1>
              <p className={`text-lg font-normal ${isDarkMode ? "text-[#a094b8]" : "text-slate-500"}`}>
                {user?.careerSuggestions && user.careerSuggestions.length > 0
                  ? `You're making great progress towards your ${user.careerSuggestions[0]} goal.`
                  : "Start your career journey by taking an assessment."}
              </p>
            </div>
            <button onClick={() => navigate('/assessments')} className={`flex items-center gap-2 px-6 py-3.5 text-white text-sm font-bold rounded-xl transition-all shadow-lg ${isDarkMode ? "bg-[#8b5cf6] hover:bg-[#8b5cf6]/90 shadow-[#8b5cf6]/30" : "bg-primary hover:bg-primary/90 shadow-primary/20"}`}>
              <span className="material-symbols-outlined text-[20px]">
                add_task
              </span>
              <span>Take New Assessment</span>
            </button>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Section - Career & Learning */}
            <div className="xl:col-span-2 space-y-10">
              {/* Top Career Matches */}
              <section>
                <SectionHeader
                  title="Top Career Matches"
                  onViewAll={() => { }}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CareerMatchCard
                    icon="draw"
                    title="UX Designer"
                    description="Focus on user research and interface psychology for digital products."
                    matchPercentage={85}
                    matchLabel="Match"
                    skillPercentage={85}
                    skillColor="#8b5cf6"
                    matchColor="#10b981"
                    borderHoverColor="#8b5cf6"
                  />
                  <CareerMatchCard
                    icon="database"
                    title="Data Scientist"
                    description="Apply statistical models to derive complex insights from data sets."
                    matchPercentage={72}
                    matchLabel="Match"
                    skillPercentage={72}
                    skillColor="#3b82f6"
                    matchColor="#f59e0b"
                    borderHoverColor="#3b82f6"
                  />
                </div>
              </section>

              {/* Recommended Learning */}

              {/* Latest Career News */}
              <section>
                <SectionHeader
                  title="Latest Career News"
                  onViewAll={() => { }}
                />

                {newsLoading ? (
                  <p className="text-[#a094b8] text-sm">Loading career news...</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
                    {careerNews.map((news, index) => (
                      <CareerNewsCard key={index} news={news} />
                    ))}
                  </div>
                )}
              </section>
              <section>
                <SectionHeader
                  title="Recommended Learning"
                  showViewAll={false}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <CourseCard
                    isPopular={true}
                    imageUrl={dashboard_i2}
                    title="Intro to User Psychology"
                    platform="Coursera"
                    duration="4 hours"
                  />
                  <CourseCard
                    imageUrl={dashboard_i3}
                    title="Figma Mastery 2024"
                    platform="Udemy"
                    duration="12 hours"
                  />
                  <CourseCard
                    imageUrl={dashboard_i4}
                    title="Python for Data Analysis"
                    platform="LinkedIn"
                    duration="6 hours"
                  />
                </div>
              </section>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-8">
              {/* Mentor Sessions */}
              <section className={`rounded-2xl border p-6 card-elevation relative overflow-hidden ${isDarkMode ? "bg-[#1a142e] border-[#2d264a]" : "bg-white border-border-light"}`}>
                <div className="flex items-center justify-between mb-8">
                  <h3 className={`font-bold text-lg ${isDarkMode ? "text-white" : "text-charcoal"}`}>
                    Mentor Sessions
                  </h3>
                  <button className={`p-2 rounded-xl transition-colors border ${isDarkMode ? "text-[#8b5cf6] hover:bg-[#8b5cf6]/10 border-[#8b5cf6]/20" : "text-primary hover:bg-primary/10 border-primary/20"}`}>
                    <span className="material-symbols-outlined text-[20px]">
                      calendar_month
                    </span>
                  </button>
                </div>
                <div className="space-y-6">
                  <MentorSessionCard
                    mentorName="Sarah Williams"
                    mentorTitle="Senior UX Designer at Google"
                    sessionTime="Today, 2:30 PM"
                    imageUrl={dashboard_i5}
                    isAvailable={true}
                    actionButtonLabel="Join"
                  />
                  <MentorSessionCard
                    mentorName="David Chen"
                    mentorTitle="Product Lead at Meta"
                    sessionTime="Tomorrow, 10:00 AM"
                    imageUrl={dashboard_i6}
                    isAvailable={false}
                    actionButtonLabel="Edit"
                  />
                </div>
                <button
                  className={`w-full mt-10 py-3.5 text-xs font-bold rounded-xl transition-all border border-dashed ${isDarkMode ? "bg-[#8b5cf6]/5 hover:bg-[#8b5cf6]/10 text-[#8b5cf6] border-[#8b5cf6]/40" : "bg-primary/5 hover:bg-primary/10 text-primary border-primary/30"}`}
                  onClick={(e) => {

                    navigate("/mentors");
                  }}
                >
                  + Book New Mentor
                </button>
              </section>

              {/* Next Badge
              <section className="bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9] rounded-2xl p-6 text-white card-elevation relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 size-32 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
                <div className="relative z-10">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[24px] text-[#f59e0b]">
                      stars
                    </span>
                    Next Badge: Expert
                  </h3>
                  <p className="text-xs text-white/90 mb-5 leading-relaxed">
                    Complete 3 more UX assessments to earn your "Interaction
                    Expert" badge.
                  </p>
                  <div className="relative h-2.5 w-full bg-white/20 rounded-full overflow-hidden mb-3">
                    <div
                      className="absolute h-full bg-white rounded-full shadow-[0_0_8px_white]"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="opacity-90">14/17 Assessments</span>
                    <span>70%</span>
                  </div>
                </div>
              </section> */}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />

          {/* Drawer Content */}
          <aside className={`absolute right-0 top-0 h-full w-72 shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col ${isDarkMode ? "bg-[#140f26] border-l border-[#2d264a]" : "bg-sidebar-light border-l border-border-light"}`}>
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                {/* Logo */}
                <div className={`flex items-center gap-3 ${isDarkMode ? "text-[#8b5cf6]" : "text-primary"}`}>
                  <div className={`size-8 rounded-lg flex items-center justify-center text-white shadow-lg shadow-purple-500/30 ${isDarkMode ? "bg-[#8b5cf6]" : "bg-primary"}`}>
                    <span className="material-symbols-outlined text-lg">rocket_launch</span>
                  </div>
                  <h2 className={`text-lg font-bold tracking-tight ${isDarkMode ? "text-white" : "text-charcoal"}`}>
                    CareerPath
                  </h2>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className={`p-2 rounded-lg ${isDarkMode ? "text-white/70 hover:bg-white/10" : "text-slate-500 hover:bg-slate-100"}`}
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex flex-col gap-1.5 flex-1">
                {[
                  { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
                  { path: '/career-paths', label: 'Career Paths', icon: 'explore' },
                  { path: '/assessments', label: 'Assessments', icon: 'quiz' },
                  { path: '/mentors', label: 'Mentors', icon: 'groups' },
                  { path: '/settings', label: 'Settings', icon: 'settings' }
                ].map((item) => (
                  <button
                    key={item.path}
                    onClick={() => { navigate(item.path); setMenuOpen(false); }}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${isActive(item.path)
                      ? isDarkMode
                        ? 'bg-[#8b5cf6]/10 text-white border-l-2 border-[#8b5cf6]'
                        : 'bg-primary/10 text-primary border-l-2 border-primary'
                      : isDarkMode
                        ? 'text-[#a094b8] hover:text-white hover:bg-white/5'
                        : 'text-gray-600 hover:text-primary hover:bg-slate-100'}`}
                  >
                    <span className={`material-symbols-outlined text-xl ${isActive(item.path) ? (isDarkMode ? "text-[#8b5cf6]" : "text-primary") : ""}`}>{item.icon}</span>
                    <p className="text-sm font-medium">{item.label}</p>
                  </button>
                ))}
              </nav>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 mt-auto"
              >
                <span className="material-symbols-outlined">logout</span>
                <p className="text-sm font-medium">Logout</p>
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
