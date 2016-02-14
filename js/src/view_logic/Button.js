var Button = (function() {
    function Button(node) {
        this.node = node;
    }
    
    Button.prototype = new Box();
    Button.prototype.constructor = Button;
    
    Button.prototype.onClick = function(fn) {
        this.node.addEventListener('click', fn);
    }
    
    Button.prototype.set = function(value) {
        this.node.innerHTML = value;
    }

    return Button;
})();