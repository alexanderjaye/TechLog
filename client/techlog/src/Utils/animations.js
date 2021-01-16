import gsap from 'gsap';

const modalAnimationIn = () => {
  gsap.from('.backdrop__container', 1, {y:-400});
  gsap.from('.modal__container', 1, {opacity: 0});
}

// const modalAnimationOut = () => {
//   gsap.to('.backdrop__container', 1, {y: 800});
//   gsap.to('.modal__container', 1, {opacity: 0});
// }



export { 
        modalAnimationIn, 
        //modalAnimationOut
      };