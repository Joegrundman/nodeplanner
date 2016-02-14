describe('WP.Codebreaking', function(){
    
    var cb
    var a, b, c, d
    
    beforeEach(function() {
        cb = new WP.Codebreaking()
        a = {val: 1}
        b = {val: 2}
        c = {val: 3}
        d = {val: 4}
        cb.cards = [a, b, c]
    })
    
    it('Should be defined', function(){
        expect(cb).toBeDefined()
    })
    
    it('should show a cards array of three cards', function() {
        expect(cb.cards.length).toBe(3)
    })
    
    describe('addCard', function(){
        
        it('should add a card to this.cards array', function(){
            cb.addCard(d)
            expect(cb.cards.length).toBe(4)
        })
                
    })
    
 
    
})