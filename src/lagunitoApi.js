export async function askLagunitoServer(payload) {
  const endpoint = ['','api','lagunito'].join('/');
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Servicio no disponible');
  return response.json();
}
