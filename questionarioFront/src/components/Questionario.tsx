import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import { formAnswer, FormData, questionariosAtom } from '../lib/atom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Modal from './Modal';

interface Question {
  id: number;
  type: string;
  question: string;
  choices: string[];
  correctChoice: string;
  questionarioId: number;
}

interface Questionario {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

function Questionario({ questionarioId }: { questionarioId: string }) {
  const questionarioIdNumber = parseInt(questionarioId, 10);
  const [questionario, setQuestionario] = useState<Questionario | null>(null);
  const [answer, setAnswer] = useAtom(formAnswer);
  const [isModalVisible, setModalVisible] = useState(false);
  const [submittedAnswers, setSubmittedAnswers] = useState<FormData | null>(null);
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: answer,
  });

  const [questionariosBack] = useAtom(questionariosAtom);

  useEffect(() => {
    const cachedQuestionario = questionariosBack.find((q) => q.id === questionarioIdNumber);
    if (cachedQuestionario) {
      setQuestionario(cachedQuestionario);
    } else {
      const fetchQuestionario = async () => {
        try {
          const response = await axios.get<Questionario[]>(`http://192.168.100.211:8080/questionarios`);
          const questionarioFiltrado = response.data.find((q) => q.id === questionarioIdNumber);
          setQuestionario(questionarioFiltrado || null);
        } catch (error) {
          console.error('Error fetching questionario:', error);
        }
      };
      fetchQuestionario();
    }
  }, [questionarioIdNumber, questionariosBack]);

  useEffect(() => {
    if (questionario) {
      reset(answer);
    }
  }, [questionario, reset, answer]);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(`http://192.168.100.211:8080/respostas/submit`, {
        usuarioId: 1, // Preencha com o ID do usuário logado ou alguma lógica para identificar o usuário
        questionarioId: questionarioIdNumber,
        respostas: Object.keys(data.questions).map((key) => ({
          questionId: parseInt(key.split('.')[1], 10),
          resposta: data.questions[key as keyof typeof data.questions], // Utilização da notação de índice explícito
        })),
      });
  
      setSubmittedAnswers(data);
      setModalVisible(true);
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    reset({});
  };

  if (!questionario || !questionario.questions) {
    return <div>Carregando...</div>;
  }

  const { questions } = questionario;

  return (
    <div className='min-h-screen bg-gray-900 text-white'>
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='p-4 text-4xl font-bold text-center'
      >
        {questionario.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='text-center font-semibold text-2xl mb-8'
      >
        {questionario.description}
      </motion.p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {questions.map((question, questionIndex) => (
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
              {question.type === 'OBJETIVA' && (
                <div className='flex flex-col space-y-2'>
                  {question.choices.map((choice, index) => (
                    <label
                      key={`${question.id}-${index}`} // Chave única para cada input
                      className={`p-2 rounded-md cursor-pointer flex items-center space-x-3 ${
                        answer[`questions.${question.id}`] === choice ? 'bg-blue-900 text-white' : 'bg-gray-700'
                      }`}
                    >
                      <input
                        {...register(`questions.${question.id}`, { required: true })}
                        type="radio"
                        value={choice}
                        className='hidden'
                      />
                      <span>{choice}</span>
                    </label>
                  ))}
                </div>
              )}
              {question.type === 'DISCURSIVA' && (
                <div className='bg-gray-700 p-3 mt-2 rounded-md'>
                  <textarea
                    {...register(`questions.${question.id}`, { required: true })}
                    className='w-full p-2 bg-gray-900 text-white border border-gray-600 rounded-md'
                    rows={4}
                    placeholder='Digite sua resposta aqui...'
                    defaultValue={answer[`questions.${question.id}`]}
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

      {isModalVisible && submittedAnswers && (
        <Modal onClose={handleModalClose}>
          <div className='p-4'>
            <h2 className='text-2xl font-bold mb-4'>Respostas enviadas com sucesso!</h2>
            <div>
              {questions.map((question) => (
                <div key={question.id} className='mb-4'>
                  <h3 className='font-semibold'>{question.question}</h3>
                  <p>
                    <strong>Sua resposta: </strong>
                    {submittedAnswers[`questions.${question.id}`]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Questionario;
