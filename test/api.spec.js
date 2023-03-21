const func = require('../api');
console.log(func)

describe('Testing pathExistence', () => {

    it('should return true if path exists', () => {
      expect(func.pathExistence('mdLinks.md')).toEqual(true)
    });

    it('should return false if there is no path', () => {
        expect(func.pathExistence('')).toEqual(false)
    });
    
    it('should return false if path does not exists', () => {
        expect(func.pathExistence('abasop.js')).toEqual(false)
    });
  });
  
describe('Testing if the path is Absolute', () => {

    it('should return true if path is absolute', () => {
        expect(func.absOrRel('C:\\Users\\Marce\\Projects\\index.js')).toEqual(true)
      });
  
      it('should return false if path is relative', () => {
          expect(func.absOrRel('anFile.js')).toEqual(false)
      });

      it('should return false if path is not a string', () => {
        expect(func.absOrRel('')).toEqual(false)
      });
})
