/*
 * RemCalc is a function for converting pixels to rem-unit.
 *
 * The rem-unit should be used for all measurements that should be
 * related to the users settings of font-size.
 * Rule of thumb: will the design break if the user bumbs up the
 * font-size 200%? Then use rem.
 */
export const remCalc = function(size) {
  return size / 16 + "rem";
};
