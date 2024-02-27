const PROXY_CONFIG = [
  {
    context: [
      //"/weatherforecast",
      "/api/books"
    ],
    target: "https://localhost:7054",
    secure: false,
    changeOrigin: true
  }
]

module.exports = PROXY_CONFIG;
 