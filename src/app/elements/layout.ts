import { AppControllerElement, AppElement, CustomAppElement } from '../core/app-element.decorator';
import { HomePage } from './home.page';
import { DetailPage } from './detail.page';
import { Router } from '../core/route.generator';

const appLayout = 'app-layout';

@CustomAppElement({
    selector: appLayout,
    template: '<div></div>',
})
export class AppLayout extends AppControllerElement {
    private router: Router;

    constructor() {
        super();
        this.setState(
            { 
                facts: [],
                spacePhoto: {
                    title: 'huh',
                    author: 'me',
                    href: 'https://apod.nasa.gov/apod/image/2004/M31Dec2019final1YuzheB2_1024.jpg'
                }
            }
        );
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