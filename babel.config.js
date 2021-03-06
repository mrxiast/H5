const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
let transformRemoveConsolePlugin = []
if (IS_PROD) {
  transformRemoveConsolePlugin = ['transform-remove-console']
}
module.exports = {
  //添加ie兼容
  // presets: [["@vue/cli-plugin-babel/preset", {useBuiltIns: 'usage', corejs: 3}]],
  presets: [["@vue/cli-plugin-babel/preset", { useBuiltIns: 'usage', corejs: 3 }]],

  plugins: [
    [
      "import",
      { libraryName: "vant", libraryDirectory: "es", style: true },
      "vant"
    ],
    ...transformRemoveConsolePlugin
  ]
};
