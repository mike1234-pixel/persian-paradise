import { normalize } from './normalize' // Import the normalize function

describe('normalize', () => {
  it('removes diacritics from characters', () => {
    const string = 'résümé'
    const result = normalize(string)
    expect(result).toBe('resume')
  })

  it('converts string to lowercase', () => {
    const string = 'TEST'
    const result = normalize(string)
    expect(result).toBe('test')
  })

  it('handles empty string', () => {
    const string = ''
    const result = normalize(string)
    expect(result).toBe('')
  })

  it('handles string with no diacritics or special characters', () => {
    const string = 'hello'
    const result = normalize(string)
    expect(result).toBe('hello')
  })
})
