import React from "react";
import { AvatarDropdownMenu } from "./avatar-dropdown-menu";
import SearchBarUser from "./search-bar-user";
import Logo from "./logo";

export default function Header() {
  return (
    <header className="flex flex-row items-center justify-between">
      <Logo />
      <div className="flex flex-row items-center gap-4">
        <SearchBarUser />
        <AvatarDropdownMenu />
      </div>
    </header>
  );
}
