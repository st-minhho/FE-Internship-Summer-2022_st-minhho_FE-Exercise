// 3. Write a JavaScript function to count the occurrence of a substring in a string.
// Input: (string, substring)
// Output: the occurrence of a substring in a string
// Ex: ('The quick brown fox jumps over the lazy dog', 'the') => 2
// Ex: ('The quick brown fox jumps over the lazy dog', 'fox') => 1

 function countOcc(string, substring) {
   var new_str = string.toLowerCase().split(' ');
   var new_sub_str = substring.toLowerCase();
   //var result = {};
   var count = 0;

   if (new_str.includes(new_sub_str)) {
     for (i = 0; i < new_str.length; i++) {
       if (new_str[i] == new_sub_str) {
         //result.push(new_str[i]);
         count++;
       }
     }
   }
   return count;
 }
 console.log(countOcc('The quick brown fox jumps over the lazy dog', 'the'));