var Expressions = (function() {
    var template = '<li><p class="expression">{EXPRESSION}</p><p class="right-align type">{LAW}</p></li>';
    
    function compileExp(exp) {
        return template.replace('{EXPRESSION}', exp.expression)
                       .replace('{LAW}', exp.law);
    }
    
    function Expressions(node) {
        this.node = node;
        this.expressions = [];
    }
    
    Expressions.prototype.addPremises = function(premises) {
        this.expressions = premises.map(function(exp) {
            return {
                expression: Parser.parse(exp),
                law: 'Premise'
            }
        });
    };
    
    Expressions.prototype.addExpression = function(exp, render) {
        this.expressions.push(Parser.parse(exp));
        // Optimise rendering so no need to re-render all
        if (render)
            this.node.innerHTML += compileExp({
                expression: Parser.parse(exp).toString(),
                law: exp
            });
        
    }

    Expressions.prototype.render = function() {
        this.node.innerHTML = '';
        
        
        for (var i=0; i<this.expressions.length; i++) {
            console.log(this.expressions);
            var expression = this.expressions[i];
            this.node.innerHTML += template
                            .replace('{EXPRESSION}', expression.expression.toString())
                            .replace('{LAW}', expression.law);
        }
        
    };
    
    return Expressions;
    
})();