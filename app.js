function init() {
  const slides = document.querySelectorAll(".slide");
  const pages = document.querySelectorAll(".page");
  const backgrounds = [
    `radial-gradient(#DAC6C6,#020004)`,
    `radial-gradient(#BC511F,#161616)`,
    `radial-gradient(#1F31D6,#161616)`
  ];

  let current = 0;
  let scrollSine = 0;
  slides.forEach((slide, index) => {
    slide.addEventListener("click", function() {
      changeDots(this);
      nextSlide(index);
      scrollSine = index;
    });
  });

  function changeDots(dot) {
    slides.forEach(slide => {
      slide.classList.remove("active");
    });
    dot.classList.add("active");
  }
  function nextSlide(pageNumber) {
    const nextPage = pages[pageNumber];
    const currentPage = pages[current];
    const nextLeft = nextPage.querySelector(".motor .motorleft");
    const nextRight = nextPage.querySelector(".motor .motorright");
    const currentLeft = currentPage.querySelector(".motor .motorleft");
    const currentRight = currentPage.querySelector(".motor .motorright");
    const nextText = nextPage.querySelector(".details");
    const portofolio = document.querySelector(".portofolio");
    const tl = new TimelineMax({
      onStart: function() {
        slide.forEach(slide => {
          slide.style.pointerEvents = "none";
        });
      },
      onComplete: function() {
        slide.forEach(slide => {
          slide.style.pointerEvents = "all";
        });
      }
    });
    tl.fromTo(currentLeft, 0.3, { y: "-10%" }, { y: "-100%" })
      .fromTo(currentRight, 0.3, { y: "10%" }, { y: "-100%" }, "-=0.2")
      .to(portofolio, 0.3, { backgroundImage: backgrounds[pageNumber] })
      .fromTo(
        currentPage,
        0.3,
        { opacity: 1, pointerEvents: "all" },
        { opacity: 0, pointerEvents: "none" }
      )
      .fromTo(
        nextPage,
        0.3,
        { opacity: 0, pointerEvents: "none" },
        { opacity: 1, pointerEvents: "all" },
        "-=0.6"
      )
      .fromTo(nextLeft, 0.3, { y: "-100%" }, { y: "-10%" }, "-=0.6")
      .fromTo(nextLeft, 0.3, { y: "-100%" }, { y: "10%" }, "-=0.8")
      .fromTo(nextText, 0.3, { opacity: 0, y: 10 }, { opacity: 1, y: 0 })
      .set(nextLeft, { clearProps: "all" })
      .set(nextRight, { clearProps: "all" });
    current = pageNumber;
  }
  //optional
  document.addEventListener("wheel", throttle(scrollChange, 1500));
  function switchDots(dotNumber) {
    const activeDot = document.querySelectorAll(".slide")[dotNumber];
    slides.forEach(slide => {
      slide.classList.remove("active");
    });
    activeDot.classList.add("active");
  }

  function scrollChange(e) {
    if (e.deltaY > 0) {
      scrollSine += 1;
    } else {
      scrollSine -= 1;
    }
    if (scrollSine > 2) {
      scrollSine = 0;
    }
    if (scrollSine < 0) {
      scrollSine = 2;
    }
    switchDots(scrollSine);
    nextSlide(scrollSine);
  }
  const hamburger = document.querySelector(".Menu");
  const hamburgerLines = document.querySelectorAll(".Menu line");
  const navOpen = document.querySelector(".nav-open");
  const contact = document.querySelector(".quick-contact");
  const total = document.querySelector(".nav-totall");

  const tl = new TimelineMax({ pasused: true });
  tl.to(navOpen, 0.5, { y: 0 })
    .fromTo(contact, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, "-=0.1")
    .fromTo(contact, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, "-=0.5")
    .fromTo(
      hamburgerLines,
      0.2,
      { stroke: "white" },
      { color: "black" },
      "-=1"
    );

  hamburger.addEventListener("click", () => {
    tl.reversed() ? tl.play() : tl.reverse();
  });
}
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

init();
