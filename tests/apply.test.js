import test from 'ava';
import 'babel-core/register';
import {apply} from '../component/redecorate';

test('modifying a single property', t => {

    const state = {
        name: { first: 'David', last: 'Bowie' },
        age: 69
    };

    const transformed = apply(state)('name.last', () => 'Butterfield');
    t.same(transformed, { name: { first: 'David', last: 'Butterfield' }, age: 69 });

});

test('modifying a multiple properties', t => {

    const state = {
        name: { first: 'David', last: 'Bowie' },
        gender: 'male',
        age: 69
    };

    const firstTransformation = apply(state)('name.last', () => 'Butterfield');
    const secondTransformation = apply(firstTransformation)('name.first', () => 'Jeremy');
    const transformed = apply(secondTransformation)('gender', () => 'androgynous');

    t.same(transformed, { name: { first: 'Jeremy', last: 'Butterfield' }, gender: 'androgynous', age: 69 });

});