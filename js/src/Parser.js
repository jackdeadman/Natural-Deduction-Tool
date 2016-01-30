var parse = (function(){
    
    var symbols = [
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
    
    function parse(input){
        var operatorStack = [
            // {
            //     name:"stack symbol",
            //     symbol:"$",
            //     precedence:Number.NEGATIVE_INFINITY
            // }
        ];
        var exprStack = [];
        
        var symbolsRegx = symbols.map(function(el) {
            if(el.symbol === "^"){
                return "\\" + el.symbol; 
            }
            
            return el.symbol;
        }).join('|');
        
        var regex = new RegExp("\\)|\\(|[a-zA-Z]+|" + symbolsRegx, "g");
        
        var tokenList = input.match(regex);
        
        console.log(tokenList);
                
        for(t in tokenList){
            var token = tokenList[t];
            var tokenSymbol = stringToSymbol(token);
            
            if(token === "("){
                operatorStack.push({symbol: "(", precedence: Number.NEGATIVE_INFINITY});
            }else if(token === ")"){
                
                console.log(operatorStack);
                
                while(operatorStack[operatorStack.length-1].value !== "("){
                    var operator = operatorStack.pop();
                    
                    console.log("Operator stack:" + operatorStack[operatorStack.length-1]);
                    
                    console.log(operator);
                    
                    if(operator.arity === 1){
                        var expr1 = exprStack.pop();
                        exprStack.push(new Expression(operator, expr1));
                    }else{
                        var expr2 = exprStack.pop();
                        var expr1 = exprStack.pop();
                        exprStack.push(new Expression(operator, expr1, expr2));
                    }
                }
                operatorStack.pop();
                
            }else if(isSymbol(token)){
                console.log(operatorStack);
                console.log(exprStack);
                if(operatorStack.length === 0){
                    // var expr1 = exprStack.pop();
                    // exprStack.push(new Expression(operator, expr1));
                    operatorStack.push(tokenSymbol);
                }else{
                    while(operatorStack[operatorStack.length-1].precedence >= tokenSymbol.precedence){
                        var operator = operatorStack.pop();
                        if(tokenSymbol.arity === 1){
                            var expr1 = exprStack.pop();
                            exprStack.push(new Expression(operator, expr1));
                        }else{
                            var expr2 = exprStack.pop();
                            var expr1 = exprStack.pop();
                            exprStack.push(new Expression(operator, expr1, expr2));
                        }
                    }
                    operatorStack.push(tokenSymbol);
                }
                
                
                
            }else{
                exprStack.push(new Expression(token));
            }
        }
        
                    
        console.log(operatorStack);
        console.log(exprStack);
        
        return exprStack.pop();
        
    }
    
    return parse;
    
})();