import AuthProviders from './AuthProviders';
import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NavLinks } from '@/constants';

export default function Navbar() {
  const session = null;
  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo.svg" alt="Dribbleusz" width={115} height={43} />
        </Link>
        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.key}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>
      <div className="flexCenter gap-4">
        {session ? (
          <Fragment>
            UserPhoto
            <Link href="/create-project">Share Work</Link>
          </Fragment>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
}