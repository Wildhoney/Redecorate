import objectAssign from 'object-assign';
import {reject} from 'lodash';

/**
 * @method apply
 * @param {Object} state
 * @return {Function}
 */
export function apply(state) {

    return (property, reducer) => {

        const parts = property.split('.');
        const first = parts[0];

        if (parts.length === 1) {

            return objectAssign({}, state, {
                [property]: reducer(state[property])
            });

        }

        return objectAssign({}, state, {
            [first]: apply(state[first])(parts.slice(1).join('.'), reducer)
        });

    };

}

/**
 * @method set
 * @param {*} x
 * @return {Function}
 */
export function set(x) {
    return () => x;
}

/**
 * @method assign
 * @param {Object} x
 * @return {Function}
 */
export function assign(x) {
    return cursor => ({ ...cursor, ...x });
}

/**
 * @method type
 * @param {*} x
 * @return {String}
 */
const type = x => {

    if (Array.isArray(x))      return 'array';
    if (typeof x === 'object') return 'object';
    return                     null;

};

/**
 * @method add
 * @param {*} x
 * @return {Function}
 * @todo: Support multiple properties for "object".
 */
export function add(...x) {

    return cursor => {

        switch (type(cursor)) {

            case 'array':
                return [ ...cursor, ...x ];

            case 'object':
                const combined = objectAssign({}, ...x);
                return { ...cursor, ...{ ...combined }};

            default:
                return cursor;

        }

    };

}

/**
 * @method remove
 * @param {*} x
 * @return {Function}
 */
export function remove(...x) {

    return cursor => {

        switch (type(cursor)) {

            case 'array':

                switch (type(x[0])) {

                    case 'object': return reject(cursor, x[0]);
                    default: return cursor.filter(item => !~x.indexOf(item));
                }

            default: return cursor;

        }

    };
}
