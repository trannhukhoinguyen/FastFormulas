// This formula helps you calculate the total price from the given detailed prices (such as different ticket prices of adults and children...)
const getTotalPrice = (
  sumAdult, // quantity of Adults
  sumChild, // quantity of Children
  priceAdult, // price of an Adult ticket
  priceChild // price of a Child ticket
) => {
 sumAdult * priceAdult 
  + [Math.abs(sumChild - Math.floor(sumAdult / 2)) + sumChild - Math.floor(sumAdult / 2)] * priceAdult / 2 
  + [sumChild + Math.floor(sumAdult / 2) - Math.abs(sumChild - Math.floor(sumAdult / 2))] * Math.ceil(sumChild / (sumChild + 1)) * priceChild / 2
}
