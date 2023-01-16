import Image from "next/image";
import { useState } from "react"
import EmergencyIcon from "../../styles/assets/emergency.svg";

export default function Header() {

    let [emergency, setEmergency] = useState(false);
    return (
      <nav className='flex justify-between p-4 w-screen'>
         
        <a href="../" className="font-medium"><h3>AID-E</h3></a>
         <a href="https://en.wikipedia.org/wiki/Alpaca" target="_blank" className=' cursor-pointer w-12 h-12 grid place-items-center'>
          <Image src={EmergencyIcon} alt="icon"/>

            {/* <span className='text-[#fff]'>!</span> */}
          </a>
      </nav>
    )
  }