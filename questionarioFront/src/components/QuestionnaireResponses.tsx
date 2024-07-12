import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const api = process.env.API_LINK;

interface Response {
  id: string;
  questionId: string;
  resposta: string;
}

const QuestionnaireResponses: React.FC = () => {
  const { questionnaireId } = useParams<{ questionnaireId: string }>();
  const [responses, setResponses] = useState<Response[]>([]);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await axios.get(`${api}/respostas/questionario/${questionnaireId}`);
        setResponses(response.data);
      } catch (error) {
        console.error('Erro ao buscar respostas do questionário:', error);
      }
    };

    fetchResponses();
  }, [questionnaireId]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Respostas do Questionário</h2>
      <div className="grid grid-cols-1 gap-4">
        {responses.map((response) => (
          <div key={response.id} className="p-4 border rounded">
            <p><strong>Resposta ID:</strong> {response.id}</p>
            <p><strong>ID da Questão:</strong> {response.questionId}</p>
            <p><strong>Resposta:</strong> {response.resposta}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionnaireResponses;
