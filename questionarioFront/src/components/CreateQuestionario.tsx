import React, { useState } from 'react';
import axios from 'axios';

interface Question {
  type: 'objetiva' | 'discursiva';
  question: string;
  choices: string[];
  correctChoice: string;
}

const CreateQuestionario = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    { type: 'objetiva', question: '', choices: [], correctChoice: '' }
  ]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleQuestionChange = (index: number, field: keyof Omit<Question, 'choices'>, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value as any;
    setQuestions(newQuestions);
  };

  const handleChoiceChange = (index: number, choiceIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].choices[choiceIndex] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { type: 'objetiva', question: '', choices: [], correctChoice: '' }]);
  };

  const addChoice = (index: number) => {
    const newQuestions = [...questions];
    newQuestions[index].choices.push('');
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://192.168.100.211:8080/questionarios/with-questions', {
        title,
        description,
        questions,
      });
      console.log('Questionário criado com sucesso:', response.data);

      // Exibir mensagem de sucesso
      setSuccessMessage('Questionário criado com sucesso! 🎉');

      // Redefinir o formulário
      setTitle('');
      setDescription('');
      setQuestions([{ type: 'objetiva', question: '', choices: [], correctChoice: '' }]);

      // Remover mensagem de sucesso após 5 segundos
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (error) {
      console.error('Erro ao criar questionário:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-800 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Criar Questionário</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Título</label>
          <input
            type="text"
            placeholder="Título do questionário"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 bg-slate-900 border border-slate-600 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Descrição</label>
          <textarea
            placeholder="Descrição do questionário"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 bg-slate-900 border border-slate-600 rounded"
            required
          ></textarea>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Perguntas</h2>
          {questions.map((question, index) => (
            <div key={index} className="mb-6 p-4 bg-slate-700 rounded">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Tipo</label>
                <select
                  value={question.type}
                  onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
                  className="w-full p-2 bg-slate-900 border border-slate-600 rounded"
                  required
                >
                  <option value="objetiva">Objetiva</option>
                  <option value="discursiva">Discursiva</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Pergunta</label>
                <input
                  type="text"
                  placeholder="Texto da pergunta"
                  value={question.question}
                  onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                  className="w-full p-2 bg-slate-900 border border-slate-600 rounded"
                  required
                />
              </div>
              {question.type === 'objetiva' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Opções</label>
                  {question.choices.map((choice, choiceIndex) => (
                    <input
                      key={choiceIndex}
                      type="text"
                      placeholder={`Opção ${choiceIndex + 1}`}
                      value={choice}
                      onChange={(e) => handleChoiceChange(index, choiceIndex, e.target.value)}
                      className="w-full p-2 mb-2 bg-slate-900 border border-slate-600 rounded"
                      required
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => addChoice(index)}
                    className="w-full p-2 bg-slate-600 border border-slate-500 rounded"
                  >
                    Adicionar Opção
                  </button>
                </div>
              )}
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Resposta Correta</label>
                <input
                  type="text"
                  placeholder="Resposta correta"
                  value={question.correctChoice}
                  onChange={(e) => handleQuestionChange(index, 'correctChoice', e.target.value)}
                  className="w-full p-2 bg-slate-900 border border-slate-600 rounded"
                  required
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addQuestion}
            className="w-full p-2 bg-slate-600 border border-slate-500 rounded mt-4"
          >
            Adicionar Pergunta
          </button>
        </div>
        <button type="submit" className="w-full p-2 bg-green-600 border border-green-500 rounded mt-6">
          Criar Questionário
        </button>
      </form>
      {successMessage && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded shadow-lg animate-bounce">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default CreateQuestionario;
