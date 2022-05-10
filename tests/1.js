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

  # interface test
  interface Student {
    name: String!,
    age: Int!,
    role: Role!,
    ekskul: Ekskul
  }

  # Union test
  union UnionTest = Role | Ekskul
`;

const typed = new GraphTyped(query);
const parsed = typed.parse();
console.log(parsed);
const scripts = new Scripts(parsed);

console.log('\n\nThe scripts:\n');
console.log(scripts.generate());
