'use strict';


var Response = function () {

}


Response.prototype.status = function (status) {
    this.status = status;
}
Response.prototype.message = function (message) {
    this.message = message;
}
Response.prototype.data = function (data) {
    this.data = data;
}
Response.prototype.success = "Success";
Response.prototype.failure = "Failure";





module.exports = Response;