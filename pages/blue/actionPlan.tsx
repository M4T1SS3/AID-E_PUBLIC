import { motion } from "framer-motion"
import Link from "next/link";
import { useState, useEffect } from "react";
import Header from "../components/header";
import Loading from "../components/loading";


export default function ActionPage() {

    async function getInfoCards() {
        try {
            let history = localStorage.getItem("messages")
            const response = await fetch('https://aid-e.netlify.app/api/openai', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body:JSON.stringify("ö§-" + history),
              })
            const data = await response.json();
            let stringList = data.split("Headline: ");
            let cleanStringList = stringList.filter((item: string) => item != "");
            cleanStringList = stringList.filter((item: string) => item.length > 8);
            stringList = cleanStringList
            let items = stringList.map((item: string) => item.split(/Description:/))
            // let cleanItems = items.filter((item: string) => item.length > 1);
            // items = cleanItems
            setActionPoints( actionPoints =  items)
            console.log(actionPoints)
            setLoaded(true)
    
        } catch (error) {
            console.log(error)
        }
        
       }
    const hasWindow = typeof window !== "undefined"
    const paddingToBorder = 16;
    const breakingPoint =  768;
    let [secretMode, setSecretMode] = useState(false)
    let [actionPoints, setActionPoints] = useState<String[][]>([])
    let [loaded, setLoaded] = useState(false)
    let [email, setEmail] = useState("")

        // {
        //     heading: "sexual assault",
        //     description: "Whoever performs or causes to be performed sexual acts on another person against that person's recognisable will or causes that person to perform or tolerate sexual acts on or by a third person.",
        // },
        // {
        //     heading: "sexual assault",
        //     description: "Whoever performs or causes to be performed sexual acts on another person against that person's recognisable will or causes that person to perform or tolerate sexual acts on or by a third person.",
        // },

   

    function useWindowWidth() {
        const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
      
        useEffect(() => {
          const handleResize = () => setWidth(window.innerWidth);
          getInfoCards()
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
      const width = useWindowWidth();

      function deleteChat() {
        localStorage.setItem("messages", "");
    }

    return (
        <section className="overflow-hidden grid bg-main-blue min-h-screen" style={{backgroundColor: secretMode  ? "#A6A6A6": undefined}}>
             <Header back={true}/>
             {loaded === false &&<Loading/>}
             {loaded &&<div className="w-screen px-4 ">
                <h2 className="text-4xl font-bold mb-8 mt-8">This is what you can do</h2>
                <input style={{backgroundColor: secretMode  ? "#A6A6A6": undefined}} className="w-full placeholder-[#0000007e] bg-main-blue overflow-hidden border-b-2 mb-8 border-[#000000]" type="text" placeholder="Send plan to email"></input>
             </div>}
             {loaded &&<motion.ul className="flex row-span-4 md:row-span-1 mt-4 ml-4 overflow-hidden md:grid md:grid-cols-3 md:gap-y-4 md:m-0 md:px-4"
                drag={width< breakingPoint ? "x": undefined}
                style={{width:  width< breakingPoint ? 100 * actionPoints.length + "vw": 100 + "vw"}}
                dragConstraints={{left: -( width * (actionPoints.length-1)) + 4*2*paddingToBorder, right: 0}}>
                {actionPoints.map(({index, item }: any) => {
                    return (
                        <ActionCard key={index} item={item}/>
                    )
                })}
            </motion.ul>}
            {loaded && <div className="flex mt-4 gap-x-4 h-16 w-screen px-4">
                    <div className="bg-[#000] w-1/2 rounded-lg grid place-items-center cursor-pointer text-center text-[#fff]" onClick={() => deleteChat()}>
                        Delete data
                    </div>
                    <Link href="/blue/infoPage" className="bg-[#000] w-1/2 rounded-lg grid place-items-center cursor-pointer text-center text-[#fff]" style={{opacity: email.length === 0 ? 50 + "%": 100 + "%"}}>
                        Send email
                    </Link>
                </div>}
        </section>
    )

    

type ActionCardProps = {
    id: number,  heading: string, description: string
}

function ActionCard({key,  item}: any) {
   return (
    <div key={key} className="bg-[#40D0FF] rounded-xl p-4 mr-4 cursor-grab" style={{width: width < breakingPoint ? width - 3*paddingToBorder  + "px": undefined}} >
       <div className="text-7xl opacity-40 font-bold mt-16">{key +1}</div>
       <h3 className="text-3xl font-bold mb-8">{item[0]}</h3>
       <p className="">{item[1]}</p>
   </div>
   )
  
}
}
