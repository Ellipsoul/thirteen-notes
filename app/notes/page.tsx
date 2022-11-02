import Link from 'next/link';
import React from 'react';
import styles from './Notes.module.css';

// Will contain the user's nots as well as a form to create new notes
// All components are server components by default
// Rendered on the server, which means data can be asynchronously fetched


// Retrieves the notes from pocketbase
async function getNotes(): Promise<any[]> {
  // Alternative way to fetch from pocketbase
  // const db = new PocketBase('http://127.0.0.1:8090');
  // const result = await db.records.getList('notes');

  // Static route pages are cached by next, add a no-store flag
  const res = await fetch(
      'http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=30',
      { cache: 'no-store' },
  );
  const data = await res.json();
  return data?.items as any[];
}

export default async function NotesPage() {
  const notes: any[] = await getNotes();

  return (
    <div>
      <h1>Notes</h1>
      <div className={styles.grid}>
        {notes?.map((note) => {
          return <Note key={note.id} note={note} />;
        })}
      </div>
    </div>
  );
}


function Note({note}: any) {
  const { id, title, content, created } = note || {};

  return (
    <Link href={`/notes/${id}`}>
      <div className={styles.note}>
        <h2>{title}</h2>
        <h5>{content}</h5>
        <p>{created}</p>
      </div>
    </Link>
  );
}
