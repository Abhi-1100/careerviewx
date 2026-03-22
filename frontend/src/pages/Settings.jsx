import React from "react";
import { useNavigate } from "react-router-dom";
import InternalNavbar from "../components/InternalNavbar";

const Settings = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-background-dark text-slate-100 min-h-screen flex flex-col font-display">
      <InternalNavbar />

      <main className="flex-1 flex max-w-7xl mx-auto w-full p-6 md:p-12 gap-8">
        <aside className="w-64 flex-shrink-0 hidden lg:flex flex-col gap-8">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
            <p className="text-slate-500 text-sm">Manage your professional identity</p>
          </div>
          <nav className="flex flex-col gap-2">
            <a className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-white font-medium shadow-lg shadow-primary/20 transition-all" href="#">
              <span className="material-symbols-outlined">person</span>
              <span>General</span>
            </a>
          </nav>
          <div className="mt-auto p-4 rounded-xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/10">
            <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-2">Pro Member</p>
            <p className="text-sm text-slate-300 mb-4">You have access to all premium career paths.</p>
            <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-white text-xs rounded-lg transition-colors border border-white/10">Manage Plan</button>
          </div>
        </aside>

        <section className="flex-1">
          <div className="rounded-xl p-6 md:p-10 shadow-2xl bg-card-dark/70 backdrop-blur-[12px] border border-primary/10">
            <div className="flex flex-col sm:flex-row items-center gap-8 mb-12 pb-8 border-b border-primary/10">
              <div className="relative group">
                <div className="size-32 rounded-full overflow-hidden border-4 border-primary/20">
                  <img
                    alt="Profile"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCjHS9l2QYDmxiuGNM6fQsQiuhDQHWZ5GjUbMknoCqCQEMjq_lYLrHFlKeO1HLYHsoyGpOBQhOz5EBozhkdarAKHbF-tdiBfV87x-Pcg55nLfH0bisfkKzvuqxuIrSzGAO5C3VbzejVHWzylLpMvzJEvc6r1nPAJLxaip1Z73MBaR25A5TGhciSGmpscVbbuo-6LwdFtpCzp18MC-BesozPurIcYN2vB2Es7AX2sp11xnpXckGQgpuOYOvOINxmkMvUfC-OZ8yR9g"
                  />
                </div>
                <label className="absolute bottom-1 right-1 size-9 bg-primary text-white rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg border-4 border-card-dark" htmlFor="avatar-upload">
                  <span className="material-symbols-outlined text-sm">photo_camera</span>
                  <input className="hidden" id="avatar-upload" type="file" />
                </label>
              </div>
              <div className="text-center sm:text-left flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Profile Picture</h3>
                <p className="text-slate-400 text-sm mb-4">Recommended: 800x800px. JPG, PNG or GIF. Max 2MB.</p>
                <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                  <button className="px-6 py-2 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl text-sm transition-all flex items-center gap-2" type="button">
                    <span className="material-symbols-outlined text-lg">upload</span>
                    Upload New
                  </button>
                  <button className="px-6 py-2 bg-white/5 hover:bg-white/10 text-slate-300 font-bold rounded-xl text-sm transition-all border border-white/10" type="button">
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div>
                <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">account_circle</span>
                  Personal Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">First Name</label>
                    <input className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-600" type="text" defaultValue="Alex" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Last Name</label>
                    <input className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-600" type="text" defaultValue="Chen" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-400 ml-1 flex justify-between">
                      Email Address
                      <span className="text-[10px] text-emerald-400 flex items-center gap-1 uppercase tracking-widest">
                        <span className="material-symbols-outlined text-[12px]">verified</span> Verified
                      </span>
                    </label>
                    <div className="relative">
                      <input className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed italic" disabled type="email" defaultValue="alex.chen@student.edu" />
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-600">lock</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Phone Number</label>
                    <input className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-600" placeholder="+1 (555) 000-0000" type="tel" />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">school</span>
                  Career Profile
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Current Education Level</label>
                    <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer" defaultValue="Undergraduate Student">
                      <option className="bg-background-dark">Undergraduate Student</option>
                      <option className="bg-background-dark">High School Student</option>
                      <option className="bg-background-dark">Post-Graduate Student</option>
                      <option className="bg-background-dark">Ph.D. Candidate</option>
                      <option className="bg-background-dark">Working Professional</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Preferred Stream</label>
                    <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer" defaultValue="Computer Science & IT">
                      <option className="bg-background-dark">Computer Science & IT</option>
                      <option className="bg-background-dark">Data Science & AI</option>
                      <option className="bg-background-dark">Business & Management</option>
                      <option className="bg-background-dark">Design & Creative Arts</option>
                      <option className="bg-background-dark">Healthcare & Medicine</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-sm font-medium text-slate-400">Short Bio</label>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest">156 / 500 characters</span>
                  </div>
                  <textarea className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-600 resize-none" placeholder="Tell us about your career goals and interests..." rows="4" defaultValue="Passionate computer science student with a focus on machine learning and full-stack development. Seeking opportunities to grow and contribute to innovative projects." />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-8 mt-4 border-t border-primary/10">
                <button className="w-full sm:w-auto px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all border border-white/10" type="button" onClick={() => navigate('/profile')}>
                  Cancel
                </button>
                <button className="w-full sm:w-auto px-10 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2" type="submit">
                  <span className="material-symbols-outlined text-lg">save</span>
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          <div className="mt-8 p-6 rounded-xl border border-rose-500/20 bg-rose-500/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h5 className="text-white font-bold mb-1">Delete Account</h5>
              <p className="text-slate-400 text-sm">Once you delete your account, there is no going back. Please be certain.</p>
            </div>
            <button className="px-6 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 font-bold rounded-xl border border-rose-500/30 transition-all text-sm" type="button">
              Delete Account
            </button>
          </div>
        </section>
      </main>

      <footer className="mt-auto border-t border-primary/10 py-6 px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs uppercase tracking-widest">
          <p>© 2024 Pathfinder Career Platform. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-primary transition-colors" href="#">Help Center</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Settings;
