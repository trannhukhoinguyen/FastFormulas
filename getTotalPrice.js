// This formula helps you calculate the total price from the given detailed prices (such as different ticket prices of adults and children...) 
// and given price policies (such as the coefficient between adult quantiy and ticket price decreasement for children)
const getTotalPrice = (
  sumAdult, // quantity of Adults - type: Number
  sumChild, // quantity of Children - type: Number
  priceAdult, // price of an Adult ticket - type: Number
  priceChild, // price of a Child ticket - type: Number 
  coefficient, // coefficient from the price policy - type: Number
) => {
 sumAdult * priceAdult 
  + [Math.abs(sumChild - Math.floor(sumAdult / coefficient)) + sumChild - Math.floor(sumAdult / coefficient)] * priceAdult / 2 
  + [sumChild + Math.floor(sumAdult / coefficient) - Math.abs(sumChild - Math.floor(sumAdult / coefficient))] * Math.ceil(sumChild / (sumChild + 1)) * priceChild / 2
}
