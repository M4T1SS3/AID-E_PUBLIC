import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Header from './components/header'
import { useDragControls, motion } from 'framer-motion'
import { useEffect, useState } from 'react'


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

  function switchTheme() {
    if (localStorage.theme == "dark") {
      localStorage.theme = 'light'
    } else {
      localStorage.theme = 'dark'
    }
    setSecretMode(!secretMode)

  }


  const windowWidth = useWindowWidth();


  return (
    <main className='w-screen h-screen font-Poppins'>
     <Header/>
      <div className='md:flex-row flex-col flex h-4/6 w-full '>
        <a style={{backgroundColor: secretMode  ? "#A6A6A6": undefined}} href='/blue' className={`w-full md:h-3/4 text-center h-1/2 cursor-pointer rounded-3xl grid place-items-center  bg-main-blue`}><div ><h2 className='font-medium'>Am I a victim?</h2></div></a>
        <div style={{backgroundColor: secretMode  ? "#636363": undefined}} className='w-full md:h-3/4 text-center h-1/2 cursor-pointer grid rounded-3xl place-items-center bg-main-pink'><h2 className='font-medium'>I am a victim.<br></br>Whats next?</h2></div>
      </div>
      <div>
        <div className='rounded-full bg-[#000] h-16 p-2 flex items-center relative mx-2'>
          <motion.div onDrag={whileDrag} onDragEnd={(event) => dragEnd(event)}
            whileTap={{ cursor: "grabbing" }}
            dragSnapToOrigin={true}
            style={{ touchAction: "none" }}
            drag="x" dragConstraints={{left: 0, right: windowWidth - swipeMargin}}
            dragElastic={0} dragControls={dragControls} 
            className='h-12 w-12 rounded-full z-99 bg-[#fff] absolute cursor-pointer'>
          </motion.div>
          <div className='h-12 rounded-full bg-[#f1f] ' style={{width: dragPosition }} />
          <span className='mx-auto text-[#fff] absolute left-1/2 translate-x-[-50%]'>activate safemode</span>
        </div>
      </div>
    </main>
  )

  


}
