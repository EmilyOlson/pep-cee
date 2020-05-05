import { AppElement, CustomAppElement } from '../core/app-element.decorator';
import { HomePage } from './home.page';
import { DetailPage } from './detail.page';
import { Router } from '../core/route.generator';
import { defaultState } from '../data/default-state.data';
import { DataRequestService } from '../data/data-request.service';
import { AppState } from '../data/state.interfaces';

const appLayout = 'app-layout';

@CustomAppElement({
    selector: appLayout,
    template: '',
})
export class AppLayout extends AppElement {
    private router: Router;
    private readonly requestService: DataRequestService;

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
        
        this.requestService = new DataRequestService();        
    }

    onKablam() {
        this.refresh();
        this.loadData();
    }

    async loadData(): Promise<void> {
        const podData = await this.requestService.getPictureOfTheDay();
        const iisCoords = await this.requestService.getIssCoordinates();
        this.setState({ spacePhoto: podData, satellite: iisCoords });
        this.refresh()
    }

    refresh() {
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