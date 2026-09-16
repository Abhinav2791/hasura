export interface Environment {
  production: boolean;
  supabaseUrl: string;
  supabaseKey: string;
}

export const environment: Environment = {
  production: true,
  supabaseUrl: 'https://ahtixjzwhlzgzjfvrcqh.supabase.co',
  supabaseKey: 'sb_publishable_5SWRIzeavnuJmkJM7CghVA_kj6qVYSe'
};
