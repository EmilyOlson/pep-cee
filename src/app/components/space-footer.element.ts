import { AppElement, CustomAppElement } from '../core/app-element';

export const spaceFooter = 'space-footer';

@CustomAppElement({
    selector: spaceFooter,
    template: require('./space-footer.template.html'),
})
export class SpaceFooter extends AppElement {
    static create = () => document.createElement(spaceFooter);

    onKablam() {
    }
}