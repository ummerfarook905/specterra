
const partners = [
  {
    name: "SUEZ",
    style: "text-[#17275c] text-[34px] font-extrabold tracking-tight",
    symbol: "∞",
    symbolStyle: "text-[#9acb00] text-[48px] font-bold",
  },
  {
    name: "veolia",
    style: "text-[#ed202b] text-[34px] font-bold tracking-tight",
    symbol: "◉",
    symbolStyle: "text-[#ed202b] text-[42px] font-bold",
  },
  {
    name: "DOW",
    style: "text-white text-[30px] font-bold tracking-wide",
    symbol: "",
    symbolStyle: "",
  },
  {
    name: "GRUNDFOS",
    style: "text-[#153d78] text-[25px] font-extrabold tracking-tight",
    symbol: "✕",
    symbolStyle: "text-[#153d78] text-[40px] font-bold",
  },
  {
    name: "TORAY",
    style: "text-[#12448d] text-[34px] font-extrabold italic tracking-tight",
    symbol: "〞",
    symbolStyle: "text-[#12448d] text-[30px] font-bold",
  },
  {
    name: "ThermoFisher",
    subtitle: "SCIENTIFIC",
    style: "text-[#e5252b] text-[23px] font-extrabold tracking-tight",
    symbol: "",
    symbolStyle: "",
  },
  {
    name: "xylem",
    subtitle: "Let's Solve Water.",
    style: "text-[#159bc4] text-[37px] font-bold tracking-tight",
    symbol: "",
    symbolStyle: "",
  },
  {
    name: "ECOLAB",
    style: "text-[#0874c9] text-[34px] font-extrabold tracking-tight",
    symbol: "",
    symbolStyle: "",
  },
];

export default function TrustedPartners() {
  return (
    <main className="w-full bg-[#eaf0ed] px-4 py-6 sm:px-6">

      {/* PARTNER NETWORK CONTAINER */}
      <section className="relative mx-auto w-full max-w-[1200px] rounded-2xl border border-white/80 bg-white/85 px-4 pb-6 pt-14 shadow-[0_20px_60px_rgba(15,55,38,0.12)] backdrop-blur-xl sm:px-7 sm:pb-8 sm:pt-14 md:px-8">

        {/* GREEN TITLE RIBBON */}
        <div className="absolute left-1/2 top-0 z-10 w-[75%] max-w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-b-2xl rounded-t-lg bg-gradient-to-r from-[#236b21] via-[#0c5526] to-[#236b21] px-5 py-3 text-center shadow-[0_8px_20px_rgba(6,54,41,0.25)]">

          <h2 className="font-serif text-lg font-bold text-white sm:text-xl">
            Our Partner Network
          </h2>

        </div>

        {/* PARTNER LOGO GRID */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

          {partners.map((partner) => (
            <div
              key={partner.name}
              className="group flex min-h-[120px] items-center justify-center rounded-xl border border-[#dce6e0] bg-gradient-to-br from-white to-[#f8fbf9] px-3 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#8cae91] hover:shadow-[0_10px_25px_rgba(6,54,41,0.10)]"
            >

              {/* PARTNER WORDMARK */}
              <div className="flex flex-col items-center justify-center">

                <div className="flex items-center justify-center gap-2">

                  {partner.symbol && (
                    <span className={partner.symbolStyle}>
                      {partner.symbol}
                    </span>
                  )}

                  {partner.name === "DOW" ? (
                    <span className="flex h-14 w-32 items-center justify-center bg-[#ed1c2e] [clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)]">
                      <span className={partner.style}>
                        DOW
                      </span>
                    </span>
                  ) : (
                    <span className={partner.style}>
                      {partner.name}
                    </span>
                  )}

                </div>

                {partner.subtitle && (
                  <span className="mt-0.5 text-[12px] font-semibold tracking-[3px] text-[#343b40]">
                    {partner.subtitle}
                  </span>
                )}

              </div>
            </div>
          ))}

        </div>

      </section>
    </main>
  );
}
