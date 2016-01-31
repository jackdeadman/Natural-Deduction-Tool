var Rules = (function() {
    
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
    
    function doubleNegation(tree) {
        var root = symbols[4];
        root.right = symbols[4];
        root.right.tree = tree;
        return root;
    }
    
    
    return {
        doubleNegation: doubleNegation
    };
})();
var Parser = (function(){
    
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
                expression: Parser.toString(Parser.parse(exp)),
                law: exp
            });
        
    }

    Expressions.prototype.render = function() {
        this.node.innerHTML = '';
        
        
        for (var i=0; i<this.expressions.length; i++) {
            console.log(this.expressions);
            var expression = this.expressions[i];
            this.node.innerHTML += template
                            .replace('{EXPRESSION}', Parser.toString(expression.expression))
                            .replace('{LAW}', expression.law);
        }
        
    };
    
    return Expressions;
    
})();
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
        console.log(this.node.id);
        if(this.node.id === "premise-input"){
            this.editButton.classList.remove('hidden');
        }
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
    
    InputBox.prototype.clear = function() {
        this.node.value = '';
    }
    
    function InputBox(node) {
        this.node = node;
        this.editButton = document.getElementById("premise-edit-button");
        var that = this;
        
        this.node.addEventListener('keydown', function(e) {
            if (e.which == 13) {
                that.submitFn();
            }
        });
    }
    
    return InputBox;
})();
  function Grammar(productions) {
      var productionsParsed = [];
      
      for (var i=0; i<productions.length; i++) {
          productionsParsed[i] = parseProduction(productions[i])
      }
      
      this.productions = productionsParsed;
          
  }
  
  
  Grammar.prototype.findVariables = function(str) {
      var production;
      var validVariables = [];
      
      for (var i=0; i<this.productions.length; i++) {
          production = this.productions[i];
          
          for (var j=0; j< production.length; j++) {
              
            if (str == production[j].ruleRight) {
                  validVariables.push(production[j].ruleLeft);
            }
          }
          
      }
      
      return validVariables;
  }
  
  function parseProduction(production) {
      var delimeter = '->';
      var parts = production.split(delimeter);
      var ruleLeft = parts[0];
      var ruleRight = parts[1].split('|');
      console.log(ruleLeft, ruleRight);
      var productionsParsed = []
      
      for (var i=0; i < ruleRight.length; i++) {
          productionsParsed[i] = { ruleLeft: ruleLeft, ruleRight: ruleRight[i] }
      }
      
      return productionsParsed;
      
  }
  
    
    
  function initialiseTable(word, grammar) {
      var table = []; while(table.push([]) < word.length);
      var letter = '';
      
      for (var i=0; i<word.length; i++) {
          letter = word[i];
          table[i][i] = grammar.findVariables(letter);
      }
      
      return table;
      
  }
  
  function cyk(word, grammar) {
      var table = initialiseTable(word, grammar)
      
      for (var size=2; size<word.length; size++) {
          
          for (var letter=0; letter<word.length; letter++) {
              var row = letter;
              var column = letter+size;
              // look back
              for (var lookback=1; lookback<size; lookback++) {
                  
                  if (table[row][column-lookback]) {
                      
                  }
                  
                  if (table[row+lookback][column]) {
                      
                  }
              }
              
              
          }
          
          table[letter]
          
      }
      
  }  
    
(function(){
    
    // alert("You are the 10 millionth visitor! You win a prize!");
    
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
    premiseInputBox.enable(true);
    
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
    
    
    ruleInputBox.submitFn = function() {
        expressionsBox.addExpression(Parser.parse(ruleInput.value, true));
        this.clear();
    };

})();