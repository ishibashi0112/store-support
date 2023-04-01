declare namespace NodeJS {
  // 環境変数名の定義
  interface ProcessEnv {
    readonly NEXT_PUBLIC_SUPABASE_URL: string;
    readonly NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    readonly SUPABASE_SERVICE_ROLE: string;
  }
}
