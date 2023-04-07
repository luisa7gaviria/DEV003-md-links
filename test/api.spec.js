const func = require('../api');


describe('Testing pathExistence function', () => {

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
  
describe('Testing absOrRel function', () => {

  it('should return path if its absolute', () => {
    expect(func.absOrRel('C:\\Users\\Marce\\Projects\\index.js')).toEqual('C:\\Users\\Marce\\Projects\\index.js')
  });
  
  it('should return absolute path if path is relative', () => {
    expect(func.absOrRel('anFile.js')).toEqual('C:\\Users\\Loren\\DEV003-md-links\\anFile.js')
  });
});

describe('Testing pathExtension function', () => {

  it('should return file extension .json', () => {
    expect(func.pathExtension('testFile.json')).toBe(undefined)
  });

  it('should return file extension .md', () => {
    expect(func.pathExtension('testFile.md')).toBe('testFile.md')
  });

  it('should return nothing when there isnt a file ', () => {
    expect(func.pathExtension('')).toBe(undefined)
  });
});

describe('Testing readFile function', () => {
  
  it('should return file content', async () => {
    await func.readFile('randomFile.md').then(data => {
      expect(data).toBe(data)
    });
  });

  it('should return error message if file is empty', async () => {
    await func.readFile('random.md').catch(err => {
      expect(err).toBe('No content to read')
    });
  });
});

describe('Testing getFileLinks function', () => {

  it('should resolve an array of objects with text, file and link', async () => {
    await func.getFileLinks('Hi, [link test](https://jsonplaceholder.typicode.com)', 'C:\\Users\\Loren\\DEV003-md-links\\anypath.md')
    .then(data => {
      expect(data).toEqual([{
        file: 'C:\\Users\\Loren\\DEV003-md-links\\anypath.md',
        text: 'link test',
        href: 'https://jsonplaceholder.typicode.com'
      }]);
    });
  });

  it('should return error when file does not have links', async () => {
    await func.getFileLinks('an file content').catch(err => {
      expect(err).toBe('This file does not contain links')
    });
  });
});

describe('Testing statsArrLinks function', () => {
  const objectTest = [{name: 'joseph', age: 22, status: 404}, {name: 'mary', age: 22},{name: 'esther', age: 22}]

  it('should return stats with broken property', () => {
    expect(func.statsArrLinks(objectTest, 'name', true)).toEqual({Total:3, Unique:3, Broken:1})
  });

  it('should return total of ages in the array and ages that are unique', () => {
    expect(func.statsArrLinks(objectTest, 'age')).toEqual({Total:3, Unique:1})
  });
});
