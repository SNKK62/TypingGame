import { L1KEY, L2KEY, L3KEY, KEY_AFTER_N } from './kana';

//
const construct_array = (japanese: string) => {
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

//
const make_goal = (array: string[]) => {
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

const compose = (japanese: string) => {
  let candidate = [''];
  for (let i = 0; i < japanese.length; i++) {
    const entry = L1KEY.find((e) => e.char === japanese[i]);
    if (entry) {
      const candidate2 = [];
      for (let j = 0; j < entry.keys.length; j++) {
        for (let k = 0; k < candidate.length; k++) {
          candidate2.push(candidate[k] + entry.keys[j]);
        }
      }
      candidate = candidate2;
    }
  }
  return candidate;
};
const compose12 = (japanese: string) => {
  let candidate = [];
  let entry = { char: '', keys: [''] };
  const singleMatched = L1KEY.find((e) => e.char === japanese[0]);
  if (singleMatched) {
    entry = singleMatched;
  }
  for (let j = 0; j < entry.keys.length; j++) {
    candidate.push(entry.keys[j]);
  }
  const doubleMatched = L2KEY.find((e) => e.char === japanese.slice(1, 3));
  if (doubleMatched) {
    entry = doubleMatched;
  }
  const candidate2 = [];
  for (let j = 0; j < entry.keys.length; j++) {
    for (let k = 0; k < candidate.length; k++) {
      candidate2.push(candidate[k] + entry.keys[j]);
    }
  }
  candidate = candidate2;
  return candidate;
};

const compose21 = (japanese: string) => {
  let candidate = [];
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
  candidate = candidate2;
  return candidate;
};

const make_all_pattern = (st: string, next: string | undefined) => {
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

export const loading = (e: string): [string[], string[], string[]] => {
  const japar = construct_array(e);
  return [
    japar,
    make_goal(japar) as string[],
    make_all_pattern(japar[0] as string, japar[1]),
  ];
};

export const judge = (
  e: string,
  japar: string[],
  count: number,
  entered: string,
  allPattern: string[],
  previous: string,
): [number, string | undefined, string[] | undefined, number | undefined] => {
  const newEntereed: string = entered + e;
  if (isPrefixOf(newEntereed, allPattern)) {
    if (allPattern.includes(newEntereed)) {
      if (count + 1 < japar.length) {
        const newAllPattern: string[] = make_all_pattern(
          japar[count + 1] as string,
          japar[count + 2],
        );
        const newcount: number = count + 1;
        return [1, newEntereed, newAllPattern, newcount];
      } else {
        return [2, newEntereed, undefined, undefined];
      }
    } else {
      const regislatedAllPattern = allPattern.filter((item) =>
        item.startsWith(newEntereed),
      );
      return [3, newEntereed, regislatedAllPattern, undefined];
    }
  } else if (
    previous === 'n' &&
    !entered &&
    japar[count - 1] === 'ん' &&
    e === 'n'
  ) {
    return [4, undefined, undefined, undefined];
  }
  return [0, undefined, undefined, undefined];
};
