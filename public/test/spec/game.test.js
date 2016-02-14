describe('WP.Game', function() {
    
    var gam   
    var obj1, obj2, obj3
    
    beforeEach(function(){
        
        gam = new WP.Game()
        gam.currentMap = 'euro'
        gam.maps = ['euro', 'pac']
        
        
        obj1 = {name: 'obj1', id: 1, shipyardUnits : [{id: 1}], taskforceUnits : [{id: 1}], units: [{id: 1, holderX: 1, holderY: 1}]}
        obj2 = {name: 'obj2', id: 2, shipyardUnits : [{id: 2}], taskforceUnits : [{id: 2}], units: [{id: 2, holderX: 2, holderY: 2}]}
        obj3 = {name: 'obj3', id: 3, shipyardUnits : [{id: 3}], taskforceUnits : [{id: 3}], units: [{id: 3, holderX: 3, holderY: 3}]}
        
        gam.countries = [obj1, obj2]
        gam.codebreakingResults = [obj1, obj2]
        gam.shipyards = [obj1, obj2]
        gam.taskforces = [obj1, obj2]
        
    })
    
    it('should be defined', function() {
        expect(gam).toBeDefined()
    })
    
    it('should have a countries array with two members', function(){
        expect(gam.countries.length).toBe(2)
    })
    
    describe('addCountry', function() {
        
        it('should add a country to the countries array', function(){
            gam.addCountry(obj3)          
            expect(gam.countries.length).toBe(3)
        })
        
    })
    
    describe('addCodebreakingResult', function() {
        
        it('should add a result to the codebreakingResults array', function(){
            gam.addCodebreakingResult(obj3)          
            expect(gam.codebreakingResults.length).toBe(3)
        })
        
    })

    describe('addShipyard', function() {
        
        it('should add a shipyard to the shipyards array', function(){
            gam.addShipyard(obj3)          
            expect(gam.shipyards.length).toBe(3)
        })
        
    })
    
    describe('addTaskforce', function() {
        
        it('should add a taskforce to the taskforces array', function(){
            gam.addTaskforce(obj3)          
            expect(gam.taskforces.length).toBe(3)
        })
        
    })
    
    describe('getCountry', function() {
        
        it('should return a country by id', function(){
            var res = gam.getCountry(2)
            expect(res.id).toBe(2)
        })
        
        it('should return null if an invalid id is used', function() {
            var res = gam.getCountry(6)
            expect(res).toBe(null)
        })
        
    })
    
    describe('getCountryFromName', function() {
             
        it('should return a country by name', function(){
            var res = gam.getCountryFromName('obj2')
            expect(res.id).toBe(2)
        })
        
        it('should return null if an invalid id is used', function() {
            var res = gam.getCountryFromName('banana')
            expect(res).toBe(null)
        })
        
    })
    
    describe('getShipyards', function() {
             
        it('should return a shipyard by id', function(){
            var res = gam.getShipyards(2)
            expect(res.id).toBe(2)
        })
        
        it('should return null if an invalid id is used', function() {
            var res = gam.getShipyards('banana')
            expect(res).toBe(null)
        })
        
    })
    
    describe('getShipyardFromName', function() {
             
        it('should return a shipyard by name', function(){
            var res = gam.getShipyardFromName('obj2')
            expect(res.id).toBe(2)
        })
        
        it('should return null if an invalid id is used', function() {
            var res = gam.getShipyardFromName('banana')
            expect(res).toBe(null)
        })
        
    })
    
    describe('getShipyardFromUnit', function() {
             
        it('should return a shipyard from a unit', function(){
            var res = gam.getShipyardFromUnit(2)
            expect(res.id).toBe(2)
        })
        
        it('should return null if an invalid id is used', function() {
            var res = gam.getShipyardFromUnit('banana')
            expect(res).toBe(null)
        })
        
    })
    
    describe('getTaskforceFromUnit', function() {
             
        it('should return a taskforce from a unit', function(){
            var res = gam.getTaskforceFromUnit(2)
            expect(res.id).toBe(2)
        })
        
        it('should return null if an invalid id is used', function() {
            var res = gam.getTaskforceFromUnit('banana')
            expect(res).toBe(null)
        })
        
    })
    
    describe('getUnitForShipyard', function() {
             
        it('should find a unit in country and return it', function(){
            var res = gam.getUnitForShipyard(1, 1, 1)
            expect(res.id).toBe(1)
        })
        
        it('should return a unit with x and y values matching those sent', function(){
            var x = 2; var y = 2
            var res = gam.getUnitForShipyard(2, x, y)
            expect(res.holderX).toBe(2)
            expect(res.holderY).toBe(2)
        })
        
        it('should return null if an invalid id is used', function() {
            var res = gam.getUnitForShipyard('banana')
            expect(res).toBe(null)
        })
        
    })
})