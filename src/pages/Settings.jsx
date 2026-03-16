import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import InternalNavbar from "../components/InternalNavbar";
import Footer from "../components/internalfooter";
import { ThemeContext } from "../context/ThemeContext";

const Settings = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen font-display transition-colors duration-300 flex flex-col ${isDarkMode ? "bg-background-dark text-white" : "bg-surface-light text-charcoal"}`}>
      <InternalNavbar />

      <main className={`flex-1 flex max-w-7xl mx-auto w-full p-6 md:p-12 gap-8 transition-colors duration-300`}>
        {/* Sidebar Navigation */}
        <aside className={`w-64 flex-shrink-0 hidden lg:flex flex-col gap-8`}>
          <div className="flex flex-col">
            <h1 className={`text-2xl font-bold mb-1 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"}`}>Settings</h1>
            <p className={`text-sm transition-colors duration-300 ${isDarkMode ? "text-slate-500" : "text-slate-600"}`}>Manage your professional identity</p>
          </div>
          <nav className="flex flex-col gap-2">
            <a className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium shadow-lg shadow-primary/20 transition-all text-white bg-primary`} href="#">
              <span className="material-symbols-outlined">person</span>
              <span>General</span>
            </a>
            <a className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${isDarkMode ? "text-slate-400 hover:bg-primary/10 hover:text-primary" : "text-slate-600 hover:bg-primary/10 hover:text-primary"}`}>
              <span className="material-symbols-outlined">security</span>
              <span>Security</span>
            </a>
            <a className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${isDarkMode ? "text-slate-400 hover:bg-primary/10 hover:text-primary" : "text-slate-600 hover:bg-primary/10 hover:text-primary"}`}>
              <span className="material-symbols-outlined">notifications</span>
              <span>Notifications</span>
            </a>
            <a className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${isDarkMode ? "text-slate-400 hover:bg-primary/10 hover:text-primary" : "text-slate-600 hover:bg-primary/10 hover:text-primary"}`}>
              <span className="material-symbols-outlined">payments</span>
              <span>Billing</span>
            </a>
          </nav>
        </aside>

        {/* Form Content */}
        <section className="flex-1">
          <div className={`rounded-xl p-6 md:p-10 shadow-2xl transition-colors duration-300 ${isDarkMode ? "glass-panel" : "bg-white border border-border-light"}`}>
            {/* Profile Header */}
            <div className={`flex flex-col sm:flex-row items-center gap-8 mb-12 pb-8 border-b transition-colors duration-300 ${isDarkMode ? "border-primary/10" : "border-border-light"}`}>
              <div className="relative group">
                <div className={`size-32 rounded-full overflow-hidden border-4 transition-colors duration-300 ${isDarkMode ? "border-primary/20" : "border-primary/20"}`}>
                  <div className={`w-full h-full flex items-center justify-center text-4xl transition-colors duration-300 ${isDarkMode ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary"}`}>
                    AJ
                  </div>
                </div>
                <label className={`absolute bottom-1 right-1 size-9 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg border-4 transition-colors duration-300 ${isDarkMode ? "bg-primary text-white border-card-dark" : "bg-primary text-white border-white"}`} htmlFor="avatar-upload">
                  <span className="material-symbols-outlined text-sm">photo_camera</span>
                  <input className="hidden" id="avatar-upload" type="file"/>
                </label>
              </div>
              <div className={`text-center sm:text-left flex-1 transition-colors duration-300`}>
                <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"}`}>Profile Picture</h3>
                <p className={`text-sm mb-4 transition-colors duration-300 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>Recommended: 800x800px. JPG, PNG or GIF. Max 2MB.</p>
                <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                  <button className={`px-6 py-2 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl text-sm transition-all flex items-center gap-2`}>
                    <span className="material-symbols-outlined text-lg">upload</span>
                    Upload New
                  </button>
                  <button className={`px-6 py-2 text-sm font-bold rounded-xl transition-all border ${isDarkMode ? "bg-white/5 hover:bg-white/10 text-slate-300 border-white/10" : "bg-slate-100 hover:bg-slate-200 text-charcoal border-border-light"}`}>
                    Remove
                  </button>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <form className="space-y-8">
              {/* Personal Information */}
              <div>
                <h4 className={`text-lg font-semibold mb-6 flex items-center gap-2 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"}`}>
                  <span className="material-symbols-outlined text-primary">account_circle</span>
                  Personal Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className={`text-sm font-medium ml-1 transition-colors duration-300 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>First Name</label>
                    <input className={`rounded-xl px-4 py-3 outline-none transition-all ${isDarkMode ? "bg-white/5 border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-slate-600" : "bg-slate-50 border border-border-light text-charcoal focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-slate-400"}`} type="text" value="Alex"/>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={`text-sm font-medium ml-1 transition-colors duration-300 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>Last Name</label>
                    <input className={`rounded-xl px-4 py-3 outline-none transition-all ${isDarkMode ? "bg-white/5 border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-slate-600" : "bg-slate-50 border border-border-light text-charcoal focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-slate-400"}`} type="text" value="Chen"/>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={`text-sm font-medium ml-1 flex justify-between transition-colors duration-300 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                      Email Address
                      <span className="text-[10px] text-emerald-400 flex items-center gap-1 uppercase tracking-widest">
                        <span className="material-symbols-outlined text-[12px] fill-1">verified</span> Verified
                      </span>
                    </label>
                    <div className="relative">
                      <input className={`w-full rounded-xl px-4 py-3 cursor-not-allowed italic outline-none transition-all ${isDarkMode ? "bg-white/5 border border-white/5 text-slate-500" : "bg-slate-50 border border-border-light text-slate-500"}`} disabled type="email" value="alex.chen@student.edu"/>
                      <span className={`material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${isDarkMode ? "text-slate-600" : "text-slate-400"}`}>lock</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={`text-sm font-medium ml-1 transition-colors duration-300 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>Phone Number</label>
                    <input className={`rounded-xl px-4 py-3 outline-none transition-all ${isDarkMode ? "bg-white/5 border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-slate-600" : "bg-slate-50 border border-border-light text-charcoal focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-slate-400"}`} placeholder="+1 (555) 000-0000" type="tel"/>
                  </div>
                </div>
              </div>

              {/* Career Profile */}
              <div>
                <h4 className={`text-lg font-semibold mb-6 flex items-center gap-2 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"}`}>
                  <span className="material-symbols-outlined text-primary">school</span>
                  Career Profile
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="flex flex-col gap-2">
                    <label className={`text-sm font-medium ml-1 transition-colors duration-300 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>Current Education Level</label>
                    <select className={`rounded-xl px-4 py-3 outline-none transition-all appearance-none cursor-pointer ${isDarkMode ? "bg-white/5 border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary" : "bg-slate-50 border border-border-light text-charcoal focus:border-primary focus:ring-1 focus:ring-primary"}`}>
                      <option>Undergraduate Student</option>
                      <option>High School Student</option>
                      <option>Post-Graduate Student</option>
                      <option>Ph.D. Candidate</option>
                      <option>Working Professional</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={`text-sm font-medium ml-1 transition-colors duration-300 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>Preferred Stream</label>
                    <select className={`rounded-xl px-4 py-3 outline-none transition-all appearance-none cursor-pointer ${isDarkMode ? "bg-white/5 border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary" : "bg-slate-50 border border-border-light text-charcoal focus:border-primary focus:ring-1 focus:ring-primary"}`}>
                      <option>Computer Science & IT</option>
                      <option>Data Science & AI</option>
                      <option>Business & Management</option>
                      <option>Design & Creative Arts</option>
                      <option>Healthcare & Medicine</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center ml-1">
                    <label className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>Short Bio</label>
                    <span className={`text-[10px] uppercase tracking-widest transition-colors duration-300 ${isDarkMode ? "text-slate-500" : "text-slate-500"}`}>156 / 500 characters</span>
                  </div>
                  <textarea className={`rounded-xl px-4 py-3 outline-none transition-all resize-none ${isDarkMode ? "bg-white/5 border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-slate-600" : "bg-slate-50 border border-border-light text-charcoal focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-slate-400"}`} placeholder="Tell us about your career goals and interests..." rows="4">Passionate computer science student with a focus on machine learning and full-stack development. Seeking opportunities to grow and contribute to innovative projects.</textarea>
                </div>
              </div>

              {/* Action Buttons */}
              <div className={`flex flex-col sm:flex-row items-center justify-end gap-4 pt-8 mt-4 border-t transition-colors duration-300 ${isDarkMode ? "border-primary/10" : "border-border-light"}`}>
                <button className={`w-full sm:w-auto px-8 py-3 font-bold rounded-xl transition-all cursor-pointer ${isDarkMode ? "bg-white/5 hover:bg-white/10 text-white border border-white/10" : "bg-slate-100 hover:bg-slate-200 text-charcoal border border-border-light"}`} type="button" onClick={() => navigate('/profile')}>
                  Cancel
                </button>
                <button className={`w-full sm:w-auto px-10 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2`} type="submit">
                  <span className="material-symbols-outlined text-lg">save</span>
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          {/* Danger Zone */}
          <div className={`mt-8 p-6 rounded-xl border transition-colors duration-300 ${isDarkMode ? "border-rose-500/20 bg-rose-500/5" : "border-rose-500/30 bg-rose-500/10"}`}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h5 className={`font-bold mb-1 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"}`}>Delete Account</h5>
                <p className={`text-sm transition-colors duration-300 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>Once you delete your account, there is no going back. Please be certain.</p>
              </div>
              <button className={`px-6 py-2 font-bold rounded-xl border transition-all text-sm cursor-pointer whitespace-nowrap ${isDarkMode ? "bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border-rose-500/30" : "bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border-rose-500/30"}`}>
                Delete Account
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Settings;
