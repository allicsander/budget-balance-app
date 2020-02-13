var budgetController = (function() {
     return {
         test: 0
     } 
})();


var uIController = (function() {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, 
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        getDOMstrings: function(){
            return DOMstrings;
        }
    };
   
})();


var appController = (function(budgetCtrl, uICtrl) {


    var DOM = uICtrl.getDOMstrings();

    var controlAddItem = function(){

        var input = uICtrl.getInput();
        console.log(input);
    }
    
    document.querySelector(DOM.inputBtn).addEventListener('click', controlAddItem);

    document.addEventListener('keypress', function(e){
         if(e.keyCode === 13 || e.which === 13){
            controlAddItem();
         }
    });

})(budgetController, uIController);


