"use client";
import { Component } from 'react';

class Footer extends Component {
  render() {
    const current_year = new Date().getFullYear();
    return (
      <div id="section_footer" className='m-8'>
        <div className='bg-primary text-white p-1 text-center'>
          <p className='text-white'>Copyright © {current_year}, AI Content Generator. All Rights Reserved.</p>
        </div>
      </div>
    );
  }
}

export default Footer;
