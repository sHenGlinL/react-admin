/// <reference types="vite/client" />
/** 类型声明文件里不要直接使用引入 import...from...
而是使用 import('') 这种语法 **/
interface ImportMetaEnv {
  readonly VITE_BASE_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
