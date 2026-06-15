let imagecontainer = document.querySelectorAll(".img");


let  tl = gsap.timeline();


// tl.to(imagecontainer, {
//     duration: 0.7,
//     ease: "power2.inOut",
//       x: window.innerWidth * 0.6,
//   y: window.innerHeight * 0.5,
//     stagger: 1,   
// });



tl.fromTo(imagecontainer,
  {
    x: -200,
    y: -200,
    scale: 0.5,
  },
  {
    x: window.innerWidth * 0.6,
    y: window.innerHeight * 0.6,
    scale: 1.5,
    duration: 1,
    ease: "power2.inOut",
    stagger: 0.2
}
)
.to(imagecontainer, {
  scale: 0.8,
  duration: 0.6,
  ease: "power2.inOut",
  stagger: 0.2
  });

//   tl.to(imagecontainer, {
//     duration: 0.7,
//     ease: "power2.inOut",
//     stagger: -0.2,
//     x: (index) => {
//       const positions = [100,500, 900];
//       return positions[index];
//     }
//   });
