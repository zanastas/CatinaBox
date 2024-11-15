'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';

const queryClient = new QueryClient();

export const myEvmNetworks = [{
  chainId: 314159,
  networkId: 314159,
  iconUrls: [''],
  name: "Filecoin Calibration",
  nativeCurrency:{
    decimals: 18,
    name: 'FIL',
    symbol: 'FIL'
  },
  rpcUrls: ['https://api.calibration.node.glif.io/rpc/v1'],
  blockExplorerUrls: ['https://calibration.filfox.info/en']
}];

export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <QueryClientProvider client={queryClient}>
      <DynamicContextProvider
        settings={{
          environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID || '',
          walletConnectors: [EthereumWalletConnectors],
          overrides: {
            evmNetworks: (networks) => [...myEvmNetworks, ...networks],
          }
        }}
      >
        {children}
      </DynamicContextProvider>
    </QueryClientProvider>
  );
}
 