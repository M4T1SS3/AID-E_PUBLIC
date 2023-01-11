import { useState, useEffect } from "react"
import Header from "../components/header";

export default function Chat() {

    let [input, setInput] = useState("")

    let [messages, setMessages] = useState<MessageProps[]>([]);

    type MessageProps = {
        message: string,
        input: boolean
    }

    function addMessage (message:string) {
        let newMessage = {message: message, input: true}
        setMessages(messages = [...messages, newMessage])
        localStorage.setItem("messages", JSON.stringify(messages));

        setInput(input = "")
    };


    function handleKeyDown (event: any) {
        if (event.key === 'Enter') {
            addMessage(input)
        }
    }

    useEffect(() => {
        const stored = localStorage.getItem("messages");
        setMessages(stored ? JSON.parse(stored) : messages);
    }, []);

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



    return (
        <main className="bg-main-blue h-screen w-screen" style={{backgroundColor: secretMode  ? "#A6A6A6": undefined}}>
            <Header/>
            <div className=" w-screen p-4">
                {messages.map((message) => {
                    if (message.input == true) {
                        return (
                            <div className="grid place-items-end">
                                <p className="bg-[#0575FF] text-white rounded-lg p-2 my-2 max-w-1/2">{message.message}</p>
                            </div>
                        )
                    } else {
                        return (
                            <div className="grid place-items-end">
                                <p className="bg-[#0575FF] text-black rounded-lg p-2 my-2 max-w-1/2">{message.message}</p>
                            </div>
                        )
                    }
                })}
            </div>
            <div className="w-screen px-4 flex">
                <input onKeyDown={handleKeyDown} value={input} className="w-full h-12 rounded-lg px-4" type="text" placeholder="type here"onChange={(event) => setInput(event.target.value)} ></input>
                <a href="/blue/infoPage" className="bg-[#000] rounded-lg grid place-items-center cursor-pointer text-center text-[#fff] ml-2" >Get Advice</a>

            </div>
            
        </main>
    )
}