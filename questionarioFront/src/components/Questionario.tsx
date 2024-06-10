import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import { formAnswer, FormData } from '../lib/atom';
import questionarioData from '../../questionario.json';

type SelectedOption = {
  [key: string]: string;
};

function Questionario({ questionarioId }: { questionarioId: string }) {
  const questionarioIdNumber = parseInt(questionarioId, 10);
  const [questionario, setQuestionario] = useState<any | null>(questionarioData.questionarios);
  const [answer, setAnswer] = useAtom(formAnswer);
  const { register, handleSubmit, watch, reset } = useForm<FormData>({
    defaultValues: answer // Define os valores padrão a partir do estado de resposta
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    setAnswer(data);
  };

  useEffect(() => {
    if (questionario) {
      reset(answer);
    }
  }, [questionario, reset, answer]);

  const selectedOption = watch() as SelectedOption;

  const questionarioFiltrado = questionario ? questionario.find((q: any) => q.id === questionarioIdNumber) : null;

  console.log("questionarioId: ", questionarioId);
  console.log("questionarioIdNumber: ", questionarioIdNumber);
  console.log("questionarioData: ", questionarioData);
  console.log("questionario: ", questionario);
  console.log("questionarioFiltrado: ", questionarioFiltrado);

  if (!questionarioFiltrado || !questionarioFiltrado.questions) {
    return <div>Carregando...</div>;
  }

  const { questions } = questionarioFiltrado;

  return (
    <div className='min-h-screen bg-gray-900 text-white'>
      <h1 className='p-4 text-4xl font-bold text-center'>{questionarioFiltrado.title}</h1>
      <p className='text-center font-semibold text-2xl'>{questionarioFiltrado.description}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="p-4">
        {questions.map((question: any) => (
          <div key={question.id} className="mb-6">
            <p className="text-xl mb-2">{question.question}</p>
            {question.type === 'objetiva' && (
              <div className="space-y-2">
                {question.choices.map((choice: string, index: number) => (
                  <label key={index} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value={choice}
                      {...register(`questions.${question.id}`)}
                      className="form-radio"
                    />
                    <span>{choice}</span>
                  </label>
                ))}
              </div>
            )}
            {question.type === 'discursiva' && (
              <textarea
                {...register(`questions.${question.id}`)}
                className="w-full p-2 bg-gray-700 rounded"
                rows={4}
              />
            )}
          </div>
        ))}

        <div className="text-center">
          <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded">
            Enviar Respostas
          </button>
        </div>
      </form>
    </div>
  );
}

export default Questionario;
