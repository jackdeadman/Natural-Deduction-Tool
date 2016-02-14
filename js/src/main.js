(function(){
    
    var mainWrapper = document.getElementsByClassName('main-wrapper');
    var premiseInput = document.getElementById('premise-input');
    var conclusionInput = document.getElementById('conclusion-input');
    var ruleInput = document.getElementById('rule-input');
    var editButton = document.getElementById('premise-edit-button');
    
    var expressions = document.getElementById('expressions');
    var expressionsContainer = document.getElementById('expression-input-container');
    
    
    var premiseInputBox = new InputBox(premiseInput);
    var conclusionInputBox = new InputBox(conclusionInput);
    var expressionsBox = new Expressions(expressions);
    var expressionsContainerBox = new Box(expressionsContainer);
    var ruleInputBox = new InputBox(ruleInput);
    var editButtonBox = new Button(editButton);
    
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
        expressionsBox.addConclusion(Parser.parse(conclusionInputBox.value()));
        expressionsBox.render();
        expressionsContainerBox.show();
        ruleInputBox.enable(true);
        editButtonBox.set('Reset');
    });
    
    editButtonBox.onClick(function(){
        if(!conclusionInputBox.isDisabled()){
            premiseInputBox.enable(true);
            conclusionInputBox.disable();
        }else{
            premiseInputBox.clear();
            conclusionInputBox.clear();
            expressionsContainerBox.hide();
            premiseInputBox.enable(true);
            editButtonBox.set('Edit');
        }
        editButtonBox.hide();
    });
    
    expressionsBox.onSuccess(function() {
        alert('Woo');
    });
    
    ruleInputBox.submitFn = function() {
        var input = ruleInput.value.split(' ');
        var rule = input[0];
        var line1 = input[1];
        var line2 = input[2];
        
        switch(rule) {
        case 'nni':
            expressionsBox.addLine({
                expression: Rule.doubleNegationIntroduction(expressionsBox.getLine(line1).expression),
                law: "Double Negation Introduction " + line1
            }, true);
            break;
        
        case 'nne':
            expressionsBox.addLine({
                expression: Rule.doubleNegationElimination(expressionsBox.getLine(line1).expression),
                law: "Double Negation Elimination " + line1
            }, true);
            break;
        
        case 'coni':
            expressionsBox.addLine({
                expression: Rule.conjunctionIntroduction(expressionsBox.getLine(line1).expression, expressionsBox.getLine(line2).expression),
                law: "Conjuction Introduction " + line1 + ", " + line2
            }, true);
            break;
        
        case 'cone1':
            expressionsBox.addLine({
                expression: Rule.conjunctionElimination1(expressionsBox.getLine(line1).expression),
                law: "Conjuction Elimination1 " + line1
            }, true);
            break;
            
        case 'cone2':
            expressionsBox.addLine({
                expression: Rule.conjunctionElimination2(expressionsBox.getLine(line1).expression),
                law: "Conjuction Elimination2 " + line1
            }, true);
            break;
            
        case 'disi':
            expressionsBox.addLine({
                expression: Rule.disjunctionIntroduction(expressionsBox.getLine(line1).expression, expressionsBox.getLine(line2).expression),
                law: "Disjuction Introduction " + line1 + ", " + line2
            }, true);
            break;
            
        case 'impe':
            expressionsBox.addLine({
                expression: Rule.implicationElimination(expressionsBox.getLine(line1).expression, expressionsBox.getLine(line2).expression),
                law: "Implication elimination " + line1 + ", " + line2
            }, true);
            break;
            
        case 'dm':
            expressionsBox.addLine({
                expression: Rule.deMorgans(expressionsBox.getLine(line1).expression),
                law: "De Morgans law " + line1
            }, true);
        }
        this.clear();
    };

})();
