import type {
  TypeDefinitionNode,
  EnumTypeDefinitionNode,
} from 'graphql/language/ast';
import { Kind as GraphEnum } from 'graphql/language/kinds';
import {getFieldType} from './field';
import type {QueryParsed} from '../@types';


/**
 * Load raw definition structure.
 * @param {TypeDefinitionNode} definition Definition structure.
 * @return {QueryParsed}
 */
export const loadDefinition = (
    definition: TypeDefinitionNode,
): QueryParsed => {
  const q: QueryParsed = {
    'name': definition.name.value,
  };

  switch (definition.kind) {
    case GraphEnum.ENUM_TYPE_DEFINITION:
      q.value = {
        value: (definition as EnumTypeDefinitionNode)
            .values!.map((e) => `"${e.name.value}"`).join(' | '),
        required: false,
      };
      break;
    case GraphEnum.OBJECT_TYPE_DEFINITION:
      q.value = definition.fields!.map((field) => {
        const [typeDef, required] = getFieldType(field.type);
        return {
          name: field.name.value,
          value: typeDef,
          required,
        };
      });
      break;
  }

  return q;
};

