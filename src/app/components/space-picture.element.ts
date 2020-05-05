import { AppElement, CustomAppElement } from '../core/app-element.decorator';
import { AppImg } from '../elements/img.element';
import { Photo } from '../data/state.interfaces';
import { AppTxt } from '../elements/text.elemet';

export const spacePicture = 'pic-of-the-day';

@CustomAppElement({
    selector: spacePicture,
    template: require('./space-picture.template.html'),
})
export class SpacePicture extends AppElement {
    static create = () => document.createElement(spacePicture) as SpacePicture;    

    onKablam() {
        this.refresh(this.getState())
    }

    refresh (state: Photo) {
        // get relevant state data
        const { href, text, title } = state;       

        const imgElement = AppImg.create();
        imgElement.setState({ src: href, alt: title, css: 'hero__image' });

        const textElement = AppTxt.create();
        textElement.setState({ text: text });

        const titleElement = AppTxt.create();
        titleElement.setState( { text: title });
        
        this.inject(imgElement, 'hero-image');
        this.inject(titleElement, 'hero-title');
        this.inject(textElement, 'hero-summary');
    }
}