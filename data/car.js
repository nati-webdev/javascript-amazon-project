/*
class Car {
  model;
  brand;
  spead;
  istruckOpen;
  constructor(data){
   this.model = data.model;
   this.brand = data.brand;
   this.spead = data.spead;
   this.istruckOpen = data.istruckOpen;
  }

  displayInfo() {
    console.log( `${this.brand}, ${this.model} spead: ${this.spead} km/h ${this.istruckOpen}`);
  }
  go(){
    if(this.istruckOpen){
      this.spead = 0;
    }
    this.spead += 5;
    
    }
  brake() {
    this.spead -= 5;
  }
  openTrack() {
    if(this.spead !== 0){
      this.istruckOpen = false;
    }
    this.istruckOpen = true;
  }
  closeTrack() {
    this.istruckOpen = false;
  }
}
export const car = [{
  model: 'corolla', brand: 'toyota', spead: 0, istruckOpen: true
},{
  model: 'model 3', brand: 'tesla', spead: 0, istruckOpen: false
}].map((details) => {
  return new Car(details);
});
car.forEach((details) => {
  details.go();
  details.go();
  details.brake();
  details.go();
  details.go();
  details.go();
  details.go();
  details.go();
  details.brake();
  details.brake();
  details.brake();
  details.displayInfo();
});
class RaceCar extends Car {
  acceleration;
  go(){
    this.spead += this.acceleration;
  }
  openTrack(){
    this.istruckOpen = false;
  }
  constructor(data){
    super(data);
    this.acceleration = data.acceleration;
  }
  
}
const raceCar = new RaceCar({
  model: 'F1', brand: 'Mclaren', acceleration: 20
});
raceCar.go();
raceCar.brake();
raceCar.go();
raceCar.go();
raceCar.go();
raceCar.go();
raceCar.go();
raceCar.brake();
raceCar.brake();
raceCar.go();
raceCar.brake();
console.log(raceCar.displayInfo());
*/
