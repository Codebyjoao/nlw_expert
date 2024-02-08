import * as Dialog from '@radix-ui/react-dialog'
import { formatDistanceToNow } from 'date-fns'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import {toast} from "sonner"

interface NewNoteCardProps{
  onSaveNote: (content: string) => void
}

let speechRecognition: SpeechRecognition | null = null

export function NewNoteCard( {onSaveNote}:NewNoteCardProps ){
  const [shouldShowOnboarding, setShouldShowOnboarding] =useState(true)
  const [content, setContent] = useState('')
  const [isRecording, setIsRecording] = useState(false)

  function handleStartEditor(){
    setShouldShowOnboarding(false)
  }

  function handleSaveNote(event: FormEvent){
    event.preventDefault()
    
    if(content === ''){
      return
    }

    onSaveNote(content)
    setContent('')
    setShouldShowOnboarding(true)
    toast.success("Nota Criada Com sucesso")
  }

  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>){
    setContent(event.target.value)

    if (event.target.value === ''){
      setShouldShowOnboarding(true)
    }
  }

  function handleStartRecording(){
    const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window
    || 'webkitSpeechRecognition' in window

    if(!isSpeechRecognitionAPIAvailable){
      alert('infelizmente seu navegador não suport a API de Gravação')
      return
    }
    
    setIsRecording(true)
    setShouldShowOnboarding(false)
    const SpeechRecognitionAPI = window.webkitSpeechRecognition || window.SpeechRecognition

     speechRecognition = new SpeechRecognitionAPI()

    speechRecognition.lang ='pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true

    speechRecognition.onresult = (event) =>{
      const transcription = Array.from(event.results).reduce((text,result) => {
        return text.concat(result[0].transcript)
      }, '' )

      setContent(transcription)
    }

    speechRecognition.onerror = (event) =>{
      console.error(event)
    }

    speechRecognition.start()

  }

  function handleStopRecording(){
    setIsRecording(false)

    if(speechRecognition != null){
       speechRecognition.stop()
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
        <Dialog.Content className='fixed inset-0 overflow-hidden md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:h-[60vh] md:max-w-[640px] w-full bg-slate-700 md:rounded-md flex flex-col outline-none'>
         <Dialog.Close className='absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
            <X className='size-5'/>
         </Dialog.Close>

         <form  className='flex-1 flex flex-col'>
         <div className='flex flex-1 flex-col gap-3 p-5 '>
            <span className="text-sm font-medium text-slate-300">Adicionar nota</span>
            {shouldShowOnboarding ? 
            <p className="text-sm leading-6 text-slate-400">Comence 
            <button  type='button' onClick={handleStartRecording} className='text-md text-lime-400 hover:underline'>gravando uma nota</button> em audio, ou se preferir 
            <button  type='button' onClick={handleStartEditor} className='text-md text-lime-400 hover:underline'>ultilize apenas texto</button></p> 
            : 
            <textarea autoFocus 
              onChange={handleContentChange}
              value={content}
              className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none'>
            </textarea>
            }
          </div>

            {isRecording?
              <button type='button'onClick={handleStopRecording} className='w-full flex items-center justify-center gap-2 font-medium bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none hover:text-slate-100'>
               <div className='size-3 rounded-full bg-red-500 animate-pulse'/>
               Gravando! (clique P/ interronper)
              </button>
              :
              <button type='button' onClick={handleSaveNote} className='w-full font-medium bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none hover:bg-lime-500'>
                Salvar nota
              </button>
            }
         
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}