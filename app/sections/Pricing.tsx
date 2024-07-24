"use client";
import CheckIcon from "@/app/assets/check.svg";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

const pricingTiers = [
  {
    title: "Free",
    monthlyPrice: 0,
    buttonText: "Get started for free",
    popular: false,
    inverse: false,
    features: [
      "10,000 Words/Month",
      "All Content Templates",
      "Unlimted Download & Copy",
      "1 Month of History",
    ],
  },
  {
    title: "Pro",
    monthlyPrice: 2.39,
    buttonText: "Sign up now",
    popular: true,
    inverse: true,
    features: [
      "Unlimited/Month",
      "All Template Access",
      "Unlimited Download & Copy",
      "1 Year of History",
      "Priority support",
    ],
  },
];

export const Pricing = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-title">Pricing</h2>
          <p className="section-description mt-5">
            Free forever. Upgrade for unlimited tasks, better security, and exclusive features.
          </p>
        </div>
        <div className="flex flex-col gap-6 items-center mt-10 lg:flex-row lg:justify-center lg:items-end">
          {pricingTiers.map(({
            title,
            monthlyPrice,
            buttonText,
            popular,
            inverse,
            features
          }, index) => (
            <div className={twMerge("p-10 border border-[#F1F1F1] rounded-3xl shadow-[0_7px_14px_#EAEAEA] max-w-xs w-full", inverse === true && 'border-black bg-black text-white')} key={index}>
              <div className="flex justify-between">
                <h3 className={twMerge("text-lg font-bold text-black/50", inverse === true && "text-white/50")}>{title}</h3>
                {popular === true && (
                  <div className="inline-flex text-sm px-4 py-1.5 rounded-xl border border-white/20">
                    <motion.span
                      animate={{
                        backgroundPositionX: '100%',
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear',
                        repeatType: "loop",
                      }}
                     className="bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF)] [background-size:200%] text-transparent bg-clip-text font-medium">
                      Popular
                    </motion.span>
                  </div>
                )}
              </div>
              <div className="flex items-baseline gap-1 mt-[30px]">
                <span className="text-4xl font-bold tracking-tighter leading-none">${monthlyPrice}</span>
                <span className={twMerge("tracking-tight font-bold text-black/50", inverse == true && "text-white/50")}>/month</span>
              </div>
              <button className={twMerge("btn btn-primary w-full mt-[30px]", inverse === true && "bg-white text-black")}>
                {buttonText}
              </button>
              <ul className="flex flex-col gap-5 mt-8">
                {features.map((feature, index) => (
                  <li className="text-sm flex items-center gap-4" key={index}>
                    <CheckIcon className="h-6 w-6" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};
