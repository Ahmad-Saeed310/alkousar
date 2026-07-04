import Animations from "./Components/animationn/page";

import Secondpage from "./Components/Secondpage";
import ThirsSe from "./Components/Listing";
import Forth from "./Components/Forth";
// import LogoMarquee from "./Components/LogoMarquee"
// import LogoMarquee from "./logo/page";
import MapScrollAnimation from "./Components/MapScrollAnimation";
import { Animateword } from "./Components/text";
import ToGallery from "./Components/toGallery";
import Footer from "./Components/Footer";
import StackingCards from "./Components/StackingCard";
// import HorizontalScroll from "./Gallery/page";
import ImageRows from "./Components/Award";
import ScrollMarquee from "./Components/LogoMarquee";


import LogoMarqueeleft from "./Components/LogoMarquee2";

export default function Web() {
  return (
    <>
      <Animations />
      <Secondpage />
      {/* <HorizontalScroll/> */}
      <ThirsSe />
      <StackingCards />
      {/* <  Forth/> */}
      <MapScrollAnimation />
      <Animateword />
      
      <ScrollMarquee />
      <LogoMarqueeleft />
      {/* <ToGallery/> */}
      <Footer />
    </>
  );
}
