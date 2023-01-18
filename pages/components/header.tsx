import Image from "next/image";
import { useState } from "react"
import EmergencyIcon from "../../styles/assets/emergency-white.svg";
import ArrowIcon from "../../styles/assets/long-arrow.svg"
import { useRouter } from "next/router";
import Link from "next/link";

export default function Header({back}: any) {
  const router = useRouter()
    let [emergency, setEmergency] = useState(false);
    return (
      <nav className='flex  justify-between p-4 w-screen z-90'>
         {back == true && <div className="cursor-pointer" onClick={() => router.back()}><Image className="rotate-180"  src={ArrowIcon} alt="icon"/></div>}
        <Link href="../" className="font-medium text-[#fff]"><h3>AID-E</h3></Link>
         <Link href="https://en.wikipedia.org/wiki/Alpaca" target="_blank" className=' cursor-pointer w-12 h-12 grid place-items-center'>
          <Image src={EmergencyIcon} alt="icon"/>

            {/* <span className='text-[#fff]'>!</span> */}
          </Link>
      </nav>
    )
  }