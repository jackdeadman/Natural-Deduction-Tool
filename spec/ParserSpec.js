// preprocess
    // tokenlist should be the logical statement correctly split
    // should recognise every valid logical statement
    
// applyOperator
    // what if given empty operatorStack or exprStack
    // if unary operator, should only pop once off exprstack
        // and expression should be correctly pushed for every expression
    // if binary operator should pop twice off exprstack
        // and expression should be correctly pushed
        
        
// describe("The preprocess function recognises every valid logical statement", function(){
   
//    it("should recognise statements with brackets", function(){
      
//       expect(Parser.preprocess("(a^b)")).toEqual(["(","a","^","b",")"]);
       
//    });
   
    
// });

describe("The parser makes the correct tree for every logical statement", function(){
   
   it("should parse a single word or character as a tree with only a root of that value", function(){
      
      var correctCharacterExpression = new Expression("a");
      
      expect(Parser.parse("a")).toEqual(correctCharacterExpression);
      
      var correctWordExpression = new Expression("alpha");
      
      expect(Parser.parse("alpha")).toEqual(correctWordExpression);
       
   });
   
   it("should parse a simple conjunction operation as a tree with the \"and\" operator as the root", function(){
       
   });
   
    
});