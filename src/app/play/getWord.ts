import { createClient } from '@/utils/supabase/server';

export const revalidate = 0;

export const getWords: (
  searchId: number,
) => Promise<
  { id: number; created_at: string; word: string; kana: string; group_id: number | null }[] | null
> = async (searchId) => {
  const supabase = createClient();
  const { data: words, error } = await supabase.from('words').select('*').eq('group_id', searchId);
  console.log('データをフェッチしました');
  if (error) {
    console.log('データをフェッチできませんでした' + error.message);
    return null;
  }
  return words;
};
