import { AppElement, CustomAppElement } from '../core/app-element.decorator';

export const spaceLocation = 'space-location';

@CustomAppElement({
    selector: spaceLocation,
    template: '<div class="iis-location">iis location</div>',
    style: '',
})
export class IisLocation extends AppElement {
    static create = () => document.createElement(spaceLocation);

    onKablam() {
    }
}