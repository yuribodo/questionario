import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
const api = process.env.API_LINK;

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

interface FormData {
  [key: string]: string;
}

interface QuestionarioProps {
  questionarioId: string;
}

const Questionario: React.FC<QuestionarioProps> = ({ questionarioId }) => {
  const questionarioIdNumber = parseInt(questionarioId, 10);
  const [questionario, setQuestionario] = useState<Questionario | null>(null);
  const { register, handleSubmit, reset, watch } = useForm<FormData>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [submittedAnswers, setSubmittedAnswers] = useState<FormData | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchQuestionario = async () => {
      try {
        const response = await axios.get<Questionario>(`${api}/questionarios/${questionarioIdNumber}`);
        setQuestionario(response.data);
      } catch (error) {
        console.error('Error fetching questionario:', error);
      }
    };
    fetchQuestionario();
  }, [questionarioIdNumber]);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(`${api}/respostas/submit`, {
        usuarioId: user?.id,
        questionarioId: questionarioIdNumber.toString(),
        respostas: Object.keys(data).map((key) => ({
          questionId: parseInt(key, 10),
          resposta: data[key],
        })),
      });

      setSubmittedAnswers(data);
      setModalVisible(true);
      console.log(response);
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    reset({});
  };

  if (!questionario) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  const selectedAnswers = watch();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <h1 className="p-4 text-4xl font-bold text-center">{questionario.title}</h1>
      <p className="text-center font-semibold text-2xl mb-8">{questionario.description}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {questionario.questions.map((question) => (
          <div key={question.id} className="flex flex-col p-3">
            <h2 className="font-semibold text-2xl mb-3">{`Questão ${question.id}`}</h2>
            <div className="bg-gray-800 p-4 rounded-md mb-4">
              <p>{question.question}</p>
            </div>
            {question.type === 'OBJETIVA' && (
              <div className="flex flex-col space-y-2">
                {question.choices.map((choice, index) => (
                  <label 
                    key={`${question.id}-${index}`} 
                    className={`p-2 rounded-md cursor-pointer flex items-center space-x-3 ${selectedAnswers[question.id.toString()] === choice ? 'bg-blue-900 text-white' : 'bg-gray-700'}`}
                  >
                    <input {...register(question.id.toString(), { required: true })} type="radio" value={choice} className="hidden" />
                    <span>{choice}</span>
                  </label>
                ))}
              </div>
            )}
            {question.type === 'DISCURSIVA' && (
              <textarea 
                {...register(question.id.toString(), { required: true })} 
                className="w-full p-2 bg-gray-900 text-white border border-gray-600 rounded-md" 
                rows={4} 
                placeholder="Digite sua resposta aqui..."
              ></textarea>
            )}
          </div>
        ))}

        <button type="submit" className="bg-red-500 rounded-lg p-2 mt-4 w-full text-center cursor-pointer">
          Enviar Respostas
        </button>
      </form>

      {isModalVisible && submittedAnswers && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg text-black">
            <h2 className="text-2xl font-bold mb-4">Respostas enviadas com sucesso!</h2>
            {questionario.questions.map((question) => (
              <div key={question.id} className="mb-4">
                <h3 className="font-semibold">{question.question}</h3>
                <p><strong>Sua resposta: </strong>{submittedAnswers[question.id]}</p>
              </div>
            ))}
            <button onClick={handleModalClose} className="bg-blue-500 p-2 rounded text-white">
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Questionario;
