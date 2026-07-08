
"use client";


import { useState, useEffect } from "react";
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
import Awards from "./Components/Award";

import Design from "./Components/Design";

const heroAssets = [
  "/Home.webp",
  "project-4-1.webp",
  "project-4-2.webp",
  "project-4-3.webp",
  "project-4-4.webp",
  "logo.png",
  "https://res.cloudinary.com/h79vc2ot/video/upload/Dha_a7nfo4.mp4",
];

const LOADER_KEY = "hasSeenLoader";
export default function Web() {
  const { progress, isDone } = useAssetPreload(heroAssets);
  const [loaderDone, setLoaderDone] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [checkedSession, setCheckedSession] = useState(false);

  useEffect(() => {
    const alreadyLoaded = sessionStorage.getItem(LOADER_KEY);
    if (alreadyLoaded) {
      setLoaderDone(true);
      setIsFirstVisit(false);
    }
    setCheckedSession(true);
  }, []);

  const handleLoaderComplete = () => {
    sessionStorage.setItem(LOADER_KEY, "true");
    setLoaderDone(true);
  };

  if (!checkedSession) return null;

  return (
    <>
      {!loaderDone && (
        <Animationchars
          progress={progress}
          assetsReady={isDone}
          onComplete={handleLoaderComplete}
        />
      )}
      {loaderDone && (
        <main >
          <Nav playIntro={isFirstVisit} />
          <Animations startIntro={loaderDone} playIntro={isFirstVisit} />
          <Secondpage />
          <ThirsSe />
          <Design />
          <Awards />
          {/* <StackingCards /> */}
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