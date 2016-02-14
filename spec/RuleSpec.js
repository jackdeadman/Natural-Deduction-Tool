describe('Valid logical rules are applied to well formed expressions', function() {
    
    
    describe('Double introduction negation, negates a given expression twice', function() {
        
        it('Should negate an expression of length 1', function() {
            
            var expr = new Expression('a');
            var expectedExpr = new Expression('¬¬a');
            
            var actual = Rule.doubleNegationIntroduction(expr);
            
            expect(actual.toString()).toBe(expectedExpr.toString());
            
        });
        
        it('Should negate an expresssion of length larger than 1 and remember precedence', function() {
            var expr = Parser.parse('a^b');
            var expectedExpr = Parser.parse('¬¬(a^b)');
            
            var actual = Rule.doubleNegationIntroduction(expr);
            
            expect(actual.toString()).toBe(expectedExpr.toString());
        });
        
    });
    
    describe('Double negation elimination removes double not at the start of expression', function() {
        
        it('Should negate an expression of length 1', function() {
            
            var expr = Parser.parse('¬¬a');
            var expectedExpr = new Expression('a');
            
            var actual = Rule.doubleNegationElimination(expr);
            
            expect(actual.toString()).toBe(expectedExpr.toString());
            
        });
        
        it('Should negate an expresssion of length larger than 1 and remember precedence', function() {
            var expr = Parser.parse('¬¬(a^b)');
            var expectedExpr = Parser.parse('a^b');
            
            var actual = Rule.doubleNegationElimination(expr);
            
            expect(actual.toString()).toBe(expectedExpr.toString());
        });
        
        it('Should only work on expressions with two nots', function() {
            var expr = Parser.parse('a');
            expect(Rule.doubleNegationElimination.bind(null, expr)).toThrowError(RuleDoesNotFollowException);
        });
        
    });
    
    
    describe('Conjunction introduction creates a new expression by combining to true ones', function() {
        it('Should combine two true expressions', function() {
            var expr1 = Parser.parse('a');
            var expr2 = Parser.parse('b');
            var expectedExpr = Parser.parse('a^b');
            
            var actual = Rule.conjunctionIntroduction(expr1, expr2);
            
            expect(actual.toString()).toBe(expectedExpr.toString());
        });
        
        it('Should combine two complex statments remembering precedence', function() {
            var expr1 = Parser.parse('a=>b');
            var expr2 = Parser.parse('b=>a');
            var expectedExpr = Parser.parse('(a=>b)^(b=>a)');
            
            var actual = Rule.conjunctionIntroduction(expr1, expr2);
            
            expect(actual.toString()).toBe(expectedExpr.toString());
        });
    });
    
    describe('conjunction elimination should remove one side of the conjunction', function() {
        
        describe('Removes simple expressions', function() {
           var expr = Parser.parse('a^b');
           it('Should be able to remove the left side', function() {
               var actual = Rule.conjunctionElimination1(expr);
               var expected = Parser.parse('a');
               expect(actual.toString()).toBe(expected.toString());
           });
           
           it('Should be able to remove the right side', function() {
               var actual = Rule.conjunctionElimination2(expr);
               var expected = Parser.parse('b');
               expect(actual.toString()).toBe(expected.toString());
           });
           
           var expr2 = Parser.parse('a+b');
           
           it('Should only work on conjunction', function() {
               expect(Rule.conjunctionElimination2.bind(null, expr2)).toThrowError(RuleDoesNotFollowException);
               expect(Rule.conjunctionElimination1.bind(null, expr2)).toThrowError(RuleDoesNotFollowException);
           });
           
        });
        
        
        describe('Removes complex expressions', function() {
           var expr = Parser.parse('(a=>b)^(b=>a)');
           it('Should be able to remove the left side', function() {
               var actual = Rule.conjunctionElimination1(expr);
               var expected = Parser.parse('a=>b');
               expect(actual.toString()).toBe(expected.toString());
           });
           
           it('Should be able to remove the right side', function() {
               var actual = Rule.conjunctionElimination2(expr);
               var expected = Parser.parse('b=>a');
               expect(actual.toString()).toBe(expected.toString());
           });
           
        });
        
    });
    
    
    describe('Implication elimination should remove if antecedent is true', function() {
        it('Should be able to remove simple implications', function() {
            var expr1 = Parser.parse('a=>b');
            var expr2 = Parser.parse('a');
            var expected = Parser.parse('b');
            var actual = Rule.implicationElimination(expr1, expr2);
            expect(actual.toString()).toBe(expected.toString());
        });
        
        it('Should only work on implication', function() {
            var expr1 = Parser.parse('a^b');
            var expr2 = Parser.parse('a');
            expect(Rule.implicationElimination.bind(null, expr1, expr2)).toThrowError(RuleDoesNotFollowException);
        });
    });
    
    describe('Disjunction introduction should add any statement to the right of an Or if given left is true.', function() {
        it('Should be able to add an Or to simple expressions', function() {
            var expr1 = Parser.parse('a');
            var expr2 = Parser.parse('b');
            var expected = Parser.parse('a+b');
            var actual = Rule.disjunctionIntroduction(expr1, expr2);
            
            expect(actual.toString()).toBe(expected.toString());
        });
        
        it('Should be able to add an Or to complex expressions', function() {
            var expr1 = Parser.parse('a=>b');
            var expr2 = Parser.parse('b=>a');
            var expected = Parser.parse('(a=>b)+(b=>a)');
            var actual = Rule.disjunctionIntroduction(expr1, expr2);
            
            expect(actual.toString()).toBe(expected.toString());
        });
    });
    
    
    describe('Demorgans law should convert conjunction into disjunction and vice versa', function() {
        it('Should be able to convert a conjunction into a disjunction', function() {
            var expr = Parser.parse('a^b');
            var expected = Parser.parse('¬(¬a+¬b)');
            var actual = Rule.deMorgans(expr);
            
            expect(actual.toString()).toBe(expected.toString());
        });
        
        it('Should be able to convert a disjunction into a conjunction', function() {
            var expr = Parser.parse('a+b');
            var expected = Parser.parse('¬(¬a^¬b)');
            var actual = Rule.deMorgans(expr);
            
            expect(actual.toString()).toBe(expected.toString());
        });
        
        it('Should only work on conjunction or disjunction', function() {
           var expr = Parser.parse('a=>b');
           expect(Rule.deMorgans.bind(null, expr)).toThrowError(RuleDoesNotFollowException); 
        });
    });
    
});