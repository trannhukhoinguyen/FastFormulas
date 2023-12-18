// This formula helps you calculate the reduced amounts of a bill with many product and each people buying different quantities of products.
// VERSION 1:
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
    reducedAmount1: reducedAmount1.toFixed(2),
    payment1: (amount1 - reducedAmount1).toFixed(2),
    reducedAmount2: reducedAmount2.toFixed(2),
    payment2: (amount2 - reducedAmount2).toFixed(2),
      //...    
  };
};

// VERSION 2:
const calculateReducedAmounts = (
  totalAfterReduce, // Total Money after reducing - type: Number
  totalBeforeReduce, // Total Money before reducing - type: Number (optional)
  reducedRelevants, // array of Related Number(s) for reducing - type: Array, includes [totalReducedAmount: total Reduced Amount - type: Number, discountPercent: percent of discount - type: Number (optional)]
  reducedAmounts, // array of Amount(s) for reducing - type: Array, includes [amount1: total Money of products 1 - type: Number, amount2: total Money of products 2 - type: Number (optional)]
) => {
  let allReducedAmounts = [];
  let allPayments = [];
  if(!['', null, undefined].includes(discountPercent)) {
    for(let i in reducedAmounts.length-1) {
      allReducedAmounts.push((discountPercent * reducedAmounts[i]).toFixed(2));
      allPayments.push((reducedAmounts[i] - discountPercent * reducedAmounts[i]).toFixed(2));
    }
  } else {
    let discountPercentTemp;
    if(!['', null, undefined].includes(totalBeforeReduce)) {
      discountPercentTemp = totalReducedAmount / totalBeforeReduce;
    } else {
      discountPercentTemp = totalReducedAmount / (totalReducedAmount + totalAfterReduce);
    }
    for(let i in reducedAmounts.length-1) {
      allReducedAmounts.push((discountPercentTemp * reducedAmounts[i]).toFixed(2));
      allPayments.push((reducedAmounts[i] - discountPercentTemp * reducedAmounts[i]).toFixed(2));
    }
  }
  return {    
    allReducedAmount: allReducedAmount,
    allPayment: allPayments,
  };
};
