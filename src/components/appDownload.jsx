
import { Download } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

// Replace this with your actual app download URL
const APP_DOWNLOAD_URL = "https://your-domain.com/download";

export default function AppDownload() {
  return (
    <main className="w-full bg-white px-5 py-12 sm:px-8 md:py-16">
      {/* QR SCANNING ANIMATION */}
      <style>{`
        @keyframes qrLaserScan {
          0% {
            transform: translateY(0);
            opacity: 0;
          }

          10% {
            opacity: 0.9;
          }

          90% {
            opacity: 0.9;
          }

          100% {
            transform: translateY(220px);
            opacity: 0;
          }
        }

        .qr-scan-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: #20c957;
          box-shadow:
            0 0 5px #20c957,
            0 0 10px rgba(32, 201, 87, 0.6);
          animation: qrLaserScan 2.5s ease-in-out infinite;
          pointer-events: none;
          z-index: 5;
        }

        @media (prefers-reduced-motion: reduce) {
          .qr-scan-line {
            animation: none;
            display: none;
          }
        }
      `}</style>

      <section className="mx-auto flex w-full max-w-[1100px] flex-col items-center justify-center gap-8 rounded-2xl bg-white p-5 sm:p-8 md:flex-row md:gap-14">

        {/* QR CODE */}
        <div className="flex flex-col items-center justify-center">
          <div className="rounded-[22px] border-[7px] border-[#087b27] bg-white p-4 shadow-[0_12px_30px_rgba(0,70,30,0.12)]">

            {/* QR SCAN AREA */}
            <div className="relative overflow-hidden rounded-md">
              <QRCodeSVG
                value={APP_DOWNLOAD_URL}
                size={220}
                level="H"
                bgColor="#ffffff"
                fgColor="#000000"
                imageSettings={{
                  src: "/images/logo.png",
                  height: 42,
                  width: 42,
                  excavate: true,
                }}
              />

              {/* Animated laser line */}
              <div className="qr-scan-line" />
            </div>

          </div>

          <p className="mt-3 text-center text-sm font-medium text-[#244b36]">
            Scan to download the app
          </p>
        </div>

        {/* DESKTOP DIVIDER */}
        <div className="hidden h-[230px] w-px bg-[#cbd5d0] md:block" />

        {/* MOBILE DIVIDER */}
        <div className="h-px w-32 bg-[#cbd5d0] md:hidden" />

        {/* DOWNLOAD BUTTON */}
        <div className="flex items-center justify-center">
          <a
            href={APP_DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-[68px] w-full max-w-[340px] items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#078c0c] via-[#006b20] to-[#003c26] px-6 py-4 text-white shadow-[0_10px_22px_rgba(0,75,30,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:min-w-[280px]"
          >
            <Download
              size={28}
              strokeWidth={2.2}
              className="shrink-0 transition-transform duration-300 group-hover:translate-y-1"
            />

            <span className="h-8 w-px bg-white/70" />

            <span className="whitespace-nowrap text-lg font-bold sm:text-xl">
              Download App
            </span>
          </a>
        </div>

      </section>
    </main>
  );
}
