import { AppElement, CustomAppElement } from '../core/app-element';
import { SpacePicture } from './space-picture.element';
import { SpaceFacts } from './space-facts.element';
import { IssLocation } from './space-place.element';
import { SpaceFooter } from './space-footer.element';
import { AppState } from '../data/state.interfaces';

const homePage = 'home-layout';

@CustomAppElement({
    selector: homePage,
    template: require('./home.template.html'),
})
export class HomePage extends AppElement {
    static create = () => document.createElement(homePage);

    onKablam() {
        const state: AppState = this.getState();
        this.inject(SpaceFacts.create(), 'space-facts');
        this.inject(SpaceFooter.create(), 'space-footer');
        this.refresh(state);
    }

    refresh(state: AppState) {
        const { spacePhoto, satellite } = state;
        const spacePicture = SpacePicture.create() as AppElement;
        spacePicture.setState( spacePhoto );

        const spacePlace = IssLocation.create() as AppElement;
        spacePlace.setState( satellite );
        
        this.empty('space-photo');
        this.empty('space-place');
        this.inject(spacePicture, 'space-photo');
        this.inject(spacePlace, 'space-place');
    }
}