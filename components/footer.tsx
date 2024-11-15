import Link from 'next/link';
import Image from 'next/image';
import { FaTwitter, FaDiscord, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container-wide py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link href="/">
              <div className="flex items-center gap-3">
                <Image
                  src="/assets/logos/fil-b-mini-logo.png"
                  alt="Logo"
                  width={32}
                  height={32}
                />
                <span className="text-xl font-medium">Stake & Run</span>
              </div>
            </Link>
            <p className="mt-4 text-gray-600 text-sm">
              Secure health data sharing platform for research and innovation
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><Link href="/health-data" className="nav-link">Data Safe</Link></li>
              <li><Link href="/experiments" className="nav-link">Experiments</Link></li>
              <li><Link href="/docs" className="nav-link">Documentation</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="nav-link">About</Link></li>
              <li><Link href="/privacy" className="nav-link">Privacy Policy</Link></li>
              <li><Link href="/terms" className="nav-link">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Community</h3>
            <div className="flex gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="nav-link">
                <FaTwitter size={20} />
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="nav-link">
                <FaDiscord size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="nav-link">
                <FaGithub size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
