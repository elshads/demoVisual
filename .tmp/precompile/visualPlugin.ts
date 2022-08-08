import { Visual } from "../../src/visual";
import powerbiVisualsApi from "powerbi-visuals-api";
import IVisualPlugin = powerbiVisualsApi.visuals.plugins.IVisualPlugin;
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions;
import DialogConstructorOptions = powerbiVisualsApi.extensibility.visual.DialogConstructorOptions;
var powerbiKey: any = "powerbi";
var powerbi: any = window[powerbiKey];
var demoVisual1E942F68B1AA413C8431AFCDEDE2DAE2_DEBUG: IVisualPlugin = {
    name: 'demoVisual1E942F68B1AA413C8431AFCDEDE2DAE2_DEBUG',
    displayName: 'DemoVisual',
    class: 'Visual',
    apiVersion: '3.8.0',
    create: (options: VisualConstructorOptions) => {
        if (Visual) {
            return new Visual(options);
        }
        throw 'Visual instance not found';
    },
    createModalDialog: (dialogId: string, options: DialogConstructorOptions, initialState: object) => {
        const dialogRegistry = globalThis.dialogRegistry;
        if (dialogId in dialogRegistry) {
            new dialogRegistry[dialogId](options, initialState);
        }
    },
    custom: true
};
if (typeof powerbi !== "undefined") {
    powerbi.visuals = powerbi.visuals || {};
    powerbi.visuals.plugins = powerbi.visuals.plugins || {};
    powerbi.visuals.plugins["demoVisual1E942F68B1AA413C8431AFCDEDE2DAE2_DEBUG"] = demoVisual1E942F68B1AA413C8431AFCDEDE2DAE2_DEBUG;
}
export default demoVisual1E942F68B1AA413C8431AFCDEDE2DAE2_DEBUG;