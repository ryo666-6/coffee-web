document.addEventListener('DOMContentLoaded', function () {
    


    // const cb = function (el, inview) {
    //     if(inview) {
    //         const ta = new TweenTextAnimation(el);
    //         ta.animate();
    //     }
    // }

    // const so = new ScrollObserver('.tween-animate-title', cb);

    // const _inviewAnimation = function(el, inview) {
    //     if(inview) {
    //         el.classList.add('inview');
    //     } else {
    //         el.classList.remove('inview');
    //     }
    // }
    // const so2 = new ScrollObserver('.cover-slide', this._inviewAnimation);

    // const header = document.querySelector('.header')

    // const _navAimation = function(header, inview) {
    //     if(inview) {
    //         header.classList.remove('triggered');
    //     } else {
    //         header.classList.add('triggered');
    //     }
    // }

    // const so3 = new ScrollObserver('.nav-trigger', _navAimation, {once: false});
    new main();
});



class main {
    constructor() {
        this.header = document.querySelector('.header');
        this._observers = [];
        this._init();
    }

    set observers(val) {
        this._observers.push(val);
    }

    get observers() {
        return this._observers;
    }

    _init() {
        new MobileMenu();
        this.hero = new HeroSlider('.swiper-container');
        Pace.on('done', this._paceDone.bind(this));
    }

    _paceDone() {
        this._scrollInit();
    }

    _inviewAnimation(el, inview) {
        if(inview) {
            el.classList.add('inview');
        } else {
            el.classList.remove('inview');
        }
    }


    _navAnimation(el, inview) {
        if(inview) {
            this.header.classList.remove('triggered');
        } else {
            this.header.classList.add('triggered');
        }
    }

    _textAnimation(el, inview) {
        if(inview) {
            const ta = new TweenTextAnimation(el);
            ta.animate();
        }
    }

    _toggleSlideAnimation(el, inview) {
        if(inview) {
            this.hero.start();
        } else {
            this.hero.stop();
        }
    }

    _scrollInit() {
        this.observers = new ScrollObserver('.nav-trigger', this._navAnimation.bind(this), {once: false});
        this.observers = new ScrollObserver('.cover-slide', this._inviewAnimation);
        // this.observers = new ScrollObserver('.appear', this._inviewAnimation);
        this.observers = new ScrollObserver('.tween-animate-title', this._textAnimation, {rootMargin: "-200px 0px"});
        this.observers = new ScrollObserver('.swiper-container', this._toggleSlideAnimation.bind(this), {once: false});
        // this.observers = new ScrollObserver('#main-content', this._sideAnimation.bind(this), {once: false, rootMargin: "-300px 0px"});
        // this.observers = new ScrollObserver('.nav-trigger', this._navAnimation.bind(this), {once: false});
        // this.observers = new ScrollObserver('.cover-slide', this._inviewAnimation);
        // this.observers = new ScrollObserver('.tween-animate-title', this._textAnimation);
        // this.observers = new ScrollObserver('.swiper-container', this._toggleSlideAnimation.bind(this), {once: false});

        console.log(this.observers);
    }

}
