
export const transcludeSelector = 'peep-hole';

const lifecycleAliases = {
    beforeAttach: 'preKablam',
    connectedCallback: 'onKablam', // native
    afterAttach: 'postKablam',
    beforeDetach: 'prePoof',
    disconnectedCallback: 'onPoof', // native
    afterDetach: 'postPoof',
}


interface CustomElementConfig {
    selector: string;
    template: string;
    style?: string;
}

// utils
const copy = (orig: object): object => JSON.parse(JSON.stringify(orig));

const validateSelector = (selector: string) => {
    if (selector.indexOf('-') <= 0) {
        throw new Error('custom tags require dashes.');
    }
}

const validateTemplate = (template: string) => {
    if (!template && template !== '') {
        throw new Error('your custom element needs a template.')
    }
}

const getClassMethodOrDefualt = (object: any, methodName: string): any => {
    if (object.prototype[methodName]) {
        return object.prototype[methodName];
    }
    return () => { };
}

const setClassMethod = (object: any, methodName: string, method: Function) => {
    object.prototype[methodName] = method;
}

export const CustomAppElement = (config: CustomElementConfig) => (customElementClass: any) => {
    validateSelector(config.selector);
    validateTemplate(config.template);

    // initialize template
    const template = document.createElement('template');
    let templateHtmlString = config.template;
    if (config.style) {
        templateHtmlString = `<style>${config.style}</style>${config.template}`;
    }
    template.innerHTML = templateHtmlString;

    // adopt lifecycle methods
    const inheritedCallback = getClassMethodOrDefualt(customElementClass, 'connectedCallback');
    const connectedCallback = getClassMethodOrDefualt(customElementClass, lifecycleAliases.connectedCallback);
    const disconnectCallBack = getClassMethodOrDefualt(customElementClass, lifecycleAliases.disconnectedCallback);

    // cusotm lifecycle methods
    const beforeConnectedCallback = getClassMethodOrDefualt(customElementClass, lifecycleAliases.beforeAttach);
    const afterConnectedCallback = getClassMethodOrDefualt(customElementClass, lifecycleAliases.afterAttach);
    const beforeDisconnectedCallback = getClassMethodOrDefualt(customElementClass, lifecycleAliases.beforeDetach);
    const afterDisconnectedCallback = getClassMethodOrDefualt(customElementClass, lifecycleAliases.afterDetach);

    // connected lifecycle
    function onConnectedCallback() {
        const clone = document.importNode(template.content, true);
        if (config.style) {
            this.attachShadow({ mode: 'open' }).appendChild(clone);
        } else {
            this.appendChild(clone);
        }
        beforeConnectedCallback();
        inheritedCallback.call(this);
        connectedCallback.call(this);
        afterConnectedCallback();
    }

    // disconnected lifecycle
    function onDisconnectedCallback() {
        beforeDisconnectedCallback();
        disconnectCallBack.call(this);
        afterDisconnectedCallback();
    }

    // extend base callback methods
    setClassMethod(customElementClass, 'connectedCallback', onConnectedCallback);
    setClassMethod(customElementClass, 'disconnectedCallback', onDisconnectedCallback);

    window.customElements.define(config.selector, customElementClass);
}

@CustomAppElement({
    selector: transcludeSelector,
    template: ''
})

export class AppElement extends HTMLElement {
    private transcludeTarget: Record<string, Element | ShadowRoot> = {};
    private state = {}

    create = () => { }

    setState(stateFragment: any): any {
        this.state = { ...copy(this.state), ...copy(stateFragment) }
    }

    getState(): any {
        return { ...copy(this.state) };
    }

    findSingleOrBase(query: string): HTMLElement {
        if (!query) return (this.shadowRoot || this) as HTMLElement;
        return ((this.shadowRoot ? (this.shadowRoot.querySelector(query) || this.shadowRoot) : (this.querySelector(query) || this)) as HTMLElement);
    }

    findSingle(query: string): HTMLElement {
        return ((this.shadowRoot ? this.shadowRoot.querySelector(query) : this.querySelector(query)) as HTMLElement);
    }

    findAll(query: string): NodeListOf<HTMLElement> {
        return (this.shadowRoot ? this.shadowRoot.querySelectorAll(query) : this.querySelectorAll(query));
    }

    inject(transcludeElement: HTMLElement, targetName: string = null) {
        const targetProp: string = targetName || 'base';
        if (!this.transcludeTarget[targetProp]) {
            const query = targetName ? `${transcludeSelector}[name="${targetName}"]` : transcludeSelector;
            this.transcludeTarget[targetProp] = this.findSingleOrBase(query);
        }
        this.transcludeTarget[targetProp].appendChild(transcludeElement);
    }

    empty() {
        for (const property in this.transcludeTarget) {
            const targetElement = this.transcludeTarget[property];
            while (targetElement.firstChild) {
                targetElement.removeChild(targetElement.firstChild);
            }
        }
    }
}