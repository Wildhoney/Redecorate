# Redecorate

> Simple module for reducing immutable nested properties in Redux applications.

## Getting Started

```javascript
import {apply} from 'redecorate';

// ...

const model = apply(state)('name.places', cursor => {
    return [ ...cursor, { name: 'Malta' } ];
});
```

## Helpers

Common patterns are found through Redux, which is why Redecorate provides an array of helper functions to make the reducing process simpler and more readable for fellow developers.
