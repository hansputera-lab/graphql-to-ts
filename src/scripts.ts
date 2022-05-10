import type {QueryParsed, QueryFieldParsed} from './@types';

/**
 * @class Scripts
 */
export class Scripts {
  /**
   * @param {QueryParsed} query Parsed graphql query syntax.
   */
  constructor(private query: QueryParsed[]) {}

  /**
   * Generate TS Scripts.
   * @return {string}
   */
  public generate(): string {
    let scripts: string = '';

    this.query.forEach((query) => {
      let header: string = `${query.type} ${query.name}`;
      let bodyLines: string = '';

      if (['enum', 'interface'].includes(query.type!)) {
        header += ' {\n';

        // it is an enum
        if (query.type === 'enum') {
          bodyLines += ((query.value as QueryFieldParsed).value as string[])
              .map(
                  (x) => `    ${x}`).join(',\n');
        } else if (query.type === 'interface') {
          bodyLines += (query.value as QueryFieldParsed[]).map(
              (v) => `    ${v.name!.replace(/\s/g, '_')}${
              v.required ? '' : '?'
              }: ${v.value}`).join(';\n') + ';';
        }

        bodyLines += '\n}\n';
      } else if (query.type === 'type') {
        header += ' = ';
        bodyLines += (query.value as QueryFieldParsed).value + ';\n';
      }

      scripts += header.concat(bodyLines);
    });

    return scripts;
  }
}
