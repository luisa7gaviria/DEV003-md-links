const mdLinks = require('../index');

describe('Testing mdLinks function', () => {

  it('should end when path does not exists', async () => {
    await mdLinks('anypath.txt').catch(error => {
      expect(error).toBe('Path does not exists')
    })
  });

  it('should end when path is not type markdown', async () => {
    await mdLinks('cli.js').catch(error => {
      expect(error).toBe('File is not type markdown')
    })
  })

});
