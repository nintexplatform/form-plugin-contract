# Nintex Forms Plugin Contract

[![Apache License](https://img.shields.io/badge/license-Apache-blue.svg)](https://opensource.org/licenses/Apache-2.0) [![npm version](https://badge.fury.io/js/@nintex%2Fform-plugin-contract.svg)](https://badge.fury.io/js/@nintex%2Fform-plugin-contract)
[![Node.js Package](https://github.com/nintexplatform/form-plugin-contract/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/nintexplatform/form-plugin-contract/actions/workflows/npm-publish.yml)

This repository contains the type definitions for Nintex Form plugins written in TypeScript.

For more information about Nintex Form plugins, see the [Software Development Kit](https://help.nintex.com/en-US/formplugins/Home.htm).

## Installation

Install the `@nintex/form-plugin-contract` package using npm:

`npm install @nintex/form-plugin-contract`

## Usage

In your TypeScript project, import the types as follows:

```ts
import { PluginContract, PropType as PluginProperty } from '@nintex/form-plugin-contract';

// Use the PluginProperty type to define custom properties for your plugin
const customProp: PluginProperty = {
  type: 'string',
  title: 'Custom Property',
  description: 'This is a custom property',
};
// Use the PluginContract type to define the contract for your Nintex Form plugin
const plugin: PluginContract = {
  version: '1.0',
  fallbackDisableSubmit: false,
  controlName: 'Example Plugin',
  properties: {
    customProp,
    exampleProp: {
      type: 'string',
      title: 'Example Property',
      description: 'This is an example property',
      defaultValue: 'Hello, world!',
      required: true
    },
  },
};
```

Use zod schema to validate your plugin:

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
  translationOption: {
    translatableCustomProperties: ['exampleProp']
  }
  events: ['exampleEvent'],
};

// Validate the plugin data against the pluginContractSchema
const validatedData = pluginContractSchema.validate(pluginData);
console.log(validatedData);
```

## License

This project is licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE) for details.
