import { readFile } from '../utils'
import { partOne, partTwo, partTwoAlt } from './dive'

const sample = readFile('day2/sample')

describe('Dive 🎅', () => {
  test('partOne() with sample should equal 150', () => {
    expect(partOne(sample)).toBe(150);
  });
  test('partTwo() with sample should equal 900', () => {
    expect(partTwo(sample)).toBe(900);
  });
  test('partTwoAlt() with sample should equal 900', () => {
    expect(partTwoAlt(sample)).toBe(900);
  });
})

