describe('Valid logical rules are applied to well formed expressions', function() {
    
    
    describe('Double negation, negates a given expression twice', function() {
        
        it('Should negate an expression of length 1', function() {
            
            var expr = new Expression('a');
            var expectedExpr = new Expression('¬¬a');
            
            var actual = Rule.doubleNegation(expr);
            
            expect(actual.toString()).toBe(expectedExpr.toString());
            
        });
        
        it('Should negate an expresssion of length larger than 1 and remember precedence', function() {
            var expr = Parser.parse('a^b');
            var expectedExpr = Parser.parse('¬¬(a^b)');
            
            var actual = Rule.doubleNegation(expr);
            
            expect(actual.toString()).toBe(expectedExpr.toString());
        });
        
    });
    
    
    xdescribe('Conjunction introduction creates a new expression by combining to true ones', function() {
        it('Should combine two true expressions', function() {
            var expr1 = Parser.parse('a');
            var expr2 = Parser.parse('b');
            var expectedExpr = Parser.parse('a^b');
            
            var actual = Rule.andIntroduction(expr1, expr2);
            
            expect(actual.toString()).toBe(expectedExpr.toString());
        });
        
        it('Should combine two complex statments remembering precedence', function() {
            var expr1 = Parser.parse('a=>b');
            var expr2 = Parser.parse('b=>a');
            var expectedExpr = Parser.parse('(a=>b)^(b=>a)');
            
            var actual = Rule.andIntroduction(expr1, expr2);
            
            expect(actual.toString()).toBe(expectedExpr.toString());
        });
    });
    
    
});