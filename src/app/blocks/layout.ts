import { AppControllerElement, CustomAppElement } from '../core/app-element.decorator';
import { HomePage } from './home.page';
import { DetailPage } from './detail.page';
import { Router } from '../core/route.generator';

import { defaultState } from '../data/default-state.data';

const appLayout = 'app-layout';

@CustomAppElement({
    selector: appLayout,
    template: '',
})
export class AppLayout extends AppControllerElement {
    private router: Router;

    constructor() {
        super();
        this.setState(defaultState);
        this.navigateHome = this.navigateHome.bind(this);
        this.navigateDetail = this.navigateDetail.bind(this);

        this.router = new Router({
            routes:[
                { name: '#home', action: this.navigateHome},
                { name: '#detail', action: this.navigateDetail}
            ]
        });
    }

    onKablam() {
        if(this.router.isCurrent('#detail')) {
            this.navigateDetail();
        } else {
            this.navigateHome();
        }
    }
    
    navigateHome() {
        const page: any = HomePage.create();
        page.setState(this.getState());
        this.empty();
        this.inject(page);
    }

    navigateDetail() {
        const page: any = DetailPage.create();
        page.setState(this.getState());
        this.empty();
        this.inject(page);
    }
}