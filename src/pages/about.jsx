
import {
  SlidersHorizontal,
  Sprout,
  BadgeCheck,
  Headset,
} from "lucide-react";

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

export default function AboutSection() {
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
            <div className="relative w-12 h-10 mb-1 flex items-center justify-center">
              <div className="absolute w-6 h-6 border-[4px] border-[#123e2c] rotate-45" />
              <div className="absolute w-3 h-3 border-[3px] border-[#9ba91d] rotate-45 bg-white" />
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
