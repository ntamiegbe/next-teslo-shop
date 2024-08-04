import { titleFont } from '@/config/fonts';
import Link from 'next/link';

export const Footer = () => {
  return (
    <div className="flex w-full justify-center items-center bg-[#222222] text-white py-10 bg-white z-10">

      <Link
        href='/'
      >
        <span className={`${ titleFont.className } antialiased font-bold `}>Summit </span>
        <span>| AutoTech </span>
        <span>© { new Date().getFullYear() }</span>
      </Link>

      <Link
        href='/'
        className="mx-3"
      >
        Privacidad & Legal
      </Link>

      <Link
        href='/'
        className="mx-3"
      >
        Ubicaciones
      </Link>


    </div>
  )
}