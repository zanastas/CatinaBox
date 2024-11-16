"use client"
import Link from 'next/link'
import Image from 'next/image';
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { FaBell } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#f8f3ea]/80">
      <nav className="container-wide">
        <div className="flex justify-between items-center h-20">
          <Link href="/">
            <div className="flex items-center gap-3">
              <Image 
                src="/cat-in-box.png" 
                alt="CatinaBox Logo" 
                width={40} 
                height={40}
                className="rounded-lg"
              />
              <span className="text-xl font-medium">CatinaBox</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/health-data" className="nav-link">
              Data Safe
            </Link>
            <Link href="/experiments" className="nav-link">
              Experiments
            </Link>
            <Link href="/docs" className="nav-link">
              Docs
            </Link>
            <Link href="/leaderboard" className="nav-link flex items-center gap-1">
              Leaderboard
              <span className="text-lg">🏆</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/notifications">
              <button className="btn-outline p-2">
                <FaBell className="text-lg" />
              </button>
            </Link>
            <DynamicWidget />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
