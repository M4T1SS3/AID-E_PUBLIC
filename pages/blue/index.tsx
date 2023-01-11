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


    return (
        <main style={{backgroundColor: secretMode  ? "#A6A6A6": undefined}}  className="bg-main-blue min-h-screen w-screen overflow-hidden">
            <ProgressBar/>
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
            {step == 3 && <ActionPage/>}

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


    function InfoPage() {
        return (
            <section className="overflow-hidden">
                <h2 className="text-4xl mt-8 font-bold mb-8 ml-4">It seems you were a victim of</h2>
               
                <motion.ul className="flex mt-4 ml-4 overflow-hidden md:grid md:grid-cols-3 md:gap-y-4 md:m-0 md:px-4" drag={width < breakingPoint ? "x": undefined} style={{width:  width < breakingPoint ? 100 * infoPoints.length + "vw": 100 + "vw"}} dragConstraints={{left: -( width * (infoPoints.length-1)) + 3*2*paddingToBorder, right: 0}}>
                    {infoPoints.map((item, id) => {
                        return (
                            <InfoCard certainty={item.certainty} description={item.description} id={id} link={item.link} offence={item.offencce}/>
                        )
                    })}

                </motion.ul>
            <div className="grid w-full place-items-end mt-16 mb-4">
                    <div onClick={()=> setStep(2)} className="bg-[#000] grid place-items-center h-16 w-44 rounded-lg mr-4">
                        <span className="text-[#fff]">Continue</span>
                    </div>
                </div>
            </section>
        )
    }

    function ActionPage() {

        return (
            <section className="overflow-hidden">
                 <h2 className="text-4xl font-bold mb-8 mt-8 ml-4">This is what you can do</h2>
                 <div className="w-screen px-4">
                    <input className="bg-main-blue w-full placeholder-[#0000007e]  overflow-hidden border-b-2 mb-8 border-[#000000]" type="text" placeholder="Send plan to email"></input>
                 </div>
                 <motion.ul className="flex mt-4 ml-4 overflow-hidden md:grid md:grid-cols-3 md:gap-y-4 md:m-0 md:px-4" drag={width < breakingPoint ? "x": undefined} style={{width:  width < breakingPoint ? 100 * actionPoints.length + "vw": 100 + "vw"}} dragConstraints={{left: -( width * (actionPoints.length-1)) + 3*2*paddingToBorder, right: 0}}>
                    {actionPoints.map((item, index) => {
                        return (
                            <ActionCard id={index} heading={item.heading} description={item.description}/>
                        )
                    })}
                </motion.ul>
                 <div>
                    <a>Go Back Chatting</a>
                    <a>Go Back Chatting</a>
                 </div>
            </section>
        )
    }

    type InfoCardProps = {
        certainty: number, id: number, link: string, offence: string, description: string
    }

    function InfoCard({certainty, id, link, offence, description}: InfoCardProps) {
        return (
            <div className="bg-[#0575FF] rounded-xl p-4 mr-4" style={{width: width < breakingPoint ? width - 3*paddingToBorder  + "px": undefined}} >
                <div className="text-7xl opacity-40 font-bold mt-16">45%</div>
                <h3 className="text-3xl font-bold mb-8">Action Plan</h3>
                <p className="mb-28">Whoever performs or causes to be performed sexual acts on another person against that person's recognisable will or causes that person to perform or tolerate sexual acts on or by a third person.</p>
                <a className="font-bold underline cursor-pointer">Strafgesetzbuch (StGB) § 184i Sexuelle Belästigung</a>
            </div>
        )
       
    }

    type ActionCardProps = {
         id: number,  heading: string, description: string
    }

    function ActionCard({id,  heading, description}: ActionCardProps) {
        return (
            <div className="bg-[#0575FF] rounded-xl p-4 mr-4" style={{width: width < breakingPoint ? width - 3*paddingToBorder  + "px": undefined}} >
            <div className="text-7xl opacity-40 font-bold mt-16">1</div>
            <h3 className="text-3xl font-bold mb-8">Talk with friends and family</h3>
            <p className="mb-28">Whoever performs or causes to be performed sexual acts on another person against that person's recognisable will or causes that person to perform or tolerate sexual acts on or by a third person.</p>
        </div>
        )
       
    }

   
}
