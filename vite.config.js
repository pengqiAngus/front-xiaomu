import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path, { join } from "path";
import { __onlyVue3 } from "@vueuse/core";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[name]",
    }),
  ],
  //软链接
  resolve: {
    alias: {
      "@": join(__dirname, "/src"),
    },
  },
  //代理配置
  server: {
    proxy: {
      // 选项写法
      "/api": {
        target: "https://api.imooc-front.lgdsunday.club",
        //跨域
        changeOrigin: true,
      },
    },
  },
});
