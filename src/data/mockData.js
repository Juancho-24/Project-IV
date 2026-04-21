// ============================================================
// HAV Portal · Mock Data Central
// Simula el backend completo. Conectar a Supabase en Fase 2.
// ============================================================

// Fechas dinámicas basadas en la fecha actual del sistema
const _today = new Date().toISOString().slice(0, 10);
const _yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
const _twoDaysAgo = new Date(Date.now() - 2 * 86400000).toISOString().slice(0, 10);
const _oneWeekAgo = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);
const _tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

export const USERS = [
  {
    id: 'u1',
    email: 'admin@hav.edu.ve',
    password: 'admin123',
    role: 'superadmin',
    name: 'Dr. Rodríguez',
    title: 'Director General',
    avatar: 'DR',
  },
  {
    id: 'u2',
    email: 'recepcion@hav.edu.ve',
    password: 'recepcion123',
    role: 'recepcion',
    name: 'Marcos Arévalo',
    title: 'Jefe de Recepción',
    avatar: 'MA',
  },
  {
    id: 'u3',
    email: 'medico@hav.edu.ve',
    password: 'medico123',
    role: 'medico',
    name: 'Dr. Ricardo Pérez',
    title: 'Internista · Cardiología',
    avatar: 'RP',
  },
];

export const PATIENTS = [
  {
    id: 'p1',
    cedula: 'V-12.345.678',
    name: 'Eduardo San Vicente',
    age: 45,
    gender: 'Masculino',
    phone: '+58 412-555-0101',
    email: 'e.sanvicente@gmail.com',
    dob: '1979-03-14',
    alergias: ['Penicilina', 'Sulfa'],
    status: 'activo',
    bloodType: 'O+',
    insurance: 'PDVSA · Póliza Oro',
    lastVisit: _twoDaysAgo,
    doctor: 'Dr. Ricardo Pérez',
    specialty: 'Cardiología',
    vitalSigns: { bp: '120/80', hr: 72, temp: 36.5, spo2: 98, weight: 82, bmi: 24.5 },
  },
  {
    id: 'p2',
    cedula: 'V-18.901.234',
    name: 'María Gabriela Díaz',
    age: 32,
    gender: 'Femenino',
    phone: '+58 414-555-0202',
    email: 'mg.diaz@gmail.com',
    dob: '1992-07-22',
    alergias: [],
    status: 'activo',
    bloodType: 'A+',
    insurance: 'Seguros Caracas',
    lastVisit: _yesterday,
    doctor: 'Dr. Ricardo Pérez',
    specialty: 'Cardiología',
    vitalSigns: { bp: '118/76', hr: 68, temp: 36.2, spo2: 99, weight: 62, bmi: 22.1 },
  },
  {
    id: 'p3',
    cedula: 'V-9.876.543',
    name: 'Roberto Castellanos',
    age: 58,
    gender: 'Masculino',
    phone: '+58 416-555-0303',
    email: 'r.castellanos@outlook.com',
    dob: '1966-01-30',
    alergias: ['Aspirina'],
    status: 'activo',
    bloodType: 'B-',
    insurance: 'Mercantil Seguros',
    lastVisit: _oneWeekAgo,
    doctor: 'Dr. Ricardo Pérez',
    specialty: 'Medicina Interna',
    vitalSigns: { bp: '140/90', hr: 88, temp: 37.1, spo2: 96, weight: 91, bmi: 28.3 },
  },
  {
    id: 'p4',
    cedula: 'V-22.111.555',
    name: 'Lucía Méndez',
    age: 27,
    gender: 'Femenino',
    phone: '+58 424-555-0404',
    email: 'lucia.mendez@gmail.com',
    dob: '1997-11-05',
    alergias: [],
    status: 'pendiente',
    bloodType: 'AB+',
    insurance: 'Sin seguro',
    lastVisit: _today,
    doctor: 'Dra. Sofía Blanco',
    specialty: 'Ginecología',
    vitalSigns: { bp: '110/70', hr: 65, temp: 36.8, spo2: 99, weight: 55, bmi: 21.0 },
  },
  {
    id: 'p5',
    cedula: 'V-5.432.109',
    name: 'Carlos Eduardo Méndez',
    age: 61,
    gender: 'Masculino',
    phone: '+58 412-555-0505',
    email: 'c.mendez@yahoo.com',
    dob: '1963-04-18',
    alergias: ['Metamizol'],
    status: 'activo',
    bloodType: 'O-',
    insurance: 'PDVSA · Póliza Plata',
    lastVisit: _today,
    doctor: 'Dr. Luis Martínez',
    specialty: 'Medicina General',
    vitalSigns: { bp: '145/95', hr: 92, temp: 37.4, spo2: 95, weight: 98, bmi: 31.2 },
  },
  {
    id: 'p6',
    cedula: 'V-15.678.900',
    name: 'Ana Cristina Silva',
    age: 44,
    gender: 'Femenino',
    phone: '+58 414-555-0606',
    email: 'asilva@gmail.com',
    dob: '1980-09-12',
    alergias: [],
    status: 'dado_de_alta',
    bloodType: 'A-',
    insurance: 'Seguros La Occidental',
    lastVisit: _oneWeekAgo,
    doctor: 'Dr. Ricardo Pérez',
    specialty: 'Cardiología',
    vitalSigns: { bp: '122/82', hr: 70, temp: 36.6, spo2: 98, weight: 68, bmi: 23.8 },
  },
];

export const APPOINTMENTS = [
  { id: 'a1', patientId: 'p1', patientName: 'Eduardo San Vicente', doctor: 'Dr. Ricardo Pérez', specialty: 'Cardiología', date: _today, time: '08:00', status: 'confirmada', type: 'Control' },
  { id: 'a2', patientId: 'p2', patientName: 'María Gabriela Díaz', doctor: 'Dra. Sofía Blanco', specialty: 'Ginecología', date: _today, time: '09:30', status: 'confirmada', type: 'Consulta Nueva' },
  { id: 'a3', patientId: 'p3', patientName: 'Roberto Castellanos', doctor: 'Dr. Luis Martínez', specialty: 'Medicina General', date: _today, time: '10:00', status: 'en_espera', type: 'Control' },
  { id: 'a4', patientId: 'p4', patientName: 'Lucía Méndez', doctor: 'Dr. Ricardo Pérez', specialty: 'Cardiología', date: _today, time: '11:00', status: 'confirmada', type: 'Control' },
  { id: 'a5', patientId: 'p5', patientName: 'Carlos Eduardo Méndez', doctor: 'Dr. Ricardo Pérez', specialty: 'Cardiología', date: _tomorrow, time: '08:30', status: 'pendiente', type: 'Primera Vez' },
  { id: 'a6', patientId: 'p6', patientName: 'Ana Cristina Silva', doctor: 'Dra. Sofía Blanco', specialty: 'Ginecología', date: _tomorrow, time: '09:00', status: 'pendiente', type: 'Control' },
];

export const STAFF = [
  { id: 's1', name: 'Marcos Arévalo', email: 'marcos@hav.edu.ve', role: 'recepcion', status: 'activo', since: '2021-03-01' },
  { id: 's2', name: 'Elena Rivas', email: 'elena.r@hav.edu.ve', role: 'enfermeria', status: 'activo', since: '2019-07-15' },
  { id: 's3', name: 'Juan Pérez', email: 'juan.p@hav.edu.ve', role: 'administrativo', status: 'activo', since: '2022-01-10' },
  { id: 's4', name: 'Dr. Ricardo Pérez', email: 'r.perez@hav.edu.ve', role: 'medico', status: 'activo', since: '2018-08-20' },
  { id: 's5', name: 'Dra. Sofía Blanco', email: 's.blanco@hav.edu.ve', role: 'medico', status: 'activo', since: '2020-02-01' },
  { id: 's6', name: 'Dr. Luis Martínez', email: 'l.martinez@hav.edu.ve', role: 'medico', status: 'inactivo', since: '2017-05-12' },
];

export const RECENT_ACTIVITY = [
  { id: 'r1', user: 'Marcos Arévalo', action: 'Registró cita', detail: 'Eduardo San Vicente · 08:00', time: 'hace 5 min', avatar: 'MA' },
  { id: 'r2', user: 'Elena Rivas', action: 'Actualizó signos vitales', detail: 'Roberto Castellanos', time: 'hace 12 min', avatar: 'ER' },
  { id: 'r3', user: 'Dr. Ricardo Pérez', action: 'Cerró consulta', detail: 'Ana Cristina Silva · SOAP', time: 'hace 30 min', avatar: 'RP' },
  { id: 'r4', user: 'Juan Pérez', action: 'Procesó pago', detail: 'Lucía Méndez · Bs. 45.000', time: 'hace 45 min', avatar: 'JP' },
];

export const SOAP_TEMPLATE = {
  subjetivo: '',
  objetivo: '',
  analisis: '',
  plan: '',
};

export const CLINICAL_HISTORY = [
  { id: 'h1', patientId: 'p1', date: _oneWeekAgo, doctor: 'Dr. Ricardo Pérez', diagnosis: 'Hipertensión arterial controlada', soap: { subjetivo: 'Paciente refiere cefalea ocasional', objetivo: 'TA 128/82, FC 74', analisis: 'Hipertensión leve, bajo control farmacológico', plan: 'Continuar Losartán 50mg, control en 4 semanas' }, status: 'cerrada' },
  { id: 'h2', patientId: 'p1', date: _twoDaysAgo, doctor: 'Dr. Ricardo Pérez', diagnosis: 'Revisión cardiovascular anual', soap: { subjetivo: 'Paciente asintomático', objetivo: 'EKG normal, TA 120/78', analisis: 'Sin hallazgos patológicos', plan: 'Continuar medicación actual, próxima revisión en 6 meses' }, status: 'cerrada' },
  { id: 'h3', patientId: 'p3', date: _oneWeekAgo, doctor: 'Dr. Luis Martínez', diagnosis: 'Diabetes Mellitus tipo 2, HTA', soap: { subjetivo: 'Polidipsia y poliuria en las últimas semanas', objetivo: 'Glucemia 185 mg/dL, TA 142/90', analisis: 'DM2 descompensada, HTA no controlada', plan: 'Ajuste de insulina, hipertensivo, dieta estricta' }, status: 'abierta' },
];
