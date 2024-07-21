"use client";
import Link from 'next/link';
import { Component } from 'react';

class Footer extends Component {
  render() {
    const current_year = new Date().getFullYear();
    return (
      <div id="section_footer" className='m-8'>
        <div className='bg-white text-black p-1 text-center'>
          <p className='text-black'>Copyright © {current_year}.All Rights Reserved.</p>
        </div>
        <div className='bg-white text-black py-4 text-center'>
          <Link href="https://portal.termshub.io/6qt0snfnjz/privacy_policy/" target="_blank" className='btn btn-link text-black mx-2'>
            Privacy Policy
          </Link>
          <span className='text-black mx-2'>|</span>
          <Link href="https://portal.termshub.io/d67etna5ft/website_tos/" target="_blank" className='btn btn-link text-black mx-2'>
            Terms and Conditions
          </Link>
          <span className='text-black mx-2'>|</span>
          <Link href="https://portal.termshub.io/vie9bnquqh/refund_policy/" className='btn btn-link text-black mx-2'>
            Refund Policy
          </Link>
          <span className='text-black mx-2'>|</span>
          <a href="/dashboard/contact" className='btn btn-link text-black mx-2'>
            Contact Us
          </a>
        </div>
      </div>
    );
  }
}

export default Footer;
