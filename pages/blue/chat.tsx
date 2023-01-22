import { useState, useEffect, useLayoutEffect, useCallback } from "react"
import Header from "../components/header";
import { Configuration, OpenAIApi } from "openai";
import { motion } from "framer-motion";
import { useRouter } from 'next/router';
import React from "react";
import ArrowIcon from "../../styles/assets/arrow.svg"
import Image from "next/image";
import Link from "next/link";


function Chat() {
    //scroll to bottom

    let [input, setInput] = useState("")
    let [messages, setMessages] = useState<MessageProps[]>([]);

    type MessageProps = {
        message: string,
        input: boolean
    }

    function addMessage () {
        if (input === "") {
            return;
        }

        let newMessage = {message: input, input: true}
        setMessages(messages = [...messages, newMessage])
        console.log(messages)

        localStorage.setItem("messages", JSON.stringify(messages));
        handleSubmit()
        setInput(input = "")
        window.scrollTo(0, 0);
    };


    async function handleSubmit() {
        
            let history = ""
            messages.map((item) => {
                if (item.input == true) {
                    history += "[what the victim said]: " + item.message;
                } else{
                    history += " [what you said]: " + item.message;
                }
            })


            const response = await fetch("https://aid-e.netlify.app/api/openai", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body:JSON.stringify(history),
              })
            const data = await response.json();
            let newMessage = {message: data, input: false}
            setMessages(messages = [...messages, newMessage])
            localStorage.setItem("messages", JSON.stringify(messages));
            window.scrollTo(0, 0);
        
      }
    


    function handleKeyDown (event: any) {
        if (event.key === 'Enter') {
            addMessage()
            window.scrollTo(0, 0);
        }
    }
    const [greeting, setGreeting] = useState("")
    const router = useRouter();

       
    let [secretMode, setSecretMode] = useState(false)


    useEffect(() => {
        if ( localStorage  && localStorage.theme === 'secret' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: secret)').matches)) {
            setSecretMode(true)
          } else {
            setSecretMode(false)
          }
        
          let messages = localStorage.getItem("messages");
          if (messages !== null && messages !== "") {
            setMessages(JSON.parse(messages));
          }
          
          
    }, [])

    function deleteChat() {
        localStorage.setItem("messages", "");
        setMessages(messages = []);
    }


    return (
        <main className="bg-main-blue w-screen min-h-screen overflow-hidden relative" style={{backgroundColor: secretMode  ? "#A6A6A6": undefined}}>
            <Header back={true}/>
            <div className="p-4 relative mb-32">
                    <motion.div
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                    transition={{ duration: 0.5 }}
                    className="grid place-items-start">
                        <p  style={{backgroundColor: secretMode  ? "#414141": undefined}} className="bg-[#423898] text-[#fff] rounded-lg break-word max-w-[70%] md:max-w-[50%] p-2 my-2">Hello, I am assistent aid-e. If you have been a victim of a crime, I understand that this may be a difficult time for you. Please know that I am here to listen to you. My main goal is to navigate through this difficult time, and to provide you with the assistance you need to feel safe. Is there anything specific you would like to talk about? This is a safe place where you can talk openly and honestly about what you're going through. I am here to help.</p>
                    </motion.div>
                    {messages.map((message: MessageProps, index: number) => {
                    
                    if (message.input === true) {
                        return (
                            <motion.div  key={index}
                            initial={{ opacity: 0}}
                            animate={{ opacity: 1}}
                            transition={{ duration: 0.5 }}
                            className="grid place-items-end max-w-1/3">
                                <p className="bg-[#fff] opacity-60 text-[#000] rounded-lg p-2 my-2 break-word max-w-[50%] ">{message.message}</p>
                            </motion.div>
                        )
                    }
                    if (message.input === false) {
                        return (
                            <motion.div key={index}
                            initial={{ opacity: 0}}
                            animate={{ opacity: 1}}
                            transition={{ duration: 0.5 }}
                            
                            className="grid place-items-start">
                                <p style={{backgroundColor: secretMode  ? "#414141": undefined}} className="bg-[#423898] text-[#fff] rounded-lg break-word max-w-[70%] md:max-w-[50%] p-2 my-2">{message.message}</p>
                            </motion.div>
                        )
                    }
                })}
            </div>
            <div className="w-screen px-4 fixed bottom-4">
                <div className="grid place-items-center relative">
                <input onKeyDown={handleKeyDown} value={input} className="w-full h-12 rounded-lg px-4" type="text" placeholder="type here"onChange={(event) => setInput(event.target.value)} ></input>
                <div onClick={() => addMessage()} className="bg-[#e4e4e4] h-10 w-10 rounded-lg absolute right-2 grid place-content-center  cursor-pointer"><Image className="rotate-180" src={ArrowIcon} alt="kfd"></Image></div>
                </div>
                <div className="flex gap-x-4 h-12 w-full mt-4">
                    <div className="bg-[#000] w-full rounded-lg grid place-items-center cursor-pointer text-center text-[#fff]" onClick={() => deleteChat()}>
                        delete chat
                    </div>
                    <Link href="/blue/infoPage" style={{opacity: messages.length < 2 ? 50 + "%": 100 + "%"}} className="bg-[#000] w-full rounded-lg grid place-items-center cursor-pointer text-center text-[#fff]">
                        legal analysis
                    </Link>
                </div>
            </div>
            
        </main>
    )
}

export default Chat;