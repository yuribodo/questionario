import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  TextField,
  Button,
  Container,
  Paper,
  Snackbar,
  Typography
} from '@mui/material';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { darkThemeAtom } from '../lib/atom';
//import { useMediaQuery } from 'react-responsive';

const api = process.env.API_LINK;

interface Question {
  type: 'OBJETIVA' | 'DISCURSIVA';
  question: string;
  choices: string[];
  correctChoice: string;
}

interface Questionnaire {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

const EditQuestionnaire = () => {
  const { id } = useParams<{ id?: string }>();
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null);
  const [darkTheme] = useAtom(darkThemeAtom);
  //const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      try {
        const response = await axios.get(`${api}/questionarios/${id}`);
        if (response.data) {
          const fetchedQuestionnaire: Questionnaire = response.data;
          setQuestionnaire(fetchedQuestionnaire);
        } else {
          setErrorMessage('Failed to fetch questionnaire');
        }
      } catch (error) {
        setErrorMessage('Error fetching questionnaire');
      }
    };

    if (id) {
      fetchQuestionnaire();
    }
  }, [id]);

  const handleQuestionChange = (index: number, field: keyof Question, value: string) => {
    if (questionnaire) {
      const newQuestions = [...questionnaire.questions];
      newQuestions[index] = {
        ...newQuestions[index],
        [field]: value,
      };
      setQuestionnaire({ ...questionnaire, questions: newQuestions });
    }
  };

  const handleChoiceChange = (index: number, choiceIndex: number, value: string) => {
    if (questionnaire) {
      const newQuestions = [...questionnaire.questions];
      newQuestions[index].choices[choiceIndex] = value;
      setQuestionnaire({ ...questionnaire, questions: newQuestions });
    }
  };

  const addChoice = (index: number) => {
    if (questionnaire) {
      const newQuestions = [...questionnaire.questions];
      newQuestions[index].choices.push('');
      setQuestionnaire({ ...questionnaire, questions: newQuestions });
    }
  };

  const handleSave = async () => {
    try {
      if (!questionnaire || !questionnaire.title || !questionnaire.description) {
        setErrorMessage('Title and description are required');
        return;
      }

      const response = await axios.put(`${api}/questionarios/${questionnaire.id}`, questionnaire);
      if (response.status === 200) {
        setSuccessMessage('Questionário atualizado com sucesso! 🎉');
        setTimeout(() => setSuccessMessage(null), 5000);
      } else {
        setErrorMessage('Failed to update questionnaire');
      }
    } catch (error) {
      setErrorMessage('Error saving questionnaire');
    }
  };

  if (!questionnaire) {
    return <p className={`text-center ${darkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Carregando...</p>;
  }

  return (
    <div className={`gray p-8 ${darkTheme ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <Container component="main" maxWidth="md">
        <Paper elevation={3} style={{ padding: '2rem', backgroundColor: darkTheme ? '#1e293b' : 'white', color: darkTheme ? 'white' : 'black' }}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <TextField
              label="Título"
              variant="outlined"
              fullWidth
              margin="normal"
              value={questionnaire.title}
              onChange={(e) => setQuestionnaire({ ...questionnaire, title: e.target.value })}
              InputLabelProps={{ style: { color: darkTheme ? 'white' : 'black' } }}
              InputProps={{ style: { color: darkTheme ? 'white' : 'black' } }}
            />
            <TextField
              label="Descrição"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={questionnaire.description}
              onChange={(e) => setQuestionnaire({ ...questionnaire, description: e.target.value })}
              InputLabelProps={{ style: { color: darkTheme ? 'white' : 'black' } }}
              InputProps={{ style: { color: darkTheme ? 'white' : 'black' } }}
            />
            <div>
              <Typography variant="h5" component="h2" gutterBottom>
                Perguntas
              </Typography>
              {questionnaire.questions.map((question, index) => (
                <motion.div
                  key={index}
                  className={`mb-6 p-4 ${darkTheme ? 'bg-slate-700' : 'bg-gray-200'} rounded`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <TextField
                    label="Pergunta"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={question.question}
                    onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                    InputLabelProps={{ style: { color: darkTheme ? 'white' : 'black' } }}
                    InputProps={{ style: { color: darkTheme ? 'white' : 'black' } }}
                  />
                  <div>
                    {question.choices.map((choice, choiceIndex) => (
                      <TextField
                        key={choiceIndex}
                        label={`Opção ${choiceIndex + 1}`}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={choice}
                        onChange={(e) => handleChoiceChange(index, choiceIndex, e.target.value)}
                        InputLabelProps={{ style: { color: darkTheme ? 'white' : 'black' } }}
                        InputProps={{ style: { color: darkTheme ? 'white' : 'black' } }}
                      />
                    ))}
                    <Button
                      type="button"
                      onClick={() => addChoice(index)}
                      variant="contained"
                      color="primary"
                      fullWidth
                      style={{ marginTop: '1rem' }}
                    >
                      Adicionar Opção
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
            <Button
              type="button"
              onClick={handleSave}
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: '1rem' }}
            >
              Salvar Questionário
            </Button>
          </motion.div>
          <Snackbar
            open={!!successMessage || !!errorMessage}
            autoHideDuration={5000}
            onClose={() => {
              setSuccessMessage(null);
              setErrorMessage(null);
            }}
            message={successMessage || errorMessage || ''}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          />
        </Paper>
      </Container>
    </div>
  );
};

export default EditQuestionnaire;
