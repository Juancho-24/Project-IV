import {
  LayoutDashboard, Users, CalendarDays,
  ClipboardList, HeartPulse,
  ChevronRight, Menu, X
} from 'lucide-react';
import { useState } from 'react';

const NAV_ITEMS = {
  superadmin: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'staff', label: 'Personal', icon: Users },
    { id: 'patients', label: 'Pacientes', icon: ClipboardList },
    { id: 'appointments', label: 'Calendario', icon: CalendarDays },
  ],
  recepcion: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'appointments', label: 'Calendario', icon: CalendarDays },
    { id: 'patients', label: 'Pacientes', icon: ClipboardList },
  ],
  medico: [
    { id: 'dashboard', label: 'Mis Citas', icon: CalendarDays },
    { id: 'patients', label: 'Pacientes', icon: ClipboardList },
    { id: 'history', label: 'Historias', icon: ClipboardList },
  ],
};

export default function Sidebar({ user, currentView, onNavigate, isMobileOpen, onCloseMobile }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const items = NAV_ITEMS[user.role] || NAV_ITEMS.recepcion;

  const roleLabels = {
    superadmin: 'Super Admin',
    recepcion: 'Recepción',
    medico: 'Médico',
  };

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 transform md:relative md:translate-x-0 flex flex-col min-h-screen bg-white border-r border-gray-100 transition-all duration-300 ${
      isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:shadow-sm'
    } ${isCollapsed ? 'md:w-[72px] w-64' : 'w-64'}`}>
      {/* Logo */}
      <div className="px-4 py-5 border-b border-gray-100 flex items-center justify-center">
        <div className="flex items-center gap-3 w-full" style={{ justifyContent: isCollapsed ? 'center' : 'flex-start' }}>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)} 
            className="hidden md:block text-hav-text-main hover:text-hav-primary focus:outline-none flex-shrink-0"
            title="Desplegar/Ocultar Panel"
          >
            <Menu size={24} />
          </button>

          <button 
            onClick={onCloseMobile} 
            className="md:hidden text-hav-text-main hover:text-hav-primary focus:outline-none flex-shrink-0"
            title="Cerrar Panel"
          >
            <X size={24} />
          </button>
          
          {!isCollapsed && (
            <>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #367281, #1e4f5c)' }}>
                <HeartPulse size={18} className="text-white" />
              </div>
              <div className="leading-none overflow-hidden transition-opacity duration-300">
                <p className="font-display font-bold text-hav-primary text-base whitespace-nowrap">HAV Portal</p>
                <p className="text-hav-text-muted text-[10px] mt-0.5 whitespace-nowrap">{roleLabels[user.role]}</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-hidden">
        {items.map(({ id, label, icon: Icon }) => {
          const isActive = currentView === id;
          return (
            <button
              key={id}
              id={`nav-${id}`}
              onClick={() => onNavigate(id)}
              title={isCollapsed ? label : ''}
              className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group ${isCollapsed ? 'justify-center' : 'gap-3'} ${
                isActive
                  ? 'bg-hav-primary text-white shadow-md shadow-hav-primary/20'
                  : 'text-hav-text-muted hover:bg-hav-primary/8 hover:text-hav-primary'
              }`}
            >
              <Icon size={isCollapsed ? 20 : 16} className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-hav-text-muted group-hover:text-hav-primary'}`} />
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left whitespace-nowrap">{label}</span>
                  {isActive && <ChevronRight size={14} className="text-white/70 flex-shrink-0" />}
                </>
              )}
            </button>
          );
        })}
      </nav>

    </aside>
  );
}
