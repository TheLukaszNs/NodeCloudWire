const Wire = require('../Wire');
const wire = new Wire();

const SmallSet = wire.newSet([
  { name: 'ProvideFoo', path: './example_providers.js' },
]);

const GigaSet = wire.newSet([
  SmallSet,
  { name: 'ProvideBar', path: './example_providers.js' },
  { name: 'ProvideBaz', path: './example_providers.js' },
]);

wire.build(GigaSet);
