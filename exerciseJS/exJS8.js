// 8. Write a function that calculates the sum of the ordered elements that are divisible by a specified number in the array.
// Input: (array, number)
// Output: number
// Ex: ([1, 2, 3, 4, 5, 6, 7], 2) => 12
// Ex: ([1, 2, 3, 4, 5, 6, 7], 3) => 9

function calculates(array, number){
  let sum = 0;
  array.map((num)=>{
    if(num % number === 0){
      sum += num;
    }
  })
  return sum;
}
console.log(calculates([1, 2, 3, 4, 5, 6, 7], 3));
