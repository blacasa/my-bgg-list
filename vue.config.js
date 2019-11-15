module.exports = {
  assetsDir: "./",
  publicPath: process.env.NODE_ENV === "production" ? "/my-bgg-list/" : "/",
  pwa: {
    name: "My BGG List",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",

    // configure the workbox plugin
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: "./service-worker.js"
      // ...other Workbox options...
    }
  }
};
