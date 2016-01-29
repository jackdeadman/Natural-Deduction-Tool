(function(){
    var mainWrapper = document.getElementsByClassName('main-wrapper');
    var premiseInput = document.getElementById('premise-input');
    var conclusionInput = document.getElementById('conclusion-input');
    var ruleInput = document.getElementById('rule-input');
    
    var expressions = document.getElementById('expressions');
    var expressionsContainer = document.getElementById('expression-input-container');
    
    
    var premiseInputBox = new InputBox(premiseInput);
    var conclusionInputBox = new InputBox(conclusionInput);
    var expressionsBox = new Expressions(expressions);
    var expressionsContainerBox = new Box(expressionsContainer);
    var ruleInputBox = new InputBox(ruleInput);
    
    
    conclusionInputBox.disable();
    expressionsContainerBox.hide();
    
    premiseInputBox.onSubmit(function() {
        premiseInputBox.disable();
        conclusionInputBox.enable(true);
    });
    
    conclusionInputBox.onSubmit(function() {
        conclusionInputBox.disable();
        expressionsBox.addPremises(premiseInput.value.split(','));
        expressionsBox.render();
        expressionsContainerBox.show();
        ruleInputBox.enable(true);
    });
    
    
    ruleInputBox.submitFn = function() {
        expressionsBox.addExpression(ruleInput.value, true);
        this.clear();
    };

})();