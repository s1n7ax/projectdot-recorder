// IMPORTS
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// VAR
const mode = process.env.NODE_ENV;

// LOG
console.log('-------- Webpack Conf--------');
console.log(`mode :: ${mode}`);
console.log('-----------------------------');

const common = {
    entry: {
        background: './src/background/background.ts',
        content: './src/content/content.ts',
        popup: './src/popup/popup.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [new CopyWebpackPlugin([{ from: 'public' }])]
};

const development = {
    ...common,
    ...{
        mode,
        devtool: 'inline-source-map'
    }
};

const production = {
    ...common,
    ...{
        mode
    }
};

// CONF
const config = {
    development,
    production
};

module.exports = config[mode];
