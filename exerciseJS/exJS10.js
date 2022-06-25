// 10. Write a function to find the new time after a specified time from the given time.
// Input: (givenTime string, period number(s))
// Output: newTime string
// Ex: ('12:30:29', 600) => '12:40:29'
// Ex: ('23:30:29', 6000) => '01:10:29'

function time(givenTime, period) {
  let getTime = givenTime.split(':');
  let [hours, minutes, seconds] = getTime;
  hours =  Math.floor((+hours + (period / 3600)) % 24) === 0 ? '01' : (hours < 10 ? '0' + hours : hours);
  minutes = Math.floor((period / 60 + +minutes) % 60) < 10 ? '0' + minutes : minutes;
  seconds = Math.floor(((period % 60) + +seconds) % 60) < 10 ? '0' + seconds : seconds;
  return `${hours}:${minutes}:${seconds}`;
}
console.log(time('23:30:29', 6000));
