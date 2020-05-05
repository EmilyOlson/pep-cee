import { AppElement, CustomAppElement } from '../core/app-element.decorator';

export const appImg = 'text-element';

@CustomAppElement({
    selector: appImg,
    template: ''
})
export class AppTxt extends AppElement {
    static create = () => document.createElement('text-element') as AppTxt;

    onKablam() {
        const { text } = this.getState();
        const container = this.findSingleOrBase('');

        container.textContent = text;
    }
}