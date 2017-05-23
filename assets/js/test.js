var foo = (function () {
    function foo() {
    }
    foo.prototype.setName = function (name) {
        this.lName = name;
    };
    return foo;
}());
var bar = new foo;
bar.setName('Bob');
console.log(foo);
var mehthefuck = (function () {
    function mehthefuck() {
    }
    return mehthefuck;
}());
