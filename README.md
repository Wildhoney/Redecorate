# Redecorate

> Simple module for reducing immutable nested properties in Redux applications.

## Getting Started

```javascript
import r from 'redecorate';

// ...

const model = r(state)('name.places', cursor => {
    return [ ...cursor, { name: 'Malta' } ];
});
```
