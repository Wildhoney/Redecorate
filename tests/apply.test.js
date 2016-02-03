import test from 'ava';
import 'babel-core/register';
import {apply} from '../component/redecorate';

test('modifying a simple property', t => {

    const state = {
        name: { first: 'David', last: 'Bowie' },
        age: 69
    };

    const transformed = apply(state)('name.last', () => 'Butterfield');
    t.same(transformed, { name: { first: 'David', last: 'Butterfield' }, age: 69 });

});
