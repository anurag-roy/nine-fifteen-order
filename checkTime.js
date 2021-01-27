'use strict';

// Current Time
const ct = new Date();
// Target Time
const tt = new Date(ct.getFullYear(), ct.getMonth(), ct.getDate(), 9, 15, 1);

let lookForOrder = true;

while (lookForOrder) {
  if (tt.getTime() === new Date().getTime()) {
    lookForOrder = false;
    console.log(true);
  }
}
