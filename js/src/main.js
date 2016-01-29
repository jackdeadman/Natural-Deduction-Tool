(function(){
    
    var mainWrapper = document.getElementsByClassName('main-wrapper');
    var premiseInput = document.getElementById('premise-input');
    var conclusionInput = document.getElementById('conclusion-input');
    var expressions = document.getElementById('expressions');
    
    var premiseInputBox = new InputBox(premiseInput);
    var conclusionInputBox = new InputBox(conclusionInput);
    var expressionsBox = new Expressions(expressions, ['a','b']);
    
    conclusionInputBox.disable();
    
    premiseInputBox.onSubmit(function() {
        premiseInputBox.disable();
        conclusionInputBox.enable(true);
    });
    
    conclusionInputBox.onSubmit(function() {
        conclusionInputBox.disable();
        expressionsBox.render();
    });

})();