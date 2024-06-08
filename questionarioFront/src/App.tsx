import './App.css'
import {useForm} from 'react-hook-form'

function App() {
  const {register, handleSubmit} = useForm()

  return (
    <>
      <div className=' '>
        <h1 className='  p-4 text-4xl font-bold text-center'>Questionário</h1>

         <div className='flex flex-col'>
              <div className=' p-3'>
                <h2 className=' font-semibold text-2xl'>Questao 1</h2>
                <div className=' bg-blue-400'>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, deserunt, accusamus facilis tempore omnis repudiandae doloribus ipsam debitis corporis dicta facere sequi neque. Soluta eaque nostrum ut hic non eligendi.
                  </p>
                </div>
                <div className=' flex flex-col p-3 space-y-2'>
                  <div className=' bg-green-200 rounded-md '>
                    <p>opcao1</p>
                  </div>
                  <div className=' bg-green-200'>
                    <p>opcao2</p>
                  </div>
                  <div className=' bg-green-200'>
                    <p>opcao3</p>
                  </div>
                </div>  
            </div>
          </div>

          <div className='flex flex-col'>
              <div className=' p-3'>
                <h2 className=' font-semibold text-2xl'>Questao 2</h2>
                <div className=' bg-blue-400'>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, deserunt, accusamus facilis tempore omnis repudiandae doloribus ipsam debitis corporis dicta facere sequi neque. Soluta eaque nostrum ut hic non eligendi.
                  </p>
                </div>
                <div className=' flex flex-col p-3 space-y-2'>
                  <div className=' bg-green-200 rounded-md '>
                    <p>opcao1</p>
                  </div>
                  <div className=' bg-green-200'>
                    <p>opcao2</p>
                  </div>
                  <div className=' bg-green-200'>
                    <p>opcao3</p>
                  </div>
                </div>  
            </div>
          </div>

          <div className='flex flex-col'>
              <div className=' p-3'>
                <h2 className=' font-semibold text-2xl'>Questao 3</h2>
                <div className=' bg-blue-400'>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, deserunt, accusamus facilis tempore omnis repudiandae doloribus ipsam debitis corporis dicta facere sequi neque. Soluta eaque nostrum ut hic non eligendi.
                  </p>
                </div>
                <div className='bg-green-200 p-3 mt-2 rounded-md'>
                <form onSubmit={handleSubmit((data) => {
                  console.log(data)
                })}>
                    <input {...register("Resposta")} type="text" placeholder='Resposta'  className=' border  border-black w-[1000px]'/>
                    <div className='flex bg-red-400 rounded-lg w-[80px] justify-center ml-3 p-3 cursor-pointer'>
                      <input type="submit" className=' cursor-pointer'></input>
                    </div>
                  </form>
                </div> 
            </div>
          </div>

          
          


      </div>
    </>
  )
}

export default App
