"use client"
import Link from 'next/link'
import ConnectWallet from './connect-wallet';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          <Link href="/">
            <div className="flex items-center">
              <Image 
                src="/assets/icons/heart.png" 
                alt="Fil Builders Logo" 
                width={40} 
                height={40}
              />
              <span className="ml-2 text-xl font-bold text-blue-600">CatinaBox</span>
            </div>
          </Link>

          <nav className="flex items-center">
            <ConnectWallet />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
