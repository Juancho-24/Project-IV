// En desarrollo usamos ruta relativa (Vite proxy redirige a Render)
// En producción usamos la URL absoluta del backend
const API_BASE_URL = import.meta.env.PROD
  ? 'https://hav-backend-0bxr.onrender.com/api/v1'
  : '/api/v1';

// ─── Token helpers ───────────────────────────────────────────
export function getToken() {
  return localStorage.getItem('hav_token');
}

export function setToken(token) {
  localStorage.setItem('hav_token', token);
}

export function clearToken() {
  localStorage.removeItem('hav_token');
}

// ─── Authenticated fetch wrapper ─────────────────────────────
async function authFetch(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Si el token expiró, limpiar sesión
  if (res.status === 401) {
    clearToken();
    // No lanzamos error aquí para que cada llamador decida qué hacer
  }

  return res;
}

// ─── AUTH ─────────────────────────────────────────────────────

export async function loginUser(email, password) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Credenciales incorrectas');
  return data; // { success, token, user }
}

export async function fetchMe() {
  const res = await authFetch('/auth/me');
  if (!res.ok) return null;
  const data = await res.json();
  return data.user || data; // adaptamos según respuesta
}

// ─── PATIENTS ────────────────────────────────────────────────

export async function fetchPatients(search = '') {
  const query = search ? `?search=${encodeURIComponent(search)}` : '';
  const res = await authFetch(`/patients/${query}`);
  if (!res.ok) return [];
  const data = await res.json();
  // La API puede envolver en { success, data: [...] } o devolver array directo
  return Array.isArray(data) ? data : (data.data || data.results || []);
}

export async function createPatient(patientData) {
  const res = await authFetch('/patients/', {
    method: 'POST',
    body: JSON.stringify(patientData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Error al crear paciente');
  return data.data || data;
}

// ─── APPOINTMENTS ────────────────────────────────────────────

export async function fetchAppointments(month, year) {
  let query = '';
  if (month && year) {
    query = `?month=${month}&year=${year}`;
  }
  const res = await authFetch(`/appointments/${query}`);
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : (data.data || data.results || []);
}

export async function createAppointment(apptData) {
  const res = await authFetch('/appointments/', {
    method: 'POST',
    body: JSON.stringify(apptData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Error al crear cita');
  return data.data || data;
}

export async function updateAppointmentStatus(id, status) {
  const res = await authFetch(`/appointments/${id}/status/`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Error al actualizar estado');
  return data.data || data;
}

// ─── STAFF ───────────────────────────────────────────────────

export async function fetchStaff() {
  const res = await authFetch('/staff/');
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : (data.data || data.results || []);
}

export async function createStaffMember(staffData) {
  const res = await authFetch('/staff/', {
    method: 'POST',
    body: JSON.stringify(staffData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Error al crear personal');
  return data.data || data;
}

export async function updateStaffMember(id, staffData) {
  const res = await authFetch(`/staff/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(staffData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Error al actualizar personal');
  return data.data || data;
}

export async function deleteStaffMember(id) {
  const res = await authFetch(`/staff/${id}/`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Error al eliminar personal');
  }
  return true;
}

export async function toggleStaffStatus(id, newStatus) {
  const res = await authFetch(`/staff/${id}/status/`, {
    method: 'PATCH',
    body: JSON.stringify({ status: newStatus }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Error al cambiar estado');
  return data.data || data;
}

// ─── CLINICAL HISTORY ────────────────────────────────────────

export async function fetchClinicalHistory(patientId) {
  const res = await authFetch(`/clinical-history/?patientId=${patientId}`);
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : (data.data || data.results || []);
}

export async function createClinicalHistory(historyData) {
  const res = await authFetch('/clinical-history/', {
    method: 'POST',
    body: JSON.stringify(historyData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Error al guardar historia clínica');
  return data.data || data;
}

// ─── DASHBOARD ───────────────────────────────────────────────

export async function fetchDashboardSuperAdmin() {
  const res = await authFetch('/dashboard/superadmin/');
  if (!res.ok) return null;
  return res.json();
}

export async function fetchDashboardRecepcion() {
  const res = await authFetch('/dashboard/recepcion/');
  if (!res.ok) return null;
  return res.json();
}
