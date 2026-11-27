
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import {
  Menu,
  X,
  LogOut,
  BriefcaseBusiness,
  Map,
  Users,
  LayoutDashboard,
} from "lucide-react";

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);

  const navItems = [
    { name: "Services", path: "/admin/services", icon: BriefcaseBusiness },
    { name: "Roadmap", path: "/admin/roadmap", icon: Map },
    { name: "Team Management", path: "/admin/team", icon: Users },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login", { replace: true });
  };

  const navClass = ({ isActive }) =>
    `flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all ${
      isActive
        ? "bg-[#b4ff35] text-[#092b26]"
        : "text-white/75 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <div className="min-h-screen bg-[#edf3ef]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#092b26] text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

          {/* Logo */}
          <NavLink to="/admin/services" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#b4ff35] text-[#092b26]">
              <LayoutDashboard size={22} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wide">SPECTERRA</h1>
              <p className="text-[10px] tracking-[2px] text-white/60">
                ADMIN PANEL
              </p>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink key={item.path} to={item.path} className={navClass}>
                  <Icon size={17} />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Admin Details */}
          <div className="hidden items-center gap-4 md:flex">
            <div className="text-right">
              <p className="text-sm font-semibold">
                {admin?.name || "Administrator"}
              </p>
              <p className="text-xs text-white/50">Administrator</p>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#092b26] transition hover:bg-[#b4ff35]"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="rounded-lg p-2 hover:bg-white/10 md:hidden"
          >
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenu && (
          <div className="border-t border-white/10 bg-[#092b26] p-4 md:hidden">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenu(false)}
                    className={navClass}
                  >
                    <Icon size={18} />
                    {item.name}
                  </NavLink>
                );
              })}

              <div className="my-2 border-t border-white/10" />

              <p className="px-4 py-2 text-sm text-white/70">
                {admin?.name || "Administrator"}
              </p>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#092b26]"
              >
                <LogOut size={18} />
                Logout
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Individual Page Content */}
      <main className="mx-auto max-w-7xl p-5 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}
