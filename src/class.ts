import gql from 'graphql-tag';
import {loadDefinition} from './definitions';

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
  parse() {
    const query = gql(this.syntax);

    // process 'definitions'
    const definitions = query.definitions.map(
        (definition) => loadDefinition(definition),
    );

    console.log(definitions);
  }
}
