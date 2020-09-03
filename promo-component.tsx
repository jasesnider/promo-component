import { Component, Prop, Watch, h, State } from "@stencil/core";

@Component({
  tag: "promo-component",
  styleUrl: "promo-component.css",
  assetsDirs: ["assets"],
  shadow: true,
})
export class PromoComponent {
  @State() promo: any = null;
  @State() countdown: any = null;

  formatSingleDigit(time) {
    return time.toString().length === 1 ? `0${time}` : time;
  }
  formatTimeType(time, type) {
    return time === 1 ? type : `${type}S`;
  }

  renderTimeBlock(time, type) {
    const formattedTime = this.formatSingleDigit(time);

    return (
      <div key={`${time}-${type}`} class="time-block">
        <div class="time-fragment">{formattedTime}</div>
        <div class="time-label">{this.formatTimeType(time, type)}</div>
      </div>
    );
  }

  formatCountDown(timeFragments) {
    const timeBlocks = timeFragments.map((f) =>
      this.renderTimeBlock(f.time, f.type)
    );
    return <div class="countdown-wrapper">{timeBlocks}</div>;
  }

  initCountdown() {
    const promoDate = this.promo ? this.promo.date : "Sept 6, 2020 04:37:25";
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
  private _cc: string;

  @Prop() cc: string = "us";
  @Watch("cc")
  countryCodeChanged(cc: string): void {
    console.log("prev: ", this._cc);

    console.log("new: ", cc);
    this._cc = cc;
    this.getContent(cc);
  }

  async getContent(cc) {
    try {
      let response = await fetch(
        `https://cors-anywhere.herokuapp.com/https://csb-yy9im.jasesnider.vercel.app/api/promo?cc=${cc}`
      );
      let json = await response.json();

      this.promo = json;
    } catch (err) {
      console.log(err);
    }
  }

  componentWillLoad() {
    this.countryCodeChanged(this.cc);
    this.initCountdown();
  }

  render() {
    return (
      <div id="header-promo">
        <div class="image">
          <img
            src={"https://promo-component.vercel.app/header_promo.png"}
            aria-hidden="true"
          ></img>
        </div>
        <div class="tagline-wrapper">
          <span class="content">
            {this.promo ? (
              this.promo.tagline
            ) : (
              <span
                class="skeleton"
                style={{ width: "100%", height: "2rem" }}
              />
            )}
          </span>
          <span class="link">
            <a href="#">
              {this.promo ? (
                this.promo.link
              ) : (
                <span
                  class="skeleton"
                  style={{ width: "100%", height: "2rem" }}
                />
              )}
            </a>
          </span>
        </div>
        <div class="count-down">{this.countdown}</div>
      </div>
    );
  }
}
