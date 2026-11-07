
import {
  CheckCircle2,
  ArrowRight,
  Download,
  FlaskConical,
} from "lucide-react";

const services = [
  {
    category: "ETP SYSTEMS",
    title: "ETP (Effluent Treatment Plants)",
    image:
      "https://images.unsplash.com/photo-1581093458791-9d42e3c2c7d3?auto=format&fit=crop&w=900&q=85",
    description:
      "Turnkey design, fabrication, civil works, and commissioning of primary, secondary, and tertiary Effluent Treatment Plants tailored for pharmaceutical, chemical, textile, and manufacturing industries. Zero Liquid Discharge (ZLD) enabled.",
    features: [
      "Physicochemical Coagulation",
      "Aeration & Clarifiers",
      "MBR & RO Polishing",
    ],
    button: "Learn More & View Specs",
    link: "#etp",
    type: "normal",
  },
  {
    category: "TURNKEY ERECTION",
    title: "Equipment & Plant Installation",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=85",
    description:
      "Precision on-site erection, mechanical piping, automated PLC pump skids, aeration diffuser networks, and turnkey mechanical & electrical commissioning supervised by certified industrial engineers.",
    features: [
      "Turnkey Erection & Piping",
      "Hydro-testing & Rigorous QA",
      "Preventative Maintenance AMCs",
    ],
    button: "View Installation Services",
    link: "#installation",
    type: "normal",
  },
  {
    category: "BIO-AUGMENTATION",
    title: "Aerobic Bacteria Culture",
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=900&q=85",
    description:
      "High-potency bio-augmentation and specialized microbial aerobic bacteria consortia to rapidly develop MLSS, accelerate BOD/COD degradation, and stabilize biological reactor performance.",
    features: [
      "Rapid MLSS Development",
      "Odor Control & Sludge Reduction",
      "Lab-tested Viability & Potency",
    ],
    button: "Order Biological Culture",
    link: "#biological-culture",
    type: "normal",
  },
];

function ServiceCard({ service }) {
  return (
    <article className="bg-white rounded-lg overflow-hidden border border-[#edf1ee] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group">

      {/* Image */}
      <div className="relative h-[220px] sm:h-[240px] overflow-hidden">

        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Category Badge */}
        <div className="absolute top-2 left-2 bg-[#063629] px-3 py-1">
          <span className="font-serif text-[10px] tracking-wide font-bold text-white">
            {service.category}
          </span>
        </div>

      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">

        <h2 className="font-serif text-[19px] font-bold text-[#063629] mb-2 leading-tight">
          {service.title}
        </h2>

        <p className="text-[12px] leading-[20px] text-[#46504b] mb-3">
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-1 mb-5">
          {service.features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center gap-1.5 font-serif text-[11px] font-bold tracking-wide text-[#063629]"
            >
              <CheckCircle2
                size={14}
                className="text-[#527b0b] shrink-0"
              />
              {feature}
            </li>
          ))}
        </ul>

      </div>
    </article>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="w-full min-h-screen bg-[#f5f9f7] px-5 py-10 md:px-8 lg:px-12 lg:py-10"
    >
      <div className="max-w-[1440px] mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">

          <div className="max-w-[700px]">

            <p className="text-[11px] font-bold tracking-[1.2px] uppercase text-[#527b0b] mb-1">
              Certified Engineering Competencies
            </p>

            <h1 className="font-serif text-[30px] md:text-[36px] lg:text-[36px] leading-[1.2] font-bold text-[#063629]">
              Tailored Environmental Solutions for
              <br className="hidden md:block" />
              Industry & Municipalities
            </h1>

            <p className="text-[14px] leading-6 text-[#46504b] mt-2">
              From heavy pharmaceutical effluent remediation to sensitive
              hydrogeological surveys, Specterra deploys certified systems
              backed by institutional engineering rigor.
            </p>

          </div>

        </div>

        {/* SERVICE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
            />
          ))}

        </div>

      </div>
    </section>
  );
}
