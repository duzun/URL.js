// rollup.config.js
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { module, main, unpkg } from './package.json';

export default {
    input: module,
    plugins: [
        babel() // convert to ES5
    ],
    output: [
        {
            file: main,
            name: 'URLJS',
            format: 'umd',
            sourcemap: true,
        },
        {
            file: unpkg,
            name: 'URLJS',
            format: 'umd',
            sourcemap: true,
            plugins: [
                terser(), // minify JS/ES
            ],
        },
    ]
};
