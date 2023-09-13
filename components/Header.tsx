'use client';

import { UserButton } from '@clerk/nextjs';
import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import { HeaderItem } from './HeaderItem';

export const Header = () => {
  const pathname = usePathname();

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-neutral">Acceptify</p>
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <HeaderItem
          isActive={pathname === '/home'}
          text="Home"
          clickPath="/home"
        />
        <HeaderItem
          isActive={pathname === '/reviews'}
          text="Reviews"
          clickPath="/reviews"
        />
      </NavbarContent>
      <NavbarContent justify="end">
        <UserButton afterSignOutUrl="/" />
      </NavbarContent>
    </Navbar>
  );
};
