# simpleab

Simple AB Testing framework.

```
var SimpleAB = require('simpleab');

// set up tracking
SimbleAB.track = (trial, variant) => {
  console.log('decided %s for %s', variant, trial);
}

// Using
const decision = new SimpleAB('my-trial')
                   .variant('variantA', 1)  // weight of 1
                   .variant('variantB', 2)  // weight of 2
                   .choose()

// decision is either variantA or variant B
```

This will remember the decision for a user using localstorage, so to retry, you need to do this:

```
localStorage.removeItem('SIMPLEAB_my-trial');
```

Or you can force a decision:

```
localStorage.setItem('SIMPLEAB_my-trial', 'variantB');
```

Lastly, if you later remove `variantA` from the options and it was in local storage, it will not be chosen anymore. It can only choose variants that exist in this trial.
