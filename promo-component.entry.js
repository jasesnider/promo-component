import { r as registerInstance, h } from './index-e8484beb.js';

const promoComponentCss = ":host{display:block}.skeleton{display:inline-block;height:1em;position:relative;overflow:hidden;background-color:#dddbdd;margin-bottom:0.5rem}.skeleton::after{position:absolute;top:0;right:0;bottom:0;left:0;transform:translateX(-100%);background-image:linear-gradient(\n    90deg,\n    rgba(#fff, 0) 0,\n    rgba(#fff, 0.2) 20%,\n    rgba(#fff, 0.5) 60%,\n    rgba(#fff, 0)\n  );animation:shimmer 2s infinite;content:\"\"}@keyframes shimmer{100%{transform:translateX(100%)}}#header-promo{display:flex;justify-content:space-between;align-items:center;padding:1rem;background-color:#f9f9f9;font-family:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen,\n    Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif}.image{margin-right:1rem}.tagline-wrapper{display:flex;flex-grow:2;flex-direction:column;font-size:0.875rem}.link>a{text-decoration:none;color:#006bbd}.countdown-wrapper{display:flex}.countdown-wrapper .time-block{position:relative;display:flex;flex-direction:column;justify-content:center;align-items:center;font-weight:700;margin:0 0.4rem;text-align:center;line-height:1}.countdown-wrapper .time-block:not(:last-child) .time-fragment:after{content:\":\";margin-left:0.2rem;position:absolute}.time-fragment{margin-bottom:0.1rem;font-size:1.6rem}.time-label{font-size:0.75rem;color:#a9a9a9}@media only screen and (max-width: 768px){#header-promo{flex-direction:row-reverse}.image{display:none}.tagline-wrapper{padding:0.5rem}.countdown-wrapper{border-right:1px solid #e2e2e2}.time-fragment{margin-bottom:0.1rem;font-size:1.2rem}.time-label{font-size:0.5rem;color:#a9a9a9}}";

const PromoComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.promo = null;
        this.countdown = null;
        this.countryCode = "us";
    }
    formatSingleDigit(time) {
        return time.toString().length === 1 ? `0${time}` : time;
    }
    formatTimeType(time, type) {
        return time === 1 ? type : `${type}S`;
    }
    renderTimeBlock(time, type) {
        const formattedTime = this.formatSingleDigit(time);
        return (h("div", { key: `${time}-${type}`, class: "time-block" }, h("div", { class: "time-fragment" }, formattedTime), h("div", { class: "time-label" }, this.formatTimeType(time, type))));
    }
    formatCountDown(timeFragments) {
        const timeBlocks = timeFragments.map((f) => this.renderTimeBlock(f.time, f.type));
        return h("div", { class: "countdown-wrapper" }, timeBlocks);
    }
    initCountdown() {
        const promoDate = this.promo ? this.promo.date : "Aug 15, 2020 15:37:25";
        const countDownDate = new Date(promoDate).getTime();
        const x = setInterval(() => {
            const now = new Date().getTime();
            const diff = countDownDate - now;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            if (days) {
                hours += days * 24;
            }
            if (diff < 0) {
                clearInterval(x);
            }
            const timeFragments = [
                {
                    time: hours,
                    type: "HR",
                },
                {
                    time: minutes,
                    type: "MIN",
                },
                {
                    time: seconds,
                    type: "SEC",
                },
            ];
            this.countdown = this.formatCountDown(timeFragments);
        }, 1000);
    }
    countryCodeChanged(newValue, oldValue) {
        if (newValue !== oldValue) {
            console.log("prev value: ", oldValue);
            console.log("new value: ", newValue);
            this.countryCode = newValue;
            this.getContent();
        }
    }
    async getContent() {
        try {
            let response = await fetch(`https://cors-anywhere.herokuapp.com/https://csb-yy9im.jasesnider.vercel.app/api/promo?cc=${this.countryCode}`);
            let json = await response.json();
            this.promo = json;
        }
        catch (err) {
            console.log(err);
        }
    }
    componentWillLoad() {
        this.getContent();
        this.initCountdown();
    }
    render() {
        return (h("div", { id: "header-promo" }, h("div", { class: "image" }, h("img", { src: "https://promo-component.vercel.app/header_promo.png", "aria-hidden": "true" })), h("div", { class: "tagline-wrapper" }, h("span", { class: "content" }, this.promo ? (this.promo.tagline) : (h("span", { class: "skeleton", style: { width: "100%", height: "2rem" } }))), h("span", { class: "link" }, h("a", { href: "#" }, this.promo ? (this.promo.link) : (h("span", { class: "skeleton", style: { width: "100%", height: "2rem" } }))))), h("div", { class: "count-down" }, this.countdown)));
    }
    static get assetsDirs() { return ["assets"]; }
    static get watchers() { return {
        "countryCode": ["countryCodeChanged"]
    }; }
};
PromoComponent.style = promoComponentCss;

export { PromoComponent as promo_component };
