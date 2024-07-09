import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
//import { useUser } from "@clerk/clerk-react";
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
import { useForm, Controller } from 'react-hook-form';
import { SignedIn, SignInButton, SignUpButton, SignedOut } from '@clerk/clerk-react';
import { useAtom } from 'jotai';
import { darkThemeAtom } from '../lib/atom';
import { useMediaQuery } from 'react-responsive';

const api = process.env.API_LINK;

interface Question {
  type: 'OBJETIVA' | 'DISCURSIVA';
  question: string;
  choices: string[];
  correctChoice: string;
}

const CreateQuestionario = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: '',
      description: '',
      questions: [{ type: 'OBJETIVA', question: '', choices: [], correctChoice: '' }],
    },
  });
  const [darkTheme] = useAtom(darkThemeAtom);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  //const user = useUser()
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([
    { type: 'OBJETIVA', question: '', choices: [], correctChoice: '' },
  ]);

  const handleQuestionChange = (index: number, field: keyof Question, value: string) => {
    setQuestions(prevQuestions => {
      const newQuestions = [...prevQuestions];
      newQuestions[index] = {
        ...newQuestions[index],
        [field]: value
      };
      return newQuestions;
    });
  };

  const handleChoiceChange = (index: number, choiceIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].choices[choiceIndex] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { type: 'OBJETIVA', question: '', choices: [], correctChoice: '' }]);
  };

  const addChoice = (index: number) => {
    const newQuestions = [...questions];
    newQuestions[index].choices.push('');
    setQuestions(newQuestions);
  };

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(`${api}/questionarios/with-questions`, {
        title: data.title,
        description: data.description,
        userId: "user-id-from-clerk",
        questions: questions,
      });
      console.log('Questionário criado com sucesso:', response.data);

      setSuccessMessage('Questionário criado com sucesso! 🎉');

      // Resetar o formulário e as perguntas após o envio bem-sucedido
      reset({
        title: '',
        description: '',
        questions: [{ type: 'OBJETIVA', question: '', choices: [], correctChoice: '' }],
      });
      setQuestions([{ type: 'OBJETIVA', question: '', choices: [], correctChoice: '' }]);

      // Remover mensagem de sucesso após 5 segundos
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (error) {
      console.error('Erro ao criar questionário:', error);
    }
  };

  return (
    <div className={`gray p-8 ${darkTheme ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <SignedIn>
        <Container component="main" maxWidth="md">
          <Paper elevation={3} style={{ padding: '2rem', backgroundColor: '#1e293b', color: 'white' }}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Criar Questionário
              </Typography>
            </motion.div>
            <motion.form onSubmit={handleSubmit(onSubmit)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Controller
                name="title"
                control={control}
                rules={{ required: 'Título é obrigatório' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Título"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!fieldState.error}
                    helperText={fieldState.error ? fieldState.error.message : null}
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{ style: { color: 'white' } }}
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                rules={{ required: 'Descrição é obrigatória' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Descrição"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    error={!!fieldState.error}
                    helperText={fieldState.error ? fieldState.error.message : null}
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{ style: { color: 'white' } }}
                  />
                )}
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
                        <MenuItem value="OBJETIVA">Objetiva</MenuItem>
                        <MenuItem value="DISCURSIVA">Discursiva</MenuItem>
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
                    {question.type === 'OBJETIVA' && (
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
                          Adicionar Opção
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
      </SignedIn>
      <SignedOut>
        {isMobile ? (
          <div className="min-h-[90vh] flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4 p-6 bg-gray-800 rounded-lg shadow-lg">
              <p className="text-white text-lg font-semibold">Faça seu Login</p>
              <div className="flex flex-col space-y-3 text-white text-center border-white rounded-lg w-[200px] hover:bg-white hover:text-gray-800 transition-colors duration-300">
                <SignInButton />
                <SignUpButton />
              </div>
            </div>
          </div>
        ) : (
          <div className={`gray p-8 ${darkTheme ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
            <Container component="main" maxWidth="md">
              <Paper elevation={3} style={{ padding: '2rem', backgroundColor: '#1e293b', color: 'white' }}>
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <Typography variant="h4" component="h1" gutterBottom>
                    Criar Questionário
                  </Typography>
                </motion.div>
                <motion.form onSubmit={handleSubmit(onSubmit)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <Controller
                    name="title"
                    control={control}
                    rules={{ required: 'Título é obrigatório' }}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="Título"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!fieldState.error}
                        helperText={fieldState.error ? fieldState.error.message : null}
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white' } }}
                      />
                    )}
                  />
                  <Controller
                    name="description"
                    control={control}
                    rules={{ required: 'Descrição é obrigatória' }}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="Descrição"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        error={!!fieldState.error}
                        helperText={fieldState.error ? fieldState.error.message : null}
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white' } }}
                      />
                    )}
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
                            <MenuItem value="OBJETIVA">Objetiva</MenuItem>
                            <MenuItem value="DISCURSIVA">Discursiva</MenuItem>
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
                        {question.type === 'OBJETIVA' && (
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
                              Adicionar Opção
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
        )}
      </SignedOut>
    </div>
  );
};

export default CreateQuestionario;
