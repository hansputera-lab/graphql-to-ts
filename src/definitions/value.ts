import type {
  InputValueDefinitionNode,
  ConstValueNode,
  ValueNode,
} from 'graphql/language/ast';
import {Kind as GraphEnum} from 'graphql/language/kinds';
import {getFieldType} from './field';
import type {QueryFieldParsed, QueryTypes} from '../@types';

/**
 * Get argument type
 * @param {ConstValueNode} value argument node value.
 * @return {[string, string]}
 *
export const getArgumentType = (
  value: ConstValueNode | ValueNode,
): [string, string] => {
  switch(value.kind) {
    case GraphEnum.INT:
    case GraphEnum.FlOAT:
      return ['number', value.value];
    case GraphEnum.STRING:
      return ['string', value.value];
    case GraphEnum.BOOLEAN:
      return ['boolean', value.value ? 'true' : 'false'];
    case GraphEnum.NULL:
      return ['unknown', 'null'];
    case GraphEnum.ENUM:
      return ['REPLACE_IT', value.value];
    default:
      return ['unknown', 'null'];
  }
};

/**
 * Load arguments data.
 * @param {InputValueDefinitionNode} args Input Value Definition Nodes.
 * @return {QueryFieldParsed}
 */
export const loadArguments = (
  args: readonly InputValueDefinitionNode[],
): QueryFieldParsed => {
  const argsText = args.map((arg) => {
    const [text, required] = getFieldType(arg.type);
    return `${arg.name.value}${required ? '' : '?'}: ${text}`;
  }).join(', ');

  return {
    value: argsText.length ? `(${argsText})` : ''
  };
};
