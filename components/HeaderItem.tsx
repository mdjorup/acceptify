'use client';

import { Link, NavbarItem } from '@nextui-org/react';

export interface HeaderItemProps {
  isActive: boolean;
  text: string;
  clickPath: string;
}

export const HeaderItem = ({ isActive, text, clickPath }: HeaderItemProps) => {
  return (
    <NavbarItem isActive={isActive}>
      <Link
        className={isActive ? 'text-primary' : 'text-neutral'}
        href={clickPath}
      >
        {text}
      </Link>
    </NavbarItem>
  );
};
