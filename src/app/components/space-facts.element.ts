import { AppElement, CustomAppElement } from '../core/app-element';

export const spaceFacts = 'space-facts';

@CustomAppElement({
    selector: spaceFacts,
    template: require('./space-facts.template.html'),
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