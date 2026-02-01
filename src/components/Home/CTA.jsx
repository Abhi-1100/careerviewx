import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const CTA = () => {
  const navigate = useNavigate();
  return (
    <section className="flex flex-1 justify-center py-28 bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/20 opacity-30 blur-[100px] -z-10 rounded-full scale-150 translate-y-20"></div>
      <div className="layout-content-container flex flex-col max-w-[1000px] flex-1 px-10 text-center items-center text-white bg-primary p-16 md:p-24 rounded-[3rem] shadow-[0_20px_60px_rgba(139,92,246,0.4)]">
        <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[1.1]">Ready to find your future?</h2>
        <p className="text-lg md:text-2xl text-white/90 mb-12 max-w-[680px] font-medium">Join 50,000+ students who are already building their dream careers with CareerViewX.</p>
        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
          <Button variant="ghost" className="bg-white text-primary hover:scale-105 transition-all font-black px-12 py-6 rounded-2xl text-xl shadow-2xl shadow-black/20" onClick={() => navigate('/assessments')}>
            Take the Free Assessment
          </Button>
          <Button variant="primary" className="px-12 py-6 rounded-2xl text-xl font-black">
            Book a Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA; 
