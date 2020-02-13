var budgetController = (function() {
      
})();


var uIController = (function() {
       
})();


var appController = (function(budgetCtrl, uICtrl) {

    var controlAddItem = function(){
        console.log('controlAddItem function is called'); 
    }
    
    document.querySelector('.add__btn').addEventListener('click', controlAddItem);

    document.addEventListener('keypress', function(e){
         if(e.keyCode === 13 || e.which === 13){
            controlAddItem();
         }
    });

})((budgetController, uIController));


