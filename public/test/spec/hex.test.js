describe('WP.Hex', function() {
    
    var h
    var obj1, obj2, obj3, obj4, obj5, obj6
    
    beforeEach(function() {
        h = new WP.Hex()
        obj1 = {id: 1, canCombineWith: function(){return }, strength: 1, owner: {removeUnit: function(){console.log('unit removed')}}}
        obj2 = {id: 2, canCombineWith: function(){return}, strength: 2, owner: {removeUnit: function(){console.log('unit removed')}}}
        obj3 = {id: 3, canCombineWith: function(){return }, strength: 3, owner: {removeUnit: function(){console.log('unit removed')}}}
        obj4 = {id: 4, canCombineWith: function(){return obj1}, strength: 4, owner: {removeUnit: function(){console.log('unit removed')}}}
        obj5 = {id: 5, canCombineWith: function(){return obj6}, strength: 5, owner: {removeUnit: function(){console.log('unit removed')}}}
        h.units = [obj1, obj2, obj3]
        h.owner = 'test'
    })
    
    it('should have a units array of length 2', function(){
        expect(h.units.length).toBe(3)
    })
    
    describe ('addUnit', function() {
        it('should add a unit to the units array', function(){
            h.addUnit(obj3)
            expect(h.units.length).toBe(4)
        })
                
        it('should assign a unit location of 2 to an added unit', function(){
            h.addUnit(obj3)
            expect(obj3.location).toBe(2)
        })
        
        it('should assign a unit.hex value of this an added unit', function(){
            h.addUnit(obj3)
            expect(obj3.hex).toBe(h)
        })
    })
    
    describe ('addOrCombineUnit', function() {
       it('should combine units that can be combined', function(){
           h.addOrCombineUnit(obj4)
           expect(h.units.length).toBe(3)
       })
       it('should add the unit strength after combining', function(){
           expect(h.units[0].strength).toBe(1)
           h.addOrCombineUnit(obj4)
           expect(h.units[0].strength).toBe(5)
       })
       it('should add units that can\'t combine', function(){
           h.addOrCombineUnit(obj5)
           expect(h.units.length).toBe(4)
       })                   
    })
    
    describe('getTopUnit', function() {
        it('should get the top unit in the units stack', function()  {
            var res = h.getTopUnit()
            expect(res).toBe(obj3)
        })
    })
    
    describe ('removeUnit', function() {
        it ('should remove a unit from the units list', function() {
            expect(h.units.length).toBe(3)
            h.removeUnit(obj2)
            expect(h.units.length).toBe(2)
        })
    })
    
    describe ('removeUnit', function() {
        it ('should remove a unit from the units list', function() {
            h.removeUnit(obj2)
            expect(h.units.length).toBe(2)
        })
    })
    
    describe('rotateUnits', function() {
        it('should rotate the units in this.units', function(){
            expect(h.units[0].id).toBe(1)
            h.rotateUnits()
            expect(h.units[0].id).toBe(2)
        })
        
        it ('should not change the length of the units array', function() {
            var len1 = h.units.length
            h.rotateUnits()
            var len2 = h.units.length
            expect(len1).toEqual(len2)
        })
    })
    
    describe('getOwner', () => {
        it ('should return the owner ', () => {
            expect(h.owner).toMatch('test')
        })
    })
    
})