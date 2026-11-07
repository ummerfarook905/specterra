
import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";

import logoIcon from "../assets/logo.png";
import logoName from "../assets/name.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 w-full px-3 sm:px-5 pt-2 md:pt-3 ${
        isHomePage ? "-mb-[65px] md:-mb-[76px]" : ""
      }`}
    >
      <div className="max-w-[1320px] mx-auto">

        {/* MAIN GLASS NAVBAR */}
        <div
          className={`
            relative flex items-center justify-between
            min-h-[55px] md:min-h-[64px]
            px-3 sm:px-5 md:px-6
            rounded-full
            border border-[#9dfb58]/45
            shadow-[0_5px_25px_rgba(0,0,0,0.22),inset_0_1px_8px_rgba(255,255,255,0.12)]
            backdrop-blur-xl
            transition-all duration-500
            ${
              isScrolled
                ? "bg-[#092b26]/85"
                : "bg-[#092b26]/80"
            }
          `}
        >

          {/* SUBTLE TOP GLOW */}
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#c2ff91]/80 to-transparent pointer-events-none" />

          {/* LEFT - SPECTERRA LOGO */}
          <Link
            to="/"
            className="relative z-10 flex items-center gap-1.5 md:gap-2 shrink-0"
          >
            <img
              src={logoIcon}
              alt="Specterra Symbol"
              className="w-[27px] h-[27px] sm:w-[32px] sm:h-[32px] md:w-[36px] md:h-[36px] object-contain"
            />

            <img
              src={logoName}
              alt="SPECTERRA"
              className="w-[95px] sm:w-[115px] md:w-[145px] h-auto object-contain"
            />
          </Link>

          {/* CENTER - DESKTOP NAVIGATION */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-6 lg:gap-9">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `relative py-2 text-[12px] lg:text-[13px] font-semibold
                  transition-colors duration-300
                  ${
                    isActive
                      ? "text-[#b4ff35]"
                      : "text-white/80 hover:text-white"
                  }
                  after:absolute after:left-0 after:bottom-0
                  after:h-[2px] after:w-full
                  after:rounded-full after:bg-[#a8f52e]
                  after:transition-transform after:duration-300
                  ${
                    isActive
                      ? "after:scale-x-100"
                      : "after:scale-x-0 hover:after:scale-x-100"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* RIGHT - GET STARTED */}
          <Link
            to="/contact"
            className="
              hidden md:inline-flex items-center justify-center gap-3
              bg-white text-[#073b27]
              text-[12px] lg:text-[13px] font-bold
              px-4 lg:px-5 py-2.5
              rounded-full
              border border-[#b8f77b]
              shadow-[0_0_12px_rgba(168,245,46,0.15)]
              hover:bg-[#b6fa57]
              hover:shadow-[0_0_20px_rgba(168,245,46,0.3)]
              transition-all duration-300
              shrink-0
            "
          >
            Get Started
            <ArrowRight size={16} />
          </Link>

          {/* MOBILE MENU TOGGLE */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="
              md:hidden flex items-center justify-center
              w-9 h-9 rounded-full
              text-white hover:bg-white/10
              transition-colors cursor-pointer
            "
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[40] bg-black/35 md:hidden"
            />

            <div
              className="
                absolute z-[55]
                top-full left-3 right-3 mt-2
                md:hidden
                rounded-[20px]
                border border-[#9dfb58]/30
                bg-[#102c27]/95
                backdrop-blur-2xl
                shadow-[0_15px_40px_rgba(0,0,0,0.3)]
                p-3
                max-h-[calc(100dvh-100px)]
                overflow-y-auto
              "
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    end={link.path === "/"}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `
                        px-4 py-3 rounded-xl
                        text-sm font-semibold
                        transition-colors duration-200
                        ${
                          isActive
                            ? "text-[#b4ff35] bg-white/10"
                            : "text-white/80 hover:text-white hover:bg-white/5"
                        }
                      `
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>

              <div className="border-t border-white/10 my-3" />

              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="
                  flex items-center justify-center gap-2
                  w-full py-3
                  rounded-full
                  bg-white text-[#073b27]
                  text-sm font-bold
                  hover:bg-[#b6fa57]
                  transition-colors duration-300
                "
              >
                Get Started
                <ArrowRight size={16} />
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
