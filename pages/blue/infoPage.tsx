import Header from "../components/header";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Loading from "../components/loading";
import Link from "next/link";

export default function InfoPage() {
    const paddingToBorder = 16;
    const breakingPoint =  768;
    const controls = useAnimation();
    let [secretMode, setSecretMode] = useState(false)
    let [loaded, setLoaded] = useState(false)
    useEffect(() => {
      if ( localStorage  && localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        localStorage.theme = 'light'
        setSecretMode(false)
      } else {
        localStorage.theme = 'dark'
        setSecretMode(true)
      }
          getInfoCards()

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



    let [infoPoints, setInfoPoints] = useState<String[][]>([])

   async function getInfoCards() {
    try {
        let history = localStorage.getItem("messages")
        const response = await fetch('https://aid-e.netlify.app/api/openai', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify("*!&" + history),
          })
        const data = await response.json();
        let stringList = data.split(/Violation: | Verletztung: | verletztung: | violation: /);
        let cleanStringList = stringList.filter((item: string) => item != "");
        cleanStringList = stringList.filter((item: string) => item.length > 8);
        stringList = cleanStringList
        let items = stringList.map((item: string) => item.split(/Description:|Link: | Beschreibung: /))
        setInfoPoints( infoPoints =  items)
        console.log(infoPoints)
        setLoaded(true)
    } catch (error) {
        console.log(error)
    }
    
   }
   

    return (
        <section className="overflow-hidden bg-main-blue min-h-screen h-screen md:h-auto" style={{backgroundColor: secretMode  ? "#A6A6A6": undefined}} >
          <Header back={true}/>
          {loaded && <h2 className="text-4xl mt-8 font-bold mb-8 ml-4">It seems you were a victim of</h2>}
          {loaded == false &&<Loading/>}

          <motion.ul animate={controls}
          className=" h-4/6 min-w-full flex mt-4 ml-4 overflow-hidden md:grid md:grid-cols-3 md:gap-y-4 md:m-0 md:px-4"
          drag={width < breakingPoint ? "x": undefined}
          style={{width:  width < breakingPoint ? 100 * infoPoints.length + "vw": 100 + "vw"}}
          dragConstraints={{left: -( width * (infoPoints.length-1)) + 4*2*paddingToBorder, right: 0}}>
            {infoPoints.length > 0 && infoPoints.map(({key, item}: any) => {
                return (
                    <InfoCard  key={key} item={item}/>
                )
            })}

        </motion.ul>
        {loaded &&<div className="grid w-full place-items-end mt-16 mb-4 px-4">
            <Link href="/blue/actionPlan"  className="bg-[#000] grid place-items-center h-16 w-full rounded-lg">
                <span className="text-[#fff]">Continue</span>
            </Link>
        </div>}
    </section>
    )

    type InfoCardProps = {
        certainty: number, id: number, link: string, offence: string, description: string
    }

  

    function InfoCard({key, item}: any) {

        return (
            <motion.div key={key}  
              animate={{ x: 0, opacity: 1 }} initial={{opacity: 0}}
              className="bg-[#40D0FF] rounded-xl p-4 mr-4 overflow-hidden" 
              style={{width: width < breakingPoint ? width - 4*paddingToBorder  + "px": undefined}} >
                <div className="text-7xl opacity-40 font-bold mt-16">{key+1}</div>
                <h3 className="text-5xl font-bold mb-8">{item[0]}</h3>
                <p className="mb-16 w-5/6 max-w-[100%] break-words">{item[1]}</p>
                <Link href={item[2]} className="font-bold  underline cursor-pointer grid-row-end-span-1">{item[2]}</Link>
            </motion.div>
        )
       
    }
}