import { readFile } from '../utils'
import { partOne, partTwo } from './sonar-sweep'

const sample = readFile('day1/sample')

describe('Sonar Sweep 🎅', () => {
  test('partOne() with sample should equal 7', () => {
    expect(partOne(sample)).toBe(7);
  });

  test('partTwo() with sample should equal 5', () => {
    expect(partTwo(sample)).toBe(5);
  });
})

