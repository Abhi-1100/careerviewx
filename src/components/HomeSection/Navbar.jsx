const Navbar = () => {
  return (
    <header className="w-full bg-[rgb(233,237,255)] sticky top-0 z-[100] border-b border-gray-200">
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="text-2xl font-bold text-slate-900">
          CareerViewX
        </div>

        {/* Menu */}
        <nav className="hidden md:flex gap-7">
          <a href="#Home" className="text-slate-600 font-medium hover:text-violet-500">
            Home
          </a>
          <a href="#Services" className="text-slate-600 font-medium hover:text-violet-500">
            Services
          </a>
          <a href="#About" className="text-slate-600 font-medium hover:text-violet-500">
            About
          </a>
          <a href="#Testimonials" className="text-slate-600 font-medium hover:text-violet-500">
            Testimonials
          </a>
          <a href="#Clients" className="text-slate-600 font-medium hover:text-violet-500">
            Clients
          </a>
          <a href="#Contact" className="text-slate-600 font-medium hover:text-violet-500">
            Contact
          </a>
        </nav>

        {/* CTA */}
        <button className="bg-violet-500 text-white px-6 py-2 rounded-full font-medium hover:bg-violet-600 transition">
          Learn More
        </button>

      </div>
    </header>
  );
};

export default Navbar;
