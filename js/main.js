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
    
    function InputBox(node) {
        this.node = node;
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
    
    var mainWrapper = document.getElementsByClassName('main-wrapper');
    var premiseInput = document.getElementById('premise-input');
    var conclusionInput = document.getElementById('conclusion-input');
    var expressions = document.getElementById('expressions');
    
    var premiseInputBox = new InputBox(premiseInput);
    var conclusionInputBox = new InputBox(conclusionInput);
    var expressionsBox = new Expressions(expressions, ['a','b']);
    
    conclusionInputBox.disable();
    
    premiseInputBox.onSubmit(function() {
        premiseInputBox.disable();
        conclusionInputBox.enable(true);
    });
    
    conclusionInputBox.onSubmit(function() {
        conclusionInputBox.disable();
        expressionsBox.render();
    });

})();