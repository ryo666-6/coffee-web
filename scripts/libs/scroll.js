class ScrollObserver {
    constructor(els, cb, options) {
        this.els = document.querySelectorAll(els);
        const defaultOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0,
            once: true
        };
        this.cb = cb;
        this.options = Object.assign(defaultOptions, options);
        this.once = this.options.once;
        this._init();
    }
    _init() {
        const callback = function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.cb(entry.target, true);
                    if(this.once) {
                        observer.unobserve(entry.target);
                    }
                } else {
                    this.cb(entry.target, false);
                }
            });
        };

        this.io = new IntersectionObserver(callback.bind(this), this.options);

        // @see https://github.com/w3c/IntersectionObserver/tree/master/polyfill
        this.io.POLL_INTERVAL = 100;
        
        this.els.forEach(el => this.io.observe(el));
    }

    destroy() {
        this.io.disconnect();
    }
}
// class ScrollObserver{constructor(t,s,i){this.els=document.querySelectorAll(t);this.cb=s,this.options=Object.assign({root:null,rootMargin:"0px",threshold:0,once:!0},i),this.once=this.options.once,this._init()}_init(){this.io=new IntersectionObserver(function(t,s){t.forEach(t=>{t.isIntersecting?(this.cb(t.target,!0),this.once&&s.unobserve(t.target)):this.cb(t.target,!1)})}.bind(this),this.options),this.io.POLL_INTERVAL=100,this.els.forEach(t=>this.io.observe(t))}destroy(){this.io.disconnect()}}