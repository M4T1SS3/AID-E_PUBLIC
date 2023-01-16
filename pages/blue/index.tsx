import Image from "next/image";
import { useState, useEffect } from "react";
import blue from "../../styles/assets/blue.png";
import Header from "../components/header";
import { motion } from "framer-motion";
import Chat from "./chat";

export default function Blue() {
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

    const useWindowResize = (): THook => {
    if (hasWindow) {
        
        const initSize: TWindowSize = [
            window.innerWidth,
            window.innerHeight,
        ];
        const [windowSize, setWindowSize] = useState<TWindowSize>(initSize);

        useEffect(() => {
            const handleResize = (): void => {
            setWindowSize([
                window.innerWidth,
                window.innerHeight,
            ]);
            };

            if ( localStorage  && localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                setSecretMode(true)
              } else {
                setSecretMode(false)
              }

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener("resize", handleResize)
        }, );

        return windowSize;
    } else {
            return [0,0]
    }

};

const [width, height] = useWindowResize();   
console.trace()


    return (
        <main style={{backgroundColor: secretMode  ? "#A6A6A6": undefined}}  className="bg-main-blue min-h-screen w-screen overflow-hidden">
            <Header/>
            {step == 0 && 
                <section className=" overflow-hidden md:grid md:place-items-center">
                   <h2 className="font-semibold text-4xl  mt-12 mb-4 leading-relaxed pl-4">This is a safe place. You are not alone and we are here to help you.</h2>
                     <div className="px-12 w-1/3"><Image src={blue} alt="llustration" /></div>
                    <a href="/blue/chat" className="bg-[#000] grid place-items-center cursor-pointer h-16 w-44 rounded-lg absolute bottom-4 right-4">
                        <span className="text-[#fff]">Continue</span>
                    </a>

                </section>
            }

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
