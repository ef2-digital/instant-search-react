import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import del from 'rollup-plugin-delete';
import { babel } from '@rollup/plugin-babel';
import dts from 'rollup-plugin-dts';
import packageJson from './package.json' assert { type: 'json' };
import renameNodeModules from "rollup-plugin-rename-node-modules";

const EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx'];

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true
            },
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true
            }
        ],
        external: Object.keys(packageJson.dependencies),
        plugins: [
            renameNodeModules("ext", false),
            // Delete lib folder.
            del({ targets: 'dist/*' }),


            // This plugin avoids us from bundling the peerDependencies. (React)
            peerDepsExternal(),

            // This plugin includes the third-party external dependencies into our final bundle.
            nodeResolve({ extensions: EXTENSIONS }),

            // TODO description
            commonjs(),

            // Three shaking for React.
            babel({
                // babelHelpers: 'runtime',
                // extensions: EXTENSIONS,
                exclude: /node_modules/
            }),

            // Generate (!only) type declaration files.
            typescript({
                tsconfig: 'tsconfig.json'
            })
        ]
    },
    // {
    //     input: 'lib/types/index.d.ts',
    //     output: [{ file: 'lib/index.d.ts', format: 'esm' }],
    //     plugins: [dts()]
    // }
];
