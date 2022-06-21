// 2. Write a JavaScript function to repeat a string a specified times.
// Input: (string, repeat times)
// Output: the new string
// Ex: ("FE", 4) => 'FEFEFEFE'

function repeat(string, times) {
  var a = '';
  for (i = 0; i < times; i++) {
    a += string;
  }
  return a;
}
console.log(repeat('FE', 10000));
