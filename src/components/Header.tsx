"use client";

import { Bell, User } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-end px-6 h-16 bg-primary border-b border-border">
      <div className="flex items-center space-x-4">
        <Bell className="h-6 w-6 text-text-secondary" />
        <User className="h-6 w-6 text-text-secondary" />
      </div>
    </header>
  );
};

export default Header;
