// 5. Write a function to get a unique random array number in the specified range.
// Input: (array length, min, max)
// Output: new array
// Ex: (4, 1, 10) => [3, 6, 1, 9]

function randomArr(arrLength, min, max) {
  let arr = [];
  do {
    let number = Math.floor(Math.random() * (max + min));
    if (arr.indexOf(number) === -1) {
      arr.push(number);
    }
  } while (arr.length < arrLength);
  return arr;
}
console.log(randomArr(4, 1, 10));
