'use client';
import Button from "@/components/Button";
import starsBg from "@/assets/stars.png";
import {motion, useMotionValueEvent, useScroll, useTransform} from "framer-motion";
import { useRef } from "react";
import { MorphingDialogBasicOne } from "@/components/Expandablecard1";
import { MorphingDialogBasicFour } from "@/components/Expandablecard4";
import { MorphingDialogBasicTwo } from "@/components/Expandablecard2";
import { MorphingDialogBasicThirteen } from "@/components/Expandablecard13";
import { MorphingDialogBasicThree } from "@/components/Expandablecard3";
import { MorphingDialogBasicFive } from "@/components/Expandablecard5";
import { MorphingDialogBasicSix } from "@/components/Expandablecard6";
import { MorphingDialogBasicSeven } from "@/components/Expandablecard7";
import { MorphingDialogBasicEight } from "@/components/Expandablecard8";
import { MorphingDialogBasicNine } from "@/components/Expandablecard9";
import { MorphingDialogBasicTen } from "@/components/Expandablecard10";
import { MorphingDialogBasicEleven } from "@/components/Expandablecard11";
import { MorphingDialogBasicTwelve } from "@/components/Expandablecard12";
import { MorphingDialogBasicFourteen } from "@/components/Expandablecard14";
import { MorphingDialogBasicFifteen } from "@/components/Expandablecard15";
import { MorphingDialogBasicSixteen } from "@/components/Expandablecard16";
import AlertComp from "@/components/Alert";

export const Hero = () => {
  const sectionRef = useRef(null);
  const {scrollYProgress} = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const backgroundPositionY = useTransform(scrollYProgress, [0,1], [-300, 300]); 



  return (
    <motion.section
    id="Hero"
    ref={sectionRef}
    animate={{
      backgroundPositionX: starsBg.width,
    }}
    transition={{
      repeat: Infinity,
      ease: "linear",
      duration: 120,
    }}
    className="flex dark items-center min-h-screen justify-center mx-auto sm:py-12 md:py-24 bg-black  text-white overflow-hidden relative [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]" 
    style={{
      backgroundImage: `url(${starsBg.src})`,
      backgroundPositionY,  
    }}
    >
    
    
    <div className="container">
        <div className="section-heading pb-10">
          <h1 className="section-title text-white">CropSense</h1>
        </div>
        <div className="container justify-center mx-auto flex md:flex-row gap-6 pb-6 flex-col">
          <MorphingDialogBasicOne/>
          <MorphingDialogBasicTwo />
          <MorphingDialogBasicThree />
          
        </div>
        <div className="container justify-center mx-auto flex md:flex-row gap-6 pb-6 flex-col">
          <MorphingDialogBasicFour />
          <MorphingDialogBasicFive />
          <MorphingDialogBasicSix />
          
        </div>
        <div className="container justify-center mx-auto flex md:flex-row gap-6 pb-6 flex-col">
          <MorphingDialogBasicSeven />
          <MorphingDialogBasicEight />
          <MorphingDialogBasicNine />
          
        </div>
        <div className="container justify-center mx-auto flex md:flex-row gap-6 pb-6 flex-col">
          <MorphingDialogBasicTen />
        </div>
        <div className="container justify-center mx-auto flex md:flex-row gap-6 pb-6 flex-col">
          <MorphingDialogBasicEleven />
          <MorphingDialogBasicTwelve />
          <MorphingDialogBasicThirteen />
        </div>
        <h4 className="items-center justify-center mx-auto text-center text-white pb-6 text-[24px]">Harvestable Months</h4>
        <div className="container justify-center mx-auto flex md:flex-row gap-6 pb-6 flex-col">
          <MorphingDialogBasicFourteen />
          <MorphingDialogBasicFifteen />
          <MorphingDialogBasicSixteen />
        </div>
        <AlertComp/>
        </div>
       
      </motion.section>
  );
};
