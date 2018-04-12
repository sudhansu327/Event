"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("../../reactive-extensions");
//Grab everything with import 'rxjs/Rx';
var Observable_1 = require("rxjs/Observable");
var CustomerService = (function () {
    function CustomerService(http) {
        this.http = http;
        this.customersBaseUrl = 'api/customers';
        this.ordersBaseUrl = 'api/orders';
        this.tagsBaseUrl = 'api/tags';
    }
    CustomerService.prototype.getTags = function () {
        return this.http.get(this.tagsBaseUrl)
            .map(function (res) {
            var tags = res.json();
            return tags;
        })
            .catch(this.handleError);
    };
    CustomerService.prototype.getCustomers = function () {
        var _this = this;
        return this.http.get(this.customersBaseUrl)
            .map(function (res) {
            var customers = res.json();
            _this.calculateCustomersOrderTotal(customers);
            return customers;
        })
            .catch(this.handleError);
    };
    CustomerService.prototype.getCustomer = function (id) {
        var _this = this;
        return this.http.get(this.customersBaseUrl + '/' + id)
            .map(function (res) {
            var customer = res.json();
            _this.calculateCustomersOrderTotal([customer]);
            return customer;
        })
            .catch(this.handleError);
    };
    CustomerService.prototype.insertCustomer = function (customer) {
        return this.http.post(this.customersBaseUrl, customer)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    CustomerService.prototype.updateCustomer = function (customer) {
        return this.http.put(this.customersBaseUrl + '/' + customer.ID, customer)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    CustomerService.prototype.deleteCustomer = function (id) {
        return this.http.delete(this.customersBaseUrl + '/' + id)
            .map(function (res) { return res.json().status; })
            .catch(this.handleError);
    };
    CustomerService.prototype.getStates = function () {
        return this.http.get('api/states')
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    CustomerService.prototype.handleError = function (error) {
        console.error('server error:', error);
        if (error instanceof http_1.Response) {
            var errMessage = '';
            try {
                errMessage = error.json().error;
            }
            catch (err) {
                errMessage = error.statusText;
            }
            return Observable_1.Observable.throw(errMessage);
        }
        return Observable_1.Observable.throw(error || 'server error');
    };
    //Not using now but leaving since they show how to create
    //and work with custom observables
    CustomerService.prototype.createObservable = function (data) {
        return Observable_1.Observable.create(function (observer) {
            observer.next(data);
            observer.complete();
        });
    };
    CustomerService.prototype.calculateCustomersOrderTotal = function (customers) {
        for (var _i = 0, customers_1 = customers; _i < customers_1.length; _i++) {
            var customer = customers_1[_i];
            if (customer && customer.Orders) {
                var total = 0;
                for (var _a = 0, _b = customer.Orders; _a < _b.length; _a++) {
                    var order = _b[_a];
                    total += order.ItemCost;
                }
                customer.OrderTotal = total;
            }
        }
    };
    return CustomerService;
}());
CustomerService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CustomerService);
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map