export interface QueryFieldParsed {
  name?: string;
  value: string;
  required: boolean;
}

export interface QueryParsed {
  name: string;
  value?: QueryFieldParsed[] | QueryFieldParsed;
}

export * from './field';
