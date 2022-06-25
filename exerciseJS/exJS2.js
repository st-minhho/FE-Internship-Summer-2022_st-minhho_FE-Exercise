// 2. Write a JavaScript function to repeat a string a specified times.
// Input: (string, repeat times)
// Output: the new string
// Ex: ("FE", 4) => 'FEFEFEFE'

function repeat(string, times) {
  let textRepeat = string.repeat(times)
  return textRepeat;
}
console.log(repeat('FE', 4));
