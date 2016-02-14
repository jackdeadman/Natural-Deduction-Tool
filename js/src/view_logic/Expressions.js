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
    
    Expressions.prototype.addConclusion = function(statement) {
        this.conclusion = statement;
    }
    
    Expressions.prototype.addLine = function(line, render) {
        this.expressions.push(line);

        // Optimise rendering so no need to re-render all
        if (render)
            this.node.innerHTML += compileExp({
                expression: line.expression.toString(),
                law: line.law
            });
        
        if (Expression.equivalent(line.expression, this.conclusion)) {
            this.successfn();
        }
    }
    
    Expressions.prototype.onSuccess = function(fn) {
        this.successfn = fn;
    }
    
    Expressions.prototype.getLine = function(line) {
        return this.expressions[line-1]
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