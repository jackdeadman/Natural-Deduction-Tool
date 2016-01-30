var parse = (function(){
    
    var symbols = [
    //  {
    //      name: "opening-bracket",
    //      symbol: "(",
    //      precedence: 4
    //  },
    //  {
    //      name: "closing-bracket",
    //      symbol: ")",
    //      precedence: 4
    //  },
     {
         name: "iff",
         symbol: "<=>",
         precedence: 0,
         arity: 2
     },
     {
         name: "implies",
         symbol: "=>",
         precedence: 1,
         arity: 2    
     },
     {
         name: "and",
         symbol: "^",
         precedence: 2,
         arity: 2
     },
     {
         name: "or",
         symbol: "v",
         precedence: 2,
         arity: 2
     },
     {
         name: "not",
         symbol: "¬",
         precedence: 3,
         arity: 1
     }
    ];
        
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
    
    function stringToSymbol(str){
        for(var i = 0; i < symbols.length; i++){
            if(str === symbols[i].symbol){
                return symbols[i];
            }
        }
    }
    
    function isSymbol(str){
        for(var i = 0; i < symbols.length; i++){
            if(str === symbols[i].symbol){
                return true;
            }
        }
        
        return false;
    }
    
    function preprocess(input){
         var symbolsRegx = symbols.map(function(el) {
             //|| el.symbol === "(" || el.symbol === ")"
            if(el.symbol === "^" ){
                return "\\" + el.symbol; 
            }
            
            return el.symbol;
        }).join('|');
        
        console.log(symbolsRegx);
        
        var regex = new RegExp("\\)|\\(|[a-zA-Z]+|" + symbolsRegx, "g");
        
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
            var tokenSymbol = stringToSymbol(token);
            console.log(token);
            
            if(token === "(" || (operatorStack.length === 0) && (isSymbol(token))){
                if(isSymbol(token)){
                    operatorStack.push(tokenSymbol);
                }else{
                    operatorStack.push(token);
                }
            }else if(token === ")"){
                while(operatorStack[operatorStack.length-1] !== "("){
                    applyOperator(operatorStack, exprStack);
                }
                operatorStack.pop();
            }else if(isSymbol(token)){
                if(operatorStack[operatorStack.length-1] === "(" || operatorStack[operatorStack.length-1].precedence <= tokenSymbol.precedence){
                    operatorStack.push(tokenSymbol);
                }else if(operatorStack[operatorStack.length-1].precedence > tokenSymbol.precedence){
                    //only works for binary operations
                    applyOperator(operatorStack, exprStack);
                    operatorStack.push(tokenSymbol);
                }
            }else if(!isSymbol(token)){
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
    
    return parse;
    
})();