import ArrowRight from "@/app/assets/arrow-right.svg";
import Logo from "@/app/assets/logosaas.png";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="sticky top-0 backdrop-blur-sm z-20">
      <div className="flex justify-center items-center py-3 bg-black text-white text-sm">
        <p className="text-white/60 hidden md:block mr-3">
          Streamline your workflow and boost your productivity
        </p>
        <div className="inline-flex items-center">
          <a className="mr-1" href="/dashboard">Get started for free</a>
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
      <div className="py-5">
        <div className="container  ">
          <div className="flex items-center justify-between">
            <Image src={Logo} alt="Saas Logo" width={40} height={40} />
            {/* <MenuIcon className="h-5 w-5 md:hidden" /> */}
            <a href="/dashboard" className="bg-black text-white px-4 py-2 rounded-lg font-medium tracking-tight hover:bg-gray-800 transition-colors">
              Get started
            {/* <nav className="hidden md:flex items-center space-x-6"> */}
              {/* <a href="#" className="text-black/60 hover:text-black">About</a> */}
              {/* <a href="#" className="text-black/60 hover:text-black">Features</a> */}
              {/* <a href="#" className="text-black/60 hover:text-black">Updates</a> */}
              {/* <a href="#" className="text-black/60 hover:text-black">Help</a> */}
              {/* <button className="bg-black text-white px-4 py-2 rounded-lg font-medium tracking-tight hover:bg-gray-800 transition-colors"> */}
                {/* Get for free */}
              {/* </button> */}
            {/* </nav> */}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};