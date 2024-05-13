import { createClient } from '@/utils/supabase/server';

export const revalidate = 0;

export const getGroups: () => Promise<
  | {
      created_at: string;
      id: number;
      title: string;
      description: string;
      like: number;
      play: number;
    }[]
  | null
> = async () => {
  const supabase = createClient();
  const { data: groups } = await supabase.from('groups').select('*');
  return groups;
};
