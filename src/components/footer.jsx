import { BadgeCheck, ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import footerLogo from "../assets/footer.png";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
];

const regulatoryServices = [
  "Effluent Treatment Plants (ETP)",
  "Sewage Treatment Plants (STP)",
  "Zero Liquid Discharge (ZLD)",
  "Continuous Emission Telemetry (CEMS)",
  "Hazardous Waste Management",
  "Environmental Impact Assessment",
];

function FooterHeading({ children }) {
  return (
    <h3 className="mb-5 font-serif text-sm font-bold uppercase tracking-wide text-[#063629]">
      {children}
      <span className="mt-3 block h-1 w-12 rounded-full bg-[#9bdc28]" />
    </h3>
  );
}

function ContactLine({ icon: Icon, children, href }) {
  const content = (
    <span className="flex items-start gap-2.5">
      <Icon size={17} className="mt-0.5 shrink-0 text-[#57951e]" aria-hidden="true" />
      <span>{children}</span>
    </span>
  );

  return href ? (
    <a href={href} className="block transition-colors hover:text-[#17613e]">
      {content}
    </a>
  ) : (
    <div>{content}</div>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-[#f0f4f2] px-5 py-10 text-[#424b46] sm:px-7 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-[1600px]">
        {/* FIVE-COLUMN FOOTER */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[1.55fr_0.72fr_1.25fr_1fr_1.15fr] lg:gap-0">
          {/* COMPANY */}
          <section className="lg:pr-7">
            {/* COMPANY LOGO */}
            <div className="mb-4 flex items-center">
              <img
                src={footerLogo}
                alt="SPECTERRA Environmental Engineering Solutions"
                className="h-auto w-full max-w-[200px] object-contain object-left"
              />
            </div>
            <p className="mt-5 max-w-[460px] text-sm leading-6">
              Pioneering advanced wastewater telemetry, environmental impact
              audits, zero liquid discharge infrastructure, and regulatory
              statutory clearance architecture across India.
            </p>
            <div className="mt-6 inline-flex max-w-full items-center gap-3 rounded-md bg-[#104735] px-4 py-3 text-white shadow-sm">
              <BadgeCheck size={27} className="shrink-0 text-[#a7e64c]" />
              <span className="h-9 w-px shrink-0 bg-white/30" />
              <span>
                <span className="block font-serif text-sm font-bold leading-5 sm:text-[15px]">
                  ISO 9001:2015
                </span>
                <span className="block font-serif text-xs leading-4 text-[#c5d9cf]">
                  Accredited Environmental Consultant
                </span>
              </span>
            </div>
          </section>

          {/* QUICK LINKS */}
          <section className="border-t border-[#cbd8d0] pt-6 sm:border-t-0 sm:pt-0 lg:border-l lg:px-6 lg:pt-0">
            <FooterHeading>Quick Links</FooterHeading>
            <ul className="space-y-4 text-sm">
              {quickLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="group flex items-center gap-2 transition-colors hover:text-[#17613e]">
                    <ChevronRight size={16} className="shrink-0 text-[#57951e] transition-transform group-hover:translate-x-1" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* REGULATORY LIAISON */}
          <section className="border-t border-[#cbd8d0] pt-6 sm:border-t-0 sm:pt-0 lg:border-l lg:px-6 lg:pt-0">
            <FooterHeading>Regulatory Liaison</FooterHeading>
            <ul className="space-y-3 text-sm leading-5">
              {regulatoryServices.map((service) => (
                <li key={service} className="flex items-start gap-2">
                  <ChevronRight size={16} className="mt-0.5 shrink-0 text-[#57951e]" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* HEAD OFFICE */}
          <section className="border-t border-[#cbd8d0] pt-6 sm:border-t-0 sm:pt-0 lg:border-l lg:px-6 lg:pt-0">
            <FooterHeading>Head Office</FooterHeading>
            <div className="space-y-5 text-sm leading-5">
              <ContactLine icon={MapPin}>
                Ramankeriyil Building,<br />
                Chengalam South PO,<br />
                Kottayam 686022
              </ContactLine>
              <ContactLine icon={Phone} href="tel:+919188330335">
                <strong className="font-serif text-[#222]">Direct:</strong> +91 9188330335
              </ContactLine>
              <ContactLine icon={Mail} href="mailto:project@specterra.in">
                <strong className="font-serif text-[#222]">Email:</strong> project@specterra.in
              </ContactLine>
            </div>
          </section>

          {/* BRANCH OFFICES */}
          <section className="border-t border-[#cbd8d0] pt-6 sm:border-t-0 sm:pt-0 lg:border-l lg:pl-6 lg:pt-0">
            <FooterHeading>Branch Offices</FooterHeading>
            <div className="space-y-6 text-sm leading-5">
              <div className="space-y-3">
                <p className="font-semibold text-[#063629]">SPECTERRA ENVIRO CONSULTANTS</p>
                <ContactLine icon={MapPin}>
                  Ground floor, Lourde Matha Church Building, Aruvikuzhi PO,
                  Kottayam 686503
                </ContactLine>
                <ContactLine icon={Phone} href="tel:+919567700335">
                  <strong className="font-serif text-[#222]">Direct:</strong> +91 9567700335
                </ContactLine>
              </div>

              <div className="space-y-3 border-t border-[#cbd8d0] pt-4">
                <p className="font-semibold text-[#063629]">SPECTERRA ENVIRO GEO CONSULTANTS</p>
                <ContactLine icon={MapPin}>
                  Kuttappy Complex, Nanminda 14, Balussery PO, Kozhikode 673613
                </ContactLine>
                <ContactLine icon={Phone} href="tel:+918075364268">
                  <strong className="font-serif text-[#222]">Direct:</strong> +91 8075364268
                </ContactLine>
              </div>
            </div>
          </section>
        </div>

        {/* BOTTOM FOOTER */}
        <div className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-[#9fb9a9] pt-5 lg:flex-row lg:items-center">
          <p className="text-xs leading-5 text-[#46504b]">
            © 2025 Specterra Engineering &amp; Environmental Pvt. Ltd. All rights
            reserved. Registered ISO Certified Enterprise.
          </p>
          <nav aria-label="Footer legal links" className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <a href="#statutory-terms" className="font-serif text-xs font-bold text-[#063629] transition-colors hover:text-[#57951e]">
              Statutory Terms
            </a>
            <span className="hidden h-4 w-px bg-[#9fb9a9] sm:block" />
            <a href="#privacy-policy" className="font-serif text-xs font-bold text-[#063629] transition-colors hover:text-[#57951e]">
              Privacy Policy
            </a>
            <span className="hidden h-4 w-px bg-[#9fb9a9] sm:block" />
            <a href="tel:+919188330335" className="font-serif text-xs font-bold text-[#063629] transition-colors hover:text-[#57951e]">
              Emergency Telemetry
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
