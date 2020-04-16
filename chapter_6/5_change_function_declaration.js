function circum(radius) {
  return circumference(radius);
}
function circumference(radius) {
  return 2 * Math.PI * radius;
}

class Book {
  addReservation(customer) {
    this.zz_addReservation(customer);
  }
  zz_addReservation(customer) {
    this._reservations.push(customer);
  }
}
