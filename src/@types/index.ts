export type QueryTypes = 'interface' | 'type' | 'enum';

export interface QueryFieldParsed {
  name?: string;
  value: string | string[];
  required?: boolean;
}

export interface QueryParsed {
  name: string;
  value?: QueryFieldParsed[] | QueryFieldParsed;
  type?: QueryTypes;
}

export * from './field';
