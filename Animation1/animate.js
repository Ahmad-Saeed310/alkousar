class ShuffleEffect {
  constructor(selector, settings = {}) {
    this.elements = document.querySelectorAll(selector);
    this.settings = Object.assign({ velocity: 50, iterations: 6 }, settings);
    this.init();
  }

  shuffleText(element) {
    let originalText = element.dataset.text || element.innerText;
    let textArray = originalText.split('');

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    let iteration = 0;
    const interval = setInterval(() => {
      if (iteration >= this.settings.iterations) {
        clearInterval(interval);
        element.innerText = originalText; // Restore original text
        return;
      }

      shuffleArray(textArray);
      element.innerText = textArray.join('');
      iteration++;
    }, this.settings.velocity);
  }

  init() {
    this.elements.forEach(element => {
      element.dataset.text = element.innerText; // Store original text

      // Hover Effect
      element.addEventListener('mouseenter', () => this.shuffleText(element));
      element.addEventListener('mouseleave', () => element.innerText = element.dataset.text);
    });
  }
}

class ScrollShuffleEffect {
  constructor(selector, settings = {}) {
    this.elements = document.querySelectorAll(selector);
    this.settings = Object.assign({ duration: 1.5 }, settings);
    this.init();
  }

  init() {
    gsap.registerPlugin(ScrollTrigger);

    this.elements.forEach(element => {
      gsap.to(element, {
        opacity: 1,
        duration: this.settings.duration,
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          onEnter: () => {
            element.style.animation = "shuffle 0.8s ease-in-out";
          }
        }
      });
    });
  }
}

// Initialize Shuffle Effects
new ShuffleEffect(".shuffle-text", { velocity: 50, iterations: 6 });
new ScrollShuffleEffect(".shuffle-scroll", { duration: 1 });

// here is the loading shuffle
function shuffleText(el, iterations = 15, speed = 62) {
  if (!el) return;
  const original = el.innerText, chars = [...original];
  let count = 0, interval = setInterval(() => {
      el.innerText = count < iterations ? chars.sort(() => Math.random() - 0.5).join('') : (clearInterval(interval), original);
      count++;
  }, speed);
}

window.onload = () => {
  document.querySelectorAll(".shuffle-load").forEach(el => shuffleText(el)); // Shuffle effect

  const preloaders = ["preloader", "preloader2"]; // Array of preloader IDs

  setTimeout(() => {
      preloaders.forEach(id => {
          const preloader = document.getElementById(id);
          if (preloader) {
              preloader.style.transition = "opacity 0.5s ease";
              preloader.style.opacity = 0;
              setTimeout(() => preloader.style.display = "none", 500);
          }
      });
  }, 2000); // Keep preloaders for at least 2 seconds
};