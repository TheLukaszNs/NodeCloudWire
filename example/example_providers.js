class Foo {
  constructor(x) {
    this.x = x;
  }
}

class Bar {
  constructor(x) {
    this.x = x;
  }
}
class Baz {
  constructor(x) {
    this.x = x;
  }
}

const ProvideFoo = () => {
  return new Foo(42);
};

const ProvideBar = foo => {
  return new Bar(-foo.x);
};

const ProvideBaz = bar => {
  if (bar.x === 0) {
    throw new Error('x in Bar equals 0');
  }
  return new Baz(bar.x);
};

module.exports = {
  ProvideFoo,
  ProvideBar,
  ProvideBaz,
};
