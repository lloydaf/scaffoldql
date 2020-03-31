const { CLOSING_CURLY, OPENING_CURLY, SPACE, NEWLINE, EMPTY_STRING } = require('../src/constants')
const { isBreakPoint } = require('../src/tokenizer')

describe('tests for isBreakPoint', () => {
  it('should exist and be a function', () => {
    expect(isBreakPoint).toBeTruthy()
    expect(typeof isBreakPoint).toEqual('function')
  })

  it('should be callable', () => {
    const obj = { isBreakPoint }
    spyOn(obj, 'isBreakPoint')
    obj.isBreakPoint('b')
    expect(obj.isBreakPoint).toHaveBeenCalled()
  })

  it('should only accept strings', () => {
    expect(isBreakPoint(5)).toBeFalsy()
    expect(isBreakPoint({})).toBeFalsy()
    expect(isBreakPoint([Symbol])).toBeFalsy()
    expect(isBreakPoint(function(){})).toBeFalsy()
    expect(isBreakPoint(undefined)).toBeFalsy()
    expect(isBreakPoint(null)).toBeFalsy()
  })

  it('should detect break point characters', () => {
    expect(isBreakPoint(CLOSING_CURLY)).toBeTruthy()
    expect(isBreakPoint(OPENING_CURLY)).toBeTruthy()
    expect(isBreakPoint(SPACE)).toBeTruthy()
    expect(isBreakPoint(NEWLINE)).toBeTruthy()
    expect(isBreakPoint(EMPTY_STRING)).toBeTruthy()
  })

  it('should only match characters, not strings', () => {
    expect(isBreakPoint(OPENING_CURLY+CLOSING_CURLY)).toBeFalsy()
  })
})