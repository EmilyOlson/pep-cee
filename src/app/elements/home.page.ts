import { AppElement, CustomAppElement } from '../core/app-element.decorator';
import { SpacePicture } from './space-picture.element';
import { SpaceFacts, spaceFacts } from './space-facts.element';
import { IisLocation } from './space-location.element';
import { SpaceFooter } from './space-footer.element';

const homePage = 'home-layout';

@CustomAppElement({
    selector: homePage,
    template: '<div><peep-hole><peep-hole></div>',
})
export class HomePage extends AppElement {
    static create = () => document.createElement(homePage);

    onKablam() {
        const spacePicture = SpacePicture.create() as AppElement;
        const { spacePhoto } = this.getState();
        spacePicture.setState( spacePhoto )

        this.inject(spacePicture);
        this.inject(SpaceFacts.create());
        this.inject(IisLocation.create());
        this.inject(SpaceFooter.create());
    }
}