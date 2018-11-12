const { ProvideFoo } = require('./example_providers.js');
const { ProvideBar } = require('./example_providers.js');
const { ProvideBaz } = require('./example_providers.js');

module.exports = () => {
  try {
    const var_0 = ProvideFoo();
    const var_1 = ProvideBar(var_0);
    const var_2 = ProvideBaz(var_1);
    return var_2;
  } catch (e) { console.log(e); return e; } 
};