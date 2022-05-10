import type {
  TypeDefinitionNode,
  EnumTypeDefinitionNode,
} from 'graphql/language/ast';
import {Kind as GraphEnum} from 'graphql/language/kinds';
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
      q.type = 'enum';
      q.value = {
        value: (definition as EnumTypeDefinitionNode)
            .values!.map((v) => v.name.value),
      };
      break;
    case GraphEnum.INPUT_OBJECT_TYPE_DEFINITION:
    case GraphEnum.OBJECT_TYPE_DEFINITION:
    case GraphEnum.INTERFACE_TYPE_DEFINITION:
      q.type = 'interface';
      q.value = definition.fields ? definition.fields.map((field) => {
        const [typeDef, required] = getFieldType(field.type);
        return {
          name: field.name.value,
          value: typeDef,
          required,
        };
      }) : [];
      break;
    case GraphEnum.UNION_TYPE_DEFINITION:
      q.type = 'type';
      q.value = {
        value: definition.types!.map((t) => t.name.value).join(' | '),
      };
      break;
    default:
      console.log(`Unknown '${definition.kind}' definition!`);
      break;
  }

  return q;
};

