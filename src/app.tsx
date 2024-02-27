import { ChangeEvent, useState } from 'react'
import logo from './assets/Logo.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'

type Note = {
  id: string,
  date: Date,
  content: string
}

export function App() {
  const [search, setSearch] = useState('')

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


  function handleSearch(event: ChangeEvent<HTMLInputElement>){
    setSearch(event.target.value)
  }

  const filteredNotes = search !== '' ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())) : notes

  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6'>
      <img src={logo} alt="NLW Expert" />
      <form className='w-full'>
        <input 
          onChange={handleSearch}
          type="text" 
          className='w-full bg-transparent text-3xl font-semibold tracking-tighter placeholder:text-slate-500 outline-none' 
          placeholder='Busque em suas notas...' />
      </form>

      <div className='h-px bg-slate-700' />

      <div className='grid grid-cols-3 auto-rows-[250px] gap-6'>
        <NewNoteCard onNoteCreated={onNoteCreated} />
        
        {filteredNotes.map(note => <NoteCard key={note.id} note={note} />)}
      </div>
    </div>
  )
}
