import { readFile } from '../utils'
import { partOne } from './hydrothermal-venture'

const sample = readFile('day5/sample')

describe('Day 5: Hydrothermal Venture 🎅', () => {
  test('partOne() with sample should equal 5', () => {
    expect(partOne(sample)).toBe(5);
  });
})

