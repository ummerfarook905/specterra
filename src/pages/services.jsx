
import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const API_ORIGIN = API_URL.replace(/\/api\/?$/, "").replace(/\/+$/, "");

const getImageUrl = (image) => {
  if (!image) return "";

  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  let imagePath = image
    .replace(/^\/?api\/uploads\//i, "/uploads/")
    .replace(/^uploads\//i, "/uploads/");

  if (!imagePath.startsWith("/")) {
    imagePath = `/uploads/${imagePath}`;
  }

  return `${API_ORIGIN}${imagePath}`;
};

function ServiceCard({ service }) {
  return (
    <article className="bg-white rounded-lg overflow-hidden border border-[#edf1ee] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group">

      {/* Image */}
      <div className="relative h-[220px] sm:h-[240px] overflow-hidden">

        {service.image ? (
          <img
            src={getImageUrl(service.image)}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#e8efea]">
            <ImageIcon size={40} className="text-[#9aafa2]" />
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-2 left-2 bg-[#063629] px-3 py-1">
          <span className="font-serif text-[12px] tracking-wide font-bold text-white">
            {service.category}
          </span>
        </div>

      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">

        <h2 className="font-serif text-[19px] font-bold text-[#063629] mb-2 leading-tight">
          {service.title}
        </h2>

        <p className="text-[14px] leading-[20px] text-[#46504b] mb-3">
          {service.description}
        </p>

        {/* Features */}
        {Array.isArray(service.features) && (
          <ul className="space-y-1 mb-5">
            {service.features.map((feature, index) => (
              <li
                key={`${service.id}-${index}`}
                className="flex items-center gap-1.5 font-serif text-[13px] font-bold tracking-wide text-[#063629]"
              >
                <CheckCircle2
                  size={14}
                  className="text-[#527b0b] shrink-0"
                />
                {feature}
              </li>
            ))}
          </ul>
        )}

      </div>
    </article>
  );
}

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError("");

        // Public API request - no login required
        const response = await axios.get(`${API_URL}/services`);

        if (!response.data.success) {
          throw new Error("Failed to fetch services");
        }

        const serviceData = Array.isArray(response.data.data)
          ? response.data.data
          : [];

        const activeServices = serviceData
          .filter((service) => service.isActive !== false)
          .sort(
            (a, b) =>
              (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
          );

        setServices(activeServices);

      } catch (err) {
        console.error("Services API error:", err);

        setError(
          err.response?.data?.message ||
          "Unable to load services. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

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

            <p className="text-[16px] leading-6 text-[#46504b] mt-2">
              From heavy pharmaceutical effluent remediation to sensitive
              hydrogeological surveys, Specterra deploys certified systems
              backed by institutional engineering rigor.
            </p>

          </div>

        </div>

        {/* SERVICE CARDS */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <Loader2
              size={35}
              className="animate-spin text-[#063629]"
            />
          </div>
        ) : error ? (
          <div className="py-10 text-center">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        ) : services.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-sm text-[#46504b]">
              No services available.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
              />
            ))}

          </div>
        )}

      </div>
    </section>
  );
}
