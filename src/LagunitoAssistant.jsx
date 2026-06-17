import React, { useState } from 'react';
import './lagunito.css';

export default function LagunitoAssistant() {
  const [text, setText] = useState('');
  async function send() {
    await fetch('/api/lagunito', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: text }) });
  }
  return <button onClick={send}>Lagunito</button>;
}
