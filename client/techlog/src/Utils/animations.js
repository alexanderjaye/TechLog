import gsap from 'gsap';

const modalAnimationIn = () => {
  gsap.from('.backdrop__container', 1, {y:-400});
  gsap.from('.modal__container', 1, {opacity: 0});
}

const listItemAnimation = () => {
  gsap.from('.searchlist__searchitems', 1, {opacity: 0});
}

const formAnimations = () => {
  gsap.from('.form__container', 1, {opacity: 0, y: 200})
}

const modeAnimation = () => {
  gsap.to('.navbar__container', 1, {y: -50, opacity: 0});
  gsap.from('.navbar__container', 1, {y:-50, delay:1, opacity:0})
}

// const modalAnimationOut = () => {
//   gsap.to('.backdrop__container', 1, {y: 800});
//   gsap.to('.modal__container', 1, {opacity: 0});
// }



export { 
        modalAnimationIn, 
        listItemAnimation,
        formAnimations,
        modeAnimation
        //modalAnimationOut
      };