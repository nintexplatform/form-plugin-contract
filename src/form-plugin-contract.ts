export interface BaseProp {
  title: string;
  required?: string[];
  description?: string;
  defaultValue?: string | boolean | number | object | undefined;
  format?: string;
  isValueField?: boolean;
}

export type MinimumSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface StringProp extends BaseProp {
  type: 'string';
  minLength?: number;
  maxLength?: number;
}

export interface ChoiceProp extends BaseProp {
  type: 'string';
  enum: string[];
  showAsRadio?: boolean;
  verticalLayout?: boolean;
}

export interface NumberProp extends BaseProp {
  type: 'number';
  minimum?: number;
  maximum?: number;
}

export interface IntegerProp extends BaseProp {
  type: 'integer';
  minimum?: number;
  maximum?: number;
}

export interface BooleanProp extends BaseProp {
  type: 'boolean';
}

export type ObjectProp = BaseProp & {
  type: 'object';
  placeholder?: string;
  properties: { [key: string]: PropType };
};

export type PropType = ChoiceProp | StringProp | NumberProp | IntegerProp | BooleanProp | ObjectProp;

interface PluginDesigner {
  staticProperties?: string[];
  canvasRestrictions?: {
    hideInToolbar?: boolean;
    minSize?: MinimumSize;
    isFullRow?: boolean;
  };
}

export interface PluginContract {
  version: string;
  fallbackDisableSubmit: boolean;
  controlName: string;
  pluginAuthor?: string;
  pluginVersion?: string;
  searchTerms?: string[];
  description?: string;
  groupName?: string | { name: string; order: number };
  iconUrl?: string;
  designer?: PluginDesigner;
  properties?: Record<string, PropType>;
  standardProperties?: {
    fieldLabel?: boolean;
    toolTip?: boolean;
    description?: boolean;
    placeholder?: boolean;
    defaultValue?: boolean;
    visibility?: boolean;
    readOnly?: boolean;
    required?: boolean;
  };
  events?: string[];
}

// this is same value is in package.json
export const PluginContractVersion = '1.0.3';
