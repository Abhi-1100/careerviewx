import React from "react";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background-dark text-white font-display">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative mb-12">
          <div className="h-48 w-full rounded-2xl bg-gradient-to-r from-primary via-[#a881ff] to-primary overflow-hidden" />
          <div className="absolute -bottom-12 left-8 flex items-end gap-6">
            <div
              className="h-32 w-32 rounded-full border-4 border-background-dark bg-slate-800 bg-cover bg-center shadow-xl"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuANDNh9kIogzfNkW07yxzsnRMBZp6QKCDroE98gCMphikikkBdO59cDhBJY8Hyfg5hz2pUc4SgCm4ZpR5eHS2Hfn9KCriLK38LC--z01aAPXyDt2Vod9EO__3RQA6pKsC1pYTMSQH82BnX1njc05SZZX_GpOsKmzzBkgRk63ZAAn52mshdztD2A1-C7Nf37uKxoJheCOinZtqdhJwoy47RZeUazL7FzBoa5aU4M4gyVJUfF0EhmAtIX7PLPqTg5urjdXXjOrbOaYIs")',
              }}
            ></div>
            <div className="mb-2 pb-1">
              <h2 className="mt-4 text-3xl font-bold text-white leading-none">
                Alex Johnson
              </h2>
              <p className="mt-2 mb-5 text-slate-200 font-medium mt-1">
                12th Grade - Science | Aspiring Software Architect
              </p>
              <p className="text-slate-500 text-sm flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-sm">
                  location_on
                </span>{" "}
                San Francisco, CA
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-20">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-card-dark rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    route
                  </span>{" "}
                  My Career Goals
                </h3>
                <span className="text-xs font-semibold px-2.5 py-1 bg-primary/20 text-primary rounded-full">
                  On Track
                </span>
              </div>
              <div className="space-y-0 relative">
                <div className="grid grid-cols-[48px_1fr] gap-x-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10">
                      <span className="material-symbols-outlined text-white text-xl">
                        school
                      </span>
                    </div>
                    <div className="w-0.5 bg-primary/30 h-16"></div>
                  </div>
                  <div className="pb-8">
                    <p className="text-white font-semibold">
                      12th Grade Science
                    </p>
                    <p className="text-gray-400 text-sm">
                      Current Focus: Physics &amp; Calculus
                    </p>
                    <span className="text-[10px] uppercase tracking-wider text-primary font-bold mt-1 block">
                      Active
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-glass border border-glass-border flex items-center justify-center z-10 text-slate-400">
                      <span className="material-symbols-outlined text-xl">
                        history_edu
                      </span>
                    </div>
                    <div className="w-0.5 bg-primary/30 h-16"></div>
                  </div>
                  <div className="pb-8">
                    <p className="text-gray-300 font-semibold">
                      University - Computer Science
                    </p>
                    <p className="text-gray-400 text-sm">
                      Target: Stanford or UC Berkeley
                    </p>
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mt-1 block">
                      Upcoming 2024
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-glass border border-glass-border flex items-center justify-center z-10 text-slate-400">
                      <span className="material-symbols-outlined text-xl">
                        work
                      </span>
                    </div>
                    <div className="w-0.5 bg-primary/30 h-16"></div>
                  </div>
                  <div className="pb-8">
                    <p className="text-gray-300 font-semibold">
                      Software Engineering Internship
                    </p>
                    <p className="text-gray-400 text-sm">
                      Focus: Cloud Infrastructure &amp; DevOps
                    </p>
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mt-1 block">
                      Goal 2026
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-card-dark rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    group
                  </span>{" "}
                  Saved Mentors
                </h3>
                <a className="text-sm text-primary hover:underline" href="#">
                  View All
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-border-dark hover:bg-white/10 transition-colors cursor-pointer">
                  <div
                    className="h-12 w-12 rounded-lg bg-cover bg-center"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAzMg_i5Im_L_k_BJpcDnJOCQihGfUXSs8tCMXKq-k-wzRUjufFI0yIEJ9-7OVNT1fgQBAmO3Iu5gDrfAAwhcxr6sfZGHs_zx63kHPYHvofP77HtDZZ6J5aQTmfNXdnPu7fE8-Q7JAsUNeRzwq5tpLlxDHZ9Xq5LlvkyDvnbyraw2SYwtt4z_i9uzofpKz62i_KVDn3RkIMtyBqG4yT0VCSmsFLKjZP2X1Fzn7m2OgdlVYayedS9PoY0wwuuBVz4uf6syB1_cHu5DA")',
                    }}
                  ></div>
                  <div>
                    <p className="font-bold text-sm text-white">Sarah Chen</p>
                    <p className="text-xs text-gray-400">
                      Senior Architect at Google
                    </p>
                  </div>
                  <span className="material-symbols-outlined ml-auto text-gray-500">
                    chevron_right
                  </span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-border-dark hover:bg-white/10 transition-colors cursor-pointer">
                  <div
                    className="h-12 w-12 rounded-lg bg-cover bg-center"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDk9SaMgWh55JUqfsjaxigKzyPn9sdHRJ5d1QbWaAUvb8wKmJIrt0v50KM4y6ICMk55T03okzamW0kewumSrTt_GUFWPuv75EntcR0ZjRsNNLpfqbgFf0nEuN8jIPQiJYmCO_otxF2yoByyZeIoBq1CMXe_CHIufq5SgGnNHxjV5s9WWlMYQ0THexyyWxIT_2HmkmaIg1_lJ5Xr0tsubOcHb_eTA5efa6suZUgkh3GWC4vKjyf8_tfjlWzLPNc_uxteFBCNSbePJUw")',
                    }}
                  ></div>
                  <div>
                    <p className="font-bold text-sm text-white">
                      Marcus Thorne
                    </p>
                    <p className="text-xs text-gray-400">
                      Engineering Manager at Stripe
                    </p>
                  </div>
                  <span className="material-symbols-outlined ml-auto text-gray-500">
                    chevron_right
                  </span>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="bg-card-dark rounded-xl p-6">
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
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
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
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
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
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
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
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: "88%" }}
                    ></div>
                  </div>
                </div>
              </div>
              <button className="w-full mt-6 py-2 bg-card-dark border border-border-dark text-xs font-bold uppercase tracking-widest text-gray-300 rounded hover:bg-white/5 transition-colors">
                Add New Skill
              </button>
            </section>

            <section className="bg-card-dark rounded-xl p-6">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary">
                  analytics
                </span>{" "}
                Assessment History
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border-l-2 border-primary">
                  <div>
                    <p className="text-sm font-bold text-white">
                      Logic &amp; Reasoning
                    </p>
                    <p className="text-[10px] text-gray-400">Oct 12, 2023</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">95%</p>
                    <p className="text-[10px] text-green-500 font-bold">
                      Excellent
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border-l-2 border-border-dark">
                  <div>
                    <p className="text-sm font-bold text-white">
                      Aptitude Test
                    </p>
                    <p className="text-[10px] text-gray-400">Sep 28, 2023</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-300">88%</p>
                    <p className="text-[10px] text-gray-400 font-bold">
                      Completed
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border-l-2 border-border-dark">
                  <div>
                    <p className="text-sm font-bold text-white">
                      Personality (INTJ)
                    </p>
                    <p className="text-[10px] text-gray-400">Aug 15, 2023</p>
                  </div>
                  <div className="text-right">
                    <span className="material-symbols-outlined text-gray-500 text-sm">
                      verified
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer class="w-full bg-background-dark border-t border-[#2d2845] py-10 px-4 mt-12">
<div class="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
<div class="flex items-center gap-3 text-primary">
<span class="material-symbols-outlined text-2xl">explore</span>
<span class="text-lg font-bold text-white">PathFinder</span>
</div>
<div class="flex gap-8 text-gray-400 text-sm">
<a class="hover:text-primary transition-colors" href="#">About Us</a>
<a class="hover:text-primary transition-colors" href="#">Terms of Service</a>
<a class="hover:text-primary transition-colors" href="#">Privacy Policy</a>
<a class="hover:text-primary transition-colors" href="#">Contact</a>
</div>
<div class="flex gap-4">
<div class="size-8 rounded-full bg-[#1c1a2e] border border-[#2d2845] flex items-center justify-center cursor-pointer hover:text-primary hover:border-primary/50 transition-all">
<span class="material-symbols-outlined text-lg">public</span>
</div>
<div class="size-8 rounded-full bg-[#1c1a2e] border border-[#2d2845] flex items-center justify-center cursor-pointer hover:text-primary hover:border-primary/50 transition-all">
<span class="material-symbols-outlined text-lg">thumb_up</span>
</div>
</div>
</div>
<div class="text-center mt-8 text-xs text-gray-600">
            © 2024 PathFinder Career Guidance Platform. All rights reserved.
        </div>
</footer>
    </div>
  );
};

export default Profile;
