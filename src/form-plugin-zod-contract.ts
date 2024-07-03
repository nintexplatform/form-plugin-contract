import { z } from 'zod';

const objectKeyRegex = /^\w+([_]\w+)*$/;
const nameRegex = /^\w+([\s-_]\w+)*$/;

const defaultObjectValue = z.record(z.lazy(() => z.union([z.string(), z.number(), z.boolean(), defaultObjectValue])));

export const basePropSchema = z.object({
  title: z.string().regex(nameRegex).max(40).optional(),
  required: z.boolean().optional(),
  description: z.string().optional(),
  defaultValue: z.union([z.string(), z.boolean(), z.number(), defaultObjectValue]).optional(),
  format: z.string().optional(),
  isValueField: z.boolean().optional(),
});

const minimumSizeSchema = z.number().int().positive().lte(12).gte(1);

const stringPropSchema = z.intersection(
  basePropSchema,
  z.object({
    type: z.literal('string'),
    minLength: z.number().optional(),
    maxLength: z.number().optional(),
  }),
);
const choicePropSchema = z.intersection(
  basePropSchema,
  z.object({
    type: z.literal('string'),
    enum: z.array(z.string().nonempty()),
    showAsRadio: z.boolean().optional(),
    verticalLayout: z.boolean().optional(),
  }),
);

const numberPropSchema = z.intersection(
  basePropSchema,
  z.object({
    type: z.literal('number'),
    minimum: z.number().optional(),
    maximum: z.number().optional(),
  }),
);
const integerPropSchema = z.intersection(
  basePropSchema,
  z.object({
    type: z.literal('integer'),
    minimum: z.number().optional(),
    maximum: z.number().optional(),
  }),
);

const booleanPropSchema = z.intersection(
  basePropSchema,
  z.object({
    type: z.literal('boolean'),
  }),
);

const objectPropSchema = z.intersection(
  basePropSchema,
  z.object({
    type: z.literal('object'),
    properties: z
      .lazy(() =>
        z.record(
          z.union([
            choicePropSchema,
            stringPropSchema,
            numberPropSchema,
            integerPropSchema,
            booleanPropSchema,
            objectPropSchema,
          ]),
        ),
      )
      .optional(),
  }),
);

const propTypeSchema = z.union([
  choicePropSchema,
  stringPropSchema,
  numberPropSchema,
  integerPropSchema,
  booleanPropSchema,
  objectPropSchema,
]);

const pluginDesignerSchema = z.object({
  staticProperties: z.array(z.string()).optional(),
  canvasRestrictions: z
    .object({
      hideInToolbar: z.boolean().optional(),
      minSize: minimumSizeSchema.optional(),
      isFullRow: z.boolean().optional(),
    })
    .optional(),
});

export const pluginContractSchema = z
  .object({
    version: z.string().nonempty(),
    fallbackDisableSubmit: z.boolean(),
    controlName: z.string().nonempty().regex(nameRegex).max(40),

    // optional ones
    pluginAuthor: z.string().optional(),
    pluginVersion: z.string().optional(),
    searchTerms: z.array(z.string()).optional(),

    description: z.string().optional(),
    groupName: z
      .union([
        z.string(),
        z.object({
          name: z.string(),
          order: z.number(),
        }),
      ])
      .optional(),

    iconUrl: z.string().optional(),
    designer: pluginDesignerSchema.optional(),
    properties: z.record(z.string().regex(objectKeyRegex), z.union([propTypeSchema, z.boolean()])).optional(),
    standardProperties: z
      .object({
        fieldLabel: z.boolean().optional(),
        toolTip: z.boolean().optional(),
        description: z.boolean().optional(),
        placeholder: z.boolean().optional(),
        defaultValue: z.boolean().optional(),
        visibility: z.boolean().optional(),
        readOnly: z.boolean().optional(),
        required: z.boolean().optional(),
      })
      .optional(),
    events: z.array(z.string()).optional(),
  })
  .strict();
