# NodeCloudWire

POC - [wire](https://github.com/google/go-cloud/blob/master/wire)-like tool originally designed for NodeCloud

## Installation process

As the `NPM` package isn't yet published (because I'm still working on this project and many features are missing, you'll have to clone this repo and work with this lib manually:

```bash
$ git clone https://github.com/thelukaszns/NodeCloudWire
$ cd ./NodeCloudWire
$ npm install (or yarn)
```

Note the `npm install` step - for now I'm using [Lodash](https://lodash.com/) for Arrays, but I'll be thinking about implementing this functions myself (as I don't use most of the tools available).

## Basics

For now, _NodeCloudWire_ has one concept: **Providers**. Let's see how we can implement them.

### Defining providers

**Provider** is an ordinary JavaScript code that can produce a value.

```js
class Foo {
  constructor(x) {
    this.x = x;
  }
}

const ProvideFoo = () => {
  return new Foo(42);
};
```

This simple function returns the `Foo` object with the value `x` of 42.

Providers can specify dependencies with parameters:

```js
class Bar {
  constructor(x) {
    this.x = x;
  }
}

const ProvideBar = foo => {
  return new Bar(-foo.x);
};
```

Note that now the `ProvideBar` function needs the `Foo` as a dependency;

Providers can also return errors:

```js
class Baz {
  constructor(x) {
    this.x = x;
  }
}

const ProvideBaz = bar => {
  if (bar.x === 0) {
    throw new Error('cannot provide baz when bar is zero');
  }
  return new Baz(bar.x);
};
```

The last step would be to export all the **providers**:

```js
module.exports = {
  ProvideFoo,
  ProvideBar,
  ProvideBaz,
};
```

Providers can be grouped into provider sets. This is useful if several providers will frequently be used together.

```js
const Wire = require('<path to wire>');
const wire = new Wire();

const SmallSet = wire.newSet([
  { name: 'ProvideFoo', path: './example_providers.js' },
]);
```

As you can see the above set is really small, let's add more providers to it!

```js
const GigaSet = wire.newSet([
  SmallSet,
  { name: 'ProvideBar', path: './example_providers.js' },
  { name: 'ProvideBaz', path: './example_providers.js' },
]);
```

When you are ready with defining all the **providers** you can build them using this:

```js
wire.build(GigaSet); // You can pass second argument to change the filename
```

If all the things went smooth, you should see new file called `wire_gen.js` (unless you passed 2nd argument) with the content like this:

```js
const { ProvideFoo } = require('./example_providers.js');
const { ProvideBar } = require('./example_providers.js');
const { ProvideBaz } = require('./example_providers.js');

module.exports = () => {
  try {
    const var_0 = ProvideFoo();
    const var_1 = ProvideBar(var_0);
    const var_2 = ProvideBaz(var_1);
    return var_2;
  } catch (e) {
    console.log(e);
    return e;
  }
};
```

## Disclaimer

Note that this project is only Proof of Concept, for your own safety don't even think about using it in production. I'll be doing my best to develop this. Probably I'll migrate to **TypeScript** to avoid silly bugs, which probably already exists in this lib (if you find one, please post it on the _issues_ page :smiley:)
