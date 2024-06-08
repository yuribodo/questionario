import { useForm } from 'react-hook-form'
import { formAnswer, FormData } from '../lib/atom'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import questionario from '../../questionario.json'

function Questionario({ questionarioId }: { questionarioId: string }) {
  const [answer, setAnswer] = useAtom(formAnswer)
  const { register, handleSubmit, watch, reset } = useForm<FormData>({
    defaultValues: answer // Set default values from the answer state
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
    setAnswer(data)
  }
  console.log(questionarioId)

  useEffect(() => {
    reset(answer) // Reset the form with the current answers when the component mounts or answers change
    console.log('Current answer:', answer)
  }, [answer, reset])

  const selectedOption = watch()

  return (
    <>
      <div className='min-h-screen bg-gray-900 text-white'>
        <h1 className='p-4 text-4xl font-bold text-center'>Questionário</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='flex flex-col'>
            <div className='p-3'>
              <h2 className='font-semibold text-2xl'>Questao 1</h2>
              <div className='bg-gray-800 p-4 rounded-md'>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, deserunt, accusamus facilis tempore omnis repudiandae doloribus ipsam debitis corporis dicta facere sequi neque. Soluta eaque nostrum ut hic non eligendi.
                </p>
              </div>
              <div className='flex flex-col p-3 space-y-2'>
                {['opcao1', 'opcao2', 'opcao3'].map((option, index) => (
                  <label key={index} className={`p-2 rounded-md cursor-pointer ${selectedOption.questao1 === option ? 'bg-green-500' : 'bg-gray-700'}`}>
                    <input {...register("questao1")} type="radio" value={option} className='hidden' />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='flex flex-col'>
            <div className='p-3'>
              <h2 className='font-semibold text-2xl'>Questao 2</h2>
              <div className='bg-gray-800 p-4 rounded-md'>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, deserunt, accusamus facilis tempore omnis repudiandae doloribus ipsam debitis corporis dicta facere sequi neque. Soluta eaque nostrum ut hic non eligendi.
                </p>
              </div>
              <div className='flex flex-col p-3 space-y-2'>
                {['opcao1', 'opcao2', 'opcao3'].map((option, index) => (
                  <label key={index} className={`p-2 rounded-md cursor-pointer ${selectedOption.questao2 === option ? 'bg-green-500' : 'bg-gray-700'}`}>
                    <input {...register("questao2")} type="radio" value={option} className='hidden' />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='flex flex-col'>
            <div className='p-3'>
              <h2 className='font-semibold text-2xl'>Questao 3</h2>
              <div className='bg-gray-800 p-4 rounded-md'>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, deserunt, accusamus facilis tempore omnis repudiandae doloribus ipsam debitis corporis dicta facere sequi neque. Soluta eaque nostrum ut hic non eligendi.
                </p>
              </div>
              <div className='bg-gray-700 p-3 mt-2 rounded-md'>
                <input {...register("questao3")} type="text" placeholder='Resposta' className='bg-gray-900 text-white border border-gray-600 w-full p-2 rounded-md' />
              </div>
            </div>
          </motion.div>

          <motion.input 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            type="submit" 
            className='bg-red-500 rounded-lg p-2 mt-4 cursor-pointer w-full text-center' 
            value="Submit" 
          />
        </form>
      </div>
    </>
  )
}

export default Questionario
