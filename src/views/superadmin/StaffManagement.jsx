import { useState } from 'react';
import { Search, Plus, MoreVertical, Pencil, Trash2, Mail, Phone, Badge, X } from 'lucide-react';
import { STAFF } from '../../data/mockData';

const ROLE_LABELS = { recepcion: 'Recepción', enfermeria: 'Enfermería', administrativo: 'Administrativo', medico: 'Médico' };
const STATUS_STYLES = {
  activo: 'bg-green-100 text-green-700',
  inactivo: 'bg-red-100 text-red-700',
};

export default function StaffManagement({ showToast }) {
  const [staff, setStaff] = useState(STAFF);
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', role: 'recepcion', status: 'activo' });
  const [editingStaff, setEditingStaff] = useState(null);

  const handleSaveEdit = () => {
    setStaff((prev) => prev.map((s) => s.id === editingStaff.id ? editingStaff : s));
    setEditingStaff(null);
    showToast({ type: 'success', title: 'Cambios guardados', message: `El rol de ${editingStaff.name} fue actualizado.` });
  };

  const filtered = staff.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!form.name || !form.email) return;
    const newMember = { ...form, id: `s${Date.now()}`, since: new Date().toISOString().slice(0, 10) };
    setStaff((prev) => [...prev, newMember]);
    setForm({ name: '', email: '', role: 'recepcion', status: 'activo' });
    setShowModal(false);
    showToast({ type: 'success', title: 'Personal registrado', message: `${form.name} agregado al sistema` });
  };

  const handleDelete = (id, name) => {
    setStaff((prev) => prev.filter((s) => s.id !== id));
    setMenuOpen(null);
    showToast({ type: 'warning', title: 'Miembro eliminado', message: `${name} fue removido del sistema` });
  };

  return (
    <>
      <div className="p-6 space-y-5 view-enter">
        <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-hav-text-main">Gestión de Personal</h1>
          <p className="text-hav-text-muted text-sm mt-0.5">{staff.length} miembros del equipo</p>
        </div>
        <button
          id="btn-add-staff"
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-hav-primary hover:bg-hav-primary-dark text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-md shadow-hav-primary/20"
        >
          <Plus size={16} /> Agregar Personal
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-hav-text-muted" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre o correo..."
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-hav-text-main placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-hav-primary/30 focus:border-hav-primary"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-hav-text-muted">
            <Badge size={36} className="mb-3 opacity-30" />
            <p className="font-medium">No se encontró personal con ese criterio.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-semibold text-hav-text-muted uppercase tracking-wide">Nombre</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-hav-text-muted uppercase tracking-wide">Rol</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-hav-text-muted uppercase tracking-wide">Estado</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-hav-text-muted uppercase tracking-wide hidden md:table-cell">Fecha de Registro</th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-hav-text-muted uppercase tracking-wide">Habilitado</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-hav-primary text-white text-xs font-bold flex items-center justify-center">
                        {s.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </div>
                      <span className="font-medium text-hav-text-main text-sm">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs bg-hav-primary/10 text-hav-primary font-medium px-2 py-1 rounded-full">{ROLE_LABELS[s.role]}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${STATUS_STYLES[s.status]} ${s.status === 'inactivo' ? 'border border-red-200' : ''}`}>{s.status}</span>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell text-sm text-hav-text-muted">
                    {s.since || '15 Mar 2024'}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-center">
                      <button 
                        onClick={() => {
                          setStaff(prev => prev.map(member => member.id === s.id ? { ...member, status: member.status === 'inactivo' ? 'activo' : 'inactivo' } : member));
                        }}
                        className={`w-10 h-[22px] rounded-full p-[2px] transition-colors duration-200 ease-in-out ${s.status === 'inactivo' ? 'bg-gray-200' : 'bg-green-500'}`}
                      >
                        <div className={`w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${s.status === 'inactivo' ? 'translate-x-0' : 'translate-x-[18px]'}`} />
                      </button>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 relative">
                    <button
                      onClick={() => setMenuOpen(menuOpen === s.id ? null : s.id)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 text-hav-text-muted transition-colors"
                    >
                      <MoreVertical size={15} />
                    </button>
                    {menuOpen === s.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(null)} />
                        <div className="absolute right-8 top-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-1 w-36 animate-fadeIn">
                          <button
                            onClick={() => { setEditingStaff(s); setMenuOpen(null); }}
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-50 text-hav-text-main"
                          >
                            <Pencil size={13} /> Editar
                          </button>
                          <button
                            onClick={() => handleDelete(s.id, s.name)}
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-red-50 text-hav-danger"
                          >
                            <Trash2 size={13} /> Eliminar
                          </button>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal agregar */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fadeIn">
            <h2 className="text-lg font-display font-bold text-hav-text-main mb-5">Agregar Miembro del Personal</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-hav-text-muted block mb-1">Nombre completo</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nombre Apellido"
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-hav-primary/30 focus:border-hav-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-hav-text-muted block mb-1">Correo institucional</label>
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="usuario@hav.edu.ve"
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-hav-primary/30 focus:border-hav-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-hav-text-muted block mb-1">Rol</label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-hav-primary/30"
                  >
                    <option value="recepcion">Recepción</option>
                    <option value="enfermeria">Enfermería</option>
                    <option value="administrativo">Administrativo</option>
                    <option value="medico">Médico</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-hav-text-muted block mb-1">Estado</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-hav-primary/30"
                  >
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-hav-text-muted text-sm hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 py-2.5 rounded-xl bg-hav-primary text-white text-sm font-semibold hover:bg-hav-primary-dark transition-colors"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Side panel editar */}
      {editingStaff && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-sm h-full shadow-2xl flex flex-col pt-6 px-6 pb-0 animate-slideLeft">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-bold text-hav-text-main">Detalles del Personal</h2>
              <button onClick={() => setEditingStaff(null)} className="p-1.5 rounded-lg hover:bg-gray-100 text-hav-text-muted transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto pr-2">
              <div className="flex items-center gap-4 p-4 bg-gray-50/80 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-hav-primary text-white text-lg font-bold flex items-center justify-center flex-shrink-0 shadow-sm">
                  {editingStaff.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-hav-text-main truncate text-lg">{editingStaff.name}</h3>
                  <p className="text-sm text-hav-text-muted flex items-center gap-1.5 mt-0.5">
                    <Mail size={14} /> {editingStaff.email}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-hav-text-main block mb-2">Información de Sistema</label>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-100/50">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-hav-text-muted">Fecha de registro:</span>
                    <span className="font-medium text-hav-text-main">{editingStaff.since || '15 Mar 2024'}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-hav-text-muted">Estado actual:</span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${STATUS_STYLES[editingStaff.status]}`}>
                      {editingStaff.status}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-hav-text-main block mb-2">Asignación de Rol</label>
                <select
                  value={editingStaff.role}
                  onChange={(e) => setEditingStaff({ ...editingStaff, role: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-hav-text-main focus:outline-none focus:ring-2 focus:ring-hav-primary/30 active:border-hav-primary shadow-sm transition-all"
                >
                  <option value="recepcion">Recepción</option>
                  <option value="enfermeria">Enfermería</option>
                  <option value="administrativo">Administrativo</option>
                  <option value="medico">Médico</option>
                </select>
                <p className="text-xs text-hav-text-muted mt-2 leading-relaxed">
                  Modificar el rol cambiará los permisos de acceso y las vistas disponibles para este usuario en el portal.
                </p>
              </div>
            </div>

            <div className="py-5 border-t border-gray-100 flex gap-3 bg-white mt-auto">
              <button
                onClick={() => setEditingStaff(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-hav-text-main font-medium text-sm hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex-1 py-2.5 rounded-xl bg-hav-primary text-white font-semibold text-sm hover:bg-hav-primary-dark transition-colors shadow-md shadow-hav-primary/20"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
}
