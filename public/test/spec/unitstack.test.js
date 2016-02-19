describe('WP.UnitStack', function() {
    
    var us
    var obj1, obj2, obj3
    
    beforeEach(function() {
        us = new WP.UnitStack()
        obj1 = {id: 1}
        obj2 = {id: 2}
        obj3 = {id: 3}
        us.units = [obj1, obj2]
    })
    
    it('should be defined', function() {
        expect(us).toBeDefined()
    })
    
    it('should have a units array of length 2', function(){
        expect(us.units.length).toBe(2)
    })
    
    describe('getTopUnit', function() {
        it('should return the top unit of the units array', function(){
            var res = us.getTopUnit()
            expect(res.id).toEqual(2)
        })
        it('should return null if stack is empty', function(){
            us.units = null
            var res = us.getTopUnit()
            expect(res).toBe(null)
        })
        it('should not change the length of the units array', function() {
            var before = us.units.length
            var res = us.getTopUnit()
            expect(us.units.length).toEqual(before)
        })
    })
    
    describe('removeUnit', function(){
        it('should remove a unit from the units array', function() {
            us.removeUnit(obj1)
            expect(us.units.length).toBe(1)
        })
        it('should remove the chosen unit from the array', function() {
            us.removeUnit(obj1)
            expect(us.units[0].id).toEqual(2)
        })       
    })
    
    describe('addUnit', function(){
        it('should add a unit to the units array', function() {
            us.addUnit(obj3)
            expect(us.units.length).toBe(3)
        })
        it('should add the chosen unit to the top of the stack', function() {
            us.addUnit(obj3)
            expect(us.units[us.units.length-1].id).toEqual(3)
        })       
    })
    
    describe('rotateUnits', function(){
        it('should rotate a unit from the bottom of the stack to the top', function() {
            var bottom = us.units[0].id
            us.rotateUnits()
            var top = us.units[us.units.length -1].id
            expect(top).toEqual(bottom)
        })
        it('should not change the array kength', function() {
            var preLen = us.units.length
            us.rotateUnits()
            expect(us.units.length).toEqual(preLen)
        })       
    })
})