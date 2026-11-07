
import Services from "./services";
import About from "./about";
import Contact from "./contact";
import plantImage from "../assets/plant.png";

import {
  Leaf,
  ShieldCheck,
  ArrowRight,
  CalendarCheck,
  Settings,
  Building2,
  FlaskConical,
  Droplets,
  Recycle,
} from "lucide-react";
import TrustedPartners from "../components/trustedPartners";

const stats = [
  { value: "15+", label: "Years of Experience", icon: Settings },
  { value: "350+", label: "ETP Installations", icon: Building2 },
  { value: "100%", label: "KSPCB Clearance", icon: ShieldCheck },
  { value: "ISO", label: "9001:2015 & 14001:2015", icon: Leaf },
];

const services = [
  { title: "Wastewater Analysis", icon: FlaskConical },
  { title: "Drinking Water Testing", icon: Droplets },
  { title: "ETP/STP Commissioning", icon: Settings },
  { title: "Water Reuse & ZLD Solutions", icon: Recycle },
  { title: "Regulatory Compliance", icon: Leaf },
];

export default function Home() {
  return (
    <>
      {/* HOME / HERO SECTION */}
      <section
        id="home"
        className="relative min-h-[730px] md:min-h-[780px] lg:min-h-[820px] mb-24 overflow-visible"
      >
        {/* BACKGROUND LAYER */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${plantImage})`,
            }}
          />

          <div className="absolute inset-0 bg-black/20" />

          <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent" />
        </div>

        {/* SUBTLE DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/20" />

        {/* TEXT READABILITY OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 pt-36 md:pt-40 lg:pt-44 pb-48">

          <div className="max-w-[680px]">

            {/* ISO Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#a6f43e] bg-[#003d2c]/80 px-4 py-2 mb-6 backdrop-blur-sm">
              <Leaf size={16} className="text-[#a6f43e]" />

              <span className="text-white text-[10px] md:text-xs font-bold tracking-wide">
                ISO 9001:2015 & ISO 14001:2015 CERTIFIED
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-sans font-extrabold text-white text-[36px] sm:text-[45px] md:text-[54px] lg:text-[62px] leading-[1.08] tracking-tight">
              Advanced Environmental Engineering & Turnkey{" "}
              <span className="text-[#a7f52e]">
                Sustainable Solutions
              </span>
            </h1>

            {/* Description */}
            <p className="text-white/90 text-sm md:text-base lg:text-[17px] leading-7 mt-6 max-w-[570px]">
              ISO Certified engineering consultants delivering
              compliant Effluent Treatment Plants (ETP), water
              analysis, and environmental compliance solutions
              with zero compromise.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8">

              <a
                href="/services"
                className="inline-flex items-center justify-center gap-3 bg-[#a8f52e] text-[#073b27] px-7 py-4 rounded-full text-sm font-bold shadow-lg hover:bg-[#baff50] transition-colors duration-300"
              >
                Explore Our Services
                <ArrowRight size={19} />
              </a>

              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-3 border border-white/80 text-white px-7 py-4 rounded-full text-sm font-semibold backdrop-blur-sm hover:bg-white hover:text-[#06452f] transition-colors duration-300"
              >
                <CalendarCheck size={19} className="text-[#a8f52e]" />
                Request On-Site Audit
              </a>

            </div>
          </div>
        </div>

        {/* Curved Transition */}
        <svg
          className="absolute bottom-0 left-0 w-full h-[100px] md:h-[135px] z-10"
          viewBox="0 0 1440 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,35 C280,155 450,105 720,125 C1000,150 1230,105 1440,35 L1440,150 L0,150 Z"
            fill="#f5faf7"
          />
        </svg>

        {/* Statistics */}
        <div className="absolute z-20 left-1/2 -translate-x-1/2 bottom-[-55px] w-[90%] max-w-[950px]">

          <div className="grid grid-cols-2 lg:grid-cols-4 bg-white/95 backdrop-blur-xl rounded-2xl md:rounded-[28px] shadow-[0_15px_50px_rgba(0,50,30,0.16)] border border-white overflow-hidden">

            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className={`flex items-center justify-center gap-3 md:gap-4 p-4 md:p-6 ${
                    index < 2 ? "border-b lg:border-b-0" : ""
                  } ${
                    index % 2 === 0 ? "border-r" : ""
                  } lg:border-r lg:last:border-r-0 border-[#d4e9dd]`}
                >
                  <Icon
                    size={34}
                    strokeWidth={1.8}
                    className="text-[#25832d] shrink-0 hidden sm:block"
                  />

                  <div>
                    <h3 className="text-[#063b2b] text-2xl md:text-3xl font-extrabold">
                      {stat.value}
                    </h3>

                    <p className="text-[#52665b] text-[10px] md:text-xs font-semibold mt-1 whitespace-nowrap">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* EXISTING SERVICES PAGE */}
      <Services />

      <TrustedPartners />

      {/* EXISTING ABOUT PAGE */}
      <About  show="company" />

      {/* EXISTING CONTACT PAGE */}
      <Contact />
    </>
  );
}
