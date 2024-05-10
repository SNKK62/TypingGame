import { createClient } from '@/utils/supabase/server';

export const revalidate = 0;

export const getWords: () => Promise<
  { id: number; created_at: string; word: string; kana: string; group_id: number | null }[] | null
> = async () => {
  const supabase = createClient();
  const { data: words, error } = await supabase.from('words').select('*');
  console.log('データをフェッチしました');
  if (error) return null;
  return words;
};
