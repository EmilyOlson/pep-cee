import { AppElement, CustomAppElement } from '../core/app-element.decorator';
export const spacePicture = 'pic-of-the-day';

const ids = {
    heroBanner: 'hero-banner',
    heroDescription: 'hero-description'
}

@CustomAppElement({
    selector: spacePicture,
    template: `<div class="hero" id="hero-banner"><h1 class="hero-title">Pic of the Day</h1><div id="hero-description"></div></div>`,
    style: '.hero { height: 500px; width: 100%; background-size: cover; background-color: black;} .hero-title { background-color: black; color: white; font-variant-caps: small-caps;}',
})
export class SpacePicture extends AppElement {
    static create = () => document.createElement(spacePicture);    

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