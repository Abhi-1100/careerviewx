import React from "react";
import InternalNavbar from "../components/InternalNavbar";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="bg-deep-charcoal font-display min-h-screen flex flex-col selection:bg-primary/30 selection:text-white">
      <InternalNavbar/>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[960px] w-full flex flex-col items-center text-center relative z-10">
          <div className="w-full max-w-lg mb-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="w-full bg-center bg-no-repeat bg-contain flex flex-col justify-end overflow-hidden min-h-[320px] filter brightness-75 contrast-125" data-alt="Playful illustration of a student looking at a map and signpost" style={{backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD9c6kx2N5d0o-JIaR2i7N5L1DtFZCQVWus3UfYUauGHpNCRpbQeTnELOTom52BOJuc0DzHQzUF9uahzWNpxv2ItjcHpBICmfQ-hZM_uPWd85C4URBl8YlZWSpjH7TK6AO8dRiEfg0YBv2wZU8nB2djHE0z39eMfP3hHSRETim5CKAzz42neXFHfYzOUtzqtaksKnuA2RA9etEe89JqD8miw5MVb0W0jdYwQ3uqaUDyTGzi6IAKyCgvu-WYGWZdkI-An5QiVXnLL4c')`}}>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            </div>
          </div>

          <h1 className="neon-glow text-primary tracking-tighter text-[140px] md:text-[180px] font-extrabold leading-none select-none">
            404
          </h1>

          <div className="flex flex-col gap-4 mb-10 max-w-2xl px-4">
            <p className="text-white tracking-tight text-3xl md:text-4xl font-extrabold leading-tight">
              Oops! This path hasn't been discovered yet
            </p>
            <p className="text-white/60 text-lg font-normal leading-relaxed">
              It looks like the page you are looking for doesn't exist, has been moved, or is hiding behind a career milestone you haven't reached yet.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md px-4">
            <button onClick={() => navigate('/dashboard')} className="flex-1 flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-6 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] transition-all hover:scale-[1.02] active:scale-[0.98] button-glow">
              <span className="material-symbols-outlined mr-2">dashboard</span>
              <span className="truncate">Back to Dashboard</span>
            </button>
            <button onClick={() => navigate('/')} className="flex-1 flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-6 border-2 border-primary/50 bg-transparent text-primary text-base font-bold leading-normal tracking-[0.015em] transition-all hover:bg-primary/10">
              <span className="material-symbols-outlined mr-2">home</span>
              <span className="truncate">Go to Home</span>
            </button>
          </div>
        </div>
      </main>

      <footer className="py-10 text-center text-white/30 text-sm">
        <p>© 2024 PathFinder Career Guidance. Stay on track!</p>
      </footer>
    </div>
  );
}
