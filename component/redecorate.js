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
 * @method push
 * @param {Array} x
 * @return {Function}
 */
export function push(...x) {
    return cursor => [ ...cursor, ...x ];
}

/**
 * @method remove
 * @param {Array} x
 * @return {Function}
 */
export function remove(...x) {
    return cursor => cursor.filter(item => !~x.indexOf(item));
}
