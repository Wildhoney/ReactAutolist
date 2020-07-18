import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import jsx from 'rollup-plugin-jsx';

module.exports = {
    input: 'src/index.js',
    external: ['react', 'prop-types'],
    output: [
        {
            file: 'dist/react-autolist.cjs.js',
            format: 'cjs',
            sourcemap: true,
            exports: 'named',
        },
        {
            file: 'dist/react-autolist.esm.js',
            format: 'esm',
            sourcemap: true,
            exports: 'named',
        },
    ],
    plugins: [
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true,
        }),
        jsx({ factory: 'React.createElement' }),
        terser(),
    ],
};
