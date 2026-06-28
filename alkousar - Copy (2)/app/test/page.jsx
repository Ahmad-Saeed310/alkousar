import React from 'react'

import Chars from '../Components/text'
import { Words } from '../Components/text'
// import { Hover } from '../Components/text'

import BentoGrid from '../Components/Grid'


function Test() {
  return (
    <>
    <div id="test" className="h-screen w-full bg-stone-100 text-black">Test


    <Chars type="subheading" texts="Al-Kousar Properties" />
<Words typess="subheading" textss="Al-Kousar Properties" />
{/* <Hover type="subheading" texts="Al-Kousar Properties" /> */}
    </div>
    {/* <Hover type="subheading" texts="Al-Kousar Properties" /> */}
    <BentoGrid />
    </>
  )
}

export default Test