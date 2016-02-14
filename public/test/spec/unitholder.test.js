/* global beforeEach */
/* global expect */
/* global it */
/* global describe */
describe('WP.UnitHolder', function(){
    
    var holder
    
    beforeEach(function(){
        holder = new WP.UnitHolder()
    })
    
      
    it('should exist', function(){

        expect(holder).toBeDefined()
    })
        
  
    
})