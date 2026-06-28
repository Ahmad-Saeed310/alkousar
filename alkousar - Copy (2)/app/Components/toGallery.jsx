import React from 'react'
import Link from "next/link";

function ToGallery() {
  return (
        <div className="gallery h-[10vh] bg-stone-400 text-black"><Link href="/projects"><h3>View Projects</h3></Link></div>
  )
}

export default ToGallery