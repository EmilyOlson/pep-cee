import { AppElement, CustomAppElement } from '../core/app-element.decorator';
export const spacePictureDetail = 'pic-of-the-day-detail';

const ids = {
    heroBanner: 'hero-banner',
    heroDescription: 'hero-description'
}

@CustomAppElement({
    selector: spacePictureDetail,
    template: `<div><div class="hero" id="hero-banner"><h1 class="hero-title">Pic of the Day</h1><peep-hole></peep-hole></div><div id="hero-description">detail text!</div><a href="#home">home</a></div>`,
    style: '.hero { height: 500px; width: 100%; background-size: cover; background-color: black;} .hero-title { background-color: black; color: white; font-variant-caps: small-caps;}'
})
export class SpacePictureDetail extends AppElement {
    static create = () => document.createElement(spacePictureDetail);

    onKablam() {
        this.refresh(this.getState());
    }

    refresh (state: any) {
        // get relevant state data
        const { href } = state;

        // get elements
        const heroBanner = this.findSingle(`#${ids.heroBanner}`);

        // apply
        if(href && heroBanner) {
            heroBanner.style.backgroundImage = `url("${href}")`;
        }
    }
}