import Header from "../components/header";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

export default function InfoPage() {
    const paddingToBorder = 16;
    const breakingPoint =  768;
    const controls = useAnimation();
    const promt = "Please provide the victim with a legal analysis of what happened in the following format. Just add the following information marked with ** and dont add other information that does not fit the format.Every paragraph should start with: violation: *here should be the name of the violoation of the law. Then it follow with: Description: *here should be the description of the violation of the law*. In the End the end there should always be a Link: *here should be a link to further information about the crime*."
    let [secretMode, setSecretMode] = useState(false)
    useEffect(() => {
        if ( localStorage  && localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setSecretMode(true)
          } else {
            console.log("dd")
            setSecretMode(false)
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
        const response = await fetch('/api/openai', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify(promt),
          })
        const data = await response.json();
        console.log(data)
        const test = "Violation: Rape Description: Rape is a criminal offense that occurs when an individual forces another individual to engage in sexual acts against their will. This can include penetration, oral sex or any other kind of sexual touching. In many jurisdictions, rape also includes situations where the victim is unable to give consent due to being under the influence of drugs or alcohol, being asleep or unconscious, or having a mental disab Link: https://www.rainn.org/articles/legal-definition-rape Violation: Sexual Assault Description: Sexual assault is a broader term that encompasses any unwanted sexual contact, including rape. It can include non-consensual touching, fondling, and kissing, as well as attempted rape. It also includes situations where the victim is unable to give consent. Link: https://www.rainn.org/articles/sexual-assaultViolation: Statutory Rape. Description: Statutory rape is a crime that occurs when an individual engages in sexual activity with a person who is under the age of consent. The age of consent varies from state to state, but is generally between 16-18 years old. Even if the sexual activity was consensual, it is still considered a crime if one of the individuals is under the age of consent. Link: https://www.rainn.org/articles/statutory-rapeIt's worth mentioning that laws and penalties can vary depending on the jurisdiction and some specifics of the case, and that the above are general overviews. I strongly advise you to seek professional legal advice to have a better understanding of the laws and your rights in your specific case."
        let stringList = data.split("Violation: ");
        let cleanStringList = stringList.filter((item: string) => item != "");
        stringList = cleanStringList
        // Initialize an empty array to store the items

        let items = stringList.map((item: string) => item.split(/Description: | Link: /))
        setInfoPoints( infoPoints =  items)
        console.log(infoPoints)
        

    } catch (error) {
        console.log(error)
    }
    
   }
   

    return (
        <section className="overflow-hidden bg-main-blue min-h-screen h-screen md:h-auto" style={{backgroundColor: secretMode  ? "#A6A6A6": undefined}} >
            <Header/>
        <h2 className="text-4xl mt-8 font-bold mb-8 ml-4">It seems you were a victim of</h2>
       
        <motion.ul animate={controls}  className=" h-4/6 flex mt-4 ml-4 overflow-hidden md:grid md:grid-cols-3 md:gap-y-4 md:m-0 md:px-4" drag={width < breakingPoint ? "x": undefined} style={{width:  width < breakingPoint ? 100 * infoPoints.length + "vw": 100 + "vw"}} dragConstraints={{left: -( width * (infoPoints.length-1)) + 4*2*paddingToBorder, right: 0}}>
            {infoPoints.map((item, id) => {
                return (
                    <InfoCard  id={id} item={item}/>
                )
            })}

        </motion.ul>
        <div className="grid w-full place-items-end mt-16 mb-4 px-4">
            <a href="/blue/actionPlan"  className="bg-[#000] grid place-items-center h-16 w-full rounded-lg">
                <span className="text-[#fff]">Continue</span>
            </a>
        </div>
    </section>
    )

    type InfoCardProps = {
        certainty: number, id: number, link: string, offence: string, description: string
    }

  

    function InfoCard({id, item}: any) {

        return (
            <motion.div key={id}  animate={{ x: 0, opacity: 1 }} initial={{opacity: 0}}  transition={[{ delay:1+ id * 5 }, { duration: 0.5 }, {type: "ease"}]} className="bg-[#0575FF] rounded-xl p-4 mr-4" style={{width: width < breakingPoint ? width - 4*paddingToBorder  + "px": undefined}} >
                    <div className="text-7xl opacity-40 font-bold mt-16">{id+1}</div>
                    <h3 className="text-5xl font-bold mb-8">{item[0]}</h3>
                    <p className="w-4/5">{item[1]}</p>
                    <a href={item[2]} className="font-bold underline cursor-pointer grid-row-end-span-1">{item[2]}</a>
            </motion.div>
        )
       
    }
}