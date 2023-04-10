const mdLinks = require('../index');

describe('Testing mdLinks function', () => {

  it('returns a Promise', () => {
    const mdResult =  mdLinks('mdLinks.md')
    expect(mdResult).toBeInstanceOf(Promise);
  });

  it('should end when path does not exists', async () => {
    await mdLinks('anypath.txt').catch(error => {
      expect(error).toBe('Path does not exists, please provide a valid path')
    });
  });

  it('should end when path is not type markdown', async () => {
    await mdLinks('cli.js').catch(error => {
      expect(error).toBe('File is not type markdown')
    });
  });

  it('should end when file doesnt has content', async () => {
    await mdLinks('emptyfile.md').catch(error => {
      expect(error).toBe('No content to read')
    });
  });

  it('should end when file doesnt has links', async () => {
    await mdLinks('nolinkfile.md', {validate: false}).catch(error => {
      expect(error).toBe('This file does not contain links')
    });
  });

  it('should end when we want to validate and file doesnt has links', async () => {
    await mdLinks('nolinkfile.md', {validate: true}).catch(error => {
      expect(error).toBe('This file does not contain links')
    });
  });

  it('should end when we want to stats and file doesnt has links', async () => {
    await mdLinks('nolinkfile.md', 'stats').catch(error => {
      expect(error).toBe('This file does not contain links')
    });
  });

  it('resolves an object with stats of file links', async () => {
    await mdLinks('testfile.md', 'stats').then(res => {
      expect(res).toEqual({
        Total: 1,
        Unique: 1
      });
    });
  });

  it('resolves an object with validated stats of file links', async () => {
    await mdLinks('testfile.md', {validate: true}, 'stats').then(res => {
      expect(res).toEqual({
        Total: 1,
        Unique: 1,
        Broken: 1
      });
    });
  });

  it('resolve an array of objects with 3 propertys when they are no options', async () => {
    await mdLinks('testfile.md', {validate:false}).then(res => {
      expect(res).toEqual([{
        file: 'C:\\Users\\Loren\\DEV003-md-links\\testfile.md',
        text: 'json users',
        href: 'https://jsonplaceholder.typicode.com/usrs'
      }]);
    });
  });

});
