(function(){
    
    // alert("You are the 10 millionth visitor! You win a prize!");
    
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
    premiseInputBox.enable(true);
    
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
        var input = ruleInput.value.split(' ');
        var rule = input[0];
        var line = input[1];
        
        if (rule === 'nn') {
            console.log('here');
            console.log(expressionsBox.getLine(line));
            expressionsBox.addLine({
                expression: Rule.doubleNegationIntroduction(expressionsBox.getLine(line).expression),
                law: "Double Negation " + line
            }, true);
            this.clear();
        }
    };

})();