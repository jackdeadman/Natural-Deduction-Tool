describe("The parser makes the correct tree for every logical statement", function(){
    
    describe("Single value expressions are parsed correctly", function(){
        
        it("should parse a single word or character as a tree with one node of that value", function(){
        
            expect(Parser.parse("a").toString()).toEqual("a");
            expect(Parser.parse("alpha").toString()).toEqual("alpha");
        
        });
        
    });

    describe("Conjunction operations are parsed correctly", function(){
        
        it("should parse a conjunction as a tree with the two operands on the left and right subtrees and a conjunction at the root", function(){
       
            var andOperator = Operator.and;
            
            expect(Parser.parse("a^b").value).toEqual(andOperator);
            expect(Parser.parse("a^b").left.toString()).toEqual("a");
            expect(Parser.parse("a^b").right.toString()).toEqual("b");
       
        });
        
    });

    
    describe("Union operations are parsed correctly", function(){
        
        it("should parse a simple union operation as a tree with the two operands on the left and right subtrees and a union at the root", function(){
        
            var orOperator = Operator.or;
            
            expect(Parser.parse("a+b").value).toEqual(orOperator);
            expect(Parser.parse("a+b").left.toString()).toEqual("a");
            expect(Parser.parse("a+b").right.toString()).toEqual("b");
        
        });
        
    });

    
    
    describe("Negation operations are parsed correctly", function(){
        
        it("should parse a negation operation on one variable as a tree with one operand on the right, and a not operator at the root", function(){
        
            var notOperator = Operator.not;
            
            expect(Parser.parse("¬a").value).toEqual(notOperator);
            expect(Parser.parse("¬a").left).toEqual(null);
            expect(Parser.parse("¬a").right.toString()).toEqual("a");
        
        });
        
        it("should parse a negation operation with brackets as a negation applied to the bracketed expression", function(){
        
            var notOperator = Operator.not;
            
            expect(Parser.parse("¬(a^b)").value).toEqual(notOperator);
            expect(Parser.parse("¬(a^b)").left).toEqual(null);
            expect(Parser.parse("¬(a^b)").right.toString()).toEqual("a^b");
            
            expect(Parser.parse("¬((a=>b)+(b=>g))").value).toEqual(notOperator);
            expect(Parser.parse("¬((a=>b)+(b=>g))").left).toEqual(null);
            expect(Parser.parse("¬((a=>b)+(b=>g))").right.toString()).toEqual("(a=>b)+(b=>g)");
            
        });
        
    });
    
   
    describe("Bracketed expressions are parsed correctly", function(){
        
        it("should parse an operator applied to two bracketed expressions correctly", function(){
        
            var orOperator = Operator.or;
            
            expect(Parser.parse("(a=>b)+(b=>g)").toString()).toEqual("(a=>b)+(b=>g)");
            expect(Parser.parse("(a=>b)+(b=>g)").value).toEqual(orOperator);
            expect(Parser.parse("(a=>b)+(b=>g)").left.toString()).toEqual("a=>b");
            expect(Parser.parse("(a=>b)+(b=>g)").right.toString()).toEqual("b=>g");

        });
        
    });



});