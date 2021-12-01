import path from 'path';
import fs from 'fs';

export const parseNumber = (value: any) => parseInt(value)
export const readFile = (fileName: string) => fs.readFileSync(path.join(__dirname, `.././${fileName}`), 'utf-8');
export const mapPrint = (value: any) => { console.log(value); return value }
export const add = (accumulator: number, a: number) => accumulator + a

