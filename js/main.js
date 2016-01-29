var InputBox = (function(){
    
    
    
    InputBox.prototype.show = function() {
        this.node.classList.remove('hidden');
        this.node.classList.remove('disabled');
    }
    
    InputBox.prototype.hide = function() {
        this.node.classList.add('hidden');
        this.node.classList.add('disabled');
        this.node.disabled = true;
        this.node.blur();
    }
    
    InputBox.prototype.disable = function() {
        this.node.classList.add('disabled');
        this.node.disabled = true;
        this.node.blur();
    }
    
    InputBox.prototype.enable = function(focus) {
        this.node.classList.remove('hidden');
        this.node.classList.remove('disabled');
        this.node.disabled = false;
        
        if (focus)
            this.node.focus();
    }
    
    InputBox.prototype.onSubmit = function(fn) {
        this.submitFn = fn;
    }
    
    
    function InputBox(node) {
        this.node = node;
        var that = this;
        
        this.node.addEventListener('keydown', function(e) {
            if (e.which == 13) {
                that.submitFn();
            }
        });
    }
    
    return InputBox;
    
    
})();

var Expressions = (function() {
    var template = '<li><p class="expression">{EXPRESSION}</p><p class="right-align type">{LAW}</p></li>';
    
    
    function Expressions(node) {
        this.node = node;
        this.expressions = [];
    }
    
    Expressions.prototype.addPremises = function(premises) {
        this.expressions = premises.map(function(exp) {
            return {
                expression: exp,
                law: 'Premise'
            }
        });
        console.log(this.expressions);
    };

    Expressions.prototype.render = function() {
        this.node.innerHTML = '';
        
        
        for (var i=0; i<this.expressions.length; i++) {
            var expression = this.expressions[i];
            this.node.innerHTML += template
                            .replace('{EXPRESSION}', expression.expression)
                            .replace('{LAW}', expression.law);
        }
        
    };
    
    return Expressions;
    
})();

var Box = (function() {
    function Box(node) {
        this.node = node;
    }
    
    Box.prototype.hide = function() {
        this.node.classList.add('hidden');
    };
    
    Box.prototype.show = function() {
        this.node.classList.remove('hidden');
    };
    
    return Box;
})();



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
    
    
    
    
    
})();