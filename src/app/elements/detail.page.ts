import { AppElement, CustomAppElement } from '../core/app-element.decorator';
import { SpacePictureDetail } from './space-picture-detail.element';

const detailPage = 'detail-layout';

@CustomAppElement({
    selector: detailPage,
    template: '<div></div>',
})
export class DetailPage extends AppElement {
    static create = () => document.createElement(detailPage);

    onKablam() {
        const spacePictureDetail = SpacePictureDetail.create() as AppElement;
        const { spacePhoto } = this.getState();
        spacePictureDetail.setState( spacePhoto );
        this.inject( spacePictureDetail );
    }
}