import { AppElement, CustomAppElement } from '../core/app-element.decorator';

export const appImg = 'text-element';

@CustomAppElement({
    selector: appImg,
    template: '',
    style: `:host {
        color: white;
        background-color: black;
      }`,
})
export class AppTxt extends AppElement {
    static create = () => document.createElement('text-element') as AppTxt;

    onKablam() {
        const { text } = this.getState();
        const container = this.findSingleOrBase('');
        container.textContent = text;

    }
}