import logo from "./assets/Logo.svg"
import { NewNoteCard } from "./components/New-note-card"
import { NotesCard } from "./components/notes-card"

export function App() {

  return (
   <div className="mx-auto max-w-6xl my-10 space-y-6">
      <img src={logo} alt="logo nlw" />
      <form action="" className="w-full">
        <input className="w-full bg-transparent text-3xl tracking-tight font-semibold outline-none placeholder:text-slate-500"  type="text" placeholder="Busque em suas notas..." />
      </form>

      <div className="h-px bg-slate-700"></div>

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        
        <NewNoteCard/>

        <NotesCard note={{
            date: new Date(),
            content: "Hello World",
        }}/>
        <NotesCard note={{
            date: new Date(),
            content: "Olá",
        }}/>
       
      </div>
   </div>
  )
}


