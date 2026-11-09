
import { useState } from "react";
import {
  PhoneCall,
  MailCheck,
  Building2,
  Clock,
  LockKeyhole,
  Send,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    industry: "",
    service: "",
    phone: "",
    location: "",
    requirements: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Technical request submitted successfully!");
  };

  const labelStyle =
    "block text-[10px] font-bold tracking-[0.6px] text-[#063629] uppercase mb-2";

  const inputStyle =
    "w-full h-[41px] px-4 text-[14px] text-gray-800 placeholder:text-[#9ca7b7] bg-white border border-[#f1f2f1] rounded-[2px] outline-none focus:border-[#174b39] transition-all";

  return (
    <section className="min-h-screen bg-[#f5f9f7] px-5 py-8 md:px-8 md:py-[42px]">

      <div className="max-w-[1184px] mx-auto grid grid-cols-1 lg:grid-cols-[480px_minmax(0,1fr)] gap-6 items-stretch">

        {/* LEFT CONTACT PANEL */}
        <div className="bg-[#002c20] rounded-lg text-white px-8 md:px-10 py-10 md:py-10 shadow-[0_12px_25px_rgba(0,0,0,0.12)] flex flex-col justify-center min-h-[626px]">

          {/* Heading */}
          <div className="mb-5">
            <p className="text-[11px] font-bold tracking-[0.7px] text-[#a7e64c] uppercase mb-1">
              Direct Liaison Desk
            </p>

            <h1 className="font-serif text-[32px] leading-[1.38] font-bold text-white">
              Schedule an On-Site
              <br />
              Engineering Audit
            </h1>

            <p className="text-[14px] leading-[24px] text-[#a8c8bb] mt-1">
              Connect directly with our senior environmental engineers
              and certified hydrologists. We deliver preliminary plant
              assessments within 24 hours.
            </p>
          </div>

          {/* Hotline */}
          <div className="flex gap-2 mb-4">
            <div className="w-10 h-10 shrink-0 bg-[#104735] rounded flex items-center justify-center">
              <PhoneCall size={20} className="text-[#a7e64c]" />
            </div>

            <div className="flex-1">
              <p className="text-[10px] tracking-[0.6px] font-bold text-[#a8c8bb] uppercase">
                Direct Engineering Hotline
              </p>

              <a
                href="tel:+9108023456789"
                className="font-serif text-[18px] font-bold text-white"
              >
                 +91 9188330335
              </a>

            </div>
          </div>

          {/* Email */}
          <div className="flex gap-2 mb-4">
            <div className="w-10 h-10 shrink-0 bg-[#104735] rounded flex items-center justify-center">
              <MailCheck size={21} className="text-[#a7e64c]" />
            </div>

            <div className="flex-1">
              <p className="text-[10px] tracking-[0.6px] font-bold text-[#a8c8bb] uppercase">
                Statutory & Technical Desks
              </p>

              <a
                href="mailto:info@specterra.com"
                className="text-[14px] font-semibold text-white"
              >
                project@specterra.in
              </a>

              {/* <p className="text-[12px] text-[#a8c8bb] mt-1">
                compliance@specterra.com (KSPCB Inquiries)
              </p> */}
            </div>
          </div>

          {/* Address */}
          <div className="flex gap-2 mb-6">
            <div className="w-10 h-10 shrink-0 bg-[#104735] rounded flex items-center justify-center">
              <Building2 size={21} className="text-[#a7e64c]" />
            </div>

            <div className="flex-1">
              <p className="text-[10px] tracking-[0.6px] font-bold text-[#a8c8bb] uppercase mb-0.5">
                Central Engineering Facility
              </p>

              <p className="text-[14px] leading-[24px] text-white">
                Ramankeriyil Building, 
                <br />
                Chengalam South PO,
                <br />
                Kottayam 686022
              </p>
            </div>
          </div>

          {/* Response SLA */}
          <div className="bg-[#104333] rounded-[3px] px-4 py-4 flex items-center gap-2">
            <Clock size={25} className="text-[#a7e64c] shrink-0" />

            <div>
              <p className="text-[10px] tracking-[0.6px] font-bold text-[#a7e64c] uppercase">
                24-Hour Regulatory Response SLA
              </p>

              <p className="text-[11px] leading-[18px] text-[#a8c8bb]">
                Notice hearings, emergency CTO renewals, and bio-culture
                orders dispatched rapidly.
              </p>
            </div>
          </div>

        </div>

        {/* RIGHT FORM PANEL */}
        <div className="bg-white rounded-lg shadow-[0_3px_5px_rgba(0,0,0,0.12)] px-7 py-10 md:px-10 lg:px-10 xl:px-10 flex flex-col justify-center min-h-[626px]">

          {/* Form Heading */}
          <div className="mb-5">
            <p className="text-[11px] tracking-[0.6px] font-bold text-[#527b0b] uppercase mb-1">
              Fast Response Form
            </p>

            <h2 className="font-serif text-[23px] leading-tight font-bold text-[#063629]">
              Request Plant Audit or Technical Proposal
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-[15px]">

            {/* First Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label className={labelStyle}>
                  Full Name *
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Ramesh Hegde"
                  className={inputStyle}
                  required
                />
              </div>

              <div>
                <label className={labelStyle}>
                  Company / Facility Name *
                </label>

                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. Apex Pharma Chemicals Ltd"
                  className={inputStyle}
                  required
                />
              </div>

            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label className={labelStyle}>
                  Industry Type / Sector *
                </label>

                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  placeholder="e.g. Pharmaceutical, Textile, Food Processing"
                  className={inputStyle}
                  required
                />
              </div>

              <div>
                <label className={labelStyle}>
                  Service Required 
                </label>

                <input
                  type="text"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  placeholder="e.g. Pharmaceutical, Textile, Food Processing"
                  className={inputStyle}
                  required
                />
              </div>

            </div>

            {/* Third Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label className={labelStyle}>
                  Phone Number *
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className={inputStyle}
                  required
                />
              </div>

              <div>
                <label className={labelStyle}>
                  Plant Location / City *
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Bommasandra Industrial Area"
                  className={inputStyle}
                  required
                />
              </div>

            </div>

            {/* Requirements */}
            <div>
              <label className={labelStyle}>
                Effluent / Project Requirements & Volume
              </label>

              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows={3}
                placeholder="Specify effluent volume (KLD/MLD), existing COD/BOD values, notice status or borehole survey requests..."
                className="w-full h-[88px] px-4 py-3 text-[14px] leading-[23px] text-gray-800 placeholder:text-[#9ca7b7] bg-white border border-[#f1f2f1] rounded-[2px] outline-none focus:border-[#174b39] transition-all resize-none"
              />
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-0">

              <div className="flex items-center gap-1.5 text-[12px] text-[#4b5550]">
                <LockKeyhole size={14} className="text-[#527b0b]" />
                <span>ISO Certified Confidentiality Assured</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-[265px] h-[36px] bg-[#104735] hover:bg-[#002c20] text-white font-serif font-bold text-[13px] rounded-[4px] shadow-md flex items-center justify-center gap-2 transition-colors duration-300"
              >
                Submit Technical Request
                <Send size={15} />
              </button>

            </div>

          </form>

        </div>

      </div>
    </section>
  );
}
