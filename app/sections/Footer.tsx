import logo from '@/app/assets/logosaas.png';
import SocialInsta from '@/app/assets/social-insta.svg';
import SocialX from '@/app/assets/social-x.svg';
import SocialYoutube from '@/app/assets/social-youtube.svg';
import Image from 'next/image';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-[#BCBCBC] text-sm py-10 text-center">
      <div className="container">
        <div className="inline-flex relative before:content-[''] before:top-2 before:bottom-0 before:h-full before:blur before:w-full before:bg-[linear-gradient(to_right,#F87BFF,#FB92CF,#FFDD9B,#C2F0B1,#2FD8FE)] before:absolute">
          <Image src={logo} alt="Logo" height={40} className="relative" />
        </div>
        <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
          <a href="https://portal.termshub.io/6qt0snfnjz/privacy_policy/">Privacy Policy</a>
          <a href="https://portal.termshub.io/d67etna5ft/website_tos/">Terms and Conditions</a>
          <a href="https://portal.termshub.io/vie9bnquqh/refund_policy/">Refund Policy</a>
          <a href="/dashboard/contact">Contact Us</a>
        </nav>
        <div className="flex justify-center gap-6 mt-6">
          <SocialX />
          <SocialInsta />
          <SocialYoutube />
        </div>
        <p className="mt-6">
          &copy; {currentYear} AI Content Generator. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
