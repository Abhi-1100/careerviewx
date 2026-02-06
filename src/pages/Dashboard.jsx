import React, { useEffect, useState } from "react";
import { fetchCareerNews } from "../Services/newsService";

import SectionHeader from "../components/cards/Dashboard/SectionHeader";
import CareerMatchCard from "../components/cards/Dashboard/CareerMatchCard";
import CourseCard from "../components/cards/Dashboard/CourseCard";
import MentorSessionCard from "../components/cards/Dashboard/MentorSessionCard";
import CareerNewsCard from "../components/cards/Dashboard/CareerNewsCard";

import { useNavigate, useLocation } from "react-router-dom";
export default function CareerGuidanceDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path; // helper to detect active link
  const [careerNews, setCareerNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);

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

  return (
    <div className="flex h-screen bg-[#0f0a1e] text-white font-display overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-[#2d264a] bg-[#140f26] hidden lg:flex flex-col">
        <div className="p-6 flex flex-col h-full justify-between">
          <div className="flex flex-col gap-8">
            {/* Logo */}
            <div className="flex items-center gap-3 text-[#8b5cf6]">
              <div className="size-9 bg-[#8b5cf6] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#8b5cf6]/20">
                <span className="material-symbols-outlined">rocket_launch</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                CareerViewX
              </h2>
            </div>

            {/* Profile Card */}
            <div
              className="flex gap-3 items-center p-2 rounded-xl bg-[#1a142e]/50 border border-[#2d264a]/50 cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-10"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBjpOZbm4tbFtStcjtnw6q-hrSU2_4bNiVbCHmLjHfehumizZ2BULEn_g7HkWI7bF51l4Ai1KnBFoC0ePM856kllBnns1e3Hsb0AB3PKlb1IEf4XUsAQo9XvrJuL6MbPj6BdZHcWw3bSzEJYupsqC9-65F42I5w51cIdGbJWIwZeznSR5bqjg9CzsGdV0nQj1vGxOYCzHtoB-UMJAUaixsR77VdYtlYMo2zrSFnAcGHERWXiP7CMIt127PV0CFs_h_sVhtYM3WSv1g")',
                }}
              ></div>
              <div className="flex flex-col overflow-hidden">
                <h1 className="text-white text-sm font-semibold truncate">
                  Alex Johnson
                </h1>
                <p className="text-[#a094b8] text-xs font-normal">
                  Career Explorer
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-1.5">
              <button
                onClick={() => navigate('/dashboard')}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-r-lg group transition-all ${isActive('/dashboard') ? 'bg-gradient-to-r from-[#8b5cf6]/15 to-[#8b5cf6]/5 border-l-3 border-[#8b5cf6] text-white' : 'text-[#a094b8] hover:text-white hover:bg-white/5'}`}
              >
                <span className="material-symbols-outlined text-[#8b5cf6]">dashboard</span>
                <p className="text-sm font-medium">Dashboard</p>
              </button>

              <button
                onClick={() => navigate('/career-paths')}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg group transition-all ${isActive('/career-paths') ? 'bg-white/5 text-white' : 'text-[#a094b8] hover:text-white hover:bg-white/5'}`}
              >
                <span className="material-symbols-outlined">explore</span>
                <p className="text-sm font-medium">Career Paths</p>
              </button>

              <button
                onClick={() => navigate('/assessments')}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg group transition-all ${isActive('/assessments') ? 'bg-white/5 text-white' : 'text-[#a094b8] hover:text-white hover:bg-white/5'}`}
              >
                <span className="material-symbols-outlined">quiz</span>
                <p className="text-sm font-medium">Assessments</p>
              </button>

              <button
                onClick={() => navigate('/mentors')}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg group transition-all ${isActive('/mentors') ? 'bg-white/5 text-white' : 'text-[#a094b8] hover:text-white hover:bg-white/5'}`}
              >
                <span className="material-symbols-outlined">groups</span>
                <p className="text-sm font-medium">Mentors</p>
              </button>

              <button
                onClick={() => navigate('/settings')}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg group transition-all ${isActive('/settings') ? 'bg-white/5 text-white' : 'text-[#a094b8] hover:text-white hover:bg-white/5'}`}
              >
                <span className="material-symbols-outlined">settings</span>
                <p className="text-sm font-medium">Settings</p>
              </button>
            </nav>
          </div>

          {/* Premium Card */}
          <div className="bg-gradient-to-br from-[#8b5cf6]/20 to-transparent p-4 rounded-xl border border-[#8b5cf6]/30 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 size-16 bg-[#8b5cf6]/10 rounded-full blur-2xl group-hover:bg-[#8b5cf6]/20 transition-all"></div>
            <p className="text-white text-xs font-bold mb-2 relative z-10">
              Unlock Premium
            </p>
            <p className="text-[#a094b8] text-[10px] mb-4 leading-relaxed relative z-10">
              Get unlimited mentor sessions and advanced skill tracking.
            </p>
            <button className="w-full py-2 bg-[#8b5cf6] hover:bg-[#8b5cf6]/90 text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-[#8b5cf6]/20">
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto custom-scrollbar">
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between bg-[#0f0a1e]/80 backdrop-blur-xl border-b border-[#2d264a] px-8 py-4">
          <div className="flex items-center gap-6 flex-1">
            <div className="flex w-full max-w-md items-center rounded-xl bg-[#1a142e] border border-[#2d264a] px-4 h-11">
              <span className="material-symbols-outlined text-[#a094b8] text-[20px]">
                search
              </span>
              <input
                className="w-full border-none bg-transparent focus:ring-0 text-white placeholder:text-[#a094b8] px-3 text-sm"
                placeholder="Search courses, mentors, or careers..."
              />
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex gap-3">
              <button className="relative flex items-center justify-center size-10 rounded-xl bg-[#1a142e] border border-[#2d264a] text-[#a094b8] hover:text-white hover:bg-white/5 transition-all">
                <span className="material-symbols-outlined text-[22px]">
                  notifications
                </span>
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#8b5cf6] rounded-full border border-[#0f0a1e]"></span>
              </button>
              <button className="flex items-center justify-center size-10 rounded-xl bg-[#1a142e] border border-[#2d264a] text-[#a094b8] hover:text-white hover:bg-white/5 transition-all">
                <span className="material-symbols-outlined text-[22px]">
                  chat_bubble
                </span>
              </button>
            </div>
            <div className="h-6 w-px bg-[#2d264a]"></div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#8b5cf6]/30 group-hover:border-[#8b5cf6] transition-all"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAM6tfwmxJenzn8J5ywvXLRR4tofjwleSCggZK8qNcfGDuigmrlSpwR2FhbW5TIHtoICjXVCa4_eHvHtAcCLn79h8QivUrCRbt8OrnpGSa7EAAqOvtaBczQ639vLShwo9R5DuiYONpF2vVuzjFznSieYhUXQSnA5HhiyJIVoIHMrgJo1kSZL3lz_wM5vlM9ocQ8IoSkN7swbNmFk0jTlHme2bStdh_IM2XKvDFVdhioy0g-ah0Ko79U4lk2bAsNiqSl753xxMLEkbc")',
                }}
              ></div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8 max-w-[1200px] mx-auto w-full space-y-10">
          {/* Welcome Section */}
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-white text-4xl font-extrabold tracking-tight">
                Welcome back, <span className="text-[#8b5cf6]">Alex!</span>
              </h1>
              <p className="text-[#a094b8] text-lg font-normal">
                You're making great progress towards your UX Designer goal.
              </p>
            </div>
            <button onClick={() => navigate('/assessments')} className="flex items-center gap-2 px-6 py-3.5 bg-[#8b5cf6] text-white text-sm font-bold rounded-xl hover:bg-[#8b5cf6]/90 transition-all shadow-lg shadow-[#8b5cf6]/30">
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
                    imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDGNdOYTOdkbNAu1vFi2DtSNNtyR3kPknBR-8SfXuW_gSP_BBevE4-XCzWBRD9h2uNxu1Y_my89HzOclUjZjf5uwWGQrUY5TYS5ifA7irQD0nB1SxiigrsPz7nBlcop6U4VBtPFhESQHps5Oy1nnS-LRc_2lbaxXVhpJqp45Hu-fBUPCde9AY6ksFOp5rPdZbvyJBmodRr4UDzd0UoXWCtLUNzfUEw7V-Df8M_JV1XOeVkYLDXTJso-Ws1ZeMgbMit9rSyo3MXtuHY"
                    title="Intro to User Psychology"
                    platform="Coursera"
                    duration="4 hours"
                  />
                  <CourseCard
                    imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuBwTMStuNln_iLXbw0SLAw3d-URxqhlmrLUZt3A6rwHwOZqTZMvuKK9yY5vbEPuURwCmgeePKhyM6V_ip1mYOg1xhUEbsPCZ0M637pdzcrxEsgnDqrQe4VDJO4kN0yMZae5p8YEq8oVUa75wypmg3F5PgoQAxrHDMYTCiOyGUfnQn2ggiBcv8Of_BBJAgO39uWl7-pCM9dhrXe8W-HULmwOGodgOgy63svNlouciljV6blH2_X1pff68ceBbngWRjqf9Ziw0fkIjKs"
                    title="Figma Mastery 2024"
                    platform="Udemy"
                    duration="12 hours"
                  />
                  <CourseCard
                    imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuCyHobvGkeS51AlgOHEQm6njle_nhUL4nc9ObLaSLS6NR0WfnExYnPhNhGQHmfyFKO96P2iokb5B8Vyu4KhYSQzFwEt79glgaDgEqY9OseVsKzJNUwL1yV2eJk35pkGrjVqdAJiaXhUn2wp27ooy6wqMhLhaMA98UKDaNGEOEyGA6ls9eiBStBs4CUuTxIqJcu1lrS0h0e6cri54QxyWJUXUQS27uKOUQ731QHCltp-ePcipzNIMqJIdK0_8M1qkW6rqY-ZFP7PFtc"
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
              <section className="bg-[#1a142e] rounded-2xl border border-[#2d264a] p-6 card-elevation relative overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-white font-bold text-lg">
                    Mentor Sessions
                  </h3>
                  <button className="text-[#8b5cf6] hover:bg-[#8b5cf6]/10 p-2 rounded-xl transition-colors border border-[#8b5cf6]/20">
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
                    imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuBdiwI54FguckCSySQjisZD8hoRfJefqVzoYbmIxNXb2ElAo_Eh99mS-r6527oYHTGvj2tbdIyvVHge-Ngj8UqPiT9yXGOmwT51ERr5t5oCNb2krxMWZEs8WVX733iv8LC3FOrKpaiX1vETJpOsTeH9zgmVqAvmp4h3xxnk70RYQ11dhHONnm8Ra6WLYGpjb7UeHxgwbQ6lnjD2_XvnAw7yWsRI2KnAE5nM8lK6-EcqJ59kw8jVQBGpleVSQcqtR9bx9BV3SoOT6k0"
                    isAvailable={true}
                    actionButtonLabel="Join"
                  />
                  <MentorSessionCard
                    mentorName="David Chen"
                    mentorTitle="Product Lead at Meta"
                    sessionTime="Tomorrow, 10:00 AM"
                    imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuBkNPTXoKP3ZcAxLa2Pzrpj2i_PsPLt9zsA8AnFsijQ_LGraJdnChHlk6Bvg3r63WTqoM1FVfhsY3KA68yGhD4GYHafCZSGOXW3b-5TrOz6L61yvaykR16Zv2oeIglkWpcgDIZwO3gFa_riaVjIoQ9VfeikCQRCAzIEM_GMnYKU82crwz5Amwx-Aa1gVV4sOl-fl2O-YaDhPy9LtzxoDrDHnWv9nsjE9mq_MoEa6A2yn-0yEltb9uT1TUCMr-bmDgx1osWlZCkk3bE"
                    isAvailable={false}
                    actionButtonLabel="Edit"
                  />
                </div>
                <button
                  className="w-full mt-10 py-3.5 bg-[#8b5cf6]/5 hover:bg-[#8b5cf6]/10 text-[#8b5cf6] text-xs font-bold rounded-xl transition-all border border-dashed border-[#8b5cf6]/40"
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

    </div>
  );
}
