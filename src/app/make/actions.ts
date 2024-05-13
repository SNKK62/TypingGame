'use server';

import { DataOfWords } from '@/types/type';
// サーバー側の処理なので、サーバー側のSupabaseクライアントを使用
import { createClient } from '@/utils/supabase/server';

/**
 * データ挿入
 * @param formData - フォームデータ
 */
export const submitData = async (formData: FormData) => {
  // Supabaseクライアントを作成
  const supabase = await createClient();

  // フォームから入力値を取得
  const inputs = {
    groupTitle: formData.get('title') as string,
    groupDescription: formData.get('description') as string,
    wordData: formData.get('data') as string,
  };
  //   console.log('受け取ったstring' + inputs.wordData);
  const wordDataArray: DataOfWords = inputs.wordData ? JSON.parse(inputs.wordData) : [];
  //   console.log('受け取った配列' + JSON.stringify(wordDataArray, null, 2));
  const insertArray: DataOfWords = wordDataArray.filter((item) => item.isActive);
  //   console.log('処理をした配列' + JSON.stringify(insertArray, null, 2));
  //データ挿入;
  const { data, error } = await supabase
    .from('groups')
    .insert({ title: inputs.groupTitle, description: inputs.groupDescription })
    .select('*');
  // エラーが発生した場合
  if (error) return 1; //異常終了
  if (data && data[0]) {
    const insertedRowId = data[0].id;
    // console.log('グループIDを取得しました。:', insertedRowId);
    await Promise.all(
      insertArray.map(async (item) => {
        const { error } = await supabase
          .from('words')
          .insert({ group_id: insertedRowId, word: item.word, kana: item.kana });
        if (error) console.log(error.message);
      }),
    );
  }
  return 0; //正常終了
};
