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