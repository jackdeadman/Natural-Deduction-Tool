
var Operator = (function() {
    
    var Symbol = {
        iff: {
            symbol: "<=>",
            precedence: 0,
            arity: 2
        },
        implies: {
            symbol: "=>",
            precedence: 1,
            arity: 2    
        },
        and: {
            symbol: "^",
            precedence: 2,
            arity: 2
        },
        or: {
            symbol: "v",
            precedence: 2,
            arity: 2
        },
        not: {
            symbol: "¬",
            precedence: 3,
            arity: 1
        }
    };
    
    var symbols = Object.keys(Symbol).map(function(name) {
       return Symbol[name].symbol; 
    });
    
    

    // Given a string convert the string to an operator
    function fromSymbol(symbol) {
        
        for (var key in Symbol) {
            var actualSymbol = Symbol[key];
            if (actualSymbol.symbol === symbol) {
                return actualSymbol;
            }
        }
    }
    
    // Predicate to check where a string is a operator
    function isOperator(string){
        return !!fromSymbol(string)
    }
    
    return {
        symbols: symbols,
        
        iff: Symbol.iff,
        implies: Symbol.implies,
        or: Symbol.or,
        and: Symbol.and,
        not: Symbol.not,
        
        fromSymbol: fromSymbol,
        isOperator: isOperator
    };
})();


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