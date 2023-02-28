import { createProxyMiddleware } from "http-proxy-middleware"; 

module.exports = (app: any) => {
  app.use(
    createProxyMiddleware('/api',
      {
        target: "https://balance-app-api.onrender.com/api",
        changeOrigin: true
      }
    )
  )
}