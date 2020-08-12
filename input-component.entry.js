import { r as registerInstance, h } from './index-e8484beb.js';

const inputComponentCss = ":host{display:block}.__input{background-color:aqua}";

const InputComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return h("input", { type: "text", class: "__input", value: this.name });
    }
};
InputComponent.style = inputComponentCss;

export { InputComponent as input_component };
