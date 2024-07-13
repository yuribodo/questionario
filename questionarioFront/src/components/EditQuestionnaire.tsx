import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  TextField,
  Button,
  Container,
  Paper,
  Snackbar,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { darkThemeAtom } from '../lib/atom';

const api = process.env.API_LINK;

interface Questionnaire {
  id: string;
  title: string;
  description: string;
}

const EditQuestionnaire = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null);
  const [darkTheme] = useAtom(darkThemeAtom);
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

  const handleSave = async () => {
    try {
      if (!questionnaire || !questionnaire.title || !questionnaire.description) {
        setErrorMessage('Title and description are required');
        return;
      }

      const response = await axios.put(`${api}/questionarios/${questionnaire.id}`, questionnaire);
      if (response.status === 200) {
        setSuccessMessage('Questionário atualizado com sucesso! 🎉');
        setTimeout(() => {
          setSuccessMessage(null);
          navigate('/dashboard'); // Navegar para /dashboard após sucesso
        }, 5000);
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
    <div className={`min-h-screen gray p-8 ${darkTheme ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
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
