"use strict";

import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import ISelectionManager = powerbi.extensibility.ISelectionManager;
import { VisualSettings } from "./settings";

export class Visual implements IVisual {
  private target: HTMLElement;
  private selectionManager: ISelectionManager;
  private selectedValue: boolean = false;
  private host: IVisualHost;
  private isEventUpdate: boolean = false;
  private settings: VisualSettings;
  private valueText: Text;

  constructor(options: VisualConstructorOptions) {
    this.target = options.element;
    this.host = options.host;
    this.selectionManager = options.host.createSelectionManager();

    // this.target = options.element;
    // if (document) {
    //   const switchContainer: HTMLElement = document.createElement("label");
    //   switchContainer.classList.add("switch");

    //   const switchInput: HTMLInputElement = document.createElement("input");
    //   switchInput.classList.add("checkbox-input");
    //   switchInput.type = "checkbox";

    //   const switchSlider: HTMLElement = document.createElement("span");
    //   switchSlider.classList.add("slider");
    //   switchSlider.classList.add("round");

    //   switchContainer.appendChild(switchInput);
    //   switchContainer.appendChild(switchSlider);

    //   this.target.appendChild(switchContainer);
    // }
  }

  public update(options: VisualUpdateOptions) {
    if (options.type && !this.isEventUpdate) {
      this.init(options);
    }
  }

  public init(options: VisualUpdateOptions) {
    if (
      !options ||
      !options.dataViews ||
      !options.dataViews[0] ||
      !options.dataViews[0].categorical ||
      !options.dataViews[0].categorical.categories ||
      !options.dataViews[0].categorical.categories[0]
    ) {
      return;
    }

    while (this.target.firstChild) {
      this.target.removeChild(this.target.firstChild);
    }

    // clear out any previous selection ids
    this.selectedValue = false;

    // get the category data.
    const category = options.dataViews[0].categorical.categories[0];
    const values = category.values;

    // build selection ids to be used by filtering capabilities later
    values.forEach((item: number, index: number) => {
      // this.selectionIds[item] = this.host
      //   .createSelectionIdBuilder()
      //   .withCategory(category, index)
      //   .createSelectionId();

      const value = item.toString();

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.value = value;
      radio.name = "values";
      radio.onclick = function (ev) {
        this.isEventUpdate = true; // This is checked in the update method. If true it won't re-render, this prevents and infinite loop
        this.selectionManager.clear(); // Clean up previous filter before applying another one.

        // Find the selectionId and select it
        this.selectionManager
          .select(this.selectedValue);

        // This call applys the previously selected selectionId
        this.selectionManager.applySelectionFilter();
      }.bind(this);

      this.target.appendChild(radio);
    });
  }
}
