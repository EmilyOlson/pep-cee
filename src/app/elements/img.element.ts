import { AppElement, CustomAppElement } from '../core/app-element.decorator';

export const appImg = 'lazy-image';

@CustomAppElement({
    selector: appImg,
    template: '<img />',
    style: `
        :host { 
            position: relative;
        }
        img {
            position: absolute;
            z-index: -1;
            width: 100%;
            height: auto;
        }
    `,
})
export class AppImg extends AppElement {
    static create = () => document.createElement('lazy-image') as AppImg;

    onKablam() {
        const { src, alt, id} = this.getState();
        const img = this.findSingleOrBase('img');
        img.setAttribute('src', src);
        img.setAttribute('alt', alt);
        img.id = id;
    }
}