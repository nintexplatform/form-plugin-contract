# @nintex/form-plugin-contract

[![Apache License](https://img.shields.io/badge/license-Apache-blue.svg)](https://opensource.org/licenses/Apache-2.0) [![npm version](https://badge.fury.io/js/%40nintex%2Fform-plugin-contract.svg)](https://badge.fury.io/js/%40nintex%2Fform-plugin-contract)

This repository contains the type definitions for Nintex Form plugins, written in TypeScript.

## Installation

You can install the `@nintex/form-plugin-contract` package using npm:

`npm install @nintex/form-plugin-contract`

## Usage

In your TypeScript project, you can import the types as follows:

```ts
import { PluginContract, PropType as PluginProperty } from '@nintex/form-plugin-contract';

// Use the PluginContract type to define the contract for your Nintex Form plugin
const plugin: PluginContract = {
  version: '1.0',
  fallbackDisableSubmit: false,
  controlName: 'Example Plugin',
  properties: {
    exampleProp: {
      type: 'string',
      title: 'Example Property',
      description: 'This is an example property',
      defaultValue: 'Hello, world!',
    },
  },
};

// Use the PluginProperty type to define custom properties for your plugin
const customProp: PluginProperty = {
  type: 'string',
  title: 'Custom Property',
  description: 'This is a custom property',
};
```

Using zod schema to validate your plugin:

```ts
import { pluginContractSchema } from '@nintex/form-plugin-contract';

const pluginData = {
  version: '1.0.0',
  fallbackDisableSubmit: true,
  controlName: 'example-control',
  widgetTooltip: 'Example control tooltip',
  pluginAuthor: 'John Doe',
  pluginVersion: '1.0.0',
  searchTerms: ['example', 'control'],
  description: 'This is an example control',
  groupName: 'Example Group',
  iconUrl: 'https://example.com/icon.png',
  properties: {
    exampleProp: {
      type: 'string',
      title: 'Example Prop',
      description: 'This is an example property',
      defaultValue: 'Default value',
      format: 'uppercase',
      isValueField: true,
    },
  },
  standardProperties: {
    fieldLabel: true,
    toolTip: true,
    description: true,
    placeholder: true,
    defaultValue: true,
    visibility: true,
    readOnly: true,
    required: true,
  },
  events: ['exampleEvent'],
};

// Validate the plugin data against the pluginContractSchema
const validatedData = pluginContractSchema.validate(pluginData);
console.log(validatedData);
```

## License

This project is licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE) for details.
