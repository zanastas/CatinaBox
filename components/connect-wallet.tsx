"use client";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export default function ConnectWallet() {
  const { setShowAuthFlow, user } = useDynamicContext();

  if (user) {
    return (
      <button
        onClick={() => setShowAuthFlow(true)}
        className="text-black items-center inline-flex bg-white border-2 border-black duration-200 ease-in-out focus:outline-none hover:bg-black hover:shadow-none hover:text-white justify-center rounded-xl shadow-[5px_5px_black] text-center transform transition px-8 py-4"
      >
        Disconnect
      </button>
    );
  }

  return (
    <button
      onClick={() => setShowAuthFlow(true)}
      className="text-black items-center inline-flex bg-white border-2 border-black duration-200 ease-in-out focus:outline-none hover:bg-black hover:shadow-none hover:text-white justify-center rounded-xl shadow-[5px_5px_black] text-center transform transition px-8 py-4"
    >
      Connect Wallet
    </button>
  );
} 