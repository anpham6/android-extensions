import { terser_options } from '../../squared/config/rollup-options';
import { version } from './package.json';

import { terser } from 'rollup-plugin-terser'

export default [
    {
        input: './build/widget/bottomnavigation/main.js',
        treeshake: false,
        output: {
            file: './dist/android.widget.bottomnavigation.min.js',
            name: 'android.widget.bottomnavigation',
            format: 'iife'
        },
        plugins: [
            terser(terser_options)
        ]
    },
    {
        input: './build/widget/coordinator/main.js',
        treeshake: false,
        output: {
            file: './dist/android.widget.coordinator.min.js',
            name: 'android.widget.coordinator',
            format: 'iife'
        },
        plugins: [
            terser(terser_options)
        ]
    },
    {
        input: './build/widget/drawer/main.js',
        treeshake: false,
        output: {
            file: './dist/android.widget.drawer.min.js',
            name: 'android.widget.drawer',
            format: 'iife'
        },
        plugins: [
            terser(terser_options)
        ]
    },
    {
        input: './build/widget/floatingactionbutton/main.js',
        treeshake: false,
        output: {
            file: './dist/android.widget.floatingactionbutton.min.js',
            name: 'android.widget.floatingactionbutton',
            format: 'iife'
        },
        plugins: [
            terser(terser_options)
        ]
    },
    {
        input: './build/widget/menu/main.js',
        treeshake: false,
        output: {
            file: './dist/android.widget.menu.min.js',
            name: 'android.widget.menu',
            format: 'iife'
        },
        plugins: [
            terser(terser_options)
        ]
    },
    {
        input: './build/widget/toolbar/main.js',
        treeshake: false,
        output: {
            file: './dist/android.widget.toolbar.min.js',
            name: 'android.widget.toolbar',
            format: 'iife'
        },
        plugins: [
            terser(terser_options)
        ]
    },
    {
        input: './build/widget/bottomnavigation/main.js',
        treeshake: false,
        output: {
            file: './dist/android.widget.bottomnavigation.js',
            name: 'android.widget.bottomnavigation',
            format: 'iife',
            banner: `/* android.widget.bottomnavigation ${version}\n   https://github.com/anpham6/squared */\n`
        },
        plugins: []
    },
    {
        input: './build/widget/coordinator/main.js',
        treeshake: false,
        output: {
            file: './dist/android.widget.coordinator.js',
            name: 'android.widget.coordinator',
            format: 'iife',
            banner: `/* android.widget.coordinator ${version}\n   https://github.com/anpham6/squared */\n`
        },
        plugins: []
    },
    {
        input: './build/widget/drawer/main.js',
        treeshake: false,
        output: {
            file: './dist/android.widget.drawer.js',
            name: 'android.widget.drawer',
            format: 'iife',
            banner: `/* android.widget.drawer ${version}\n   https://github.com/anpham6/squared */\n`
        },
        plugins: []
    },
    {
        input: './build/widget/floatingactionbutton/main.js',
        treeshake: false,
        output: {
            file: './dist/android.widget.floatingactionbutton.js',
            name: 'android.widget.floatingactionbutton',
            format: 'iife',
            banner: `/* android.widget.floatingactionbutton ${version}\n   https://github.com/anpham6/squared */\n`
        },
        plugins: []
    },
    {
        input: './build/widget/menu/main.js',
        treeshake: false,
        output: {
            file: './dist/android.widget.menu.js',
            name: 'android.widget.menu',
            format: 'iife',
            banner: `/* android.widget.menu ${version}\n   https://github.com/anpham6/squared */\n`
        },
        plugins: []
    },
    {
        input: './build/widget/toolbar/main.js',
        treeshake: false,
        output: {
            file: './dist/android.widget.toolbar.js',
            name: 'android.widget.toolbar',
            format: 'iife',
            banner: `/* android.widget.toolbar ${version}\n   https://github.com/anpham6/squared */\n`
        },
        plugins: []
    }
];