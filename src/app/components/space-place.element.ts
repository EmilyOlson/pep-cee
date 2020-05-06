import { AppElement, CustomAppElement } from '../core/app-element';
import { AppImg } from '../elements/img.element';
import { Satellite } from '../data/state.interfaces';
import { AppTxt } from '../elements/text.elemet';

export const spaceLocation = 'space-place';

const issImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/International_Space_Station_after_undocking_of_STS-132.jpg/1024px-International_Space_Station_after_undocking_of_STS-132.jpg';

@CustomAppElement({
    selector: spaceLocation,
    template: require('./space-place.template.html'),
    style: '',
})
export class IssLocation extends AppElement {
    static create = () => document.createElement(spaceLocation);

    onKablam() {
        this.refresh(this.getState())
    }

    refresh (state: Satellite) {
        // get relevant state data
        const { position } = state;

        const imgElement = AppImg.create();
        imgElement.setState({ src: issImage, alt: 'iss', css: 'satellite__image' });
        
        const latText = AppTxt.create();
        latText.setState({ text: position.latitude });
        const lonText = AppTxt.create();
        lonText.setState({ text: position.longitude });

        this.inject(imgElement, 'space-place');
        this.inject(latText, 'space-lat');
        this.inject(lonText, 'space-lon');
    }
}