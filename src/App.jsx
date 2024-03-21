import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import "./App.css";

import Home from "./pages/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import {
  apiProvider,
  configureChains,
  getDefaultWallets
} from "@rainbow-me/rainbowkit";
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  arbitrum,
  base,
  bsc,
  hardhat,
  mainnet,
  optimism,
  polygon,
  polygonMumbai,
  sepolia,
  zora,
} from 'wagmi/chains';

const config = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId:"test",
  chains: [
    bsc,
    polygonMumbai,
    hardhat
  ],
});
const queryClient = new QueryClient();

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 500);
    });

    gsap.ticker.lagSmoothing(0);
  }, []);

  useEffect(() => {
    const frombelowanim = document.getElementsByClassName("frombelowanim");

    Array.from(frombelowanim).forEach((element) => {
      gsap.from(element, {
        duration: 0.5,
        yPercent: 10,
        opacity: 0,
        ease: "sine",
        delay: 0,
        scrollTrigger: {
          trigger: element,
          start: "top 70%",
          toggleActions: "play none none unset",
        },
      });
    });
  }, []);

  return (
    <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider >
    <Router>
      <main className="App font-NohemiL bg-dark">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </Router>
    </RainbowKitProvider>
    </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
