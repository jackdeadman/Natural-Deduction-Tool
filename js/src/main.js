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
    
    function Expressions(node, premises) {
        this.node = node;
        this.expressions = premises;
    }

    Expressions.prototype.render = function() {
        this.node.html = '';
        
        for (var i=0; i<expressions.length; i++) {
            var expression = expressions[i];
            this.node.html += '<li><p class="expression">'+  +'</p><p class="right-align type">Premise</p></li>';
            
            
            
        }
        
    }
    return Expressions;
    
})();



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