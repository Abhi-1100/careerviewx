import Button from '../../components/Button';

const Footer = () => {
  const footerLinks = {
    platform: [
      { label: "Career Quiz", href: "#" },
      { label: "Mentor Directory", href: "#" },
      { label: "Roadmap Library", href: "#" },
      { label: "Job Board", href: "#" }
    ],
    support: [
      { label: "Help Center", href: "#" },
      { label: "Success Stories", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Privacy Policy", href: "#" }
    ]
  };

  return (
    <footer className="bg-charcoal border-t border-white/5 py-20 px-10">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="flex flex-col gap-8 col-span-1 md:col-span-1">
          <div className="flex items-center gap-3 text-primary">
            <div className="size-8 flex items-center justify-center bg-primary rounded-lg text-white">
              <span className="material-symbols-outlined">explore</span>
            </div>
            <h2 className="text-white text-2xl font-bold">CareerViewX</h2>
          </div>
          <p className="text-base text-gray-400 leading-relaxed">
            Empowering the next generation to navigate their career paths with confidence, clarity, and community.
          </p>
          <div className="flex gap-4">
            <a class="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-300 hover:bg-primary hover:text-white transition-all duration-300" href="#">
              <span className="material-symbols-outlined">public</span>
            </a>
            <a class="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-300 hover:bg-primary hover:text-white transition-all duration-300" href="#">
              <span className="material-symbols-outlined">alternate_email</span>
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <h3 className="font-bold text-white text-lg tracking-wide">Platform</h3>
          <div className="flex flex-col gap-5 text-base text-gray-400">
            {footerLinks.platform.map((link, index) => (
              <a key={index} class="hover:text-primary transition-colors" href={link.href}>{link.label}</a>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <h3 className="font-bold text-white text-lg tracking-wide">Support</h3>
          <div className="flex flex-col gap-5 text-base text-gray-400">
            {footerLinks.support.map((link, index) => (
              <a key={index} class="hover:text-primary transition-colors" href={link.href}>{link.label}</a>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <h3 className="font-bold text-white text-lg tracking-wide">Stay Updated</h3>
          <p className="text-base text-gray-400">Weekly career insights and platform news.</p>
          <div className="flex flex-col gap-3">
            <input className="w-full px-4 py-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="your@email.com" type="email"/>
            <Button variant="primary">Subscribe</Button>
          </div>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm text-gray-500">© 2026 CareerViewX Career Solutions Inc. Built with passion for the future.</p>
        <div className="flex gap-10 text-xs text-gray-500 font-semibold tracking-widest uppercase">
          <a class="hover:text-white transition-colors" href="#">Terms</a>
          <a class="hover:text-white transition-colors" href="#">Cookies</a>
          <a class="hover:text-white transition-colors" href="#">Sitemap</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
