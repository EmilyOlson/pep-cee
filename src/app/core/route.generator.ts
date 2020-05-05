export interface routesConfig {
    routes: routeData[];
}

export interface routeData {
    name: string;
    action: Function;
}

export class Router {
    constructor(routesConfig: routesConfig) {
        if(!routesConfig.routes && !routesConfig.routes.length) throw new Error('no routes!');
        window.addEventListener('hashchange', ()=> {
            const newDestination = routesConfig.routes.find(route => (
                route.name === location.hash
            ));
            window.scrollTo(0, 0);
            newDestination ? newDestination.action() : routesConfig.routes[0].action();
        });
    }

    isCurrent = (routeName: string): boolean => (location.hash === routeName);
}