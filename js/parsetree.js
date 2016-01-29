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
    