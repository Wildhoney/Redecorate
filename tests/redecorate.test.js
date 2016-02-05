import test from 'ava';
import objectAssign from 'object-assign';
import {apply, set, assign, add, remove} from '../dist/redecorate';

const state = {
    name: { first: 'Adam', last: 'Timberlake' },
    age: 30,
    countries: {
        latest: 'Buenos Aires',
        all: ['Moscow', 'Rio de Janeiro', 'Singapore', 'Kuala Lumpur']
    },
    colleagues: [
        { name: 'Ahmed', age: 33 }, { name: 'JC', age: 40 }, { name: 'Rich', age: 42 }
    ]
};

test('(string) Should be able to set a simple property;', t => {

    const expected = objectAssign({}, state, {
        name: objectAssign({}, state.name, {
            middle: 'Daniel'
        })
    });

    const func = apply(state)('name.middle', cursor => 'Daniel');
    const helper = apply(state)('name.middle', set('Daniel'));

    t.same(func, expected);
    t.same(helper, expected);

});

test('(string) Should be able to modify a property', t => {

    const expected = objectAssign({}, state, {
        name: objectAssign({}, state.name, {
            last: 'Butterfield'
        })
    });

    const func = apply(state)('name.last', () => 'Butterfield');
    const helper = apply(state)('name.last', set('Butterfield'));

    t.same(func, expected);
    t.same(helper, expected);

});

test('(array)  Should be able to push an item onto a list', t => {

    const expected = objectAssign({}, state, {
        countries: objectAssign({}, state.countries, {
            all: [ ...state.countries.all, 'Barcelona' ]
        })
    });

    const func = apply(state)('countries.all', cursor => [...cursor, 'Barcelona']);
    const helper = apply(state)('countries.all', add('Barcelona'));

    t.same(func, expected);
    t.same(helper, expected);

});

test('(array)  Should be able to remove an item from a list', t => {

    const expected = objectAssign({}, state, {
        countries: objectAssign({}, state.countries, {
            all: state.countries.all.filter(x => x !== 'Moscow')
        })
    });

    const func = apply(state)('countries.all', cursor => cursor.filter(x => x !== 'Moscow'));
    const helper = apply(state)('countries.all', remove('Moscow'));

    t.same(func, expected);
    t.same(helper, expected);

});

test('(object) Should be able to add multiple items to the object', t => {

    const expected = objectAssign({}, state, {
        name: objectAssign({}, state.name, {
            middle: 'Daniel',
            other: null,
            patronymic: false
        })
    });

    const func = apply(state)('name', cursor => ({ ...cursor, ...{ middle: 'Daniel', other: null, patronymic: false }}));
    const helper = apply(state)('name', add({ middle: 'Daniel', other: null }, { patronymic: false }));

    t.same(func, expected);
    t.same(helper, expected);

});

test('(object) Should be able to remove an object from a list', t => {

    const expected = objectAssign({}, state, {
        colleagues: state.colleagues.filter(x => x.name !== 'JC')
    });

    const func = apply(state)('colleagues', cursor => cursor.filter(x => x.name !== 'JC'));
    const helper = apply(state)('colleagues', remove({ name: 'JC', age: 40 }));

    t.same(func, expected);
    t.same(helper, expected);

});

test('(object) Should be able to remove multiple objects from a list', t => {

    const expected = objectAssign({}, state, {
        colleagues: state.colleagues.filter(x => x.name !== 'JC' && x.age !== 42)
    });

    const func = apply(state)('colleagues', cursor => cursor.filter(x => !(x.name === 'JC' || x.age === 42)));
    const helper = apply(state)('colleagues', remove({ name: 'JC' }, { age: 42 }));

    t.same(func, expected);
    t.same(helper, expected);

});
