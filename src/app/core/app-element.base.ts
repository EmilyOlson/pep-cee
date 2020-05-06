

export const transcludeSelector = 'peep-hole';

const copy = (orig: object): object => JSON.parse(JSON.stringify(orig));

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

    inject(transcludeElement: HTMLElement, targetName: string = '') {
        const targetProp: string = targetName || 'base';
        if (!this.transcludeTarget[targetProp]) {
            const query = targetName ? `${transcludeSelector}[name="${targetName}"]` : transcludeSelector;
            this.transcludeTarget[targetProp] = this.findSingleOrBase(query);
        }
        this.transcludeTarget[targetProp].appendChild(transcludeElement);
    }

    empty( targetName: string = '') {
        if(targetName) {
            const targetElement = this.transcludeTarget[targetName];
            while (targetElement && targetElement.firstChild) {
                targetElement.removeChild(targetElement.firstChild);
            }
            return;
        }
        for (const property in this.transcludeTarget) {
            const targetElement = this.transcludeTarget[property];
            while (targetElement.firstChild) {
                targetElement.removeChild(targetElement.firstChild);
            }
        }
    }
}