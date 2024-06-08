// App.js
import './App.css'
import { useForm } from 'react-hook-form'
import { formAnswer } from './lib/atom'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

function App() {
  const [answer, setAnswer] = useAtom(formAnswer)
  const { register, handleSubmit, watch } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
    setAnswer(data)
  }

  useEffect(() => {
    console.log('Current answer:', answer)
  }, [answer])

  const selectedOption = watch()

  return (
    <>
      <div className=''>
        <h1 className='p-4 text-4xl font-bold text-center'>Questionário</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col'>
            <div className='p-3'>
              <h2 className='font-semibold text-2xl'>Questao 1</h2>
              <div className='bg-blue-400'>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, deserunt, accusamus facilis tempore omnis repudiandae doloribus ipsam debitis corporis dicta facere sequi neque. Soluta eaque nostrum ut hic non eligendi.
                </p>
              </div>
              <div className='flex flex-col p-3 space-y-2'>
                {['opcao1', 'opcao2', 'opcao3'].map((option, index) => (
                  <label key={index} className={`p-2 rounded-md ${selectedOption.questao1 === option ? 'bg-green-400' : 'bg-green-200'}`}>
                    <input {...register("questao1")} type="radio" value={option} className='hidden' />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className='flex flex-col'>
            <div className='p-3'>
              <h2 className='font-semibold text-2xl'>Questao 2</h2>
              <div className='bg-blue-400'>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, deserunt, accusamus facilis tempore omnis repudiandae doloribus ipsam debitis corporis dicta facere sequi neque. Soluta eaque nostrum ut hic non eligendi.
                </p>
              </div>
              <div className='flex flex-col p-3 space-y-2'>
                {['opcao1', 'opcao2', 'opcao3'].map((option, index) => (
                  <label key={index} className={`p-2 rounded-md ${selectedOption.questao2 === option ? 'bg-green-400' : 'bg-green-200'}`}>
                    <input {...register("questao2")} type="radio" value={option} className='hidden' />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className='flex flex-col'>
            <div className='p-3'>
              <h2 className='font-semibold text-2xl'>Questao 3</h2>
              <div className='bg-blue-400'>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, deserunt, accusamus facilis tempore omnis repudiandae doloribus ipsam debitis corporis dicta facere sequi neque. Soluta eaque nostrum ut hic non eligendi.
                </p>
              </div>
              <div className='bg-green-200 p-3 mt-2 rounded-md'>
                <input {...register("questao3")} type="text" placeholder='Resposta' className='border border-black w-full' />
              </div>
            </div>
          </div>

          <input type="submit" className='bg-red-400 rounded-lg p-2 mt-4 cursor-pointer' value="Submit" />
        </form>
      </div>
    </>
  )
}

export default App
