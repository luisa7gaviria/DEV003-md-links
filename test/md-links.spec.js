const mdLinks = require('../index');

describe('Testing mdLinks function', () => {

  it('returns a Promise', () => {
    const mdResult =  mdLinks('mdLinks.md')
    expect(mdResult).toBeInstanceOf(Promise);
  });

  it('should end when path does not exists', async () => {
    await mdLinks('anypath.txt').catch(error => {
      expect(error).toBe('Path does not exists')
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
    await mdLinks('nolinkfile.md').catch(error => {
      expect(error).toBe('This file does not contain links')
    });
  });
  
});
