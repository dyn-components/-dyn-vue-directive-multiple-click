import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import DynComponents, { unpluginDynVueComponentsResolver, unpluginDynVueDirectivesResolver, unpluginDynVueHookResolver } from 'dyn-components'

// https://vitejs.dev/config/
export default defineConfig(async (params: ConfigEnv): Promise<UserConfig> => {
  const { command, mode } = params;
  const ENV = loadEnv(mode, process.cwd());
  console.log("node version", process.version);
  console.info(
    `running mode: ${mode}, command: ${command}, ENV: ${JSON.stringify(ENV)}`
  );
  return {
    plugins: [
      vue(),
      vueJsx(),
      DynComponents(),
      AutoImport({
        resolvers: [unpluginDynVueHookResolver()]
      }),
      Components({
        resolvers: [unpluginDynVueComponentsResolver(), unpluginDynVueDirectivesResolver()],
      }),
      vueDevTools()
    ],
    define: {
      '__DEV__': mode === 'development', // 自定义开发模式标识
      '__PROD__': mode === 'production', // 自定义生产模式标识
    },
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    base: "./",
    build: {
      outDir: "dist/example",
      emptyOutDir: true,
      sourcemap: mode === "development",
      minify: mode !== "development",
    },
  }
})
