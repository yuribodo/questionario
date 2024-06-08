import { atomWithStorage } from 'jotai/utils'

export type FormData = {
  questao1: string;
  questao2: string;
  questao3: string;
}

export const formAnswer = atomWithStorage<FormData>('answer', {
  questao1: '',
  questao2: '',
  questao3: ''
})