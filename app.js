var budgetController = (function() {
    
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0
    };

    return {
        addItem: function(type, desc, val){
           var newItem, ID;

           if(data.allItems[type].length > 0) {
              ID = data.allItems[type][data.allItems[type].length - 1].id + 1;    
           } else {
              ID = 0;
           }

           if(type === "exp") {
             newItem = new Expense(ID, desc, val);
           } else if (type === "inc") {
             newItem = new Income(ID, desc, val);
           }
        
           data.allItems[type].push(newItem);
           
           return newItem;
      
        },

        testing: function() {
            console.log(data);
        }
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

    var setupEventListeners = function() {
        var DOM = uICtrl.getDOMstrings();
    
        document.querySelector(DOM.inputBtn).addEventListener('click', controlAddItem);

        document.addEventListener('keypress', function(e){
             if(e.keyCode === 13 || e.which === 13){
                controlAddItem();
             }
        });
    }
    

    var controlAddItem = function(){

        var input, newItem;

        input = uICtrl.getInput();

        if (input.description != "" && !isNaN(input.value) && input.value > 0) {

          newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        }

        budgetCtrl.testing();

    }
    
   return {
       init: function(){
           console.log('App is running');
           setupEventListeners();
       }
   }

})(budgetController, uIController);


appController.init();