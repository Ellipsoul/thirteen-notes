import styles from '../Notes.module.css';

async function getNote(noteId: string) {
  // Caching the data for 10 seconds, then revalidates with a request (ISR)
  const res = await fetch(
      `http://127.0.0.1:8090/api/collections/notes/records/${noteId}`,
      { next: { revalidate: 10 }},
  );
  const data = await res.json();
  return data;
}

export default async function NotePage({ params }: any) {
  // Retrieve the dynamic route variable with params
  // Asynchronous call to retrieve the note
  const note = await getNote(params.id);

  return (
    <div>
      <h1>notes/{note.id}</h1>
      <div className={styles.note}>
        <h3>{note.title}</h3>
        <h5>{note.content}</h5>
        <p>{note.created}</p>
      </div>
    </div>
  );
}
