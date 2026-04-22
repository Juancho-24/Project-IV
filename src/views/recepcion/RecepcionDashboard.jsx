import { useState } from 'react';
import { CalendarDays, Users, Clock, CheckCircle, Plus } from 'lucide-react';
import { updateAppointmentStatus } from '../../services/api';

// Recibe appointments y setAppointments como props desde App.jsx (fuente de verdad global)
export default function RecepcionDashboard({ user, onNavigate, showToast, appointments, setAppointments, refreshAppointments }) {
  const today = new Date().toISOString().slice(0, 10);
  const todayAppts = appointments.filter((a) => a.date === today);

  const dateStr = new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const formattedDate = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

  const confirmAppt = async (id) => {
    try {
      await updateAppointmentStatus(id, 'confirmada');
      showToast({ type: 'success', title: 'Cita confirmada', message: 'Estado actualizado en el sistema' });
      if (refreshAppointments) await refreshAppointments();
    } catch (err) {
      // Fallback local
      setAppointments((prev) => prev.map((a) => a.id === id ? { ...a, status: 'confirmada' } : a));
      showToast({ type: 'success', title: 'Cita confirmada', message: 'Estado actualizado localmente' });
    }
  };

  return (
    <div className="p-6 space-y-5 view-enter">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-hav-text-main">Panel de Recepción</h1>
          <p className="text-hav-text-muted text-sm mt-0.5">
            {formattedDate} · {user.name}
          </p>
        </div>
        <button
          onClick={() => onNavigate('appointments')}
          className="flex items-center gap-2 bg-hav-primary hover:bg-hav-primary-dark text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-md shadow-hav-primary/20"
        >
          <Plus size={16} /> Nueva Cita
        </button>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Citas Hoy', value: todayAppts.length, icon: CalendarDays, color: 'bg-hav-primary' },
          { label: 'Confirmadas', value: todayAppts.filter((a) => a.status === 'confirmada').length, icon: CheckCircle, color: 'bg-hav-secondary' },
          { label: 'En Espera', value: todayAppts.filter((a) => a.status === 'en_espera').length, icon: Clock, color: 'bg-amber-400' },
          { label: 'Atendidos', value: 18, icon: Users, color: 'bg-indigo-500' },
        ].map(({ label, value, icon: I, color }) => (
          <div key={label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex items-center gap-3">
            <div className={`${color} w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0`}>
              <I size={18} className="text-white" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-hav-text-main">{value}</p>
              <p className="text-xs text-hav-text-muted">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5">
        {/* Today's appointments */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-50 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-hav-text-main">Citas de Hoy</h3>
            <button onClick={() => onNavigate('appointments')} className="text-xs text-hav-primary hover:underline">Ver calendario →</button>
          </div>
          {todayAppts.length === 0 ? (
            <div className="flex flex-col items-center py-10 text-hav-text-muted">
              <CalendarDays size={28} className="mb-2 opacity-30" />
              <p className="text-sm">No hay citas programadas para hoy</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todayAppts.map((a) => (
                <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-hav-primary/5 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-hav-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {a.patientName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-hav-text-main truncate">{a.patientName}</p>
                    <p className="text-xs text-hav-text-muted truncate">{a.specialty} · {a.time}</p>
                  </div>
                  {a.status === 'confirmada' ? (
                    <span className="flex items-center gap-1 text-[10px] text-hav-secondary font-semibold bg-green-50 px-2 py-1 rounded-full flex-shrink-0">
                      <CheckCircle size={10} /> OK
                    </span>
                  ) : (
                    <button
                      onClick={() => confirmAppt(a.id)}
                      className="text-xs bg-hav-primary text-white px-3 py-1.5 rounded-full hover:bg-hav-primary-dark transition-colors flex-shrink-0"
                    >
                      Confirmar
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
