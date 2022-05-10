import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  clean: true,
  entries: [
    'src/'
  ],
  declaration: true,
});
