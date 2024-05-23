const CracoLessPlugin = require("craco-less");
const CracoAlias = require("craco-alias");
const path = require("path");
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@arcoblue-6": "#1890ff",
              "@button-default-text-color": "#1890ff",
              "@cell-label-color" : "#86909c",
              "@cell-text-color":"black"
            }, // 可以在这里定义全局变量
            javascriptEnabled: true,
          },
        },
      },
    },
    {
      plugin: CracoAlias,
      options: {
        // source: "jsconfig",
        baseUrl: "./src",
        aliases: {
          "@": path.resolve(__dirname, "src"),
          // 其他别名...
        },
      },
    },
  ],
  webpack: {
    alias: {},
    plugins: [],
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: "svg-react-loader",
            options: {
              svgo: {
                plugins: [{ removeTitle: false }],
                floatPrecision: 2,
              },
            },
          },
        ],
      });

      return webpackConfig;
    },
  },
};
