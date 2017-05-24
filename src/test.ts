class foo{

  fName : string;
  lName : string;
  age : string;

  public setName(name:string){
      this.lName = name;
  }



}

var bar = new foo;
bar.setName('Bob');
console.log(foo);