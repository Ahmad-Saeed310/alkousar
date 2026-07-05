import { ScrollWords } from "./text"
import Text from "./text"
import Image from "next/image"

export default function Cards({ text, title, Images,details }) {



    return (
        <>
            <div className="card h-screen w-full bg-stone-50 relative grid grid-cols-3">
                <ScrollWords textss={text} typess="subheading" className="text-[5vw] absolute top-10 left-10 z-10 col-span-1 mt-[10vh]" />
                <div className="seccolumn col-start-2 flex flex-col mt-[10vh] ">
                <Text type="heading" texts={title} className="text-lg font-semibold text-black  leading-tight tracking-tight h-[10vh] " />
                <div className="img h-[40vh] w-[40vw] relative  mt-10 ">

                <Image src={Images} alt="Description" className="object-cover " fill />
                </div>
                <Text type="page" texts={details} className="text-lg font-semibold text-black w-full text-normal col-start-2" />
                </div>
            </div>

        </>
    )
}