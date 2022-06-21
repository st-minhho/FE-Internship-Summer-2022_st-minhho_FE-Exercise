// 5. Write a function to get a unique random array number in the specified range.
// Input: (array length, min, max)
// Output: new array
// Ex: (4, 1, 10) => [3, 6, 1, 9]

function randomArr(arrLength, min, max) {
  var arr = [];
  for(var i = 0; i<arrLength; i++){
    var num = Math.floor(Math.random() * (max + min)) ;
    arr.push(num);
  }
  return arr;
}
console.log(randomArr(4, 1, 10));

