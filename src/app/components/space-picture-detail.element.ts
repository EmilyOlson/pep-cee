import { AppElement, CustomAppElement } from '../core/app-element';
import { AppImg } from '../elements/img.element';
import { Photo } from '../data/state.interfaces';
import { AppTxt } from '../elements/text.elemet';

export const spacePictureDetail = 'pic-of-the-day-detail';

@CustomAppElement({
    selector: spacePictureDetail,
    template: require('./space-picture-detail.template.html'),
})
export class SpacePictureDetail extends AppElement {
    static create = () => document.createElement(spacePictureDetail);
    
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
        this.inject(textElement, 'hero-detail');
    }
}