function ValidatorController() {
    
    // Default pairs
    this.pairs = {
        "(": ")",
        "[": "]",
        "{": "}"
    }

    this.newOpen = "";
    this.newClose = "";
    this.validationMessage = "";
    this.stringToBalance = "";
    this.result="";
    this.colorCoded = [];

    this.addPair = function () {
        if (this.isValidPair()) {
            this.pairs[this.newOpen] = this.newClose;
            this.newOpen = "";
            this.newClose = "";
            this.validationMessage = ""; // Clear the validation
        }
        else {
            this.validationMessage = "The new open or close value already exists in the pairs."
        }
    }

    this.deletePair = function (key) {
        delete this.pairs[key];
    }

    this.isValidPair = function () {
        // A pair is valid if the opening character is not in the list of keys
        // and if the closing character is not in the list of values
        return !this.pairs.hasOwnProperty(this.newOpen) && !Object.values(this.pairs).includes(this.newClose);
    }

    this.checkBalance = function () {
        // Default the characters to be grey
        this.colorCoded = this.stringToBalance.split('').map(c => ({ character: c, color: 'grey' }));
        // Stack that stores the [characer, index] of characters that need to be closed
        // [0] -> character
        // [1] -> index of character in this.colorCoded
        let needsClosing = [];

        // We loop through the input text and match opening characters with closing characters
        // We are also updating the color value of the characters
        for (var i = 0; i < this.stringToBalance.length; i++) {
            // If an opening character is found, it is pushed onto the stack
            if (this.pairs.hasOwnProperty(this.stringToBalance[i])) {
                needsClosing.push([this.stringToBalance[i], i]);
            }
            // Else, if a closing character is found, we attempt to match to the corresponding 
            // opening character in the stack
            else if (Object.values(this.pairs).includes(this.stringToBalance[i])) {
                if (needsClosing.length === 0) {
                    this.colorCoded[i].color = 'red';
                    return false;
                }
                else {
                    let temp = needsClosing.pop();
                    if (this.pairs[temp[0]] != this.stringToBalance[i]) {
                        this.colorCoded[temp[1]].color = 'red';
                        this.colorCoded[i].color = 'red';
                        return false;
                    }
                    else {
                        this.colorCoded[temp[1]].color = 'green';
                        this.colorCoded[i].color = 'green';
                    }
                }
            }
            else {
                // For charcaters that aren't defined in pairs
                this.colorCoded[i].color = 'black';
            }
        }

        if (needsClosing.length !== 0) {
            // In the end, if the stack isn't empty, we update the color of the remaining items 
            needsClosing.forEach(x => this.colorCoded[x[1]].color = 'red');
            return false;
        }
        else {
            return true;
        }
    }

    this.validate = function () {
        this.result = this.checkBalance() ? "The text is balanced!" : "The text is not balanced :(";
    }
}

angular.module('areYouBalancedApp').component('validator', {
    templateUrl: 'validator/validator.template.html',
    controller: [
        ValidatorController
    ]
});