import { atomWithStorage } from 'jotai/utils'

export type FormData = {
  [key: string]: string;
}

export const formAnswer = atomWithStorage<FormData>('answer', {
  questao1: '',
  questao2: '',
  questao3: ''
})