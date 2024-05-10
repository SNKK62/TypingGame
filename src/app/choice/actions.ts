import { createClient } from '@/utils/supabase/server';

export const revalidate = 0;

export const getGroups: (mode: number) => Promise<
  | {
      created_at: string;
      id: number;
      title: string;
      description: string;
      like: number;
      play: number;
    }[]
  | null
> = async (mode) => {
  const supabase = createClient();
  if (mode === 0) {
    const { data: groups } = await supabase.from('groups').select('*');
    return groups;
  } else if (mode === 1) {
    const { data: groups } = await supabase
      .from('groups')
      .select('*')
      .order('like', { ascending: false });
    return groups;
  } else if (mode === 2) {
    const { data: groups } = await supabase
      .from('groups')
      .select('*')
      .order('play', { ascending: false });
    return groups;
  } else return null;
};
