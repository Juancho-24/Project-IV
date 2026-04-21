import { useState, useCallback } from 'react';
import { LogOut, Menu } from 'lucide-react';

// Components
import Sidebar from './components/Sidebar';
import Toast from './components/Toast';

// Views
import LoginScreen from './views/LoginScreen';
import SuperAdminDashboard from './views/superadmin/SuperAdminDashboard';
import StaffManagement from './views/superadmin/StaffManagement';
import RecepcionDashboard from './views/recepcion/RecepcionDashboard';
import MedicoDashboard from './views/medico/MedicoDashboard';
import PatientsView from './views/shared/PatientsView';
import CalendarView from './views/shared/CalendarView';

// Global mock data (single source of truth)
import { PATIENTS, APPOINTMENTS, STAFF } from './data/mockData';

// ─── Router Helper ──────────────────────────────────────────────────────────
// Devuelve el componente correcto según el rol y la vista actual
function RouteView({ user, currentView, onNavigate, showToast, globalState }) {
  const props = { user, onNavigate, showToast };

  // Super Admin routes
  if (user.role === 'superadmin') {
    if (currentView === 'dashboard') return <SuperAdminDashboard {...props} staff={globalState.staff} appointments={globalState.appointments} />;
    if (currentView === 'staff') return <StaffManagement {...props} staff={globalState.staff} setStaff={globalState.setStaff} />;
    if (currentView === 'patients') return <PatientsView {...props} userRole={user.role} patients={globalState.patients} setPatients={globalState.setPatients} />;
    if (currentView === 'appointments') return <CalendarView {...props} readOnly appointments={globalState.appointments} setAppointments={globalState.setAppointments} patients={globalState.patients} />;
    if (currentView === 'reports') return <ReportsPlaceholder />;
    if (currentView === 'settings') return <SettingsPlaceholder />;
  }

  // Recepción routes
  if (user.role === 'recepcion') {
    if (currentView === 'dashboard') return <RecepcionDashboard {...props} appointments={globalState.appointments} setAppointments={globalState.setAppointments} />;
    if (currentView === 'appointments') return <CalendarView {...props} appointments={globalState.appointments} setAppointments={globalState.setAppointments} patients={globalState.patients} />;
    if (currentView === 'patients') return <PatientsView {...props} userRole={user.role} patients={globalState.patients} setPatients={globalState.setPatients} />;
  }

  // Médico routes
  if (user.role === 'medico') {
    if (currentView === 'dashboard') return <MedicoDashboard {...props} appointments={globalState.appointments} />;
    if (currentView === 'patients') return <PatientsView {...props} userRole={user.role} patients={globalState.patients} setPatients={globalState.setPatients} />;
    if (currentView === 'history') return <PatientsView {...props} userRole={user.role} patients={globalState.patients} setPatients={globalState.setPatients} />;
    if (currentView === 'stats') return <ReportsPlaceholder />;
  }

  return <NotFound />;
}

// Placeholder views
function ReportsPlaceholder() {
  return (
    <div className="p-6 view-enter">
      <h1 className="text-2xl font-display font-bold text-hav-text-main mb-2">Reportes y Estadísticas</h1>
      <div className="mt-8 bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-50">
        <div className="w-16 h-16 bg-hav-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📊</span>
        </div>
        <p className="text-hav-text-muted font-medium">Módulo de reportes en desarrollo</p>
        <p className="text-sm text-gray-400 mt-1">Se conectará a Supabase en la Fase 2</p>
      </div>
    </div>
  );
}

function SettingsPlaceholder() {
  return (
    <div className="p-6 view-enter">
      <h1 className="text-2xl font-display font-bold text-hav-text-main mb-2">Configuración del Sistema</h1>
      <div className="mt-8 bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-50">
        <div className="w-16 h-16 bg-hav-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">⚙️</span>
        </div>
        <p className="text-hav-text-muted font-medium">Módulo de configuración en desarrollo</p>
        <p className="text-sm text-gray-400 mt-1">Gestión de roles, permisos y parámetros del hospital</p>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="p-6 flex items-center justify-center min-h-96 view-enter">
      <div className="text-center">
        <p className="text-6xl mb-4">🏥</p>
        <p className="text-hav-text-muted font-medium">Vista no encontrada</p>
      </div>
    </div>
  );
}

// ─── Top Header Bar ──────────────────────────────────────────────────────────
function TopBar({ user, currentView, onLogout, onToggleMobileMenu }) {
  const viewLabels = {
    dashboard: user.role === 'superadmin' ? 'Resumen General' : user.role === 'medico' ? 'Mis Citas' : 'Panel de Recepción',
    staff: 'Gestión de Personal',
    patients: 'Pacientes',
    appointments: 'Calendario de Citas',
    reports: 'Reportes',
    settings: 'Configuración',
    history: 'Historias Clínicas',
    stats: 'Estadísticas',
  };

  return (
    <header className="flex items-center justify-between md:justify-end px-4 sm:px-8 py-5 bg-transparent w-full">
      {/* Mobile only brand */}
      <div className="md:hidden flex items-center gap-3">
        <button onClick={onToggleMobileMenu} className="text-hav-text-main hover:text-hav-primary p-1 focus:outline-none">
          <Menu size={24} />
        </button>
        <p className="font-display font-bold text-hav-primary text-lg">HAV Portal</p>
      </div>

      {/* User Info & Logout */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-semibold text-hav-text-main leading-tight">{user.name}</p>
          <p className="text-[11px] text-hav-text-muted">{user.email}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#1e4f5c] text-white flex items-center justify-center font-bold text-sm shadow-sm">
          {user.avatar}
        </div>
        <button
          onClick={onLogout}
          className="w-10 h-10 flex items-center justify-center text-hav-text-muted bg-white border border-gray-100 rounded-lg hover:text-hav-danger hover:border-red-100 hover:bg-red-50 transition-colors shadow-sm"
          title="Cerrar Sesión"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}

// ─── App Root ────────────────────────────────────────────────────────────────
export default function App() {
  const [currentUser, setCurrentUser] = useState(null);   // null = not logged in
  const [currentView, setCurrentView] = useState('dashboard');
  const [toast, setToast] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ── Global state — única fuente de verdad ──
  const [patients, setPatients] = useState(PATIENTS);
  const [appointments, setAppointments] = useState(APPOINTMENTS);
  const [staff, setStaff] = useState(STAFF);

  const showToast = useCallback((t) => {
    setToast(t);
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('dashboard');
    showToast({ type: 'success', title: 'Sesión cerrada', message: 'Hasta pronto' });
  };

  const navigate = (view) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  // ── Not authenticated ──
  if (!currentUser) {
    return (
      <>
        <LoginScreen onLogin={handleLogin} showToast={showToast} />
        {toast && <Toast toast={toast} onClose={() => setToast(null)} />}
      </>
    );
  }

  // Bundle global state para pasar a las vistas
  const globalState = { patients, setPatients, appointments, setAppointments, staff, setStaff };

  // ── Authenticated layout ──
  return (
    <div className="flex min-h-screen bg-hav-bg relative">
      <Sidebar
        user={currentUser}
        currentView={currentView}
        onNavigate={navigate}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar 
          user={currentUser} 
          currentView={currentView} 
          onLogout={handleLogout} 
          onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
        />
        <main className="flex-1 overflow-auto">
          <RouteView
            user={currentUser}
            currentView={currentView}
            onNavigate={navigate}
            showToast={showToast}
            globalState={globalState}
          />
        </main>
      </div>

      {toast && <Toast toast={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
