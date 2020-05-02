import { AppElement, CustomAppElement } from '../core/app-element.decorator';
import { AppImg } from '../elements/img.element';
import { Photo } from '../data/state.interfaces';
import { AppTxt } from '../elements/text.elemet';
export const spacePicture = 'pic-of-the-day';

const ids = {
    heroBanner: 'hero-banner',
    heroDescription: 'hero-description'
}

@CustomAppElement({
    selector: spacePicture,
    template: require('./space-picture.template.html'),
    style: '.hero { height: 500px; width: 100%; overflow: hidden;} .hero-title { background-color: black; color: white; font-variant-caps: small-caps; }',
})
export class SpacePicture extends AppElement {
    static create = () => document.createElement(spacePicture) as SpacePicture;    

    onKablam() {
        this.refresh(this.getState())
    }

    refresh (state: Photo) {
        // get relevant state data
        const { href, text } = state;       

        const imgElement = AppImg.create();
        imgElement.setState({ src: href });

        const textElement = AppTxt.create();
        textElement.setState({ text: text });
        
        this.inject(imgElement, 'hero-image');
        this.inject(textElement, 'hero-description');
    }
}