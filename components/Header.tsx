'use client';

import { Database } from '@/shared/supabase';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  User,
} from '@nextui-org/react';
import {
  Session,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { usePathname, useRouter } from 'next/navigation';
import { HeaderItem } from './HeaderItem';

interface HeaderProps {
  session: Session;
}

export const Header = ({ session }: HeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const supabase = createClientComponentClient<Database>();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <Navbar>
      <NavbarBrand>
        <p className="text-neutral font-bold">Acceptify</p>
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
        <Dropdown>
          <DropdownTrigger className="hover:cursor-pointer">
            <User name="" description={session.user.email}></User>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem
              className="text-red-500"
              key="logout"
              onClick={handleLogout}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};
