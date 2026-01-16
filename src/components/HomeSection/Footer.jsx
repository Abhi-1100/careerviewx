const Footer = () => {
  return (
    <footer className="bg-slate-900 text-indigo-200 pt-20">
      
      {/* MAIN GRID */}
      <div className="max-w-[1200px] mx-auto px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* BRAND */}
        <div>
          <h2 className="text-white text-2xl font-semibold mb-3">
            CareerViewX
          </h2>
          <p className="text-sm leading-relaxed">
            Helping businesses grow with smart solutions and expert guidance.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-white mb-4 font-medium">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="cursor-pointer hover:text-violet-400">Home</li>
            <li className="cursor-pointer hover:text-violet-400">Services</li>
            <li className="cursor-pointer hover:text-violet-400">About</li>
            <li className="cursor-pointer hover:text-violet-400">Contact</li>
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h4 className="text-white mb-4 font-medium">
            Services
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="cursor-pointer hover:text-violet-400">Business Planning</li>
            <li className="cursor-pointer hover:text-violet-400">Accounting</li>
            <li className="cursor-pointer hover:text-violet-400">Finance Optimization</li>
            <li className="cursor-pointer hover:text-violet-400">Consulting</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-white mb-4 font-medium">
            Contact
          </h4>
          <ul className="space-y-2 text-sm">
            <li>Email: info@CareerViewX.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Location: India</li>
          </ul>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="mt-16 py-5 text-center text-xs text-slate-400 border-t border-slate-800">
        © 2026 CareerViewX. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;
