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