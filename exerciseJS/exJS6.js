// 6. Write a function to generate a random hexa color code.
// Input: ()
// Output: string
// Ex: () => #1a7b9d

function colorCode() {
  let color = "#";
  let string = "0123456789abcdef";
  do {
    color += string[Math.floor(Math.random() * string.length)];
  } while (color.length < 7);
  return color;
}
console.log(colorCode());
