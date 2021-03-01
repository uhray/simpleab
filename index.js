(function (f) {
  if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    module.exports = exports = f();
  } else if (typeof define === 'function' && define.amd) {
    define([], f);
  } else {
    var g;

    if (typeof window !== 'undefined') {
      g = window;
    } else if (typeof global !== 'undefined') {
      g = global;
    } else if (typeof self !== 'undefined') {
      g = self;
    } else {
      g = this;
    }

    g.SimpleAB = f();
  }
})(function () {
  function SimpleAB(title) {
    this.variants = [];
    this.totalWeight = 0;
    this.title = title;
    this.variantLookup = {};
  }

  SimpleAB.track = function (title, decision) {
    // stubbed track
  };

  SimpleAB.saveSetting = function (key, value) {
    return localStorage.setItem('SIMPLEAB_' + key, value);
  };

  SimpleAB.retrieveSetting = function (key) {
    return localStorage.getItem('SIMPLEAB_' + key);
  };

  SimpleAB.prototype.variant = function (name, weight) {
    weight = weight || 1;
    this.variants.push({ name: name, weight: weight });
    this.totalWeight += weight;
    this.variantLookup[name] = 1;
    return this;
  };

  SimpleAB.prototype.choose = function () {
    var sum = 0,
      random = Math.random(),
      totalWeight = this.totalWeight,
      title = this.title,
      existing = SimpleAB.retrieveSetting(title);

    if (existing && this.variantLookup[existing]) {
      SimpleAB.track(title, existing);
      return existing;
    }

    for (var i = 0; i < this.variants.length; i++) {
      sum += this.variants[i].weight;
      if (sum / totalWeight >= random) {
        var d = this.variants[i].name;
        SimpleAB.track(title, d);
        SimpleAB.saveSetting(title, d);
        return d;
      }
    }

    return 'none';
  };

  return SimpleAB;
});
