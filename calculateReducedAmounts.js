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
  if(!['', null, undefined].includes(discountPercent)) {
    reducedAmount1 = discountPercent * amount1;
    reducedAmount2 = discountPercent * amount2;
  } else {
    let discountPercentTemp;
    if(!['', null, undefined].includes(totalBeforeReduce)) {
      discountPercentTemp = totalReducedAmount / totalBeforeReduce;
    } else {
      discountPercentTemp = totalReducedAmount / (totalReducedAmount + totalAfterReduce);
    }
    reducedAmount1 = discountPercentTemp * amount1;
    reducedAmount2 = discountPercentTemp * amount2;
  }
  return {    
    amount1: reducedAmount1.toFixed(2),
    payment1: (amount1 - reducedAmount1).toFixed(2),
    amount2: reducedAmount2.toFixed(2),
    payment2: (amount2 - reducedAmount2).toFixed(2),
      //...    
  };
};
