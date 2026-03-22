import Button from '../../components/Button';
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Footer = () => {
  const { isDarkMode } = useContext(ThemeContext);

  const footerLinks = {
    platform: [
      { label: "Career Quiz", href: "#" },
      { label: "Mentor Directory", href: "#" },
      { label: "Roadmap Library", href: "#" },
      { label: "Job Board", href: "#" },
    ],
    support: [
      { label: "Help Center", href: "#" },
      { label: "Success Stories", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  };

  return (
    <footer
      className={`border-t py-14 sm:py-20 px-4 sm:px-8 md:px-10 transition-colors duration-300 ${isDarkMode ? "bg-charcoal border-white/5" : "bg-surface-light border-charcoal/10"
        }`}
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 sm:gap-14 md:gap-16">
        {/* Brand */}
        <div className="flex flex-col gap-6 sm:gap-8 col-span-2 md:col-span-1">
          <div
            className={`flex items-center gap-3 ${isDarkMode ? "text-primary" : "text-primary"
              }`}
          >
            <img src="/logo.png" alt="CareerviewX Logo" className="size-8 rounded-lg" />
            <h2
              className={`text-xl sm:text-2xl font-bold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"
                }`}
            >
              CareerviewX
            </h2>
          </div>
          <p
            className={`text-sm sm:text-base leading-relaxed transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
          >
            Empowering the next generation to navigate their career paths with
            confidence, clarity, and community.
          </p>
          <div className="flex gap-3 sm:gap-4">
            <button
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${isDarkMode
                ? "bg-white/5 text-gray-300 hover:bg-primary hover:text-white"
                : "bg-charcoal/10 text-charcoal hover:bg-primary hover:text-white"
                }`}
            >
              <span className="material-symbols-outlined text-lg sm:text-xl">public</span>
            </button>
            <button
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${isDarkMode
                ? "bg-white/5 text-gray-300 hover:bg-primary hover:text-white"
                : "bg-charcoal/10 text-charcoal hover:bg-primary hover:text-white"
                }`}
            >
              <span className="material-symbols-outlined text-lg sm:text-xl">alternate_email</span>
            </button>
          </div>
        </div>

        {/* Platform Links */}
        <div className="flex flex-col gap-5 sm:gap-8">
          <h3
            className={`font-bold text-base sm:text-lg tracking-wide transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"
              }`}
          >
            Platform
          </h3>
          <div
            className={`flex flex-col gap-4 sm:gap-5 text-sm sm:text-base transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
          >
            {footerLinks.platform.map((link, index) => (
              <a
                key={index}
                className={`hover:text-primary transition-colors ${isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Support Links */}
        <div className="flex flex-col gap-5 sm:gap-8">
          <h3
            className={`font-bold text-base sm:text-lg tracking-wide transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"
              }`}
          >
            Support
          </h3>
          <div
            className={`flex flex-col gap-4 sm:gap-5 text-sm sm:text-base transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
          >
            {footerLinks.support.map((link, index) => (
              <a
                key={index}
                className={`hover:text-primary transition-colors ${isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-5 sm:gap-8 col-span-2 md:col-span-1">
          <h3
            className={`font-bold text-base sm:text-lg tracking-wide transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"
              }`}
          >
            Stay Updated
          </h3>
          <p
            className={`text-sm sm:text-base transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
          >
            Weekly career insights and platform news.
          </p>
          <div className="flex flex-col gap-3">
            <input
              className={`w-full px-4 py-3 sm:py-4 rounded-xl border bg-transparent focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-500 text-sm sm:text-base ${isDarkMode
                ? "border-white/10 text-white"
                : "border-charcoal/10 text-charcoal"
                }`}
              placeholder="your@email.com"
              type="email"
            />
            <Button variant="primary">Subscribe</Button>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div
        className={`max-w-[1200px] mx-auto mt-14 sm:mt-20 pt-8 sm:pt-10 border-t flex flex-col sm:flex-row justify-between items-center gap-5 sm:gap-6 transition-colors duration-300 ${isDarkMode ? "border-white/5" : "border-charcoal/10"
          }`}
      >
        <p
          className={`text-xs sm:text-sm text-center sm:text-left transition-colors duration-300 ${isDarkMode ? "text-gray-500" : "text-gray-600"
            }`}
        >
          © 2026 CareerviewX Career Solutions Inc. Built with passion for the
          future.
        </p>
        <div
          className={`flex gap-6 sm:gap-10 text-xs font-semibold tracking-widest uppercase transition-colors duration-300 ${isDarkMode ? "text-gray-500" : "text-gray-600"
            }`}
        >
          <button className="hover:text-primary transition-colors bg-transparent border-0 cursor-pointer text-xs font-semibold tracking-widest uppercase">
            Terms
          </button>
          <button className="hover:text-primary transition-colors bg-transparent border-0 cursor-pointer text-xs font-semibold tracking-widest uppercase">
            Cookies
          </button>
          <button className="hover:text-primary transition-colors bg-transparent border-0 cursor-pointer text-xs font-semibold tracking-widest uppercase">
            Sitemap
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
