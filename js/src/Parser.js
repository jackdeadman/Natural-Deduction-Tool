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
    
    // Separates an input string into an array of symbols and words e.g. ["Jack","^","Jill"]
    function preprocess(input){
        var symbolsRegx = Operator.symbols.map(function(symbol) {
             // Operator and a special regex symbol so much be escaped
             if(symbol === "^" ){
                 return "\\" + symbol; 
             }   
            return symbol;
        }).join('|');
        
        var regex = new RegExp("\\)|\\(|[a-zA-Z]+|" + symbolsRegx, "g");
        var tokenList = input.match(regex);
        
        return tokenList;
    }
    
    // Applies the operator that is on top of the operator stack
    // if it's a binary operator use the top two expressions on the
    // expression stack, if unary just use the top.
    // Then add the result to the expression stack.
    function applyOperator(operatorStack, exprStack){
        
        var operator = operatorStack.pop();
        
        if (operator.arity === 1){
            var rightExpr = exprStack.pop();
            // if (!rightExpr) throw "Invalid number of arguments for " + operator.symbol + " expected 1, 0 given."; 
            
            exprStack.push(new Expression(operator, rightExpr));
        } else if (operator.arity === 2){
            var rightExpr = exprStack.pop();
            var leftExpr = exprStack.pop();
            // if (!leftExpr || !rightExpr) 
            //     throw "Invalid number of arguments for " + operator.symbol + " expected 2, "+(!!leftExpr+!!rightExpr)+" given.";
            exprStack.push(new Expression(operator, leftExpr, rightExpr));
        }
        
    }
    
    function parse(input){
        var operatorStack = [];
        var exprStack = [];
        var tokenList = preprocess(input);
                
        for (var tokenIndex in tokenList){
            var token = tokenList[tokenIndex];
            var operator = Operator.fromSymbol(token);
            var isOperator = !!operator;
            
            // If stack is empty or is an opening bracket add the operator to the stack
            if(token === "(" || (operatorStack.length === 0) && (Operator.isOperator(token))){
                if(isOperator){
                    operatorStack.push(operator);
                }else{
                    operatorStack.push(token);
                }
            }
            // If a closing bracket, apply everything until it reaches a closing bracket.
            else if(token === ")"){
                while(operatorStack[operatorStack.length-1] !== "("){
                    applyOperator(operatorStack, exprStack);
                }
                // Pop closing bracket
                operatorStack.pop();
            } else if(isOperator){
                // Add the operator to the op stack if it has a higher precedence
                // Special case for opening bracket as it's not actually an operator, but everythin
                // has an higher precedence
                if(operatorStack[operatorStack.length-1] === "(" || operatorStack[operatorStack.length-1].precedence <= operator.precedence){
                    operatorStack.push(operator);
                } else {
                    applyOperator(operatorStack, exprStack);
                    operatorStack.push(operator);
                }
            // Otherwise it is a leaf
            }else {
                exprStack.push(new Expression(token));
            }
        }
        
        // Once finished going through the string, apply the remaining operatings in the stack
        while(operatorStack.length !== 0){
            applyOperator(operatorStack, exprStack);
        }
        
        return exprStack.pop();
        
    }
    
    // Counts the number of nodes in a tree
    function size(tree) {
        if (tree) {
            return 1 + size(tree.left) + size(tree.right);
        }
        return 0;
    }
    
    
    function needsBrackets(tree, branch) {
        return size(branch) > 1 && branch.value.precedence < tree.value.precedence;
    }
    
    function printTree(tree, letters) {
        
        if (tree) {
            var leftBranch = needsBrackets(tree, tree.left);
            var rightBranch = needsBrackets(tree, tree.right);
            
            // Add brackets only if they are needed
            if (leftBranch)
                letters.push('(');
                
            printTree(tree.left, letters);
            
            if (leftBranch)
                letters.push(')');
            
            // Print the node value, could be a symbol or a string
            if (tree.value.symbol) {
                letters.push(tree.value.symbol);    
            } else {
                letters.push(tree.value);
            }
            
            if (rightBranch)
                letters.push('(');
                
            printTree(tree.right, letters);
            
            if (rightBranch)
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
