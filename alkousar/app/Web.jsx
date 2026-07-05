// "use client";

// import Animations from "./Components/animationn/page";

// import Secondpage from "./Components/Secondpage";
// import ThirsSe from "./Components/Listing";
// import Forth from "./Components/Forth";
// // import LogoMarquee from "./Components/LogoMarquee"
// // import LogoMarquee from "./logo/page";
// import MapScrollAnimation from "./Components/MapScrollAnimation";
// import { Animateword } from "./Components/text";
// import ToGallery from "./Components/toGallery";
// import Footer from "./Components/Footer";
// import StackingCards from "./Components/StackingCard";
// // import HorizontalScroll from "./Gallery/page";
// import ImageRows from "./Components/Award";
// import ScrollMarquee from "./Components/LogoMarquee";

// import Animationchars from "./animation/page";


// import LogoMarqueeleft from "./Components/LogoMarquee2";
// import Loader from  "./Components/Loader"



// export default function Web() {
//   const { progress } = useAssetPreload(Animationassets); // from earlier
//   const [loaderDone, setLoaderDone] = useState(false);

//   return (
//     <>
//       {!loaderDone && (
//         <Animationchars progress={progress} onComplete={() => setLoaderDone(true)} />
//       )}
//       <main>
//        <Animations />
//       <Secondpage />
//       {/* <HorizontalScroll/> */}
//       <ThirsSe />
//       <StackingCards />
//       {/* <Loader/> */}
//       {/* <  Forth/> */}
//       <MapScrollAnimation />
//       <Animateword />
      
//       <ScrollMarquee />
//       <LogoMarqueeleft />
//       {/* <ToGallery/> */}
//       <Footer />
//       </main>
//     </>
//   );
// }

// // export default function Web() {
// //   return (
// //     <>
// //       <Animations />
// //       <Secondpage />
// //       {/* <HorizontalScroll/> */}
// //       <ThirsSe />
// //       <StackingCards />
// //       {/* <Loader/> */}
// //       {/* <  Forth/> */}
// //       <MapScrollAnimation />
// //       <Animateword />
      
// //       <ScrollMarquee />
// //       <LogoMarqueeleft />
// //       {/* <ToGallery/> */}
// //       <Footer />
// //     </>
// //   );
// // }

"use client";
import { useState } from "react";
import Animations from "./Components/animationn/page";
import Secondpage from "./Components/Secondpage";
import ThirsSe from "./Components/Listing";
import Forth from "./Components/Forth";
import MapScrollAnimation from "./Components/MapScrollAnimation";
import { Animateword } from "./Components/text";
import ToGallery from "./Components/toGallery";
import Footer from "./Components/Footer";
import StackingCards from "./Components/StackingCard";
import ImageRows from "./Components/Award";
import ScrollMarquee from "./Components/LogoMarquee";
import Animationchars from "./animation/page";
import LogoMarqueeleft from "./Components/LogoMarquee2";
import { useAssetPreload } from "./hooks/useAssetPreload"; // adjust path

const heroAssets = [
  
  // add whatever hero/first-fold assets need to load
  "/Home.webp",
  "project-4-1.webp",
  "project-4-2.webp",
  "project-4-3.webp",
  "project-4-4.webp"

];

export default function Web() {
  const { progress } = useAssetPreload(heroAssets);
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <>
      {!loaderDone && (
        <Animationchars
          progress={progress}
          onComplete={() => setLoaderDone(true)}
        />
      )}
      <main>
        <Animations startIntro={loaderDone}  />
        <Secondpage />
        <ThirsSe />
        <StackingCards />
        <MapScrollAnimation />
        <Animateword />
        <ScrollMarquee />
        <LogoMarqueeleft />
        <Footer />
      </main>
    </>
  );
}