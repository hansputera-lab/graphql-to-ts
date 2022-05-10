const {
  GraphTyped,
  Scripts,
} = require('../dist/index.js');

const query = `
  # Enum test
  enum Role {
    OSIS,
    Normal
  }

  enum Ekskul {
    Basket,
    Voli,
    Badminton,
    Paskibra
  }

  # type test
  type Account {
    id: ID! # "!" indicate a non-null (mandatory) field
    authType: String! # "google-auth", "github-auth", "outlook-auth"
    email: String!
    token: String
    archived: Boolean!
    disabled: Boolean!
    verified: Boolean!
  }

  # interface test
  interface Student {
    name: String!,
    age: Int!,
    role: Role!,
    ekskul: Ekskul
  }

  # Union test
  union UnionTest = Role | Ekskul

  # type test
  type User {
    id: ID!
    accounts: [Account!]! # (a non-null array of non-null Account values)
    givenName: String!
  }
`;

const typed = new GraphTyped(query);
const parsed = typed.parse();
console.log(parsed);
const scripts = new Scripts(parsed);

console.log('\n\nThe scripts:\n');
console.log(scripts.generate());
