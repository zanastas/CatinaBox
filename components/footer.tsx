import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 py-16">
      <div className="container mx-auto flex flex-col">
        <div className="grid grid-cols-4 gap-8 px-4 mb-8">
          {/* Logo and Description Column */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/cat-in-box.png"
                alt="CatinaBox Logo"
                width={32}
                height={32}
              />
              <span className="text-xl font-semibold">CatinaBox</span>
            </div>
            <p className="text-gray-600">
              Secure health data sharing platform for research and innovation
            </p>
          </div>

          {/* Platform Column */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Platform</h3>
            <Link href="/data-safe" className="text-gray-600 hover:text-gray-900">Data Safe</Link>
            <Link href="/experiments" className="text-gray-600 hover:text-gray-900">Experiments</Link>
            <Link href="/documentation" className="text-gray-600 hover:text-gray-900">Documentation</Link>
          </div>

          {/* Resources Column */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
            <Link href="/privacy-policy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-600 hover:text-gray-900">Terms of Service</Link>
          </div>

          {/* Community Column */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Community</h3>
            <div className="flex space-x-4">
              <Link href="https://twitter.com" className="text-gray-600 hover:text-gray-900">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="https://discord.com" className="text-gray-600 hover:text-gray-900">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.175 13.175 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
                </svg>
              </Link>
              <Link href="https://github.com" className="text-gray-600 hover:text-gray-900">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Made with Love section - Updated styling */}
        <div className="flex items-center justify-center space-x-2 text-base text-gray-600 pt-6 border-t border-gray-100">
          <span>Made with</span>
          <Image
            src="/assets/icons/heart.png"
            alt="Love"
            width={20}
            height={20}
            className="inline-block"
          />
          <span>by CatinaBox</span>
        </div>
      </div>
    </footer>
  )
}
