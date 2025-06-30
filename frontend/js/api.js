async function post(endpoint, body) {
  const res = await fetch(`${ENV.API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return await res.json();
}

async function get(endpoint, token = null) {
  const headers = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${ENV.API_BASE_URL}${endpoint}`, { headers });
  return await res.json();
}

async function put(endpoint, body, token = null) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${ENV.API_BASE_URL}${endpoint}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(body)
  });
  return await res.json();
}