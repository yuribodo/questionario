import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import { formAnswer, FormData } from '../lib/atom';
import { motion } from 'framer-motion';
import questionarioData from '../../questionario.json';

type SelectedOption = {
  [key: string]: string;
};

function Questionario({ questionarioId }: { questionarioId: string }) {
  const questionarioIdNumber = parseInt(questionarioId, 10);
  const [questionario] = useState<any | null>(questionarioData.questionarios);
  const [answer, setAnswer] = useAtom(formAnswer);
  const { register, handleSubmit, watch, reset } = useForm<FormData>({
    defaultValues: answer
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

  if (!questionarioFiltrado || !questionarioFiltrado.questions) {
    return <div>Carregando...</div>;
  }

  const { questions } = questionarioFiltrado;

  return (
    <div className='min-h-screen bg-gray-900 text-white'>
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='p-4 text-4xl font-bold text-center'
      >
        {questionarioFiltrado.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='text-center font-semibold text-2xl mb-8'
      >
        {questionarioFiltrado.description}
      </motion.p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {questions.map((question: any, questionIndex: number) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: questionIndex * 0.2 }}
            className='flex flex-col'
          >
            <div className='p-3'>
              <h2 className='font-semibold text-2xl mb-3'>{`Questão ${question.id}`}</h2>
              <div className='bg-gray-800 p-4 rounded-md mb-4'>
                <p>{question.question}</p>
              </div>
              {question.type === 'objetiva' && (
                <div className='flex flex-col space-y-2'>
                  {question.choices.map((choice: string, index: number) => (
                    <label
                      key={index}
                      className={`p-2 rounded-md cursor-pointer flex items-center space-x-3 ${
                        selectedOption[`questions.${question.id}`] === choice ? 'bg-blue-900 text-white' : 'bg-gray-700'
                      }`}
                    >
                      <input
                        {...register(`questions.${question.id}`)}
                        type="radio"
                        value={choice}
                        className='hidden'
                        onChange={(e) => {
                          const newValue = e.target.value;
                          setAnswer(prevState => ({
                            ...prevState,
                            [`questions.${question.id}`]: newValue
                          }));
                        }}
                      />
                      <span>{choice}</span>
                    </label>
                  ))}
                </div>
              )}
              {question.type === 'discursiva' && (
                <div className='bg-gray-700 p-3 mt-2 rounded-md'>
                  <textarea
                    {...register(`questions.${question.id}`)}
                    className='w-full p-2 bg-gray-900 text-white border border-gray-600 rounded-md'
                    rows={4}
                    placeholder='Digite sua resposta aqui...'
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: questions.length * 0.2 }}
          type="submit"
          className='bg-red-500 rounded-lg p-2 mt-4 w-full text-center cursor-pointer'
        >
          Enviar Respostas
        </motion.button>
      </form>
    </div>
  );
}

export default Questionario;
