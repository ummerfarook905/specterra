
import {
  SlidersHorizontal,
  Sprout,
  BadgeCheck,
  Headset,
} from "lucide-react";
import meenakshi from "../assets/meenakshi.png";
import venkadesh from "../assets/venkadesh.png";
import priya from "../assets/priya.png";
import arun from "../assets/arun.png";
import logoIcon from "../assets/logo.png";

const features = [
  {
    icon: SlidersHorizontal,
    title: "Technical Precision",
    description:
      "Every wastewater solution uses dynamic mass balance modeling, guaranteed BOD/COD reductions, and high-efficiency low-footprint designs.",
  },
  {
    icon: Sprout,
    title: "Environmental Stewardship",
    description:
      "Committed to Zero Liquid Discharge (ZLD) paradigms that protect sub-surface aquifers and reintroduce 95%+ water to industrial utility loops.",
  },
  {
    icon: BadgeCheck,
    title: "Regulatory Certainty",
    description:
      "Direct and uncompromised compliance assurance for KSPCB, CPCB, and MoEF&CC audits with 100% consent approval longevity.",
  },
  {
    icon: Headset,
    title: "24/7 Field Response",
    description:
      "On-demand chemical & biological support, bio-culture replenishments, and emergency on-site technician response teams across Karnataka.",
  },
];

// ==========================================
// LEADERSHIP TEAM DATA
// ==========================================

const teamMembers = [
  {
    name: "Dr. R. Venkatesh",
    qualification: "Ph.D., Senior Environmental Engineer",
    designation: "Managing Director & Head of EIA",
    experience: "22+ Yrs Exp",
    badge: "EIA LEADER / MOEF",
    image: venkadesh,
    description:
      "Oversees turnkey Zero Liquid Discharge designs, catalytic oxidation, and statutory environmental audits across industrial clusters.",
    skills: ["KSPCB Accredited", "ZLD Systems", "EIA Expert"],
    location: "Dir-01 / Peenya HQ",
    achievement: "85+ Papers",
  },
  {
    name: "Er. Priya Nambiar",
    qualification: "M.Tech, Chief Hydrological Scientist",
    designation: "Lead Hydrogeologist",
    experience: "16+ Yrs Exp",
    badge: "CGWA CERTIFIED",
    image: priya,
    description:
      "Leads electrical resistivity tomography, sub-surface piezometer modeling, groundwater yield audits, and rainwater harvesting designs.",
    skills: ["ERT Profiling", "Rainwater Tests", "CGWA License"],
    location: "Hyd-02 / Field Unit",
    achievement: "400+ Surveys",
  },
  {
    name: "Er. Arunachalam M.",
    qualification: "B.E. (Mech), Turnkey Projects",
    designation: "VP of Turnkey Plant Execution",
    experience: "19+ Yrs Exp",
    badge: "35+ TURNKEY PLANTS",
    image: arun,
    description:
      "Directs heavy industrial civil erection, automated pump skids, aeration diffuser arrays, and membrane bioreactor systems.",
    skills: ["Civil & Mech", "PLC Automation", "MBR/RO Skids"],
    location: "Eng-03 / Plant Works",
    achievement: "Zero LTI Record",
  },
  {
    name: "S. Meenakshi",
    qualification: "M.Sc, Industrial Microbiology",
    designation: "Head of Bio-culture Formulation",
    experience: "14+ Yrs Exp",
    badge: "ISO LAB HEAD",
    image: meenakshi,
    description:
      "Specializes in aerobic microbial consortia stabilization, MLSS propagation, and toxic-load shock recovery in biological reactors.",
    skills: ["Bio-Augmentation", "MLSS Kinetics", "Odor Mitigation"],
    location: "Bio-04 / BioMax R&D",
    achievement: "95% MLSS Yield",
  },
];

 function AboutSection() {
  return (
    <section className="w-full bg-[#eaf0ed] px-5 py-12 md:px-8 lg:px-12 lg:py-10">

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[1.42fr_1fr] gap-6 items-center">

        {/* LEFT CONTENT */}
        <div className="w-full">

          {/* Heading */}
          <div className="mb-5">
            <p className="text-[11px] font-bold tracking-[1.2px] uppercase text-[#527b0b] mb-1">
              Company Pedigree
            </p>

            <h1 className="font-serif text-[30px] md:text-[34px] lg:text-[36px] font-bold leading-[1.2] text-[#063629] max-w-[700px]">
              Engineering Sustainable Equilibrium for Indian Industry
            </h1>

            <p className="text-[14px] leading-6 text-[#46504b] mt-2 max-w-[720px]">
              Specterra Environmental Engineering Solutions is an ISO
              9001:2015 and ISO 14001:2015 certified consulting and
              infrastructure practice headquartered in Bengaluru.
              We bridge heavy industrial manufacturing with stringent
              statutory ecological thresholds.
            </p>
          </div>

          {/* FEATURE CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={index}
                  className="bg-white rounded-[5px] p-4 min-h-[160px] shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-[#063629] rounded-[2px] flex items-center justify-center mb-2">
                    <Icon size={17} className="text-white" />
                  </div>

                  <h3 className="font-serif text-[19px] font-bold leading-tight text-[#063629] mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-[12px] leading-[20px] text-[#46504b]">
                    {feature.description}
                  </p>
                </div>
              );
            })}

          </div>
        </div>

        {/* RIGHT EXECUTIVE CARD */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-9 lg:p-6 xl:p-9 min-h-[400px] lg:min-h-[400px] flex flex-col items-center justify-center text-center">

          {/* Company Logo */}
          <div className="mb-9 flex flex-col items-center">

            {/* Logo Symbol */}
            <div className="mb-1 flex h-12 w-12 items-center justify-center">
              <img
                src={logoIcon}
                alt="Specterra Logo"
                className="h-full w-full object-contain"
              />
            </div>

            <h2 className="text-[21px] font-black tracking-tight text-[#16442e] leading-none">
              SPECTERRA
              <sup className="text-[8px] ml-0.5">®</sup>
            </h2>

            <p className="text-[8px] font-bold tracking-wide text-[#244f35] mt-1">
              AN ISO CERTIFIED COMPANY
            </p>
          </div>

          {/* Executive Information */}
          <div className="w-full mb-5">

            <p className="text-[11px] font-bold tracking-[0.7px] uppercase text-[#527b0b] mb-1">
              Certified Executive Leadership
            </p>

            <blockquote className="font-serif italic text-[15px] leading-[24px] text-[#222] mb-2">
              "Our mission is to decouple industrial manufacturing
              productivity from freshwater exhaustion, delivering
              foolproof regulatory compliance through sound
              hydrological science."
            </blockquote>

            <h3 className="font-serif font-bold text-[13px] text-[#063629]">
              Dr. R. Venkatesh, Ph.D.
            </h3>

            <p className="text-[12px] text-[#46504b] mt-1">
              Managing Director & Senior Environmental Engineer
            </p>

          </div>

          {/* Certification Bar */}
          <div className="w-full bg-[#f0f4f1] rounded-[4px] px-2 py-4 grid grid-cols-3 divide-x divide-[#c8d2cc]">

            <div className="px-1">
              <h4 className="font-serif text-[11px] font-bold tracking-wide text-[#063629]">
                ISO 9001:2015
              </h4>
              <p className="text-[10px] text-[#46504b]">
                Quality Control
              </p>
            </div>

            <div className="px-1">
              <h4 className="font-serif text-[11px] font-bold tracking-wide text-[#063629]">
                ISO 14001:2015
              </h4>
              <p className="text-[10px] text-[#46504b]">
                Ecological Mgt
              </p>
            </div>

            <div className="px-1">
              <h4 className="font-serif text-[11px] font-bold tracking-wide text-[#527b0b]">
                NABL / QCI
              </h4>
              <p className="text-[10px] text-[#46504b]">
                Accredited EIA
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

// ==========================================
// FUNCTION 2: LEADERSHIP TEAM
// ==========================================



function LeadershipSection() {
  return (
    <section className="w-full bg-[#eaf0ed] px-4 py-8 sm:px-6 md:px-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-[1440px]">

        {/* HEADER */}
        <div className="mb-4 grid grid-cols-1 items-start gap-3 md:grid-cols-[1.5fr_1fr] md:gap-8">
          <div>
            <p className="mb-1 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[1.2px] text-[#527b0b]">
              <span className="h-1 w-1 rounded-full bg-[#527b0b]" />
              Technical Governance & Research
            </p>

            <h2 className="font-serif text-[22px] font-bold leading-[1.15] text-[#063629] sm:text-[26px] lg:text-[30px]">
              Engineering & Scientific Leadership Team
            </h2>
          </div>

          <p className="max-w-[450px] text-[9px] leading-[15px] text-[#46504b] md:justify-self-end md:text-[10px]">
            Doctoral researchers, accredited EIA directors, and licensed
            hydrologists directing statutory compliance, biological
            engineering, and turnkey plant execution across South India.
          </p>
        </div>

        {/* LEADERSHIP CARDS */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

          {teamMembers.map((member) => (
            <article
              key={member.name}
              className="flex min-w-0 flex-col overflow-hidden rounded-[5px] border border-[#dce5df] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >

              {/* IMAGE AREA */}
              <div className="relative aspect-[1.15/1] w-full overflow-hidden bg-gradient-to-br from-[#164c3a] via-[#0b382a] to-[#05291f]">

                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5" />

                {/* TOP BADGE */}
                <span className="absolute left-1.5 top-1.5 max-w-[85%] truncate rounded-[2px] border border-[#9dfb58]/30 bg-[#063629]/95 px-1.5 py-1 text-[7px] font-bold tracking-wide text-[#c9ff8c]">
                  <span className="mr-1 text-[#9dfb58]">✥</span>
                  {member.badge}
                </span>

                {/* EXPERIENCE BADGE */}
                <span className="absolute bottom-1.5 right-1.5 rounded-[2px] bg-[#a8e85c] px-1.5 py-0.5 text-[7px] font-bold text-[#153b20]">
                  {member.experience}
                </span>
              </div>

              {/* CARD CONTENT */}
              <div className="flex flex-1 flex-col p-2 sm:p-2.5">

                {/* NAME */}
                <h3 className="font-serif text-[16px] font-bold leading-tight text-[#063629]">
                  {member.name}
                </h3>

                {/* QUALIFICATION */}
                <p className="mt-0.5 text-[10px] font-bold leading-[12px] text-[#527b0b]">
                  {member.qualification}
                </p>

                {/* DESIGNATION */}
                <p className="text-[10px] leading-[12px] text-[#46504b]">
                  {member.designation}
                </p>

                {/* DESCRIPTION */}
                <p className="mt-2 text-[10px] leading-[13px] text-[#343d38]">
                  {member.description}
                </p>

                {/* SKILLS */}
                <div className="mt-2 flex flex-wrap gap-1">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="border border-[#dce5df] bg-[#edf3ef] px-1 py-0.5 text-[9px] font-semibold leading-tight text-[#244b36]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* BOTTOM INFORMATION */}
                <div className="mt-auto pt-3">

                  <div className="mb-1.5 flex items-center justify-between gap-1 border-t border-[#e3e9e5] pt-2 text-[9px]">
                    <span className="truncate text-[#68756d]">
                      {member.location}
                    </span>

                    <span className="shrink-0 font-bold text-[#527b0b]">
                      {member.achievement}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}

        </div>
      </div>
    </section>
  );
}



// ==========================================
// MAIN ABOUT COMPONENT
// ==========================================

export default function About({ show = "all" }) {
  return (
    <main>
      {(show === "all" || show === "company") && <AboutSection />}

      {(show === "all" || show === "leadership") && (
        <LeadershipSection />
      )}
    </main>
  );
}
