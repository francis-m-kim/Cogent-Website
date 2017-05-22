var foo = (function () {
    function foo() {
    }
    foo.prototype.setLastName = function (lName) {
        this.lastName = lName;
    };
    foo.prototype.setFirstName = function (fName) {
        this.firstName = fName;
    };
    foo.prototype.setAge = function (dob) {
        this.age = dob;
    };
    foo.prototype.setLocation = function (aLocation) {
        this.location = aLocation;
    };
    return foo;
}());
