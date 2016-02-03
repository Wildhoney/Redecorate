import test from 'ava';
import 'babel-core/register';
import {apply, set, assign, push, remove} from '../component/redecorate';

test('modifying a simple property', t => {

    const state = {
        name: { first: 'David', last: 'Bowie' },
        age: 69
    };

    const a = apply(state)('name.last', () => 'Butterfield');
    t.same(a, { name: { first: 'David', last: 'Butterfield' }, age: 69 });

    const b = apply(state)('name.last', set('Butterfield'));
    t.same(b, { name: { first: 'David', last: 'Butterfield' }, age: 69 });

});

test('modifying object and including additional properties in object', t => {

    const state = { type: 'cities', locations: { first: 'London' } };

    const a = apply(state)('locations', cursor => ({ ...cursor, ...{ first: 'Moscow', second: 'Rio de Janeiro' } }));
    t.same(a, { type: 'cities', locations: { first: 'Moscow', second: 'Rio de Janeiro' }});

    const b = apply(state)('locations', assign({ first: 'Moscow', second: 'Rio de Janeiro' }));
    t.same(b, { type: 'cities', locations: { first: 'Moscow', second: 'Rio de Janeiro' }});

});

test('modifying an array by adding additional items', t => {

    const state = { name: 'Adam', places: {
        visited: ['Barbados', 'Russia']
    }};

    const a = apply(state)('places.visited', cursor => [ ...cursor, 'Singapore' ]);
    t.same(a, { name: 'Adam', places: { visited: ['Barbados', 'Russia', 'Singapore'] } });

    const b = apply(state)('places.visited', push(['Argentina']));
    t.same(b, { name: 'Adam', places: { visited: ['Barbados', 'Russia', 'Argentina'] } });

    const c = apply(state)('places.visited', push('Argentina'));
    t.same(c, { name: 'Adam', places: { visited: ['Barbados', 'Russia', 'Argentina'] } });

    const d = apply(state)('places.visited', remove('Russia'));
    t.same(d, { name: 'Adam', places: { visited: ['Barbados'] } });

});
