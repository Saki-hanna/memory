class Utilities{

  /**
   * Shuffles array in place. ES6 version
   * @param a {Array} arrayItems items An array containing the items.
   * https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
   */
  static shuffle (a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

}

export default Utilities;