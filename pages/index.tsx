import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Header from './components/header'
import { useDragControls, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import ArrowIcon from "../styles/assets/long-arrow.svg"
import BlueIllustration from "../styles/assets/blue-illustration.png"
import RedIllustration from "../styles/assets/red-illustration.png"
import Link from 'next/link'


export default function Home() {
  const dragControls = useDragControls()
  let [dragPosition, setDragPosition] = useState(0)
  let [secretMode, setSecretMode] = useState(false)

  const circleWidth = 48
  const swipeMargin = circleWidth + 4* 8;
  let [theme, setTheme] = useState('');

  function whileDrag(event: any) {

    if (event.clientX >= windowWidth - 2 *8) {
    } else {
      setDragPosition(event.clientX)
    }
  }

  function dragEnd(event: any) {
    if (event.clientX >= windowWidth - 2 *8) {
      switchTheme()
      console.log(secretMode)
    }
    setDragPosition(0)
  }


  function useWindowWidth() {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  
    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      if ( localStorage  && localStorage.theme === 'secret' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: secret)').matches)) {
        setSecretMode(true)
      } else {
        setSecretMode(false)
      }
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return width;
  }

  function switchTheme() {
    if (localStorage.theme == "secret") {
      localStorage.theme = 'normal'
    } else {
      localStorage.theme = 'secret'
    }
    setSecretMode(!secretMode)

  }


  const windowWidth = useWindowWidth();


  return (
    <main style={{backgroundColor: secretMode  ? "#4b4b4b": undefined}} className='w-screen h-screen font-Poppins bg-[#060606]'>
     <Header back={false}/>
      <div className='md:flex-row flex-col flex h-4/6 w-full md:px-16'>
        <Link style={{backgroundColor: secretMode  ? "#A6A6A6": undefined}} href='/blue'
          className={`overflow-hidden relative w-full md:h-full text-center h-1/2 cursor-pointer rounded-3xl grid place-items-center bg-main-blue`}
        >
          <motion.h2 style={{fontSize: secretMode  ? 14 + "px": undefined}} className='font-bold text-[#fff] text-3xl absolute z-10'>Am I a victim?</motion.h2>
         {secretMode == false && <Image className='w-full absolute z-0' src={BlueIllustration} alt="a person is getting comforted by another person. 2d illustration. colors. abstract style. playful sad vibe."></Image>}
        </Link>
        <Link style={{backgroundColor: secretMode  ? "#A4A4A6": undefined}} href='/red'
          className={`overflow-hidden relative w-full md:h-full text-center h-1/2 cursor-pointer rounded-3xl grid place-items-center bg-main-blue`}
        >
          <motion.h2 style={{fontSize: secretMode  ? 14 + "px": undefined}}  className='font-bold text-[#fff] text-3xl absolute z-20'>I am a victim.<br></br> Whats next?</motion.h2>
          {secretMode == false &&<Image className='w-full absolute z-10 opacity-90' src={RedIllustration} alt="a person is getting comforted by another person. 2d illustration. colors. abstract style. playful sad vibe."></Image>}
        </Link>
      </div>
      <div className='absolute bottom-4 px-2 w-full'>
        <div className='rounded-full bg-[#fff] h-16 p-2 flex items-center '>
          <motion.div onDrag={whileDrag} onDragEnd={(event) => dragEnd(event)}
            whileTap={{ cursor: "grabbing" }}
            dragSnapToOrigin={true}
            style={{ touchAction: "none" }}
            drag="x" dragConstraints={{left: 0, right: windowWidth - swipeMargin}}
            dragElastic={0} dragControls={dragControls} 
            className='h-12 w-12 px-2 grid place-items-center rounded-full z-99 bg-[#000000] absolute cursor-pointer'>
              <Image src={ArrowIcon} alt="arrow icon" className='pointer-events-none'></Image>
          </motion.div>
          <div className='h-12 rounded-full bg-[#97bfff] ' style={{width: dragPosition }} />
          <span className='mx-auto text-[#000] text-center absolute left-1/2 translate-x-[-50%]'>{ secretMode ? "activate calm colors" :"activate discreet colors"}</span>
        </div>
      </div>
    </main>
  )

  


}
