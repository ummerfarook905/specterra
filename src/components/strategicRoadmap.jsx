
import {
  Microscope,
  MapPin,
  FlaskConical,
  Building2,
  Radio,
  Droplet,
  Recycle,
} from "lucide-react";

const milestones = [
  {
    year: "2000",
    title: "Foundation & Inception",
    icon: Microscope,
    color: "#f28c00",
    light: "#fff5e7",
    border: "#f28c00",
    left: 7.5,
    top: 330,
    node: { x: 90, y: 625 },
  },
  {
    year: "2005",
    title: "Chennai Branch",
    icon: MapPin,
    color: "#55a900",
    light: "#f2f9e9",
    border: "#55a900",
    left: 21,
    top: 285,
    node: { x: 250, y: 585 },
  },
  {
    year: "2012",
    title: "Specific Inoculants",
    icon: FlaskConical,
    color: "#08a98e",
    light: "#e9faf6",
    border: "#08a98e",
    left: 35,
    top: 240,
    node: { x: 415, y: 545 },
  },
  {
    year: "2017",
    title: "Hyderabad & Pharma",
    icon: Building2,
    color: "#08623d",
    light: "#eaf5ef",
    border: "#08623d",
    left: 49,
    top: 205,
    node: { x: 580, y: 510 },
  },
  {
    year: "2021",
    title: "IoT CEMS Telemetry",
    icon: Radio,
    color: "#0878c9",
    light: "#eaf5fc",
    border: "#0878c9",
    left: 63,
    top: 180,
    node: { x: 745, y: 480 },
  },
  {
    year: "2024",
    title: "ZLD & Pure Water",
    icon: Droplet,
    color: "#55a900",
    light: "#f2f9e9",
    border: "#55a900",
    left: 77,
    top: 145,
    node: { x: 910, y: 425 },
  },
  {
    year: "2030",
    title: "1,000+ ZLD Target",
    icon: Recycle,
    color: "#078443",
    light: "#eaf7ef",
    border: "#078443",
    left: 91,
    top: 110,
    node: { x: 1070, y: 390 },
  },
];

function Road() {
  const roadPath =
    "M 35 625 C 145 670, 220 590, 320 575 S 490 515, 590 510 S 760 505, 850 465 S 1020 405, 1160 390";

  return (
    <svg
      viewBox="0 0 1200 700"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full overflow-visible"
      aria-hidden="true"
    >
      <defs>
        <filter id="roadShadow" x="-20%" y="-30%" width="140%" height="170%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
          <feOffset dy="9" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.16" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="roadGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#155d3c" />
          <stop offset="50%" stopColor="#06472e" />
          <stop offset="100%" stopColor="#033722" />
        </linearGradient>

        <linearGradient id="roadEdge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a6ce38" />
          <stop offset="100%" stopColor="#6a9f20" />
        </linearGradient>
      </defs>

      {/* ROAD SHADOW */}
      <path
        d={roadPath}
        fill="none"
        stroke="#173e2d"
        strokeWidth="86"
        strokeLinecap="round"
        opacity="0.10"
        filter="url(#roadShadow)"
      />

      {/* ROAD OUTER EDGE */}
      <path
        d={roadPath}
        fill="none"
        stroke="url(#roadEdge)"
        strokeWidth="76"
        strokeLinecap="round"
      />

      {/* ROAD BODY */}
      <path
        d={roadPath}
        fill="none"
        stroke="url(#roadGradient)"
        strokeWidth="66"
        strokeLinecap="round"
      />

      {/* ROAD TOP EDGE */}
      <path
        d={roadPath}
        fill="none"
        stroke="#8ebd36"
        strokeWidth="2"
        strokeLinecap="round"
        transform="translate(0 -32)"
        opacity="0.8"
      />

      {/* LANE MARKINGS */}
      <path
        d={roadPath}
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
        strokeDasharray="22 20"
        strokeLinecap="round"
      />

      {/* ROAD ARROW */}
      <path
        d="M 1130 355 L 1170 390 L 1130 425 L 1145 390 Z"
        fill="#087c3d"
        stroke="#6aab29"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function StrategicRoadmap() {
  return (
    <main className="w-full overflow-hidden bg-white px-4 py-10 sm:px-6 lg:px-10">

      <section className="mx-auto max-w-[1440px]">

        {/* HEADER */}
        <header className="mb-8 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#12603b] sm:text-xs">
              Strategic Roadmap
            </p>
          </div>
        </header>

        {/* DESKTOP ROADMAP */}
        <div className="relative mx-auto hidden h-[690px] w-full max-w-[1200px] lg:block">

          {/* ROAD SVG */}
          <Road />

          {/* MILESTONES */}
          {milestones.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.year}
                className="absolute z-10 w-[155px] -translate-x-1/2"
                style={{
                  left: `${item.left}%`,
                  top: `${item.top}px`,
                }}
              >
                {/* MILESTONE CARD */}
                <div
                  className="relative rounded-[17px] border-2 bg-white px-3 pb-4 pt-8 text-center shadow-[0_8px_18px_rgba(15,50,30,0.10)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_14px_25px_rgba(15,50,30,0.16)]"
                  style={{ borderColor: item.border }}
                >

                  {/* ICON */}
                  <div
                    className="absolute left-1/2 top-0 flex h-[58px] w-[58px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[15px] text-white shadow-md"
                    style={{ backgroundColor: item.color }}
                  >
                    <Icon size={29} strokeWidth={2.2} />
                  </div>

                  {/* YEAR */}
                  <div
                    className="mx-auto mb-3 mt-1 rounded-full px-2 py-1.5 text-xl font-extrabold tracking-wide text-white"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.year}
                  </div>

                  {/* TITLE */}
                  <h3 className="min-h-[48px] font-sans text-[15px] font-bold leading-[21px] text-[#14251c]">
                    {item.title}
                  </h3>
                </div>

                {/* CONNECTOR */}
                <div
                  className="absolute left-1/2 top-full -z-10 w-[5px] -translate-x-1/2"
                  style={{
                    height: `${Math.max(
                      30,
                      item.node.y - item.top - 155
                    )}px`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            );
          })}

          {/* ROAD NODE MARKERS */}
          <svg
            viewBox="0 0 1200 700"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 z-20 h-full w-full"
          >
            {milestones.map((item) => (
              <g key={item.year}>
                <circle
                  cx={item.node.x}
                  cy={item.node.y}
                  r="14"
                  fill={item.color}
                  stroke="white"
                  strokeWidth="5"
                />
              </g>
            ))}
          </svg>
        </div>

        {/* TABLET / MOBILE MILESTONES */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:hidden">
          {milestones.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={item.year}
                className="relative overflow-hidden rounded-xl border border-[#dce8df] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div
                  className="absolute left-0 top-0 h-full w-1.5"
                  style={{ backgroundColor: item.color }}
                />

                <div className="flex items-center gap-4">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white"
                    style={{ backgroundColor: item.color }}
                  >
                    <Icon size={24} />
                  </div>

                  <div>
                    <p
                      className="text-2xl font-extrabold"
                      style={{ color: item.color }}
                    >
                      {item.year}
                    </p>

                    <h3 className="text-base font-bold text-[#123d2a]">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="mt-4 h-1 rounded-full bg-[#e8eee9]">
                  <div
                    className="h-1 rounded-full"
                    style={{
                      backgroundColor: item.color,
                      width: `${((index + 1) / milestones.length) * 100}%`,
                    }}
                  />
                </div>
              </article>
            );
          })}
        </div>

      </section>
    </main>
  );
}
