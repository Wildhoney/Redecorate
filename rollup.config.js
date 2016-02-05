import babel from 'rollup-plugin-babel';

export default {
    entry: 'src/redecorate.js',
    format: 'cjs',
    plugins: [babel()],
    dest: 'dist/redecorate.js'
};
