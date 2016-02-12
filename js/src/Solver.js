var Solver = (function(){
    
    function solve(premises, goal){
        // need to use several premises
        // can't just enumerate every path from one premise, as many paths could use several premises
        var premisePowerset = powerset(premises);
        var closedNodes = [];
        return findPath(premisePowerset, goal, closedNodes); 
    }
    
    function findPath(startNodes, goalNode, closedNodes){
            
            if(Expression.equals(startNodes, goalNode)){
                return closedNodes;
            }else{
                startNodes.forEach(function(node) {
                    var nextNodes = applyAllRules(node);
                    var bestNode = evaluateCosts(nextNodes, goalNode);
                    closedNodes.push(bestNode);
                    findPath(bestNode, goalNode, closedNodes);
                }); 
            }
            
            return closedNodes;
    }
    
    function powerset(list){
        var powerset = [];
        
        for(var i = 0;i < list.length;i++){
            powerset.push(list[i]); 
            for(var j = list.length; j > 0; j--){
                if(list[i] !== list[j-1])
                    powerset.push([list[i],list[j-1]]);
            }
        }
        
        return powerset;
    }
    
    function applyAllRules(node){
        var treeList = [];
        var tree1;
        var tree2;
        if(!(node instanceof Expression)){
            tree1 = node[0];
            tree2 = node[1];
            
            treeList.push(Rule.conjunctionIntroduction(tree1, tree2));
            treeList.push(Rule.disjunctionIntroduction(tree1, tree2));
            treeList.push(Rule.implicationElimination(tree1, tree2));
        }else{
            tree1 = node;
            
            treeList.push(Rule.doubleNegationIntroduction(tree1));
            // need checks for which rules are possible
            // treeList.push(Rule.deMorgans(tree1));
            // treeList.push(Rule.conjunctionElimination(tree1));
            
            // treeList.push(Rule.doubleNegationElimination(tree1));
        }
        return treeList;   
    }
    
    function evaluateCosts(nodes, goal){
        var bestCost = Infinity;
        var bestNode;
        nodes.forEach(function(node){
            var nodeCost = Math.abs(Expression.prototype.size(node), Expression.prototype.size(goal));
            if(nodeCost < bestCost)
                bestNode = node;
        });
        
        return bestNode;
    }
    
    return {
        evaluateCosts: evaluateCosts,
        applyAllRules: applyAllRules,
        solve: solve,
    }
    

    
})();