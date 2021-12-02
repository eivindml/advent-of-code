import path from 'path';
import fs from 'fs';

export const parseNumber = (value: any) => parseInt(value)
export const readFile = (fileName: string) => fs.readFileSync(path.join(__dirname, `.././${fileName}`), 'utf-8');
export const newLine = /\r?\n/
export const mapPrint = (value: any) => { console.log(value); return value }
export const add = (a: number, b: number) => a + b
export const mult = (a: number, b: number) => a * b
export const sub = (a: number, b: number) => a - b
export const div = (a: number, b: number) => a / b
const splitFactory = (delimeter: string | RegExp) => (input: string) => input.split(delimeter)
export const splitSpace = splitFactory(' ')
export const splitNewline = splitFactory(newLine)
