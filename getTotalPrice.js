const getTotalPrice = (Adult, child, priceAdult, priceChild) => {
  Adult * priceAdult 
  + [Math.abs(child - Math.floor(Adult / 2)) + child - Math.floor(Adult / 2)] * priceAdult / 2 
  + [child + Math.floor(Adult / 2) - Math.abs(child - Math.floor(Adult / 2))] * Math.ceil(child / (child + 1)) * priceChild / 2
}
