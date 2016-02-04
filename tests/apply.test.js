import test from 'ava';
import objectAssign from 'object-assign';
import 'babel-core/register';
import {apply, set, assign, add, remove} from '../component/redecorate';

const state = {
    name: { first: 'Adam', last: 'Timberlake' },
    age: 30,
    countries: {
        latest: 'Buenos Aires',
        all: ['Moscow', 'Rio de Janeiro', 'Singapore', 'Kuala Lumpur']
    },
    colleagues: [
        { name: 'Ahmed' }, { name: 'JC' }, { name: 'Rich' }
    ]
};

test('string: able to set a property', t => {
    const transformed = apply(state)('name.middle', cursor => 'Daniel');
    t.same(transformed, objectAssign({}, state, {
        name: objectAssign({}, state.name, {
            middle: 'Daniel'
        })
    }));
});

test('string: able to set a property (using helper)', t => {
    const transformed = apply(state)('name.middle', set('Daniel'));
    t.same(transformed, objectAssign({}, state, {
        name: objectAssign({}, state.name, {
            middle: 'Daniel'
        })
    }));
});

test('string: able to alter a property', t => {
    const transformed = apply(state)('name.last', () => 'Butterfield');
    t.same(transformed, objectAssign({}, state, {
        name: objectAssign({}, state.name, {
            last: 'Butterfield'
        })
    }));
});

test('string: able to alter a property (using helper)', t => {
    const transformed = apply(state)('name.last', set('Butterfield'));
    t.same(transformed, objectAssign({}, state, {
        name: objectAssign({}, state.name, {
            last: 'Butterfield'
        })
    }));
});

test('array: able to push an item', t => {
    const transformed = apply(state)('countries.all', cursor => [...cursor, 'Barcelona']);
    t.same(transformed, objectAssign({}, state, {
        countries: objectAssign({}, state.countries, {
            all: [ ...state.countries.all, 'Barcelona' ]
        })
    }));
});

test('array: able to push an item (using helper)', t => {
    const transformed = apply(state)('countries.all', add('Barcelona'));
    t.same(transformed, objectAssign({}, state, {
        countries: objectAssign({}, state.countries, {
            all: [ ...state.countries.all, 'Barcelona' ]
        })
    }));
});

test('array: able to remove an item', t => {
    const transformed = apply(state)('countries.all', cursor => cursor.filter(x => x !== 'Moscow'));
    t.same(transformed, objectAssign({}, state, {
        countries: objectAssign({}, state.countries, {
            all: state.countries.all.filter(x => x !== 'Moscow')
        })
    }));
});

test('array: able to remove an item (using helper)', t => {
    const transformed = apply(state)('countries.all', remove('Moscow'));
    t.same(transformed, objectAssign({}, state, {
        countries: objectAssign({}, state.countries, {
            all: state.countries.all.filter(x => x !== 'Moscow')
        })
    }));
});

test('object: able to push an item', t => {
    const transformed = apply(state)('name', cursor => ({ ...cursor, ...{ middle: 'Daniel' }}));
    t.same(transformed, objectAssign({}, state, {
        name: objectAssign({}, state.name, {
            middle: 'Daniel'
        })
    }));
});

test('object: able to push an item (using helper)', t => {
    const transformed = apply(state)('name', add({ middle: 'Daniel', other: null }, { patronymic: false }));
    t.same(transformed, objectAssign({}, state, {
        name: objectAssign({}, state.name, {
            middle: 'Daniel',
            other: null,
            patronymic: false
        })
    }));
});

test('object: able to remove an item', t => {
    const transformed = apply(state)('colleagues', cursor => cursor.filter(x => x.name !== 'JC'));
    t.same(transformed, objectAssign({}, state, {
        colleagues: state.colleagues.filter(x => x.name !== 'JC')
    }));
});

test('object: able to remove an item (using helper)', t => {
    const transformed = apply(state)('colleagues', remove({ name: 'JC' }));
    t.same(transformed, objectAssign({}, state, {
        colleagues: state.colleagues.filter(x => x.name !== 'JC')
    }));
});
