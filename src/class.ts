import gql from 'graphql-tag';
import {loadDefinition} from './definitions';
import type {TypeDefinitionNode} from 'graphql/language/ast';
import type {QueryParsed} from './@types';

/**
* @class GraphTyped
 */
export class GraphTyped {
  /**
   * @param {string} syntax GraphQL Syntax
   */
  constructor(private syntax: string) {}

  /**
   * Parse the graphql syntax.
   * @return {void}
   */
  parse(): QueryParsed[] {
    const query = gql(this.syntax);
    return query.definitions.map(
        (definition) => loadDefinition(definition as TypeDefinitionNode),
    );
  }
}
