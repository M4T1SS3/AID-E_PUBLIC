
import {motion} from "framer-motion"
export default function Loading() {


    return (
        <div className="w-64 text-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
            <div className="mb-2">a moment to breathe</div>
        <div className="w-64 h-2 relative">
            <div className=" w-full h-full bg-[#000] opacity-30 rounded"></div>
            <motion.div animate={{width: ["0%", "100%"]}} transition={{duration: 2, repeat: Infinity}} className=" top-0 absolute h-2 bg-[#000] rounded"></motion.div>
        </div>
        </div>
    )
}