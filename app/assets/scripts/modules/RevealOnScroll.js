import throttle from "lodash/throttle";
import debounce from "lodash/debounce";
class RevealOnScroll {
  constructor(els, revealPoint) {
    this.revealPoint = revealPoint;
    this.itemsToReveal = els;
    this.browserHeight = window.innerHeight;
    this.hideInitially();
    this.scrollThrottle = throttle(this.calcCaller, 100).bind(
      this
    ); /*Энэ throttle нь хэрэггүй үйлдэл хийхээс сэргийлэх талтай */
    this.events();
  }
  events() {
    window.addEventListener("scroll", this.scrollThrottle);
    window.addEventListener(
      "resize",
      debounce(() => {
        console.log("sdasd");
        this.browserHeight = window.innerHeight;
      }, 300)
    );
    /*Энэ debounce нь resize дэлгэц өөрчлөгдөж байгаа эсэхийг шалгах үүрэгтэй */
  }
  calcCaller() {
    this.itemsToReveal.forEach((el) => {
      if (el.isRevealed == false) {
        this.calculateIfScrolledTo(el);
      }
    });
  }
  calculateIfScrolledTo(el) {
    if (window.scrollY + this.browserHeight > el.offsetTop) {
      let scrollPercent =
        (el.getBoundingClientRect().y / this.browserHeight) * 100;
      if (scrollPercent < this.revealPoint) {
        el.classList.add("reveal-item--is-visible");
        el.isRevealed = true;
        if (el.isLastItem) {
          window.removeEventListener("scroll", this.scrollThrottle);
        }
      }
    }
  }
  hideInitially() {
    this.itemsToReveal.forEach((el) => {
      el.classList.add("reveal-item");
      el.isRevealed = false;
    });
    this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true;
  }
}
export default RevealOnScroll;
