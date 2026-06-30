"use client";

import React from "react";

import Image from "next/image";

import { useProjects } from "../../adminImages/ContentGrid";

import Chars from "../Components/text";
// import { Words } from '../Components/text'
// import { Hover } from '../Components/text'

import BentoGrid from "../Components/Grid";

function Test() {
  const { projects, ProjectImage, loading } = useProjects();

  console.log("ProjectImage", ProjectImage);

  return (
    <>
      <div id="test" className="h-screen w-full bg-stone-100 text-black">
        Test
        <Chars type="subheading" texts="Al-Kousar Properties" />
        {/* <Words href="/" typess="subheading" textss="Al-Kousar Properties" /> */}
        {/* <Hover type="subheading" texts="Al-Kousar Properties" /> */}
      </div>
      {/* <Hover type="subheading" texts="Al-Kousar Properties" /> */}
      {/* <BentoGrid /> */}
      {projects.map((project) => (
        <div key={project.id}>
          <h2>{project.title}</h2>
          <h3>{project.description}</h3>

          {project.project_images?.map((image) => {
            console.log(image.image_url);

            return (
              <Image
                key={image.id}
                src={image.image_url}
                alt={image.title ?? project.title}
                width={500}
                height={300}
                className="object-cover"
              />
            );
          })}
        </div>
      ))}
    </>
  );
}

export default Test;
