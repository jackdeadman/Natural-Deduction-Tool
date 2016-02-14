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
    
    InputBox.prototype.value = function() {
        return this.node.value;
    }
    
    InputBox.prototype.enable = function(focus) {
        this.node.classList.remove('hidden');
        this.node.classList.remove('disabled');
        this.node.disabled = false;
        
        if (focus)
            this.node.focus();
    }
    
    InputBox.prototype.isDisabled = function() {
        return this.node.disabled;
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