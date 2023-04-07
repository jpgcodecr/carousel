class UnityCarousel extends HTMLElement {
    constructor() {
        super();
        this.slides = [...this.children];
        this.autoSlide = this.hasAttribute('autoSlide');
        this.infiniteLoop = this.hasAttribute('infiniteLoop');
        this.slideAnimation = this.getAttribute('slideAnimation') || 'fade'; // Default to 'fade'
        this.totalItems = this.slides.length;
        

        this.classList.add('uc-carousel-initialized');    
        
        this.prevBtn = this.querySelector('.uc-carousel-prev');
        this.nextBtn = this.querySelector('.uc-carousel-next');

        this.buildOut();
        this.buildArrows();
        
    }

    buildArrows() {
        this.nextArrow = `<button type="button" class="uc-carousel-next uc-carousel-arrow" aria-label="Next" role="button">></button>`;
        this.prevArrow = `<button type="button" class="uc-carousel-prev uc-carousel-arrow" aria-label="Previous" role="button"><</button>`;
        const tempContainer = document.createElement("div");
        tempContainer.innerHTML = this.prevArrow;

        this.querySelector('.uc-carousel-list').insertAdjacentHTML('beforebegin', this.prevArrow);
        

        tempContainer.innerHTML = this.nextArrow;
        this.querySelector('.uc-carousel-list').insertAdjacentHTML('afterend', this.nextArrow);
    }

    buildOut() {

         // Create a new div element to wrap the elements
         const trackWrapper = document.createElement('div');
         const listWrapper = document.createElement('div');
         trackWrapper.className = 'uc-carousel-track';
         listWrapper.className = 'uc-carousel-list';
 
         // Add the slides to the track
         this.slides.forEach((slide, i) => {
             slide.classList.add('uc-carousel-slide');
             slide.setAttribute('data-slide-index', i);
             trackWrapper.appendChild(slide.cloneNode(true));
         });
         
 
         this.innerHTML = '';
         listWrapper.appendChild(trackWrapper);
         this.appendChild(listWrapper);
    }

}

customElements.define('uc-carousel', UnityCarousel);
