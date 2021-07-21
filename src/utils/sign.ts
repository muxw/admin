import md5 from 'md5';

export function getSign(params) {
  let arr: string[] = [];
  let str = '';
  for (let i in params) {
    if (i === 'sn') {
      continue;
    }
    arr.push(i);
  }
  arr.sort();
  arr.forEach((item) => {
    str += params[item];
  });
  let newStr = encodeURIComponent(str).replace('%20', '+');
  return md5(encodeURIComponent(newStr));
}
