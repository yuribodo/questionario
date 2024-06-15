import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Container,
  Paper,
  Snackbar,
} from '@mui/material';

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
    <div className=' bg-gray-800 gray p-8'>
        <Container component="main" maxWidth="md">
      <Paper elevation={3} style={{ padding: '2rem', backgroundColor: '#1e293b', color: 'white' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Criar Questionário
          </Typography>
        </motion.div>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TextField
            label="Título"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />
          <TextField
            label="Descrição"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />
          <div>
            <Typography variant="h5" component="h2" gutterBottom>
              Perguntas
            </Typography>
            {questions.map((question, index) => (
              <motion.div
                key={index}
                className="mb-6 p-4 bg-slate-700 rounded"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FormControl variant="outlined" fullWidth margin="normal">
                  <InputLabel>Tipo</InputLabel>
                  <Select
                    value={question.type}
                    onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
                    label="Tipo"
                    required
                    style={{ color: 'white' }}
                  >
                    <MenuItem value="objetiva">Objetiva</MenuItem>
                    <MenuItem value="discursiva">Discursiva</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Pergunta"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={question.question}
                  onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                  required
                  InputLabelProps={{ style: { color: 'white' } }}
                  InputProps={{ style: { color: 'white' } }}
                />
                {question.type === 'objetiva' && (
                  <div>
                    <Typography variant="body1" component="label" style={{ display: 'block', marginBottom: '0.5rem' }}>
                      Opções
                    </Typography>
                    {question.choices.map((choice, choiceIndex) => (
                      <TextField
                        key={choiceIndex}
                        label={`Opção ${choiceIndex + 1}`}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={choice}
                        onChange={(e) => handleChoiceChange(index, choiceIndex, e.target.value)}
                        required
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white' } }}
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
                      Adicionar Pergunta
                    </Button>
                    <FormControl variant="outlined" fullWidth margin="normal" style={{ marginTop: '1rem' }}>
                      <InputLabel>Resposta Correta</InputLabel>
                      <Select
                        value={question.correctChoice}
                        onChange={(e) => handleQuestionChange(index, 'correctChoice', e.target.value)}
                        label="Resposta Correta"
                        required
                        style={{ color: 'white' }}
                      >
                        <MenuItem value="">Selecione a resposta correta</MenuItem>
                        {question.choices.map((choice, choiceIndex) => (
                          <MenuItem key={choiceIndex} value={choice}>
                            {choice}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                )}
              </motion.div>
            ))}
            <Button
              type="button"
              onClick={() => addQuestion()}
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: '1rem' }}
            >
              Adicionar Pergunta
            </Button>
          </div>
          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            style={{ marginTop: '2rem' }}
          >
            Criar Questionário
          </Button>
        </motion.form>
        {successMessage && (
          <Snackbar
            open={true}
            autoHideDuration={5000}
            onClose={() => setSuccessMessage(null)}
            message={successMessage}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          />
        )}
      </Paper>
    </Container>
    </div>
    
  );
};

export default CreateQuestionario;
