import { AppElement, CustomAppElement } from '../core/app-element.decorator';

export const spaceFacts = 'space-facts';

@CustomAppElement({
    selector: spaceFacts,
    template: '<div class="facts">facts!</div>',
    style: '',
})
export class SpaceFacts extends AppElement {
    static create = () => document.createElement(spaceFacts);

    onKablam() {
    }
    
    postKablam() {
        console.log('fwoop!');
    }

    postPoof() {
        console.log('poof!')
    }
}