'use client';
// Use this to tell next not to render anything here on the server

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateNote() {
  // State tracking for note title and content
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const router = useRouter(); // Allows for a re-render of page when refreshed

  // Creates a new note by calling the API
  const createNote = async () => {
    await fetch('http://127.0.0.1:8090/api/collections/notes/records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });

    // Reset the note state
    setContent('');
    setTitle('');
    // Refresh the router to reflect the new note creation
    router.refresh();
  };

  return (
    <form onSubmit={createNote}>
      <h3>Create a new Note</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">
        Create note
      </button>
    </form>
  );
}
