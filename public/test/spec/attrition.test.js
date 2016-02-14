describe('WP.Attrition', function(){
    
    var attr
    var a, b, c, d, e, f
    
    beforeEach(function(){
        attr = new WP.Attrition()
        a = {unit:1, highlight: null, canBeCountedInAttrition: function(){return true}}
        b = {unit:2, highlight: true, canBeCountedInAttrition: function(){return true}}
        c = {unit:3, highlight: null, canBeCountedInAttrition: function(){return true}}
        d = {unit:4, highlight: true, canBeCountedInAttrition: function(){return false}}
        e = {unit:5, highlight: false, canBeCountedInAttrition: function(){return true}}
        f = {unit:6, highlight: false, canBeCountedInAttrition: function(){return true}}
        attr.units = [a, b, c]
    })
    
    it('should be defined', function(){
        expect(attr).toBeDefined()
    })
    
    it('should show this.units length to be 3', function(){
        expect(attr.units.length).toBe(3)
    })
    
    it('should show that one unit in the list is highlighted', function() {
        expect(attr.units[1].highlight).toBe(true)
    })
    
    describe('WP.Attrition.addUnit', function() {
        it ('should safely return if called with no argument', function () {
            attr.addUnit()
        })
        
        it('should fail to add a unit that can\'t be added in attrition', function(){
            attr.addUnit(d)
            expect(attr.units.length).toBe(3)
        })
        
        it('should add a new unit that can be counted in attrition', function() {
            attr.addUnit(e)
            expect(attr.units.length).toBe(4)
        })
       
        it ('should not add a unit that is already in the list', function() {
            attr.addUnit(a)
            expect(attr.units.length).toBe(3)
        })
        
        it ('should mark a newly added unit as highlighted', function() {
            expect(e.highlight).toBe(false)
            attr.addUnit(e)
            expect(e.highlight).not.toBe(false)
        })
        
    })
    
    describe('WP.Attrition.removeUnit', function() {
       
       it ('should return safely if called with no argument', function (){
           attr.removeUnit()
       })
       
       it ('should show the length of this.units to be 2 after removing one', function () {
           attr.removeUnit(b)
           expect(attr.units.length).toBe(2)
       }) 

        it ('should set highlight of unit to null after removing', function () {
           attr.removeUnit(b)
           expect(b.highlight).toBe(null)
        })
        
        it ('should not change the units list of attempting to remove a unit not in the list', function() {
            attr.removeUnit(d)
            expect(attr.units.length).toBe(3)
        })       
        
    })
    

    
})