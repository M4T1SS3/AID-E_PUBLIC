import { motion } from "framer-motion"
import { useState, useEffect } from "react";
import Header from "../components/header";


export default function ActionPage() {


    const hasWindow = typeof window !== "undefined"
    const paddingToBorder = 16;
    const breakingPoint =  768;
    let [secretMode, setSecretMode] = useState(false)
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

    function useWindowWidth() {
        const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
      
        useEffect(() => {
          const handleResize = () => setWidth(window.innerWidth);
          window.addEventListener('resize', handleResize);
          if ( localStorage  && localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            localStorage.theme = 'light'
            setSecretMode(false)
          } else {
            localStorage.theme = 'dark'
            setSecretMode(true)
          }
          return () => window.removeEventListener('resize', handleResize);
        }, []);
      
        return width;
      }
      const windowWidth = useWindowWidth();

    return (
        <section className="overflow-hidden bg-main-blue min-h-screen" style={{backgroundColor: secretMode  ? "#A6A6A6": undefined}}>
            <Header/>
             <h2 className="text-4xl font-bold mb-8 mt-8 ml-4">This is what you can do</h2>
             <div className="w-screen px-4">
                <input className="w-full bg-main-blue placeholder-[#0000007e]  overflow-hidden border-b-2 mb-8 border-[#000000]" type="text" placeholder="Send plan to email"></input>
             </div>
             <motion.ul className="flex mt-4 ml-4 overflow-hidden md:grid md:grid-cols-3 md:gap-y-4 md:m-0 md:px-4" drag={windowWidth < breakingPoint ? "x": undefined} style={{width:  windowWidth< breakingPoint ? 100 * actionPoints.length + "vw": 100 + "vw"}} dragConstraints={{left: -( windowWidth * (actionPoints.length-1)) + 3*2*paddingToBorder, right: 0}}>
                {actionPoints.map((item, index) => {
                    return (
                        <ActionCard id={index} heading={item.heading} description={item.description}/>
                    )
                })}
            </motion.ul>
            <div className="flex gap-x-4 h-16 w-full mt-4 px-4">
                    <div className="bg-[#000] w-full rounded-lg grid place-items-center cursor-pointer text-center text-[#fff]">
                        Go back chatting
                    </div>
                    <a href="/blue/infoPage" className="bg-[#000] w-full rounded-lg grid place-items-center cursor-pointer text-center text-[#fff]">
                        Send email
                    </a>
                </div>
        </section>
    )

    

type ActionCardProps = {
    id: number,  heading: string, description: string
}

function ActionCard({id,  heading, description}: ActionCardProps) {
   return (
       <div className="bg-[#0575FF] rounded-xl p-4 mr-4" style={{width: windowWidth < breakingPoint ? windowWidth - 3*paddingToBorder  + "px": undefined}} >
       <div className="text-7xl opacity-40 font-bold mt-16">{id}</div>
       <h3 className="text-3xl font-bold mb-8">Talk with friends and family</h3>
       <p className="mb-28">Whoever performs or causes to be performed sexual acts on another person against that person's recognisable will or causes that person to perform or tolerate sexual acts on or by a third person.</p>
   </div>
   )
  
}
}
