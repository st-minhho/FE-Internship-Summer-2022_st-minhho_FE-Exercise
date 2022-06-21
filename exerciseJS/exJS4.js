// 4. Write a JavaScript function to truncate a string to a certain number of words.
// Input: (string, number)
// Output: new string
// Ex: ('The quick brown fox jumps over the lazy dog', 4) => 'The quick brown fox'

function truncateStr(string, number) {
  var str = string.split(' ');
  var newArr = str.splice(0, number);
  console.log(newArr.join(' '));
}
truncateStr('The quick brown fox jumps over the lazy dog', 4);
