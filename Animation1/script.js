var elems = document.getElementsByClassName("img1");
var namess = document.getElementsByClassName("namess");
var names = document.getElementsByClassName("names");
var nav = document.querySelector("nav");
let split = SplitText.create(namess, {});

console.log(nav);
console.log(namess);

var tl = gsap.timeline();

tl.from([split.chars, names], {
  opacity: 0,
  yPercent: 80,
  duration: 1,
  ease: "power2.inOut",
  scale: 0.7,
  // stagger: 0.1,
});

gsap.from(elems, {
  y: "10%",
  duration: 0.3,
  stagger: -0.2,
  scale: 0.7,
  ease: "power5.inOut",
  opacity: 0,
});
tl.to(elems, {
  duration: 0.5,
  delay: 0.3,
  stagger: -0.7,
  ease: "power5.inOut",
  clipPath: "inset(0 0 100% 0)",
});
tl.to(namess, {
  y: "-70vh",
  duration: 0.7,
  ease: "power2.inOut",
  fontSize: "3rem",
}).from(nav, {
    opacity: 0,
    duration: 0.7,
    ease: "power2.inOut",
    yPercent: 70,
  },"<")
  .to(
    names,
    {
      duration: 0.7,
      ease: "power2.inOut",
      opacity: 0,
      y: -10,
    },
    "<",
  ).from("#hero", {
    opacity: 0,
    duration: 0.7,
    ease: "power2.inOut",
    yPercent: 70,
  },"<");
  
