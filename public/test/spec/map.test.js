describe('WP.Map', function() {
    
    var m
    var h1, h2, h3
    
    
    beforeEach(function() {
        m = new WP.Map()
        h1 = {id: 'Test1', size: 50, width: 50, pixelPoint: {x : 100, y: 100}}
        h2 = {id: 'Test2', size: 50, width: 50, pixelPoint: {x : 150, y: 100}}
        h3 = {id: 'Test3', size: 50, width: 50, pixelPoint: {x : 100, y: 180}}
        m.hexes = [h1, h2, h3]
 
    })
    
    describe('createHexes', function(){
        it('should fill the hex array with 2041 hexes with map Id 1', function() {
            m.createHexes(1)
            expect(m.hexes.length).toBe(2041)
        })
    })
    
    describe('getHexAt', function() {
        it('should return the hex under the current mouse cursor position', function (){
            var mockPoint = {x: 110, y: 200}
            var hex = m.getHexAt(mockPoint)
            expect(hex.id).toMatch('Test3')
        })
        it('should return null if not over a valid hex', function (){
            var mockPoint = {x: 400, y: 400}
            var hex = m.getHexAt(mockPoint)
            expect(hex).toBe(null)
        })
    })
    
})