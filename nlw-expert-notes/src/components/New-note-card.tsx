import * as Dialog from '@radix-ui/react-dialog'
import { formatDistanceToNow } from 'date-fns'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import {toast} from "sonner"


export function NewNoteCard(){
  const [shouldShowOnboarding, setShouldShowOnboarding] =useState(true)
  const [content, setContent] = useState('')

  function handleStartEditor(){
    setShouldShowOnboarding(false)
  }

  function handleSaveNote(event: FormEvent){
    event.preventDefault()
    console.log(content)
    toast.success("Nota Criada Com sucesso")
  }

  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>){
    setContent(event.target.value)

    if (event.target.value === ''){
      setShouldShowOnboarding(true)
    }
  }

  return(
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md flex flex-col gap-3 bg-slate-700  hover:ring-2 outline-none ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 p-5 text-left">
          <span className="text-sm font-medium text-slate-200">Adicionar nota</span>
          <p className="text-sm leading-6 text-slate-400">Grave note em audio, que será convertida para texto.</p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/50'/>
        <Dialog.Content className='fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[60vh] max-w-[640px] w-full bg-slate-700 rounded-md flex flex-col outline-none'>
         <Dialog.Close className='absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
            <X className='size-5'/>
         </Dialog.Close>

         <form onSubmit={handleSaveNote} className='flex-1 flex flex-col'>
         <div className='flex flex-1 flex-col gap-3 p-5 '>
            <span className="text-sm font-medium text-slate-300">Adicionar nota</span>
            {shouldShowOnboarding ? 
            <p className="text-sm leading-6 text-slate-400">Comence <button className='text-md text-lime-400 hover:underline'>gravando uma nota</button> em audio, ou se preferir <button onClick={handleStartEditor} className='text-md text-lime-400 hover:underline'>ultilize apenas texto</button></p> 
            : 
            <textarea autoFocus 
              onChange={handleContentChange}
              className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none'>
            </textarea>
            }
          </div>

          <button type='submit' className='w-full font-medium bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none hover:bg-lime-500'>
           Salvar nota
          </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}