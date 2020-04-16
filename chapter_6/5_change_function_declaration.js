function circum(radius) {
  return circumference(radius);
}
function circumference(radius) {
  return 2 * Math.PI * radius;
}

class Book {
  addReservation(customer) {
    this._reservations.push(customer);
  }
}
