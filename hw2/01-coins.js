/** Exercise 01 - Coins **/

// Add your function here
const calculateChange = function calculateChange(amount) {
  if (amount > 100) {
    return 'Error: the number is too large';
  }
  if (amount === 0) {
    return 'No change';
  }

  let totalChange = '';

  let remainingAmount = Math.round(amount * 100);
  const dollars = Math.floor(remainingAmount / 100);
  remainingAmount -= dollars * 100;

  if (dollars > 0) {
    totalChange += `${dollars}`;
    if (dollars === 1) {
      totalChange += ' dollar, ';
    } else {
      totalChange += ' dollars, ';
    }
  }

  const quarters = Math.floor(remainingAmount / 25);
  remainingAmount -= quarters * 25;

  if (quarters > 0) {
    totalChange += `${quarters}`;
    if (quarters === 1) {
      totalChange += ' quarter, ';
    } else {
      totalChange += ' quarters, ';
    }
  }

  const dimes = Math.floor(remainingAmount / 10);
  remainingAmount -= dimes * 10;

  if (dimes > 0) {
    totalChange += `${dimes}`;
    if (dimes === 1) {
      totalChange += ' dime, ';
    } else {
      totalChange += ' dimes, ';
    }
  }

  const nickels = Math.floor(remainingAmount / 5);
  remainingAmount -= nickels * 5;

  if (nickels > 0) {
    totalChange += `${nickels}`;
    if (nickels === 1) {
      totalChange += ' nickel, ';
    } else {
      totalChange += ' nickels, ';
    }
  }

  const pennies = remainingAmount;

  if (pennies > 0) {
    totalChange += `${pennies}`;
    if (pennies === 1) {
      totalChange += ' penny';
    } else {
      totalChange += ' pennies';
    }
  }
  if (pennies === 0 && totalChange.endsWith(', ')) {
    totalChange = totalChange.slice(0, -2);
  }

  return totalChange;
};

// Sample test cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(150.11));
// $150.11 ==> Error: the number is too large

// Add additional test cases here
console.log(calculateChange(0.99));

console.log(calculateChange(0.35));
// $0.35 ==> 1 quarter, 1 dime --- checks rounding error issues, used to give 1 quarter, 1 nickel, 5 pennies
console.log(calculateChange(1.0));
// $1.00 ==> 1 dollar --- Had a trailing comma with how I was constructing the string
console.log(calculateChange(0.0));
// $0.00 ==> No change --- edge case, didn't want to output an empty string
