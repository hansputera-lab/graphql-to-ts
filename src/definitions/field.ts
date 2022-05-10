import type {TypeNode} from 'graphql/language/ast';
import {Kind as GraphEnum} from 'graphql/language/kinds';

/**
 * Get field type.
 * @param {TypeNode} fieldType Field Type.
 * @param {boolean} _required
 * @return {[string, boolean]}
 */
export const getFieldType = (
    fieldType: TypeNode,
    _required: boolean = false,
): [string, boolean] => {
  switch (fieldType.kind) {
    case GraphEnum.NAMED_TYPE:
      const fields: Record<string, string> = {
        'String': 'string',
        'Float': 'number',
        'Int': 'number',
      };
      return [fields[fieldType.name.value] ?? fieldType.name.value, _required];
    case GraphEnum.LIST_TYPE:
      return getFieldType(fieldType.type as TypeNode);
    case GraphEnum.NON_NULL_TYPE:
      return getFieldType(fieldType.type, true);
    default:
      return ['unknown', _required];
  }
};
