import { urlify } from 'utils/urlify'

describe('urlify', () => {
  it('replaces spaces with dashes', () => {
    const path = 'this is a test'
    const result = urlify(path)
    expect(result).toBe('this-is-a-test')
  })

  it('converts string to lowercase', () => {
    const path = 'This Is A Test'
    const result = urlify(path)
    expect(result).toBe('this-is-a-test')
  })

  it('replaces " & " with single dash', () => {
    const path = 'apples & oranges'
    const result = urlify(path)
    expect(result).toBe('apples-oranges')
  })
})
