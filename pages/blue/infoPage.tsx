import Header from "../components/header";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

export default function InfoPage() {
    const paddingToBorder = 16;
    const breakingPoint =  768;
    const controls = useAnimation();

    let [secretMode, setSecretMode] = useState(false)
    useEffect(() => {
        if ( localStorage  && localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            localStorage.theme = 'light'
            setSecretMode(false)
          } else {
            localStorage.theme = 'dark'
            setSecretMode(true)
          }
    }, [])

    function useWindowWidth() {
        const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
      
        useEffect(() => {
          const handleResize = () => setWidth(window.innerWidth);
          window.addEventListener('resize', handleResize);
          controls.start({
            transition: {
              staggerChildren: 5,
            },
          });
          return () => window.removeEventListener('resize', handleResize);

        }, []);
      
        return width;
      }
    
    const width = useWindowWidth(); 



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

   
   

    return (
        <section className="overflow-hidden bg-main-blue min-h-screen" style={{backgroundColor: secretMode  ? "#A6A6A6": undefined}} >
            <Header/>
        <h2 className="text-4xl mt-8 font-bold mb-8 ml-4">It seems you were a victim of</h2>
       
        <motion.ul animate={controls}  className="flex mt-4 ml-4 overflow-hidden md:grid md:grid-cols-3 md:gap-y-4 md:m-0 md:px-4" drag={width < breakingPoint ? "x": undefined} style={{width:  width < breakingPoint ? 100 * infoPoints.length + "vw": 100 + "vw"}} dragConstraints={{left: -( width * (infoPoints.length-1)) + 3*2*paddingToBorder, right: 0}}>
            {infoPoints.map((item, id) => {
                return (
                    <InfoCard certainty={item.certainty} description={item.description} id={id} link={item.link} offence={item.offencce}/>
                )
            })}

        </motion.ul>
    <div className="grid w-full place-items-end mt-16 mb-4">
            <a href="/blue/actionPlan"  className="bg-[#000] grid place-items-center h-16 w-44 rounded-lg mr-4">
                <span className="text-[#fff]">Continue</span>
            </a>
        </div>
    </section>
    )

    type InfoCardProps = {
        certainty: number, id: number, link: string, offence: string, description: string
    }

  

    function InfoCard({certainty, id, link, offence, description}: InfoCardProps) {
        return (
            <motion.div  animate={{ x: 0, opacity: 1 }} initial={{opacity: 0}}  transition={[{ delay:1+ id * 5 }, { duration: 0.5 }, {type: "ease"}]} className="bg-[#0575FF] rounded-xl p-4 mr-4" style={{width: width < breakingPoint ? width - 3*paddingToBorder  + "px": undefined}} >
                <div className="text-7xl opacity-40 font-bold mt-16">45%</div>
                <h3 className="text-3xl font-bold mb-8">Action Plan</h3>
                <p className="mb-28">Whoever performs or causes to be performed sexual acts on another person against that person's recognisable will or causes that person to perform or tolerate sexual acts on or by a third person.</p>
                <a className="font-bold underline cursor-pointer">Strafgesetzbuch (StGB) § 184i Sexuelle Belästigung</a>
            </motion.div>
        )
       
    }
}