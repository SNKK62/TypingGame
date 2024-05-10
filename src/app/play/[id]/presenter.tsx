import { Playing } from '@/components/play/playing';

interface Props {
  data:
    | {
        id: number;
        created_at: string;
        word: string;
        kana: string;
        group_id: number | null;
      }[]
    | null;
}

export const Presenter = ({ data }: Props) => {
  function splitData(
    data:
      | {
          id: number;
          created_at: string;
          word: string;
          kana: string;
          group_id: number | null;
        }[]
      | null,
  ): {
    wordArray: string[];
    kanaArray: string[];
  } {
    const wordArray: string[] = [];
    const kanaArray: string[] = [];
    if (data) {
      data.forEach((item) => {
        wordArray.push(item.word);
        kanaArray.push(item.kana);
      });
    }
    for (let i = 0; i < 4; i++) {
      wordArray.push('');
      kanaArray.push('-');
    }
    return { wordArray, kanaArray };
  }
  const { wordArray, kanaArray } = splitData(data);
  // console.log('ワード、かな');
  // console.log(wordArray);
  // console.log(kanaArray);
  return <Playing words={wordArray} kanas={kanaArray} background={'backgroundImage.png'} />;
};
