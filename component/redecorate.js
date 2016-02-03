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
                [property]: reducer(state)
            });

        }

        return objectAssign({}, state, {
            [first]: apply(state[first])(parts.slice(1).join('.'), reducer)
        });

    };

}
