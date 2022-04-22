function ValidatorController() {
    this.pairs = {
        "(": ")",
        "[": "]",
        "{": "}"
    }

    this.newOpen = "";
    this.newClose = "";
    this.validationMessage = "";
    this.stringToBalance = "";
    this.result = "";

    this.addPair = function () {
        if (this.isValidPair()) {
            this.pairs[this.newOpen] = this.newClose;
            this.newOpen = "";
            this.newClose = "";
        }
        else {
            this.validationMessage = "The new open or close value already exists in the pairs."
        }
    }

    this.deletePair = function (key) {
        delete this.pairs[key];
    }

    this.isValidPair = function () {
        return !this.pairs.hasOwnProperty(this.newOpen) && !Object.values(this.pairs).includes(this.newClose);
    }

    var isBalanced = function (str, pairs) {

        let needsClosing = [];

        for (var i = 0; i < str.length; i++) {
            if (pairs.hasOwnProperty(str[i])) {
                needsClosing.push(str[i]);
            }
            else if (Object.values(pairs).includes(str[i])) {
                if (needsClosing.length === 0) {
                    return false;
                }
                else {
                    if (pairs[needsClosing.pop()] != str[i]) {
                        return false
                    }
                }
            }
        }

        return needsClosing.length === 0;
    }

    this.validate = function () {
        this.result = isBalanced(this.stringToBalance, this.pairs) ? "It is balanced!" : "It is not balanced";
    }
}

angular.module('areYouBalancedApp').component('validator', {
    templateUrl: 'validator/validator.template.html',
    controller: [
        ValidatorController]
});