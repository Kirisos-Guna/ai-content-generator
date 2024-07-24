"use client";
import cogImage from "@/app/assets/cog.png";
import cylinderImage from "@/app/assets/cylinder.png";
import noodleImage from "@/app/assets/noodle.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
      target: heroRef,
      offset: ['start end', 'end start'],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  return (
    <section ref={heroRef} className="pt-8 pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] overrflow-x-clip">
      <div className="container ">
        <div className="md:flex items-center">
          <div className="md:w-[478px]">
            <div className="tag">
              Version 1.0 is here
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6">
              AI Content Generator
            </h1>
            <p className="text-xl text-[#010D3E] tracking-tight mt-6">
              Revolutionize your content creation with our AI-powered app, delivering engaging and high-quality text in seconds.
            </p>
            <div className="flex gap-1 items-center mt-[30px]">
              <a className="btn btn-primary" href="/dashboard">Get for free</a>
              {/* <button className="btn btn-text gap-1"> */}
                {/* <span>Learn more</span> */}
                {/* <ArrowIcon className="h-4 w-5" /> */}
              {/* </button> */}
            </div>
          </div>
          <div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative">
            <motion.img
            src={cogImage.src} 
            alt="Cog Image" 
            className="md:absolute md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-24"
            animate={{
             translateY: [-30, 30]
            }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 3,
              ease: "easeInOut",

            }}
            />
            <motion.img 
            src={cylinderImage.src} 
            alt="Cylinder Image" 
            width={220} 
            height={220}
            className="hidden md:block -top-8 -left-32 md:absolute lg:left-6" 
            style={{
              translateY: translateY
            }}
            />
            <motion.img
            src={noodleImage.src} 
            alt="Noodle Image" 
            width={220} 
            className="hidden md:block absolute top-[524px] left-[520px] rotate-[30deg] "
            style={{
              rotate: 30,
              translateY: translateY
            }} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};
