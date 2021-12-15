import { readFile } from '../utils'
import { partOne } from './binary-diagnostic'

const sample = readFile('day3/sample')

describe('Binary Diagnostic🎅', () => {
  test('partOne() with sample should equal 198', () => {
    expect(partOne(sample)).toBe(198);
  });

  //test('partTwo() with sample should equal 230', () => {
  //  expect(partOne(sample)).toBe(230);
  //});
})
