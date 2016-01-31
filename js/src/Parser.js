var Parser = (function(){
        
    function Expression(){
        //either a value (like a word, terminal etc), or an operator in a larger expression
        this.value = arguments[0];
        this.left = this.right = null;
        
        if(arguments.length === 2){
            //unary expression, operator already set so right is single value
            this.right = arguments[1];
        }else if(arguments.length === 3){
            //binary expression, operator comes first (already set), followed by two operands (left, right)
            this.left = arguments[1];
            this.right = arguments[2];
        }
    }
    
    function preprocess(input){
         var symbolsRegx = Operator.symbols.map(function(symbol) {
            if(symbol === "^" ){
                return "\\" + symbol; 
            }
            
            return symbol;
        }).join('|');
        
        
        var regex = new RegExp("\\)|\\(|[a-zA-Z]+|" + symbolsRegx, "g");
        console.log(regex);
        var tokenList = input.match(regex);
        
        return tokenList;
    }
    
    function applyOperator(operatorStack, exprStack){
        
        var operator = operatorStack.pop();
        
        if(operator.arity === 1){
            var rightExpr = exprStack.pop();
            
            exprStack.push(new Expression(operator, rightExpr));
        }else if(operator.arity === 2){
            var rightExpr = exprStack.pop();
            var leftExpr = exprStack.pop();
            
            exprStack.push(new Expression(operator, leftExpr, rightExpr));
        }
        
    }
    
    function parse(input){
        var operatorStack = [];
        var exprStack = [];
        
        var tokenList = preprocess(input);
        
        console.log(tokenList);
                
        for(var tokenIndex in tokenList){
            var token = tokenList[tokenIndex];
            var operator = Operator.fromSymbol(token);
            console.log(token);
            
            if(token === "(" || (operatorStack.length === 0) && (Operator.isOperator(token))){
                if(Operator.isOperator(token)){
                    operatorStack.push(operator);
                }else{
                    operatorStack.push(token);
                }
            }else if(token === ")"){
                while(operatorStack[operatorStack.length-1] !== "("){
                    applyOperator(operatorStack, exprStack);
                }
                operatorStack.pop();
            }else if(Operator.isOperator(token)){
                if(operatorStack[operatorStack.length-1] === "(" || operatorStack[operatorStack.length-1].precedence <= operator.precedence){
                    operatorStack.push(operator);
                }else if(operatorStack[operatorStack.length-1].precedence > operator.precedence){
                    //only works for binary operations
                    applyOperator(operatorStack, exprStack);
                    operatorStack.push(operator);
                }
            }else if(!Operator.isOperator(token)){
                exprStack.push(new Expression(token));
            }
            
        }
        
        console.log(exprStack);
        console.log(operatorStack);
        
        while(operatorStack.length !== 0 && exprStack.length !== 0){
            applyOperator(operatorStack, exprStack);
        }
        
        // var operator = operatorStack.pop();
        // var rightExpr = exprStack.pop();
        // var leftExpr = exprStack.pop();
        
        // exprStack.push(new Expression(operator, leftExpr, rightExpr));
        
        return exprStack.pop();
        
    }
    
    
    function size(tree) {
        if (tree) {
            return 1 + size(tree.left) + size(tree.right);
        }
        return 0;
    }
    
    
    function printTree(tree, letters) {
        
        if (tree) {
            
            if (size(tree.left) > 1 && tree.left.value.precedence < tree.value.precedence)
                letters.push('(');
            printTree(tree.left, letters);
            if (size(tree.left) > 1 && tree.left.value.precedence < tree.value.precedence)
                letters.push(')');
            
            if (tree.value.symbol) {
                letters.push(tree.value.symbol);    
            } else {
                letters.push(tree.value);
            }
            
            if (size(tree.right) > 1 && tree.right.value.precedence < tree.value.precedence)
                letters.push('(');
            printTree(tree.right, letters);
            if (size(tree.right) > 1 && tree.right.value.precedence < tree.value.precedence)
                letters.push(')');
        }
    }
    
    return {
        parse: parse,
        toString: function(tree) {
            var s = [];
            printTree(tree, s);
            return s.join('');
        }
    };
    
})();
