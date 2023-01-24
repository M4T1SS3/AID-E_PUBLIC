import Image from "next/image";
import { useState, useEffect } from "react";
import blue from "../../styles/assets/red-illustration.png";
import Header from "../components/header";
import { motion } from "framer-motion";
import Chat from "./chat";
import Link from "next/link";

export default function Red() {
    let [step, setStep] = useState(0);
    let [actionPoints, setActionPoints] = useState([
        {
            heading: "sexual assault",
            description: "Whoever performs or causes to be performed sexual acts on another person against that person's recognisable will or causes that person to perform or tolerate sexual acts on or by a third person.",
        },
        {
            heading: "sexual assault",
            description: "Whoever performs or causes to be performed sexual acts on another person against that person's recognisable will or causes that person to perform or tolerate sexual acts on or by a third person.",
        },

    ])
    let [infoPoints, setInfoPoints] = useState([
        {
            certainty: 0.8,
            offencce: "sexual assault",
            description: "Whoever performs or causes to be performed sexual acts on another person against that person's recognisable will or causes that person to perform or tolerate sexual acts on or by a third person.",
            link: "Strafgesetzbuch (StGB) § 184i Sexuelle Belästigung"
        },
        {
            certainty: 0.8,
            offencce: "sexual assault",
            description: "Whoever performs or causes to be performed sexual acts on another person against that person's recognisable will or causes that person to perform or tolerate sexual acts on or by a third person.",
            link: "Strafgesetzbuch (StGB) § 184i Sexuelle Belästigung"
        },
        {
            certainty: 0.8,
            offencce: "sexual assault",
            description: "Whoever performs or causes to be performed sexual acts on another person against that person's recognisable will or causes that person to perform or tolerate sexual acts on or by a third person.",
            link: "Strafgesetzbuch (StGB) § 184i Sexuelle Belästigung"
        }
        ,
        {
            certainty: 0.8,
            offencce: "sexual assault",
            description: "Whoever performs or causes to be performed sexual acts on another person against that person's recognisable will or causes that person to perform or tolerate sexual acts on or by a third person.",
            link: "Strafgesetzbuch (StGB) § 184i Sexuelle Belästigung"
        }
    ])
    
    type TWindowSize = [number, number];
    type THook = TWindowSize;
    const hasWindow = typeof window !== "undefined"
    const paddingToBorder = 16;
    const breakingPoint =  768;
    let [secretMode, setSecretMode] = useState(false)

    

        useEffect(() => {
           

            if ( localStorage  && localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                setSecretMode(true)
              } else {
                setSecretMode(false)
              }

        }, []);

   



    return (
        <main style={{backgroundColor: secretMode  ? "#A6A6A6": undefined}}  className="relative bg-main-blue min-h-screen w-screen overflow-hidden">
           <div style={{zIndex: 99}} className="z-90 absolute"> <Header back={true}/></div>
            <h2 style={{zIndex: 99}} className="top-16 lg:top-64 w-5/6 lg:w-1/2 left-1/2 translate-x-[-50%] lg:text-center absolute font-semibold text-4xl md:text-7xl text-[#fff] mt-12 mb-4 leading-relaxed pl-4 z-20">This is a safe place.You are not alone and we are here to help you.</h2>
            <Link style={{zIndex: 99}} href="/red/chat" className=" z-20 bg-[#000] grid place-items-center cursor-pointer h-16 w-44 rounded-lg absolute bottom-4 right-4">
                <span className="text-[#fff] bottom-0">Continue</span>
            </Link>
            <Image style={{zIndex: -0}} className="z-0 w-[220%] lg:w-screen lg:translate-y-[-20vh]  max-w-[250%]  top-0 absolute" src={blue} alt="llustration" />
        </main>
    )

    function ProgressBar() {
        return (
            <div className=" w-screen top-0 left-0">
                <div className="bg-[#000] opacity-60 absolute  h-2 " style={{width: 33 * step + "%"}}></div>

                <div className="bg-[#000] opacity-25 h-2 w-full"></div>
            </div>
        )
    }


   
}
