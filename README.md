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

In the following examples we'll assume we have the following state:

```javascript
const state = {
    name: {
        first: 'James',
        surname: 'Bradfield';
    },
    age: 46,
    songs: ['A Design For Life', 'Motorcycle Emptiness', 'Generation Terrorists'],
    albums: [
        { name: 'The Holy Bible', released: 1994 },
        { name: 'Everything Must Go', released: 1996 },
        { name: 'This Is My Truth, Tell Me Yours', released: 1998 }
    ]
};
```

We can use the `set` helper to modify properties on the `age` literal:

```javascript
apply(state)('age', cursor => 47);
```

Further we're able to able to use the `set` function for adding properties to the `name` object:

```javascript
apply(state)('name.middle', cursor => 'Dean');
```

Adding an item to the `songs` is as easy as using the `add` function &mdash; you can pass multiple arguments to add many items onto the array:

```javascript
apply(state)('songs', add('If You Tolerate This Your Children Will Be Next'));
```

Similarly you can use the `remove` function to remove items from the aforementioned array &mdash; again you can use the nature of the `add` and `remove` multivariate functions to supply more than one item:

```javascript
apply(state)('songs', remove('Motorcycle Emptiness', 'Generation Terrorists'));
```

Removing items from an array of objects is slightly more difficult:

```javascript
apply(state)('albums', remove({ released: 1994 }));
```

You can also pass multiple arguments to the `remove` function &mdash; however if you want to remove items that are either `{ released: 1994 }` or `{ name: 'Everything Must Go' }` then simply pass multiple arguments to the `remove` function:

```javascript
apply(state)('albums', remove({ name: 'Everything Must Go' }, { released: 1994 }));
```

:bulb: [Have an idea](https://github.com/Wildhoney/Redecorate/issues/new) for Redecorate's helper functions?
