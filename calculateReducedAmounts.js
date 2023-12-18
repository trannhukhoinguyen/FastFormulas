// This formula helps you calculate the reduced amounts of a bill with many product and each people buying different quantities of products.
const calculateReducedAmounts = (
  totalAfterReduce, // total Money after reducing - type: Number
  totalBeforeReduce, // total Money before reducingn - type: Number (optional)
  totalReducedAmount, // total Reduced Amount - type: Number
  discountPercent, // percent of discount - type: Number (optional)
  amount1, // quantity of products 1 - type: Number
  amount2, // quantity of products 2 - type: Number (optional)
  //...
) => {
  let reducedAmount1;
  let reducedAmount2;
  if(discountPercent) {
    reducedAmount1 = discountPercent * amount1;
    reducedAmount2 = discountPercent * amount2;
  } else {
    let discountPercentTemp;
    if(totalBeforeReduce) {
      discountPercentTemp = totalReducedAmount / totalBeforeReduce;
    } else {
      discountPercentTemp = totalReducedAmount / (totalReducedAmount + totalAfterReduce);
    }
    reducedAmount1 = discountPercentTemp * amount1;
    reducedAmount2 = discountPercentTemp * amount2;
  }
  return {    
      quantity1: reducedAmount1,
      quantity2: reducedAmount2,
      //...    
  };
}