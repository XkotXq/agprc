export default function polishPlural(number, forms) {
  const n = Math.abs(number);

  if (n === 1) {
    return forms[0];
  }

  if (n % 10 >= 2 && n % 10 <= 4 && !(n % 100 >= 12 && n % 100 <= 14)) {
    return forms[1];
  }

  return forms[2];
}