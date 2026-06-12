"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Search, Activity, Brain } from "lucide-react";

const navItems = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/employees", icon: Users, label: "Employees" },
  { href: "/investigations", icon: Search, label: "Investigations" },
  { href: "/timeline", icon: Activity, label: "Threat Timeline" },
  { href: "/ai-analysis", icon: Brain, label: "AI Analysis" },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-0 h-full text-text-secondary"
      style={{ width: "240px", backgroundColor: "#0f1117" }}
    >
      <div className="flex h-full flex-col">
        <div className="p-6">
          <Link href="/" className="text-2xl font-bold text-text">
            ThreatCop
          </Link>
        </div>
        <nav className="flex-1 space-y-2 p-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center rounded-lg p-3 transition-colors hover:bg-accent/10 hover:text-text ${
                pathname === item.href ? "bg-accent/20 text-text" : ""
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
