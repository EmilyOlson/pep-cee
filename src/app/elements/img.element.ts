import { AppElement, CustomAppElement } from '../core/app-element';

export const appImg = 'img-element';

@CustomAppElement({
    selector: appImg,
    template: '<div class="image__projection"><img class="image__element" /></div>',
})
export class AppImg extends AppElement {
    static create = () => document.createElement(appImg) as AppImg;

    onKablam() {
        const { src, alt, css } = this.getState();

        css && this.setAttribute('class', css);

        const div = this.findSingle('div');
        div.style.backgroundImage = `url('${src}')`;

        const img = this.findSingle('img');
        img.setAttribute('src', src);
        img.setAttribute('alt', alt)
    }
}