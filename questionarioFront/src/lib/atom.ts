import { atom } from 'jotai';

export interface Question {
  id: number;
  type: string;
  question: string;
  choices: string[];
  correctChoice: string;
  questionarioId: number;
}

export interface Questionario {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

export interface FormData {
  [key: string]: string;
}

export const formAnswer = atom<FormData>({});

export const questionariosAtom = atom<Questionario[]>([]);


export const darkThemeAtom = atom(true);
export const searchQueryAtom = atom<string>('');