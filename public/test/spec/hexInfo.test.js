describe('WP.HexInfo', function() {
    
    var h, hold
    var obj1, obj2, obj3
    
    beforeEach(function() {
        h = new WP.HexInfo()
        obj1 = {id: 1}
        obj2 = {id: 2}
        obj3 = {id: 3}
        h.units = [obj1, obj2, obj3]
        
        // hold = {}
        // hold.units = []
        // hold.draw = function() { return hold.units.length }
    })
    
    it('should be defined', function() {
        expect(h).toBeDefined()
    })
    

    
})