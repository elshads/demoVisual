/* eslint-disable new-cap */
/* eslint-disable no-use-before-define */
"use strict";

import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils";
import DataViewObjectsParser = dataViewObjectsParser.DataViewObjectsParser;

export class VisualSettings extends DataViewObjectsParser {
  public value: valueSettings = new valueSettings();
  public label: labelSettings = new labelSettings();
  public appearance: appearanceSettings = new appearanceSettings();
}

export class valueSettings {
  public defaultValue: boolean = false;
}

export class labelSettings {
  public position: string = "0";
  public checkedFontColor: string = "#fff";
  public uncheckedFontColor: string = "#fff";
  public caption: string = "0";
}

export class appearanceSettings {
  public theme: string = "0";
  public size: string = "0";
  public checkedFgColor: string = "#fff";
  public checkedBgColor: string = "#fff";
  public uncheckedFgColor: string = "#fff";
  public uncheckedBgColor: string = "#fff";
}
