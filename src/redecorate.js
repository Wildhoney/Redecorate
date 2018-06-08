import { matches } from 'lodash';

export function apply(state) {

    return (property, reducer) => {

        const parts = property.split('.');
        const first = parts[0];

        if (parts.length === 1) {
            return { ...state, [property]: reducer(state[property]) };
        }

        return { ...state, [first]: apply(state[first])(parts.slice(1).join('.'), reducer) };

    };

}

export function set(x) {
    return () => x;
}

const type = x => {

    if (Array.isArray(x)) {
        return 'array';
    }

    if (typeof x === 'object') {
        return 'object';
    }

    return null;

};

export function add(...x) {

    return cursor => {

        switch (type(cursor)) {

            case 'array':
                return [ ...cursor, ...x ];

            case 'object': {
                let combined = {};
                x.map(value => combined = { ...combined, ...value });
                return { ...cursor, ...combined };
            }
            default:
                return cursor;

        }

    };

}

export function remove(...x) {

    return cursor => {

        switch (type(cursor)) {

            case 'array':
                switch (type(x)) {

                    case 'array':
                        return cursor.filter(current => {
                            return !x.filter(matcher => matches(matcher)(current)).length;
                        });

                    default:
                        return cursor.filter(item => !~x.indexOf(item));

                }

            default:
                return cursor;

        }

    };
}
