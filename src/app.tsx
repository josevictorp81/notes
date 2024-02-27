import { useState } from 'react'
import logo from './assets/Logo.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'

type Note = {
  id: string,
  date: Date,
  content: string
}

export function App() {
  const [notes, setNotes] = useState<Note[]>(()=>{
    const notesOnStorage = localStorage.getItem('notes')

    if(notesOnStorage){
      return JSON.parse(notesOnStorage)
    }

    return []
  })

  function onNoteCreated(content: string){
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content
    }

    const notesArray = [newNote, ...notes]

    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray))
  }


  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6'>
      <img src={logo} alt="NLW Expert" />
      <form className='w-full'>
        <input 
          type="text" 
          className='w-full bg-transparent text-3xl font-semibold tracking-tighter placeholder:text-slate-500 outline-none' 
          placeholder='Busque em suas notas...' />
      </form>

      <div className='h-px bg-slate-700' />

      <div className='grid grid-cols-3 auto-rows-[250px] gap-6'>
        <NewNoteCard onNoteCreated={onNoteCreated} />
        
        {notes.map(note => <NoteCard key={note.id} note={note} />)}
      </div>
    </div>
  )
}
