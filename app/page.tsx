import Header from "../components/header";
import Footer from "../components/footer";
import Link from 'next/link';
import { FaHeartbeat, FaFlask } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-[#f8f3ea]">
      <Header/>
      <div>
        <div
          className="relative w-full pt-48 pb-40 m-auto flex justify-center text-center flex-col items-center z-1"
          style={{ maxWidth: "1200px" }}
        >
          <h1 className="inline-block max-w-4xl lg:max-w-6xl w-auto relative text-6xl md:text-7xl lg:text-8xl tracking-tight mb-6 font-normal text-black">
            Innovation meets <br/>health data.{" "}
            <span className="text-[#2b7e21]">For everyone.</span>
          </h1>
          
          <p className="text-gray-600 text-xl mb-12 max-w-2xl">
            Experience the secure sharing of health data. 
            Researchers get data, users get peace of mind.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 mt-8">
            <Link href="/health-data">
              <button className="text-white items-center inline-flex bg-[#2b7e21] hover:bg-[#236b1a] px-8 py-4 rounded-full text-lg font-medium transition-all duration-200">
                <FaHeartbeat className="mr-2" /> My Data Safe
              </button>
            </Link>
            
            <Link href="/experiments">
              <button className="text-black items-center inline-flex bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-full text-lg font-medium transition-all duration-200 text-white">
                <FaFlask className="mr-2" /> Join Experiments
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
