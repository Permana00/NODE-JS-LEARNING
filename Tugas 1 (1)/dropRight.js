function dropRight(arr, drop = 1) {
  const reverse = arr.reverse();
  const result = reverse.slice(drop);
  console.log(result.reverse());
}
dropRight([1, 2, 3]);
dropRight([1, 2, 3], 2);
dropRight([1, 2, 3], 5);
dropRight([1, 2, 3], 0);
