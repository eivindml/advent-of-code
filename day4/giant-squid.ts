import { readFile, splitNewline, parseNumber, mult, splitChars, splitComma, splitBlankLines, splitSpace, transpose, add } from '../utils'
import { flow, pipe } from 'fp-ts/lib/function'
import { map, filter, filterMap, flatten, some, every, reduce, foldMap, reverse } from 'fp-ts/lib/Array'
import { not, and, or } from 'fp-ts/lib/Predicate'

/** Part one */

const input = readFile('day4/input')

const randomNumbers = pipe(
  input,
  splitNewline,
  (lines => lines[0]),
  splitComma,
  map(parseNumber)
)

const bingoBoards = pipe(
  input,
  splitBlankLines,
  (lines => lines.slice(1)),
  map(splitNewline),
  map(map(line => splitSpace(line))),
  map(map(map(parseNumber))),
  map(map(filter(not(isNaN))))
)



const checkWinnerHorizontal = (board: number[][]) => some((input: number[]) => every((n: number) => n == -1)(input))(board)
const checkWinnerVertical = flow(transpose, checkWinnerHorizontal)
const checkWinner = or(checkWinnerHorizontal)(checkWinnerVertical)

const findSolution = (boards: number[][][], randomNumbers: number[]) => reduce({ boards, winningNumber: -1 }, ({ boards, winningNumber }, randomNumber: number) => some((board: number[][]) =>
  checkWinner(board))(boards)
  ? { boards, winningNumber } // If we have a winner, we just return an unmodified board
  : { boards: pipe(boards, map(map(map(n => n === randomNumber ? -1 : n)))), winningNumber: randomNumber })(randomNumbers) // No winner yet, keep on 'crossing off' numbers on the bingo boards

const firstSolutionFound = findSolution(bingoBoards, randomNumbers)

const getWinningSolution = (solutions: number[][][]) => flatten(filter(checkWinner)(solutions))

const partOne = mult(pipe(getWinningSolution(firstSolutionFound.boards), map(filter(a => a >= 0)), map(reduce(0, add)), reduce(0, add)), firstSolutionFound.winningNumber)

console.log('🎅 Day 4 (a): ', partOne)

/** Part two */


const findlastSolution = (boards: number[][][], randomNumbers: number[]) => {

  return reduce({ boards, winningNumber: -1, lastWinning: null } as { boards: number[][][], winningNumber: number, lastWinning: number[][] | null }, ({ boards, winningNumber, lastWinning }, randomNumber: number) => {
    if (some((board: number[][]) =>
      checkWinner(board))(boards)) {
      console.log('RANDOM', randomNumber)
      const filterOutWinningBoard = filter(not(checkWinner))(boards)
      console.log('without winning board', filterOutWinningBoard)
      if (boards.length === 1) {
        const winningBoard = getWinningSolution(boards)
        //console.log('winning sol', winningBoard, boards.length, randomNumber)
        return { boards, winningNumber, lastWinning: winningBoard }
      }
      //console.log('sol', winningBoard, boards.length, randomNumber)
      //console.log('board', filterOutWinningRow)
      //console.log('WINNER')
      return { boards: pipe(filterOutWinningBoard, map(map(map(n => n == randomNumber ? -1 : n)))), winningNumber: randomNumber, lastWinning: null } // If we have a winner, we just return an unmodified board
    } else {
      return lastWinning === null ? { boards: pipe(boards, map(map(map(n => n == randomNumber ? -1 : n)))), winningNumber: randomNumber, lastWinning }
        : { boards, winningNumber: randomNumber, lastWinning }
    }

  })(randomNumbers) // No winner yet, keep on 'crossing off' numbers on the bingo boards

}

const lastSolutionFound = findlastSolution(bingoBoards, randomNumbers)

//const getWinningSolution = (solutions: number[][][]) => flatten(filter(checkWinner)(solutions))

const partTwo = mult(pipe(lastSolutionFound.lastWinning ?? [[]], map(filter(a => a >= 0)), map(reduce(0, add)), reduce(0, add)), lastSolutionFound.winningNumber)

console.log('🎅 Day 2 (b): ', partTwo)