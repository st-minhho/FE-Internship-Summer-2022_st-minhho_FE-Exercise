// 7. Write a function to transform a string like example.
// Input: (string)
// Output: string
// Ex: ('intern FE') => 'Nretni EF'

function transformStr(string) {
  let str = '';
  let newStr = string.split(' ');
  newStr.map((char) => {
    let subStr = char.split('').reverse().join('');
    str += subStr.charAt(0).toUpperCase() + subStr.slice(1) + ' ';
  });
  return str;
}
console.log(transformStr('intern FE'));
