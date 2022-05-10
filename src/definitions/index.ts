import type {
  TypeDefinitionNode,
  EnumTypeDefinitionNode,
  InputValueDefinitionNode,
  FieldDefinitionNode,
} from 'graphql/language/ast';
import {Kind as GraphEnum} from 'graphql/language/kinds';
import {getFieldType} from './field';
import {loadArguments} from './value';
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
        const argumentValue = (Array.isArray((field as FieldDefinitionNode).arguments) ?
                              loadArguments(
                                (field as FieldDefinitionNode).arguments!).value : ''
        );
        return {
          name: field.name.value,
          value: `${argumentValue.length ? `${argumentValue} => ` : ''}${
              typeDef}`,
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
      console.log('The definition structures:', definition);
      break;
  }

  return q;
};

