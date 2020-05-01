import { AppElement, CustomAppElement } from '../core/app-element.decorator';

export const spaceFooter = 'space-footer';

@CustomAppElement({
    selector: spaceFooter,
    template: '<div><div class="footer">space footer!</div><a href="#detail">detail</a></div>',
    style: '',
})
export class SpaceFooter extends AppElement {
    static create = () => document.createElement(spaceFooter);

    onKablam() {
    }
}