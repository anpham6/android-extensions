import { terser_options } from '../../squared/config/rollup-options';
import { terser } from 'rollup-plugin-terser'

export default [
    {
        input: './build/constraint/guideline/main.js',
        treeshake: false,
        output: {
            file: './dist/android.constraint.guideline.min.js',
            name: 'android.constraint.guideline',
            format: 'iife'
        },
        plugins: [
            terser(terser_options)
        ]
    },
    {
        input: './build/constraint/guideline/main.js',
        treeshake: false,
        output: {
            file: './dist/android.constraint.guideline.js',
            name: 'android.constraint.guideline',
            format: 'iife',
            banner: `/* android.constraint.guideline\n   https://github.com/anpham6/squared */\n`
        },
        plugins: []
    }
];