import { titleFont } from '@/config/fonts';
import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaTiktok } from 'react-icons/fa';

export const Footer = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center bg-[#1e186f] text-white lg:py-10 py-5 px-5">

      {/* Logo Section */}
      <div className="flex items-center mb-4 lg:mb-0">
        <Image
          src="/images/Logo.jpg" 
          alt="Company Logo"
          width={100}
          height={50}
          className='rounded-2xl h-28 w-40'
        />
      </div>

      {/* Links and Copyright */}
      <div className="text-center">
        <Link href='/'>
          <span className={`${titleFont.className} antialiased font-bold`}>Summit </span>
          <span>| AutoTech </span>
          <span>© {new Date().getFullYear()}</span>
        </Link>
      </div>

      {/* Contact Information */}
      <div className="text-center mb-4 lg:mb-0">
        <p>Contact Us: <a href="mailto:summittechresources@gmail.com" className="text-white hover:text-gray-400">summittechresources@gmail.com</a></p>
        <p>Phone: <a href="tel:+2349036936440" className="text-white hover:text-gray-400">09036936440</a></p>
      </div>

      {/* Social Media Icons */}
      <div className="flex space-x-4">
        <Link href="https://www.instagram.com/carsofabuja_?igsh=YTkwam5veDYwZno3&utm_source=qr" target="_blank" className="text-pink-600 hover:text-gray-400">
          <FaInstagram className="w-10 h-10" />
        </Link>
        <Link href="https://www.tiktok.com/@jackofalltrades8958?_t=8ofcmjyqPwM&_r=1" target="_blank" className="text-black hover:text-gray-400 bg-white p-1 rounded-xl">
          <FaTiktok className="w-8 h-8" />
        </Link>
      </div>
    </div>
  );
}