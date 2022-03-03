function mean(arr) {
  let sum = arr.reduce((a, b) => {
    return a + b;
  }, 0);
  var avg = total / jumlah.length;

  console.log(avg.toPrecision(3));
}
mean([1, 0, 4, 5, 2, 4, 1, 2, 3, 3, 3]);
mean([2, 3, 2, 3]);
mean([3, 3, 3, 3, 3]);
