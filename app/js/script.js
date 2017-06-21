var s = 456;
var a = [1,2,3];
console.log('script');

() => {
  s = 190;
}

function teste () {
  s = 789;
}

a.forEach(element => {
  var el = element;
});