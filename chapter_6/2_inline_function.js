function reportLines(aCustomer) {
  const lines = [];
  out.push(["name", aCustomer.name]);
  out.push(["location", aCustomer.location]);
  gatherCustomerData(lines, aCustomer);
  return lines;
}

function gatherCustomerData(out, aCustomer) {
}
