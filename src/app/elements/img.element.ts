import { AppElement, CustomAppElement } from '../core/app-element.decorator';

export const appImg = 'img-element';

@CustomAppElement({
    selector: appImg,
    template: '<img />',
    style: `
        :host {
            overflow: hidden;
            position: fixed;
            z-index: -1;
        }
        img {
            z-index: -1;
            width: 100%;
            height: auto;
        }
    `
})
export class AppImg extends AppElement {
    static create = () => document.createElement(appImg) as AppImg;

    onKablam() {
        const { src, alt, id} = this.getState();
        const img = this.findSingleOrBase('img');
        img.setAttribute('src', src);
        img.setAttribute('alt', alt);
        img.id = id;
    }
}