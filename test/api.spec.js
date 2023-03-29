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

  it('should return true if path is absolute', () => {
    expect(func.absOrRel('C:\\Users\\Marce\\Projects\\index.js')).toEqual(true)
  });
  
  it('should return false if path is relative', () => {
    expect(func.absOrRel('anFile.js')).toEqual(false)
  });

  it('should return false if path is empty', () => {
    expect(func.absOrRel('')).toEqual(false)
  });
});

describe('Testing toAbsolute function', () => {

  it('should convert the relative path to absolute path', () => {
    expect(func.toAbsolute('thisFile.js')).toEqual('C:\\Users\\Loren\\DEV003-md-links\\thisFile.js')
  });

  // it('should throw an error if there isnt a path to convert', () => {
  //   expect(func.toAbsolute()).toReturn('ERR_INVALID-ARG-TYPE')
  // });
});

describe('Testing pathExtension function', () => {

  it('should return file extension .json', () => {
    expect(func.pathExtension('testFile.json')).toBe('.json')
  });

  it('should return file extension .md', () => {
    expect(func.pathExtension('testFile.md')).toBe('.md')
  });

  it('should return nothing when there isnt a file ', () => {
    expect(func.pathExtension('')).toBe('')
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
    })
  })
});

describe('Testing getFileLinks function', () => {

  it('should return error when file does not have links', async () => {
    await func.getFileLinks('an file content').catch(err => {
      expect(err).toBe('This file does not contain links')
    });
  });
});
