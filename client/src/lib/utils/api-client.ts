const API_BASE = process.env.NEXT_PUBLIC_API_URI
  ?? 'http://localhost:8080/api';

export async function getClient<T = unknown>(
  endpoint: string
): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.statusText}`);
  }
  const data = await res.json() as T;
  return data;
};

export async function postClient<T = unknown>(
  endpoint: string,
  body: unknown
): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Failed to post: ${res.statusText}`);
  }
  const data = await res.json() as T;
  return data;
};

export async function putClient<T = unknown>(
  endpoint: string,
  body: unknown
): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Failed to put: ${res.statusText}`);
  }
  const data = await res.json() as T;
  return data;
};

export async function deleteClient<T = unknown>(
  endpoint: string
): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error(`Failed to delete: ${res.statusText}`);
  }
  const data = await res.json() as T;
  return data;
};
