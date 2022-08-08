"use strict";

import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstance = powerbi.VisualObjectInstance;
import DataView = powerbi.DataView;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;
import * as d3 from "d3";
import { VisualSettings } from "./settings";

export class Visual implements IVisual {
  private svgRoot: d3.Selection<SVGElement, {}, HTMLElement, any>;
  private target: HTMLElement;
  private updateCount: number;
  private settings: VisualSettings;
  private valueText: Text;

  constructor(options: VisualConstructorOptions) {
    this.svgRoot = d3.select(options.element).append("svg");
    
    
    this.target = options.element;
    this.updateCount = 0;
    if (document) {
      const mainBody: HTMLElement = document.createElement("div");
      mainBody.classList.add("main-body");

      const flexWrapper: HTMLElement = document.createElement("div");
      flexWrapper.classList.add("content-wrapper");

      const updateButton: HTMLElement = document.createElement("button");
      updateButton.classList.add("button");
      updateButton.appendChild(document.createTextNode("Refresh"));
      updateButton.addEventListener("click", () => this.increaseCount());

      const updateCountLabel: HTMLElement = document.createElement("div");
      updateCountLabel.classList.add("label");
      updateCountLabel.appendChild(document.createTextNode("Update count:"));
      const updateCountValue: HTMLElement = document.createElement("div");
      updateCountValue.classList.add("value");
      this.valueText = document.createTextNode(this.updateCount.toString());
      updateCountValue.appendChild(this.valueText);

      mainBody.appendChild(flexWrapper);
      mainBody.appendChild(updateButton);
      flexWrapper.appendChild(updateCountLabel);
      flexWrapper.appendChild(updateCountValue);

      this.target.appendChild(mainBody);
    }
  }

  public update(options: VisualUpdateOptions) {
    this.increaseCount();
  }

  private increaseCount() {
    if (this.valueText) {
      this.valueText.textContent = (this.updateCount++).toString();
    }
  }

  private static parseSettings(dataView: DataView): VisualSettings {
    return <VisualSettings>VisualSettings.parse(dataView);
  }

  public enumerateObjectInstances(
    options: EnumerateVisualObjectInstancesOptions
  ): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
    return VisualSettings.enumerateObjectInstances(
      this.settings || VisualSettings.getDefault(),
      options
    );
  }
}
