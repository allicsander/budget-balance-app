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
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    };

    var formatNumber = function(num, type) {
        var numSplit, int, dec;
        
        num = Math.abs(num);
        num = num.toFixed(2);
        
        numSplit = num.split('.');
        
        int = numSplit[0];
        if(int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, int.length);
        }
        
        dec = numSplit[1];
        
        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
        
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, 
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        addListItem: function(obj, type) {
            var html, newHtml, element;
           
            if(type === 'inc') {
                element = DOMstrings.incomeContainer;
                
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if(type === 'exp') {
                element = DOMstrings.expensesContainer;
                
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
            
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function() {
            var fields, fieldsArr;
            
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            
            fieldsArr = Array.prototype.slice.call(fields);
            
            fieldsArr.forEach(function(current) {
                current.value = "";
            });
            
            fieldsArr[0].focus();
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

          uICtrl.addListItem(newItem, input.type);

          uICtrl.clearFields();

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