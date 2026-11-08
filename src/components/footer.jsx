
import { BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-[#f0f4f2] text-[#424b46] px-6 md:px-8 lg:px-11 pt-10 pb-6">

      <div className="max-w-[1440px] mx-auto">

        {/* MAIN FOOTER */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.65fr_1.15fr_0.75fr_1.2fr] gap-8 lg:gap-10">

          {/* COMPANY INFORMATION */}
          <div>
            <h2 className="font-serif text-[20px] font-bold text-[#063629] leading-tight">
              SPECTERRA
            </h2>

            <p className="font-serif text-[14px] font-bold tracking-[0.5px] text-[#46504b] mt-1">
              ENVIRONMENTAL ENGINEERING SOLUTIONS
            </p>

            <p className="text-[14px] leading-[20px] mt-4 max-w-[370px]">
              Pioneering advanced wastewater telemetry, environmental
              impact audits, zero liquid discharge infrastructure, and
              regulatory statutory clearance architecture across India.
            </p>

            {/* Certification Badge */}
            <div className="inline-flex items-center gap-2 bg-[#104735] text-white rounded-[4px] px-4 py-2 mt-4">

              <BadgeCheck size={17} className="text-[#a7e64c] shrink-0" />

              <div>
                <p className="font-serif text-[14px] font-bold tracking-wide">
                  ISO 9001:2015 & ISO 14001:2015
                </p>

                <p className="font-serif text-[12px] text-[#b9d2c6]">
                  Accredited Environmental Consultant
                </p>
              </div>

            </div>
          </div>

          {/* QUICK LINKS */}
            <div>
              <h3 className="font-serif text-[14px] font-bold tracking-wide text-[#063629] uppercase mb-3">
                Quick Links
              </h3>

              <ul className="space-y-[6px] text-[14px] leading-[18px]">

                <li>
                  <Link
                    to="/"
                    className="hover:text-[#104735] transition-colors duration-200 cursor-pointer"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    to="/services"
                    className="hover:text-[#104735] transition-colors duration-200 cursor-pointer"
                  >
                    Services
                  </Link>
                </li>

                <li>
                  <Link
                    to="/about"
                    className="hover:text-[#104735] transition-colors duration-200 cursor-pointer"
                  >
                    About Us
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contact"
                    className="hover:text-[#104735] transition-colors duration-200 cursor-pointer"
                  >
                    Contact Us
                  </Link>
                </li>

              </ul>
            </div>

          {/* REGULATORY LIAISON */}
          <div>
            <h3 className="font-serif text-[12px] font-bold tracking-wide text-[#063629] uppercase mb-3">
              Regulatory Liaison
            </h3>

            <ul className="space-y-[6px] text-[14px] leading-[18px]">
              <li>Effluent Treatment Plants (ETP)</li>
              <li>Sewage Treatment Plants (STP)</li>
              <li>Zero Liquid Discharge (ZLD)</li>
              <li>Continuous Emission Telemetry (CEMS)</li>
              <li>Hazardous Waste Management</li>
              <li>Environmental Impact Assessment</li>
            </ul>
          </div>

          {/* REGISTERED OFFICE */}
          <div>
            <h3 className="font-serif text-[12px] font-bold tracking-wide text-[#063629] uppercase mb-3">
              Registered Office
            </h3>

            <div className="text-[14px] leading-[20px]">
              <p>
                Specterra Towers, Plot #48-B
                <br />
                Peenya Industrial Area, 2nd Phase
                <br />
                Bengaluru, Karnataka - 560058
              </p>

              <div className="mt-2 space-y-0.5">
                <p>
                  <strong className="font-serif text-[#222]">Desk:</strong>{" "}
                  <a href="tel:+9108023456789" className="hover:text-[#104735]">
                    +91 (080) 2345 6789
                  </a>
                </p>

                <p>
                  <strong className="font-serif text-[#222]">Direct:</strong>{" "}
                  <a href="tel:+919845012345" className="hover:text-[#104735]">
                    +91 98450 12345
                  </a>
                </p>

                <p>
                  <strong className="font-serif text-[#222]">Email:</strong>{" "}
                  <a
                    href="mailto:compliance@specterra.com"
                    className="hover:text-[#104735] break-all"
                  >
                    compliance@specterra.com
                  </a>
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM FOOTER */}
        <div className="mt-14 pt-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">

          <p className="text-[12px] text-[#46504b] leading-5">
            © 2025 Specterra Engineering & Environmental Pvt. Ltd.
            All rights reserved. Registered ISO Certified Enterprise.
          </p>

          <div className="flex flex-wrap items-center gap-x-7 gap-y-3">

            <a
              href="#statutory-terms"
              className="font-serif text-[11px] font-bold tracking-wide hover:text-[#527b0b] transition-colors"
            >
              Statutory Terms
            </a>

            <a
              href="#privacy-policy"
              className="font-serif text-[11px] font-bold tracking-wide hover:text-[#527b0b] transition-colors"
            >
              Privacy Policy
            </a>

            <a
              href="tel:+9108023456789"
              className="font-serif text-[11px] font-bold tracking-wide hover:text-[#527b0b] transition-colors"
            >
              Emergency Telemetry
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}
