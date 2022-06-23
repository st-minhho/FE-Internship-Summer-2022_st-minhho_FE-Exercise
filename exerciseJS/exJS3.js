// 3. Write a JavaScript function to count the occurrence of a substring in a string.
// Input: (string, substring)
// Output: the occurrence of a substring in a string
// Ex: ('The quick brown fox jumps over the lazy dog', 'the') => 2
// Ex: ('The quick brown fox jumps over the lazy dog', 'fox') => 1

 function countOcc(string, subString) {
   let newStr = string.toLowerCase();
   let newSubStr = subString.toLowerCase();
   let count = newStr.split(newSubStr).length - 1;
   return count;
 }
 console.log(countOcc('The quick brown fox jumps over the lazy dog', 'fox'));