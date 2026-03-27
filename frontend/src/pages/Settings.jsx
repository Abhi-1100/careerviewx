import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import InternalNavbar from "../components/InternalNavbar";
import { getCurrentUser } from "../utils/auth";
import { getProfile, updateProfile } from "../Services/api";
import { ThemeContext } from "../context/ThemeContext";

const Settings = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    education: "",
    stream: "",
    bio: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Load user data on mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        const response = await getProfile();
        const userData = response.data;

        // Split name into first and last
        const nameParts = (userData.name || "").split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        setFormData({
          firstName: firstName,
          lastName: lastName,
          email: userData.email || "",
          phone: userData.phone || "",
          education: userData.education || "Undergraduate Student",
          stream: userData.stream || "Computer Science & IT",
          bio: userData.bio || ""
        });
        setError(null);
      } catch (err) {
        console.error("Error loading profile:", err);
        // Fallback to localStorage
        const localUser = getCurrentUser();
        if (localUser) {
          const nameParts = (localUser.name || "").split(" ");
          const firstName = nameParts[0] || "";
          const lastName = nameParts.slice(1).join(" ") || "";

          setFormData({
            firstName: firstName,
            lastName: lastName,
            email: localUser.email || "",
            phone: localUser.phone || "",
            education: localUser.education || "Undergraduate Student",
            stream: localUser.stream || "Computer Science & IT",
            bio: localUser.bio || ""
          });
        }
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const profileUpdateData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        phone: formData.phone,
        education: formData.education,
        stream: formData.stream,
        bio: formData.bio
      };

      await updateProfile(profileUpdateData);

      // Update localStorage
      const updatedUser = {
        ...getCurrentUser(),
        name: profileUpdateData.name,
        phone: profileUpdateData.phone,
        education: profileUpdateData.education,
        stream: profileUpdateData.stream,
        bio: profileUpdateData.bio
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate('/profile');
      }, 1500);
    } catch (err) {
      console.error("Error saving profile:", err);
      setError(err.response?.data?.message || "Failed to save changes. Please try again.");
      setSaving(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-display transition-colors duration-300 ${isDarkMode ? "bg-background-dark text-slate-100" : "bg-surface-light text-charcoal"}`}>
      <InternalNavbar />

      <main className="flex-1 flex max-w-7xl mx-auto w-full p-6 md:p-12 gap-8">
        <aside className="w-64 flex-shrink-0 hidden lg:flex flex-col gap-8">
          <div className="flex flex-col">
            <h1 className={`text-2xl font-bold mb-1 ${isDarkMode ? "text-white" : "text-charcoal"}`}>Settings</h1>
            <p className={`text-sm ${isDarkMode ? "text-slate-500" : "text-slate-600"}`}>Manage your professional identity</p>
          </div>
          <nav className="flex flex-col gap-2">
            <a className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-white font-medium shadow-lg shadow-primary/20 transition-all" href="#">
              <span className="material-symbols-outlined">person</span>
              <span>General</span>
            </a>
          </nav>
          <div className={`mt-auto p-4 rounded-xl border ${isDarkMode ? "bg-primary/20 border-primary/10" : "bg-primary/5 border-primary/20"}`}>
            <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-2">Pro Member</p>
            <p className={`text-sm mb-4 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>You have access to all premium career paths.</p>
            <button className={`w-full py-2 text-xs rounded-lg transition-colors border ${isDarkMode ? "bg-white/5 hover:bg-white/10 text-white border-white/10" : "bg-slate-100 hover:bg-slate-200 text-charcoal border-slate-300"}`}>Manage Plan</button>
          </div>
        </aside>

        <section className="flex-1">
          {success && (
            <div className="mb-4 p-4 rounded-lg bg-green-500/10 border border-green-500/50">
              <p className="text-green-400 text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">check_circle</span>
                Changes saved successfully! Redirecting to profile...
              </p>
            </div>
          )}

          {error && (
            <div className={`mb-4 p-4 rounded-lg border ${isDarkMode ? "bg-red-500/10 border-red-500/50" : "bg-red-50 border-red-200"}`}>
              <p className={`text-sm flex items-center gap-2 ${isDarkMode ? "text-red-400" : "text-red-600"}`}>
                <span className="material-symbols-outlined text-lg">error</span>
                {error}
              </p>
            </div>
          )}

          <div className={`rounded-xl p-6 md:p-10 shadow-2xl transition-colors duration-300 ${isDarkMode ? "bg-card-dark/70 backdrop-blur-[12px] border border-primary/10" : "bg-white border border-border-light shadow-sm"}`}>
            <div className={`flex flex-col sm:flex-row items-center gap-8 mb-12 pb-8 ${isDarkMode ? "border-b border-primary/10" : "border-b border-border-light"}`}>
              <div className="relative group">
                <div className={`size-32 rounded-full overflow-hidden border-4 ${isDarkMode ? "border-primary/20 bg-slate-800" : "border-primary/10 bg-slate-100"}`}>
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
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-charcoal"}`}>Profile Picture</h3>
                <p className={`text-sm mb-4 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>Recommended: 800x800px. JPG, PNG or GIF. Max 2MB.</p>
                <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                  <button className="px-6 py-2 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl text-sm transition-all flex items-center gap-2" type="button">
                    <span className="material-symbols-outlined text-lg">upload</span>
                    Upload New
                  </button>
                  <button className={`px-6 py-2 font-bold rounded-xl text-sm transition-all border ${isDarkMode ? "bg-white/5 hover:bg-white/10 text-slate-300 border-white/10" : "bg-slate-100 hover:bg-slate-200 text-charcoal border-slate-300"}`} type="button">
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit} disabled={loading || saving}>
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    <p className={isDarkMode ? "text-slate-300" : "text-slate-600"}>Loading your profile...</p>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <h4 className={`text-lg font-semibold mb-6 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-charcoal"}`}>
                      <span className="material-symbols-outlined text-primary">account_circle</span>
                      Personal Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className={`text-sm font-medium ml-1 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>First Name</label>
                        <input
                          className={`rounded-xl px-4 py-3 outline-none transition-all ${isDarkMode ? "bg-white/5 border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-slate-600" : "bg-slate-50 border border-slate-300 text-charcoal focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-slate-400"}`}
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          disabled={saving}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className={`text-sm font-medium ml-1 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>Last Name</label>
                        <input
                          className={`rounded-xl px-4 py-3 outline-none transition-all ${isDarkMode ? "bg-white/5 border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-slate-600" : "bg-slate-50 border border-slate-300 text-charcoal focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-slate-400"}`}
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          disabled={saving}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className={`text-sm font-medium ml-1 flex justify-between ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                          Email Address
                          <span className="text-[10px] text-emerald-400 flex items-center gap-1 uppercase tracking-widest">
                            <span className="material-symbols-outlined text-[12px]">verified</span> Verified
                          </span>
                        </label>
                        <div className="relative">
                          <input
                            className={`w-full rounded-xl px-4 py-3 cursor-not-allowed italic ${isDarkMode ? "bg-white/5 border border-white/5 text-slate-500" : "bg-slate-50 border border-slate-200 text-slate-500"}`}
                            disabled
                            type="email"
                            value={formData.email}
                          />
                          <span className={`material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 ${isDarkMode ? "text-slate-600" : "text-slate-400"}`}>lock</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className={`text-sm font-medium ml-1 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>Phone Number</label>
                        <input
                          className={`rounded-xl px-4 py-3 outline-none transition-all ${isDarkMode ? "bg-white/5 border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-slate-600" : "bg-slate-50 border border-slate-300 text-charcoal focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-slate-400"}`}
                          placeholder="+1 (555) 000-0000"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={saving}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className={`text-lg font-semibold mb-6 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-charcoal"}`}>
                      <span className="material-symbols-outlined text-primary">school</span>
                      Career Profile
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="flex flex-col gap-2">
                        <label className={`text-sm font-medium ml-1 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>Current Education Level</label>
                        <select
                          className={`rounded-xl px-4 py-3 outline-none transition-all appearance-none cursor-pointer ${isDarkMode ? "bg-white/5 border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary" : "bg-slate-50 border border-slate-300 text-charcoal focus:border-primary focus:ring-1 focus:ring-primary"}`}
                          name="education"
                          value={formData.education}
                          onChange={handleChange}
                          disabled={saving}
                        >
                          <option>Undergraduate Student</option>
                          <option>High School Student</option>
                          <option>Post-Graduate Student</option>
                          <option>Ph.D. Candidate</option>
                          <option>Working Professional</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className={`text-sm font-medium ml-1 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>Preferred Stream</label>
                        <select
                          className={`rounded-xl px-4 py-3 outline-none transition-all appearance-none cursor-pointer ${isDarkMode ? "bg-white/5 border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary" : "bg-slate-50 border border-slate-300 text-charcoal focus:border-primary focus:ring-1 focus:ring-primary"}`}
                          name="stream"
                          value={formData.stream}
                          onChange={handleChange}
                          disabled={saving}
                        >
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
                        <label className={`text-sm font-medium ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>Short Bio</label>
                        <span className={`text-[10px] uppercase tracking-widest ${isDarkMode ? "text-slate-500" : "text-slate-500"}`}>{formData.bio.length} / 500 characters</span>
                      </div>
                      <textarea
                        className={`rounded-xl px-4 py-3 outline-none transition-all resize-none ${isDarkMode ? "bg-white/5 border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-slate-600" : "bg-slate-50 border border-slate-300 text-charcoal focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-slate-400"}`}
                        placeholder="Tell us about your career goals and interests..."
                        rows="4"
                        name="bio"
                        maxLength="500"
                        value={formData.bio}
                        onChange={handleChange}
                        disabled={saving}
                      />
                    </div>
                  </div>

                  <div className={`flex flex-col sm:flex-row items-center justify-end gap-4 pt-8 mt-4 ${isDarkMode ? "border-t border-primary/10" : "border-t border-border-light"}`}>
                    <button
                      className={`w-full sm:w-auto px-8 py-3 font-bold rounded-xl transition-all border ${isDarkMode ? "bg-white/5 hover:bg-white/10 text-white border-white/10" : "bg-slate-100 hover:bg-slate-200 text-charcoal border-slate-300"}`}
                      type="button"
                      onClick={() => navigate('/profile')}
                      disabled={saving}
                    >
                      Cancel
                    </button>
                    <button
                      className="w-full sm:w-auto px-10 py-3 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white font-bold rounded-xl shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2"
                      type="submit"
                      disabled={saving || loading}
                    >
                      <span className="material-symbols-outlined text-lg">save</span>
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>

          <div className={`mt-8 p-6 rounded-xl border ${isDarkMode ? "bg-rose-500/5 border-rose-500/20" : "bg-rose-50 border-rose-200"} flex flex-col md:flex-row items-center justify-between gap-4`}>
            <div>
              <h5 className={`font-bold mb-1 ${isDarkMode ? "text-white" : "text-charcoal"}`}>Delete Account</h5>
              <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>Once you delete your account, there is no going back. Please be certain.</p>
            </div>
            <button className={`px-6 py-2 font-bold rounded-xl border text-sm transition-all ${isDarkMode ? "bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border-rose-500/30" : "bg-rose-100 hover:bg-rose-200 text-rose-600 border-rose-300"}`} type="button">
              Delete Account
            </button>
          </div>
        </section>
      </main>

      <footer className={`mt-auto py-6 px-12 ${isDarkMode ? "border-t border-primary/10" : "border-t border-border-light"}`}>
        <div className={`max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs uppercase tracking-widest ${isDarkMode ? "text-slate-500" : "text-slate-600"}`}>
          <p>© 2024 Pathfinder Career Platform. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a className={`transition-colors ${isDarkMode ? "hover:text-primary" : "hover:text-primary"}`} href="#">Privacy Policy</a>
            <a className={`transition-colors ${isDarkMode ? "hover:text-primary" : "hover:text-primary"}`} href="#">Terms of Service</a>
            <a className={`transition-colors ${isDarkMode ? "hover:text-primary" : "hover:text-primary"}`} href="#">Help Center</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Settings;
