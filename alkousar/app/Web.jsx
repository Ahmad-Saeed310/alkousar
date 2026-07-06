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
import { useAssetPreload } from "./hooks/useAssetPreload";
import Nav from "./Components/Nav";

const heroAssets = [
  "/Home.webp",
  "project-4-1.webp",
  "project-4-2.webp",
  "project-4-3.webp",
  "project-4-4.webp",
  "logo.png",
  "https://res.cloudinary.com/h79vc2ot/video/upload/Dha_a7nfo4.mp4",
];

export default function Web() {
  const { progress, isDone } = useAssetPreload(heroAssets);
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <>
      {!loaderDone && (
        <Animationchars
          progress={progress}
          assetsReady={isDone}
          onComplete={() => setLoaderDone(true)}
        />
      )}
      {loaderDone && (
        <main>
          <Nav />
          <Animations startIntro={loaderDone} />
          <Secondpage />
          <ThirsSe />
          <StackingCards />
          <MapScrollAnimation />
          <Animateword />
          <ScrollMarquee />
          <LogoMarqueeleft />
          <Footer />
        </main>
      )}
    </>
  );
}