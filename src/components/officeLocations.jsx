
import { useEffect } from "react";

import {
  Building2,
  Mail,
  MapPin,
  Phone,
  Navigation,
  MapPinned,
} from "lucide-react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

// --------------------------------------------------
// OFFICE DETAILS
// --------------------------------------------------

const offices = [
  {
    type: "Head Office",
    name: "SPECTERRA",
    address: [
      "Ramankeriyil Building,",
      "Chengalam South PO,",
      "Kottayam 686022",
    ],
    phone: "+91 9188330335",
    tel: "+919188330335",
    email: "project@specterra.in",
    map: "Ramankeriyil Building, Chengalam South PO, Kottayam 686022",
    position: [9.595, 76.46929],
  },
  {
    type: "Branch Office",
    name: "SPECTERRA ENVIRO CONSULTANTS",
    address: [
      "Ground floor, Lourde Matha Church Building,",
      "Aruvikuzhi PO, Kottayam 686503",
    ],
    phone: "+91 9567700335",
    tel: "+919567700335",
    map: "Lourde Matha Church Building, Aruvikuzhi PO, Kottayam 686503",
    position: [9.60434, 76.66799],
  },
  {
    type: "Branch Office",
    name: "SPECTERRA ENVIRO GEO CONSULTANTS",
    address: [
      "Kuttappy Complex, Nanminda 14,",
      "Balussery PO, Kozhikode 673613",
    ],
    phone: "+91 8075364268",
    tel: "+918075364268",
    map: "Kuttappy Complex, Nanminda 14, Balussery PO, Kozhikode 673613",
    position: [11.42325, 75.82308],
  },
];

// --------------------------------------------------
// CUSTOM MAP MARKER
// --------------------------------------------------

const officeIcon = L.divIcon({
  className: "custom-office-marker",

  html: `
    <div style="
      width: 36px;
      height: 36px;
      background: #104735;
      border: 3px solid white;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.22);
    ">
      <span style="
        color: #b4ff35;
        font-size: 15px;
        font-weight: bold;
        transform: rotate(45deg);
      ">●</span>
    </div>
  `,

  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -34],
});

// --------------------------------------------------
// AUTOMATIC MAP ZOOM
// --------------------------------------------------

function FitAllOffices({ locations }) {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLngBounds(
      locations.map((office) => office.position)
    );

    map.fitBounds(bounds, {
      padding: [45, 45],
      maxZoom: 10,
    });
  }, [map, locations]);

  return null;
}

// --------------------------------------------------
// INTERACTIVE OFFICE MAP
// --------------------------------------------------

function OfficeMap() {
  return (
    <MapContainer
      center={[10.45, 76.25]}
      zoom={7}
      scrollWheelZoom={true}
      attributionControl={false}
      className="h-full w-full"
    >
      <TileLayer
            attribution=""
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
     />

      <FitAllOffices locations={offices} />

      {offices.map((office) => {
        const directionsUrl =
          `https://www.google.com/maps/dir/?api=1&destination=` +
          encodeURIComponent(office.map);

        return (
          <Marker
            key={office.name}
            position={office.position}
            icon={officeIcon}
          >
            <Popup minWidth={230}>
              <div className="p-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#57951e]">
                  {office.type}
                </span>

                <h3 className="mt-1 text-sm font-bold text-[#063629]">
                  {office.name}
                </h3>

                <p className="mt-2 text-xs leading-5 text-gray-600">
                  {office.address.join(" ")}
                </p>

                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-md bg-[#104735] px-3 py-2 text-xs font-semibold text-white"
                >
                  <Navigation size={14} />
                  Get Directions
                </a>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

// --------------------------------------------------
// OFFICE CONTACT CARD
// --------------------------------------------------

function OfficeCard({ office }) {
  const mapUrl =
    `https://www.google.com/maps/search/?api=1&query=` +
    encodeURIComponent(office.map);

  return (
    <article className="rounded-xl border border-[#e2ebe5] bg-white p-3 shadow-[0_4px_14px_rgba(13,55,35,0.05)] transition duration-300 hover:border-[#b9df9a] hover:shadow-md">

      {/* CARD HEADER */}

      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eff9e7] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#286b26]">
          <Building2 size={13} />
          {office.type}
        </span>

      </div>

      {/* OFFICE NAME */}

      <h2 className="text-[14px] font-bold leading-snug text-[#063629] sm:text-[15px]">
        {office.name}
      </h2>

      {/* CONTACT DETAILS */}

      <div className="mt-2 space-y-1.5 text-[12px] leading-[18px] text-[#4d5b53]">

        {/* ADDRESS */}

        <div className="flex items-start gap-2.5">
          <MapPin
            size={15}
            className="mt-0.5 shrink-0 text-[#65a928]"
          />

          <address className="not-italic">
            {office.address.map((line) => (
              <span className="block" key={line}>
                {line}
              </span>
            ))}
          </address>
        </div>

        {/* PHONE */}

        <a
          href={`tel:${office.tel}`}
          className="flex items-center gap-2.5 transition-colors hover:text-[#17613e]"
        >
          <Phone
            size={14}
            className="shrink-0 text-[#65a928]"
          />

          <span>
            {office.phone}
          </span>
        </a>

        {/* EMAIL */}

        {office.email && (
          <a
            href={`mailto:${office.email}`}
            className="flex items-center gap-2.5 break-all transition-colors hover:text-[#17613e]"
          >
            <Mail
              size={14}
              className="shrink-0 text-[#65a928]"
            />

            <span>
              {office.email}
            </span>
          </a>
        )}
      </div>

      {/* DIRECTIONS BUTTON */}

      <a
        href={mapUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#d8e8d8] bg-[#f7fbf5] px-3 py-2 text-xs font-semibold text-[#145333] transition hover:border-[#9dce78] hover:bg-[#eff9e7]"
      >
        <Navigation size={14} />
        Get Directions
      </a>
    </article>
  );
}

// --------------------------------------------------
// MAIN OFFICE LOCATIONS PAGE
// --------------------------------------------------

export default function OfficeLocations() {
  return (
    <main className="min-h-screen w-full bg-white px-4 py-5 text-[#263b30] sm:px-6 lg:px-8">

      <div className="mx-auto max-w-[1500px]">

        {/* PAGE HEADER */}

        <header className="mb-5 flex flex-col justify-between gap-3 border-b border-[#e5eee8] pb-4 sm:flex-row sm:items-center">

          <div>
            <div className="flex items-center gap-3">

              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eff9e7] text-[#4c9b25]">
                <MapPinned size={21} />
              </span>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#65915c]">
                  Regional Presence
                </p>

                <h1 className="mt-1 text-xl font-extrabold tracking-tight text-[#063629] sm:text-2xl">
                  SPECTERRA OFFICE LOCATIONS
                </h1>
              </div>
            </div>

            <p className="mt-2 text-xs text-[#6b7870] sm:ml-[52px]">
              Head Office &amp; Branch Offices
              <span className="mx-2 text-[#9bb0a2]">•</span>
              Kerala, India
              <span className="mx-2 text-[#9bb0a2]">•</span>
              Contact Information
            </p>
          </div>

          {/* OFFICE COUNT */}

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#dcebdd] bg-[#f7fbf6] px-3.5 py-2 text-xs font-semibold text-[#315f3b]">
            <span className="h-2 w-2 rounded-full bg-[#72bd35]" />
            3 Office Locations
          </div>

        </header>

        {/* MAIN TWO-COLUMN LAYOUT */}

        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">

          {/* LEFT SIDE - OFFICE CARDS */}

          <section
            aria-label="Office contact details"
            className="grid content-start gap-2"
          >
            {offices.map((office) => (
              <OfficeCard
                key={office.name}
                office={office}
              />
            ))}
          </section>

          {/* RIGHT SIDE - INTERACTIVE MAP */}

          <section className="flex h-[420px] min-h-[420px] flex-col overflow-hidden rounded-xl border border-[#dfe9e2] bg-white shadow-[0_5px_20px_rgba(13,55,35,0.06)] sm:h-[500px] sm:min-h-[500px] lg:sticky lg:top-6 lg:h-[620px] lg:min-h-[620px]">

            {/* MAP HEADER */}

            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e7eee9] bg-white px-3 py-2.5 sm:px-4">

              <div>
                <h2 className="text-sm font-bold text-[#063629]">
                  Find Our Offices
                </h2>

                <p className="mt-0.5 text-[11px] text-[#7b8980]">
                  Kottayam &amp; Kozhikode, Kerala, India
                </p>
              </div>

            </div>

            {/* MAP CONTAINER */}

            <div className="relative min-h-0 flex-1">
              <OfficeMap />
            </div>

            {/* LOCATION SUMMARY */}

            <div className="grid grid-cols-1 gap-px border-t border-[#e7eee9] bg-[#e7eee9] sm:grid-cols-3">

              <div className="bg-white px-2.5 py-2">
                <p className="text-[11px] font-bold text-[#174b32]">
                  Head Office
                </p>
                <p className="mt-0.5 text-[10px] text-[#7b8980]">
                  Chengalam, Kottayam
                </p>
              </div>

              <div className="bg-white px-2.5 py-2">
                <p className="text-[11px] font-bold text-[#174b32]">
                  Branch Office
                </p>
                <p className="mt-0.5 text-[10px] text-[#7b8980]">
                  Aruvikuzhi, Kottayam
                </p>
              </div>

              <div className="bg-white px-2.5 py-2">
                <p className="text-[11px] font-bold text-[#174b32]">
                  Branch Office
                </p>
                <p className="mt-0.5 text-[10px] text-[#7b8980]">
                  Nanminda, Kozhikode
                </p>
              </div>

            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
