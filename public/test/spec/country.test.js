describe('WP.Country', function(){
    
    var cty 
    var col1, col2, col3
    var fpg1, fpg2, fpg3
    var un1, un2, un3
    
    beforeEach(function(){
        cty = new WP.Country()
        
        cty.name ="Bechuanaland"
        cty.id = 1000000
        
        
        col1 = {val: 1}
        col2 = {val: 2}
        col3 = {val: 3}       
        cty.colonies = [col1, col2]
               
        fpg1 = {val: 1}
        fpg2 = {val: 2}
        fpg3 = {val: 3}  
        cty.forcepoolGroupings = [fpg1, fpg2]
        
        un1 = {id: 1}
        un2 = {id: 2}
        un3 = {id: 3}  
        cty.units = [un1, un2]
      
    })
    
    it('should be defined', function(){
        expect(cty).toBeDefined()
    })
    
    it('Should have a colonies array with two colonies', function(){
        expect(cty.colonies.length).toBe(2)
    })
    
    it('Should have a forcepoolgroupings array with two groups', function(){
        expect(cty.forcepoolGroupings.length).toBe(2)
    })
    
    it('Should have a units array with two groups', function(){
        expect(cty.units.length).toBe(2)
    })
    
    
    describe('addColony', function() {
        
        it('should add a new colony to the colonies array', function(){
            cty.addColony(col3)
            expect(cty.colonies.length).toBe(3)
        })
        
    })
    
    describe('addForcepoolGrouping', function(){
        
        it('should add a new grouping to the forcepool groupings', function() {
            cty.addForcepoolGrouping(fpg3)
            expect(cty.forcepoolGroupings.length).toBe(3)
        })
        
    })
 
    describe('addUnit', function(){
        
        it('should add a new unit to the units array', function() {
            cty.addUnit(un3)
            expect(cty.units.length).toBe(3)
        })
        
    })
    
    describe('getUnit', function(){
        
        it('should return a unit from the units array', function() {
            var res = cty.getUnit(1)
            expect(res.id).toBe(1)
        })
        
        it('should return null if sent an invalid id', function() {
            var res = cty.getUnit(20)
            expect(res).toBe(null)
        })
        
    })
    
    describe('removeUnit', function(){
        
        it('should have a units array length of 2', function(){
            expect(cty.units.length).toBe(2)
        })
        
        it('should remove a unit from the units array of sent a matching unit', function() {
            cty.removeUnit(un1)
            expect(cty.units.length).toBe(1)
        })
        
        it('should not remove a unit if sent a non-matching unit', function() {
            var un6 = {id: 6}
            cty.removeUnit(un6)
            expect(cty.units.length).toBe(2)
        })
        
    })
    
    describe('toString', function(){
            
        it('should return a string of the country name and id', function(){
            expect(cty.toString()).toBe("Bechuanaland (1000000)")
        })
        
    })
})


describe('WP.Country static functions', function(){
    
    describe('countryBuilder', function() {
        
        it('should return a country object with matching id and name', function() {
            var cty = WP.Country.countryBuilder(22, 'TestLand')
            expect(cty.id).toBe(22)
            expect(cty.name).toBe('TestLand')
        })
        
    })
    
    describe('forcepoolGroupingBuilder', function() {
        
        it('should return a forcepoolgrouping object with matching id and name', function() {
            var fpg = WP.Country.forcepoolGroupingBuilder(29, 'TestGroup')
            expect(fpg.id).toBe(29)
            expect(fpg.name).toBe('TestGroup')
        })
        
    })
    
    describe('sort', function() {
        
        var gb = {name: 'Britain'}
        var ger = {name: 'Germany'}
        var rus = {name: 'Russia'}
        
        it('should return 1 if a is alphabetically higher than b', function() {
            var res = WP.Country.sort(rus, ger)
            expect(res).toBe(1)
        })
        
        it('should return -1 if a is alphabetically lower than b', function(){
            var res = WP.Country.sort(gb, ger)
            expect(res).toBe(-1)            
        })
        
        it('should return -0 if a and b are the same', function(){
            var res = WP.Country.sort(gb, gb)
            expect(res).toBe(0)            
        })
        
        it('should return -0 if a and b are incomparable', function(){
            var res = WP.Country.sort(gb, 100)
            expect(res).toBe(0)            
        })
        
    })
    
})