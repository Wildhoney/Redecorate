import objectAssign from 'object-assign';

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
 * @param {*} value
 * @return {Function}
 */
export function set(value) {
    return () => value;
}

/**
 * @method assign
 * @param {Object} properties
 * @return {Function}
 */
export function assign(properties) {
    return cursor => ({ ...cursor, ...properties });
}

/**
 * @method push
 * @param {Array|*} items
 * @return {Function}
 */
export function push(items) {

    if (Array.isArray(items)) {
        return cursor => [ ...cursor, ...items ];
    }

    return cursor => [ ...cursor, items ];

}
