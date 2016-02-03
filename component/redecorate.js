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
 * @method conj
 * @param {*} x
 * @return {Function}
 */
export function conj(x) {

    return cursor => {

        if (Array.isArray(cursor)) {
            return Array.isArray(x) ? [ ...cursor, ...x ] : [ ...cursor, x ];
        }

        return { ...cursor, ...x };

    };

}
