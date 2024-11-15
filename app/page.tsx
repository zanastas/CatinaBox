import Header from "../components/header";
import Footer from "../components/footer";
import Link from 'next/link';
import { FaBell, FaHeartbeat, FaFlask } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-blue-600">
      <Header/>
      <div>
        <div
          className="relative w-full pt-48 pb-40 m-auto flex justify-center text-center flex-col items-center z-1 text-white"
          style={{ maxWidth: "1200px" }}
        >
          <h1 className="inline-block max-w-2xl lg:max-w-4xl w-auto relative text-5xl md:text-6xl lg:text-7xl tracking-tighter mb-10 font-bold">
            Your Health Data, <span className="text-yellow-300">Your Control</span>
          </h1>
          
          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <Link href="/health-data">
              <button className="text-black items-center inline-flex bg-white border-2 border-black duration-200 ease-in-out focus:outline-none hover:bg-black hover:shadow-none hover:text-white justify-center rounded-xl shadow-[5px_5px_black] text-center transform transition px-8 py-4">
                <FaHeartbeat className="mr-2" /> My Data Safe
              </button>
            </Link>
            
            <Link href="/notifications">
              <button className="text-black items-center inline-flex bg-yellow-300 border-2 border-black duration-200 ease-in-out focus:outline-none hover:bg-black hover:shadow-none hover:text-white justify-center rounded-xl shadow-[5px_5px_black] text-center transform transition px-8 py-4">
                <FaBell className="mr-2" /> Notifications
              </button>
            </Link>
            
            <Link href="/experiments">
              <button className="text-black items-center inline-flex bg-yellow-300 border-2 border-black duration-200 ease-in-out focus:outline-none hover:bg-black hover:shadow-none hover:text-white justify-center rounded-xl shadow-[5px_5px_black] text-center transform transition px-8 py-4">
                <FaFlask className="mr-2" /> Explore Experiments
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
