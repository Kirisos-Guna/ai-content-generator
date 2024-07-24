"use client"; 
import acemeLogo from "@/app/assets/logo-acme.png";
import apexLogo from "@/app/assets/logo-apex.png";
import celestialLogo from "@/app/assets/logo-celestial.png";
import echoLogo from "@/app/assets/logo-echo.png";
import pulseLogo from "@/app/assets/logo-pulse.png";
import quantumLogo from "@/app/assets/logo-quantum.png";
import { motion } from "framer-motion";
import Image from "next/image";

export const LogoTicker = () => {
  return (
    <div className="py-8 md:py-12 bg-white">
      <div className="conntainer">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
          <motion.div className="flex gap-14 flex-none pr-14" animate={{
            translateX: '-50%',
          }}
          transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            <Image src={acemeLogo} alt="Aceme Logo" className="logo=ticker-logo" />
            <Image src={quantumLogo} alt="Quantum Logo" className="logo=ticker-logo" />
            <Image src={echoLogo} alt="Echo Logo" className="logo=ticker-logo" />
            <Image src={celestialLogo} alt="Celestial Logo" className="logo=ticker-logo" />
            <Image src={pulseLogo} alt="Pulse Logo" className="logo=ticker-logo" />
            <Image src={apexLogo} alt="Apex Logo" className="logo=ticker-logo" />

            <Image src={acemeLogo} alt="Aceme Logo" className="logo=ticker-logo" />
            <Image src={quantumLogo} alt="Quantum Logo" className="logo=ticker-logo" />
            <Image src={echoLogo} alt="Echo Logo" className="logo=ticker-logo" />
            <Image src={celestialLogo} alt="Celestial Logo" className="logo=ticker-logo" />
            <Image src={pulseLogo} alt="Pulse Logo" className="logo=ticker-logo" />
            <Image src={apexLogo} alt="Apex Logo" className="logo=ticker-logo" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
