/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_PUBLIC_PATH?: string;
    readonly VITE_API_URL: string;
    readonly VITE_GOOGLE_MAPS_API_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
