import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import InternalNavbar from "../components/InternalNavbar";
import ListItem from "../components/ListItem";
import InfoRow from "../components/InfoRow";
import Button from "../components/Button";
import Footer from "../components/internalfooter";
import { getCurrentUser } from "../utils/auth";
import { getProfile } from "../Services/api";
import { ThemeContext } from "../context/ThemeContext";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    // Fetch user data from backend
    const loadUserData = async () => {
      try {
        setLoading(true);
        const response = await getProfile();
        const userData = response.data;

        console.log('Profile loaded from backend:', userData);
        console.log('Assessment History:', userData.assessmentHistory);
        console.log('Career Paths:', userData.careerPaths);

        // Update both state and localStorage
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        setError(null);
      } catch (err) {
        console.error('Error loading profile:', err);
        setError('Failed to load profile data');

        // Fallback to localStorage if backend fails
        const localUser = getCurrentUser();
        if (localUser) {
          console.log('Using localStorage fallback:', localUser);
          setUser(localUser);
        }
      } finally {
        setLoading(false);
      }
    };

    loadUserData();

    // Listen for storage changes (when updated from another tab/window)
    const handleStorageChange = (e) => {
      if (e.key === 'user') {
        const updatedUser = JSON.parse(e.newValue);
        setUser(updatedUser);
      }
    };

    // Listen for focus to reload data when returning to the page
    const handleFocus = () => {
      loadUserData();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  if (loading) {
    return (
      <div className={`min-h-screen font-display transition-colors duration-300 ${isDarkMode ? "bg-background-dark text-white" : "bg-surface-light text-charcoal"}`}>
        <InternalNavbar />
        <main className="flex flex-1 justify-center items-center py-12 px-4 h-screen">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            <p className="text-white text-lg">Loading your profile...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`min-h-screen font-display transition-colors duration-300 ${isDarkMode ? "bg-background-dark text-white" : "bg-surface-light text-charcoal"}`}>
      <InternalNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className={`mb-4 p-4 rounded-lg ${isDarkMode ? "bg-red-500/10 border border-red-500/50" : "bg-red-50 border border-red-200"}`}>
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="mb-12">
          {/* Banner */}
          <div className="relative h-32 sm:h-48 w-full rounded-2xl bg-gradient-to-r from-primary via-[#a881ff] to-primary overflow-hidden">
            <Button
              variant="ghost"
              className="absolute top-4 right-4 z-10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20 text-xs sm:text-sm px-3 py-1.5"
              onClick={() => navigate('/settings')}
            >
              <span className="flex items-center gap-1 sm:gap-2">
                <span className="material-symbols-outlined text-sm sm:text-base">edit</span>
                <span className="hidden sm:inline">Edit Profile</span>
                <span className="sm:hidden">Edit</span>
              </span>
            </Button>
          </div>

          {/* Profile Details - Avatar overlaps banner, text flows naturally below banner */}
          <div className="relative z-10 px-4 sm:px-8 flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-6 text-center sm:text-left">
            <div
              className={`-mt-12 sm:-mt-16 h-24 w-24 sm:h-32 sm:w-32 flex-shrink-0 rounded-full border-4 bg-cover bg-center shadow-xl ${isDarkMode ? "border-background-dark bg-slate-800" : "border-surface-light bg-slate-200"}`}
            ></div>
            <div className="w-full min-w-0 sm:pt-4">
              <h2 className={`mt-1 text-2xl sm:text-3xl font-bold leading-tight break-words ${isDarkMode ? "text-white" : "text-charcoal"}`}>
                {user?.name || "User"}
              </h2>
              <p className={`mt-2 mb-2 font-medium text-sm sm:text-base break-words leading-relaxed ${isDarkMode ? "text-slate-200" : "text-slate-600"}`}>
                {user?.education || "Student"} {user?.stream ? `- ${user.stream}` : ""} | {user?.careerSuggestions?.[0] || "Career Explorer"}
              </p>
              <p className="flex items-center justify-center sm:justify-start gap-1 mt-1 text-slate-500 text-xs sm:text-sm break-all">
                <span className="material-symbols-outlined text-sm">
                  mail
                </span>{" "}
                {user?.email || "email@example.com"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-2 space-y-8">
            <section className={`rounded-xl p-6 ${isDarkMode ? "bg-card-dark" : "bg-white border border-border-light shadow-sm"}`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    route
                  </span>{" "}
                  My Career Goals
                </h3>
                <span className="text-xs font-semibold px-2.5 py-1 bg-primary/20 text-primary rounded-full">
                  {user?.careerPaths?.length || 0} Path{user?.careerPaths?.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="space-y-0 relative">
                <div className="grid grid-cols-[48px_1fr] gap-x-4">
                  {/* Current Education Level */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10">
                      <span className="material-symbols-outlined text-white text-xl">
                        school
                      </span>
                    </div>
                    <div className="w-0.5 bg-primary/30 h-16"></div>
                  </div>
                  <div className="pb-8">
                    <p className={`font-semibold ${isDarkMode ? "text-white" : "text-charcoal"}`}>
                      {user?.education || "12th Grade"} {user?.stream ? `- ${user.stream}` : ""}
                    </p>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                      Current Education Level
                    </p>
                    <span className="text-[10px] uppercase tracking-wider text-primary font-bold mt-1 block">
                      Active
                    </span>
                  </div>

                  {/* Dynamic Career Paths */}
                  {user?.careerPaths && user.careerPaths.length > 0 ? (
                    user.careerPaths.map((careerPath, index) => (
                      <React.Fragment key={index}>
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-glass border border-primary/60 flex items-center justify-center z-10 text-primary">
                            <span className="material-symbols-outlined text-xl">
                              {index === 0 ? 'work' : 'trending_up'}
                            </span>
                          </div>
                          {index < user.careerPaths.length - 1 ? <div className="w-0.5 bg-primary/30 h-16"></div> : <div className="h-4"></div>}
                        </div>
                        <div className="pb-8">
                          <p className={`font-semibold ${isDarkMode ? "text-white" : "text-charcoal"}`}>
                            {careerPath.careerName}
                          </p>
                          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                            {careerPath.matchPercentage ? `Match: ${careerPath.matchPercentage}%` : 'Career Goal'} • Added {new Date(careerPath.addedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                          <span className="text-[10px] uppercase tracking-wider text-primary font-bold mt-1 block">
                            Target Career
                          </span>
                        </div>
                      </React.Fragment>
                    ))
                  ) : (
                    <>
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-glass border border-glass-border flex items-center justify-center z-10 text-slate-400">
                          <span className="material-symbols-outlined text-xl">
                            explore
                          </span>
                        </div>
                      </div>
                      <div className="pb-8">
                        <p className="text-gray-400 font-semibold">
                          No career paths added yet
                        </p>
                        <p className="text-gray-500 text-sm">
                          Complete an assessment to discover your ideal career
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </section>

            <section className={`rounded-xl p-6 ${isDarkMode ? "bg-card-dark" : "bg-white border border-border-light shadow-sm"}`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    group
                  </span>{" "}
                  Saved Mentors
                </h3>
                <button className="text-sm text-primary hover:underline" onClick={() => navigate('/mentors')}>
                  View All
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ListItem
                  title="Sarah Chen"
                  subtitle="Senior Architect at Google"
                />

                <ListItem
                  title="Marcus Thorne"
                  subtitle="Engineering Manager at Stripe"
                />
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className={`rounded-xl p-6 ${isDarkMode ? "bg-card-dark" : "bg-white border border-border-light shadow-sm"}`}>
              <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary">
                  bolt
                </span>{" "}
                Skill Set
              </h3>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium">Python Programming</span>
                    <span className="text-primary font-bold">85%</span>
                  </div>
                  <div className={`h-2 w-full rounded-full overflow-hidden ${isDarkMode ? "bg-white/10" : "bg-slate-200"}`}>
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium">Critical Thinking</span>
                    <span className="text-primary font-bold">92%</span>
                  </div>
                  <div className={`h-2 w-full rounded-full overflow-hidden ${isDarkMode ? "bg-white/10" : "bg-slate-200"}`}>
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: "92%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium">Public Speaking</span>
                    <span className="text-primary font-bold">70%</span>
                  </div>
                  <div className={`h-2 w-full rounded-full overflow-hidden ${isDarkMode ? "bg-white/10" : "bg-slate-200"}`}>
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium">Mathematics</span>
                    <span className="text-primary font-bold">88%</span>
                  </div>
                  <div className={`h-2 w-full rounded-full overflow-hidden ${isDarkMode ? "bg-white/10" : "bg-slate-200"}`}>
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: "88%" }}
                    ></div>
                  </div>
                </div>
              </div>
              <Button variant="card">Add New Skill</Button>
            </section>

            <section className={`rounded-xl p-6 ${isDarkMode ? "bg-card-dark" : "bg-white border border-border-light shadow-sm"}`}>
              <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary">
                  analytics
                </span>{" "}
                Assessment History
                <span className="ml-auto text-xs font-semibold px-2.5 py-1 bg-primary/20 text-primary rounded-full">
                  {user?.assessmentHistory?.length || 0} Record{user?.assessmentHistory?.length !== 1 ? 's' : ''}
                </span>
              </h3>
              <div className="space-y-4">
                {user?.assessmentHistory && user.assessmentHistory.length > 0 ? (
                  [...user.assessmentHistory].reverse().slice(0, 5).map((assessment, index) => {
                    const date = new Date(assessment.takenAt);
                    const formattedDate = date.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    });

                    return (
                      <InfoRow
                        key={index}
                        title={`${assessment.recommendedCareer?.charAt(0).toUpperCase() + assessment.recommendedCareer?.slice(1)} Assessment`}
                        subtitle={formattedDate}
                        right={
                          <>
                            <p className="text-sm font-bold text-primary">
                              {assessment.matchPercentage}%
                            </p>
                            <p className="text-[10px] text-green-500 font-bold">
                              {assessment.matchPercentage >= 90 ? 'Excellent' :
                                assessment.matchPercentage >= 75 ? 'Good' : 'Completed'}
                            </p>
                          </>
                        }
                        variant={index === 0 ? "primary" : undefined}
                      />
                    );
                  })
                ) : (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <span className="material-symbols-outlined text-primary text-3xl">quiz</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">No assessment history yet</p>
                    <p className="text-gray-500 text-xs">Take an assessment to discover your ideal career path!</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
