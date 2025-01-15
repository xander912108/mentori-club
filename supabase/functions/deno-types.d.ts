declare namespace Deno {
  interface Env {
    get(key: string): string | undefined;
  }
  
  export const env: Env;
}

declare module "https://deno.land/std@0.177.0/http/server.ts" {
  export function serve(handler: (request: Request) => Response | Promise<Response>): void;
}

declare module "https://esm.sh/@supabase/supabase-js@2.38.0" {
  export interface User {
    id: string;
    email?: string;
    [key: string]: any;
  }

  export interface SupabaseClient {
    auth: {
      getUser(token?: string): Promise<{
        data: { user: User | null };
        error: Error | null;
      }>;
    };
  }

  export function createClient(
    supabaseUrl: string,
    supabaseKey: string,
    options?: any
  ): SupabaseClient;
} 