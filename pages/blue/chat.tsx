import { useState, useEffect, useLayoutEffect, useCallback } from "react"
import Header from "../components/header";
import { Configuration, OpenAIApi } from "openai";
import { motion } from "framer-motion";
import { useRouter } from 'next/router';
import React from "react";
import { measureMemory } from "vm";

// @refresh reset

function Chat() {
    const configuration = new Configuration({
        organization: "org-fOs9puex0imVLiRHMrkRPMmx",
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const model = "text-davinci-002";

    let [input, setInput] = useState("")
    let [response, setResponse] = useState("");
    let [messages, setMessages] = useState<MessageProps[]>([
        // {message: "jfdkddk", input: true},
        // {message: "jfdkdasdfsddaffdadsfafdaddsadfasdfsfasdfafasdfadsfasfadfsafsfdkdadfsfasdfafasdfadsfasfadfsafsfdkdasdfssdfsddaffdadsfafdaddsadfasdfsfasdfafasdfadsfasfadfsafsafsadfsadfasffdsddfsdadsfsadafssadsfdfsddk", input: false},
        // {message: "jfdkddk", input: true},
        // {message: "jfdkddk", input: true},
        // {message: "jfdkdasdfsddaffdadsfafdaddsadfasdfsfasdfafasdfadsfasfadfsafsfdkdadfsfasdfafasdfadsfasfadfsafsfdkdasdfssdfsddaffdadsfafdaddsadfasdfsfasdfafasdfadsfasfadfsafsafsadfsadfasffdsddfsdadsfsadafssadsfdfsddk", input: false},
        // {message: "jfdkddk", input: true},
        // {message: "jfdkddk", input: true},
        // {message: "jfdkdasdfsddaffdadsfafdaddsadfasdfsfasdfafasdfadsfasfadfsafsfdkdadfsfasdfafasdfadsfasfadfsafsfdkdasdfssdfsddaffdadsfafdaddsadfasdfsfasdfafasdfadsfasfadfsafsafsadfsadfasffdsddfsdadsfsadafssadsfdfsddk", input: false},
        // {message: "jfdkddk", input: true},
        // {message: "jfdkddk", input: true},
        // {message: "jfdkdasdfsddaffdadsfafdaddsadfasdfsfasdfafasdfadsfasfadfsafsfdkdadfsfasdfafasdfadsfasfadfsafsfdkdasdfssdfsddaffdadsfafdaddsadfasdfsfasdfafasdfadsfasfadfsafsafsadfsadfasffdsddfsdadsfsadafssadsfdfsddk", input: false},
        // {message: "jfdkddk", input: true},
        // {message: "jfdkddk", input: true},
        // {message: "jfdkdasdfsddaffdadsfafdaddsadfasdfsfasdfafasdfadsfasfadfsafsfdkdadfsfasdfafasdfadsfasfadfsafsfdkdasdfssdfsddaffdadsfafdaddsadfasdfsfasdfafasdfadsfasfadfsafsafsadfsadfasffdsddfsdadsfsadafssadsfdfsddk", input: false},
        // {message: "jfdkddk", input: true},
        // {message: "jfdkddk", input: true},
        // {message: "jfdkdasdfsddaffdadsfafdaddsadfasdfsfasdfafasdfadsfasfadfsafsfdkdadfsfasdfafasdfadsfasfadfsafsfdkdasdfssdfsddaffdadsfafdaddsadfasdfsfasdfafasdfadsfasfadfsafsafsadfsadfasffdsddfsdadsfsadafssadsfdfsddk", input: false},
        // {message: "jfdkddk", input: true}
    ]);

    type MessageProps = {
        message: string,
        input: boolean
    }

    function addMessage () {
        let newMessage = {message: input, input: true}
        setMessages(messages = [...messages, newMessage])
        console.log(messages)

        // localStorage.setItem("messages", JSON.stringify(messages));
        handleSubmit()
        setInput(input = "")
    };


    async function handleSubmit() {
        console.log(JSON.stringify(input))
        
        try {
            const response = await fetch('/api/openai', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body:JSON.stringify(input),
              })
            const data = await response.json();
            let newMessage = {message: data, input: false}
            setMessages(messages = [...messages, newMessage])
            // localStorage.setItem("messages", JSON.stringify(messages));
        } catch (error) {
            console.log(error)
        }
        
      }
    


    function handleKeyDown (event: any) {
        if (event.key === 'Enter') {
            console.log("Hkj")
            addMessage()
        }
    }
    const [greeting, setGreeting] = useState("")
    const router = useRouter();

       
    let [secretMode, setSecretMode] = useState(false)

    async function initialise() {
        const response = await fetch('/api/openai', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify(57051079),
          })
    }

    useEffect(() => {
        if (localStorage  && localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setSecretMode(true)
        } else {
            setSecretMode(false)
        }
        initialise()
        
     
    }, [])

    



    return (
        <main className="bg-main-blue w-screen min-h-screen overflow-hidden relative" style={{backgroundColor: secretMode  ? "#A6A6A6": undefined}}>
            <Header/>
            <div className="p-4 relative mb-24">
                    <motion.div
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                    transition={{ duration: 0.5 }}
                    className="grid place-items-start">
                        <p className="bg-[#0575FF] text-[#fff] rounded-lg break-word max-w-[50%] p-2 my-2">Hello, I am assistent aid-e. If you have been a victim of a crime, I understand that this may be a difficult time for you. Please know that I am here to listen to you. My main goal is to navigate through this difficult time, and to provide you with the assistance you need to feel safe. Is there anything specific you would like to talk about? This is a safe place where you can talk openly and honestly about what you're going through. I am here to help.</p>
                    </motion.div>
                {messages.map((message) => {
                    console.log(messages)
                    
                    if (message.input == true) {
                        return (
                            <motion.div 
                            initial={{ opacity: 0}}
                            animate={{ opacity: 1}}
                            transition={{ duration: 0.5 }}
                            className="grid place-items-end max-w-1/3">
                                <p className="bg-[#fff] opacity-40 text-[#000] rounded-lg p-2 my-2 break-word max-w-[50%] ">{message.message}</p>
                            </motion.div>
                        )
                    } else {
                        return (
                            <motion.div
                            initial={{ opacity: 0}}
                            animate={{ opacity: 1}}
                            transition={{ duration: 0.5 }}
                            className="grid place-items-start">
                                <p className="bg-[#0575FF] text-[#fff] rounded-lg break-word max-w-[50%] p-2 my-2">{message.message}</p>
                            </motion.div>
                        )
                    }
                })}
            </div>
            <div className="w-screen px-4 absolute bottom-4">
                <input onKeyDown={handleKeyDown} value={input} className="w-full h-12 rounded-lg px-4" type="text" placeholder="type here"onChange={(event) => setInput(event.target.value)} ></input>
                <div className="flex gap-x-4 h-12 w-full mt-4">
                    <div className="bg-[#000] w-full rounded-lg grid place-items-center cursor-pointer text-center text-[#fff]">
                        delete chat
                    </div>
                    <a href="/blue/infoPage" className="bg-[#000] w-full rounded-lg grid place-items-center cursor-pointer text-center text-[#fff]">
                        legal analysis
                    </a>
                </div>
            </div>
            
        </main>
    )
}

export default React.memo(Chat);