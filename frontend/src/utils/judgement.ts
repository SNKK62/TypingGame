import { L1KEY, L2KEY, L3KEY, KEY_AFTER_N } from './kana';

//平仮名のstringを引数にとり、音節に分けた平仮名のlistを返す
const constructArray = (japanese: string): string[] => {
  let i = 0;
  const array = [];
  while (i < japanese.length) {
    const e = L3KEY.find((_) => _.char === japanese.slice(i, i + 3));
    if (e) {
      array.push(e.char);
      i += 3;
    } else {
      const f = L2KEY.find((_) => _.char === japanese.slice(i, i + 2));
      if (f) {
        array.push(f.char);
        i += 2;
      } else {
        const g = L1KEY.find((_) => _.char === japanese[i]);
        if (g) {
          array.push(g.char);
          i++;
        }
      }
    }
  }
  return array;
};

//音節分けされた平仮名listを引数にとり、個々の音節に対してお手本のキーを含むlistを返す
const makeGoal = (array: string[]): string[] => {
  const answer = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].length === 1) {
      if (array[i] === 'ん') {
        if (array[i + 1]) {
          if (KEY_AFTER_N.includes(array[i + 1])) {
            answer.push('nn');
          } else {
            answer.push('n');
          }
        } else {
          answer.push('nn');
        }
      } else {
        const e = L1KEY.find((_) => _.char === array[i]);
        if (e) {
          answer.push(e.keys[0]);
        }
      }
    } else if (array[i].length === 2) {
      const e = L2KEY.find((_) => _.char === array[i]);
      if (e) {
        answer.push(e.keys[0]);
      }
    } else {
      const e = L3KEY.find((_) => _.char === array[i]);
      if (e) {
        answer.push(e.keys[0]);
      }
    }
  }
  return answer;
};

//音節の1要素を引数にとり、平仮名1文字ずつについて入力パターンを全て網羅するキー入力パターンlistを返す。
const compose = (japanese: string): string[] => {
  let candidate = [''];
  for (let i = 0; i < japanese.length; i++) {
    const entry = L1KEY.find((e) => e.char === japanese[i]);
    if (entry) {
      const candidate2 = [];
      for (let j = 0; j < entry.keys.length; j++) {
        for (let k = 0; k < candidate.length; k++) {
          candidate2.push((candidate[k] as string) + entry.keys[j]);
        }
      }
      candidate = candidate2;
    }
  }
  return candidate;
};
//平仮名3文字で1音節を構成する要素を引数にとり、平仮名1文字＋平仮名2文字に分けて入力パターンを全て網羅するキー入力パターンlistを返す。
const compose12 = (japanese: string): string[] => {
  const candidate: string[] = [];
  let entry = { char: '', keys: [''] };
  const singleMatched = L1KEY.find((e) => e.char === japanese[0]);
  if (singleMatched) {
    entry = singleMatched;
  }
  // for (let j = 0; j < entry.keys.length; j++) {
  //   candidate.push(entry.keys[j]);
  // }
  entry.keys.forEach((key) => candidate.push(key));
  const doubleMatched = L2KEY.find((e) => e.char === japanese.slice(1, 3));
  if (doubleMatched) {
    entry = doubleMatched;
  }
  const candidate2: string[] = [];
  // for (let j = 0; j < entry.keys.length; j++) {
  //   for (let k = 0; k < candidate.length; k++) {
  //     candidate2.push(candidate[k] + entry.keys[j]);
  //   }
  // }
  entry.keys.forEach((key) => {
    candidate.forEach((can) => {
      candidate2.push(can + key);
    });
  });

  // candidate = candidate2;
  return candidate2;
};

//平仮名3文字で1音節を構成する要素を引数にとり、平仮名2文字＋平仮名1文字に分けて入力パターンを全て網羅するキー入力パターンlistを返す。
const compose21 = (japanese: string): string[] => {
  const candidate = [];
  let entry = { char: '', keys: [''] };
  const doubleMatched = L2KEY.find((e) => e.char === japanese.slice(0, 2));
  if (doubleMatched) {
    entry = doubleMatched;
  }
  for (let j = 0; j < entry.keys.length; j++) {
    candidate.push(entry.keys[j]);
  }
  const singleMatched = L1KEY.find((e) => e.char === japanese[2]);
  if (singleMatched) {
    entry = singleMatched;
  }
  const candidate2 = [];
  for (let j = 0; j < entry.keys.length; j++) {
    for (let k = 0; k < candidate.length; k++) {
      candidate2.push(candidate[k] + entry.keys[j]);
    }
  }
  // candidate = candidate2;
  return candidate2;
};

//音節の1要素を引数にとり、音節の入力パターンを全て網羅したキー入力パターンを返す。
const makeAllPattern = (st: string, next: string | undefined): string[] => {
  let pattern: string[] = [];
  if (st.length === 1) {
    if (st === 'ん') {
      if (next) {
        if (KEY_AFTER_N.includes(next)) {
          pattern = pattern.concat(['nn', 'xn']);
        } else {
          pattern = pattern.concat(['n', 'nn', 'xn']);
        }
      } else {
        pattern = pattern.concat(['nn', 'xn']);
      }
    } else {
      const e = L1KEY.find((_) => _.char === st);
      if (e) {
        pattern = pattern.concat(e.keys);
      }
    }
  } else if (st.length === 2) {
    const e = L2KEY.find((_) => _.char === st);
    if (e) {
      pattern = pattern.concat(e.keys);
    }
    pattern = pattern.concat(compose(st));
  } else {
    const e = L3KEY.find((_) => _.char === st);
    if (e) {
      pattern = pattern.concat(e.keys);
    }
    pattern = pattern.concat(compose21(st));
    pattern = pattern.concat(compose12(st));
    pattern = pattern.concat(compose(st));
  }
  return pattern;
};

const isPrefixOf = (prefix: string, arr: string[]): boolean => {
  return arr.some((item) => item.startsWith(prefix));
};

//新規単語が読み込まれた際に、平仮名stringを引数にとり、音節分けされた平仮名list,お手本キーlist,最初の音節の入力全パターンlistを返す。
export const loading = (e: string): [string[], string[], string[]] => {
  const japar = constructArray(e);
  return [
    japar,
    makeGoal(japar) as string[],
    makeAllPattern(japar[0] as string, japar[1]),
  ];
};

//平仮名stringを引数にとり、お手本のキーlistのみを返す。未来のword用
export const loadGoal = (e: string): string[] => {
  return makeGoal(constructArray(e));
};

export const JUDGE_TYPE = {
  endOfSyllable: 1, //音節の終了かつwordの途中
  endOfWord: 2, //音節の終了かつwordの終了
  midOfSyllable: 3, //音節の途中
  correctN: 4, //省略可能なn
  wrong: 0, //不正解
};

//キーが入力された場合に現在の諸状況を引数にとり、正誤判定を行う。次のstate処理に必要な情報を適宜返す。
export const judge = (
  e: string,
  japar: string[],
  count: number,
  entered: string,
  allPattern: string[],
  previous: string,
): [number, string, string[], number] => {
  const newEntered: string = entered + e;
  if (isPrefixOf(newEntered, allPattern)) {
    //入力されたキーが正解の場合
    if (allPattern.includes(newEntered)) {
      //音節の入力が終了した場合
      if (count + 1 < japar.length) {
        //終了した音節がwordの最後では無い場合
        const newAllPattern: string[] = makeAllPattern(
          japar[count + 1] as string,
          japar[count + 2],
        );
        const newcount: number = count + 1;
        return [JUDGE_TYPE.endOfSyllable, newEntered, newAllPattern, newcount];
      } else {
        //終了した音節がwordの最後だった場合
        return [JUDGE_TYPE.endOfWord, newEntered, [], 0];
      }
    } else {
      //音節の途中だった場合
      const regislatedAllPattern = allPattern.filter((item) =>
        item.startsWith(newEntered),
      );
      return [JUDGE_TYPE.midOfSyllable, newEntered, regislatedAllPattern, 0];
    }
  } else if (
    previous === 'n' &&
    !entered &&
    japar[count - 1] === 'ん' &&
    e === 'n'
  ) {
    //一個前の音節が「ん」であり、その直後に省略可能なnを入力した場合
    return [JUDGE_TYPE.correctN, '', [], 0];
  }
  //不正解だった場合
  return [JUDGE_TYPE.wrong, '', [], 0];
};
