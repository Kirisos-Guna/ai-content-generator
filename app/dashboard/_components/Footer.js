"use client";
import Link from 'next/link';
import { Component } from 'react';

class Footer extends Component {
  render() {
    const current_year = new Date().getFullYear();
    return (
      <div id="section_footer" className='m-8'>
        <div className='bg-white text-black p-1 text-center'>
          <p className='text-black'>Copyright © {current_year}, AI Content Generator. All Rights Reserved.</p>
        </div>
        <div className='bg-white text-black py-4 text-center'>
          <Link href="https://portal.termshub.io/6hht8qisyi/privacy_policy/" target="_blank" className='btn btn-link text-black mx-2'>
            Privacy
          </Link>
          <span className='text-black mx-2'>|</span>
          <Link href="https://portal.termshub.io/aicontentgenerator.in/website_tos/" target="_blank" className='btn btn-link text-black mx-2'>
            Terms and Conditions
          </Link>
          <span className='text-black mx-2'>|</span>
          <Link href="https://portal.termshub.io/vie9bnquqh/refund_policy/" className='btn btn-link text-black mx-2'>
            Refund Policy
          </Link>
          <span className='text-black mx-2'>|</span>
          <Link href="https://form.jotform.com/241968606245464" className='btn btn-link text-black mx-2'>
            Contact Us
          </Link>
        </div>
      </div>
    );
  }
}

export default Footer;
