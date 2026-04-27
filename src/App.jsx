import React, { useMemo } from 'react';
import { 
  BarChart3, 
  Users, 
  MessageCircle, 
  TrendingUp, 
  DollarSign, 
  Eye, 
  Filter,
  Pizza,
  ArrowUpRight,
  Target
} from 'lucide-react';

// Datos extraídos fielmente de la imagen de abril
const campaignData = [
  { name: "4 pizzas, 4 sabores, un solo plan", results: 84, type: "Mensajes a WhatsApp", costPerResult: 1769.37, impressions: 37666, reach: 20144 },
  { name: "Abril sabe mejor en familia (Camp. 1)", results: 40, type: "Mensajes a WhatsApp", costPerResult: 3749.98, impressions: 28823, reach: 12013 },
  { name: "Nos atrevemos a decir que la fórmula...", results: 1604, type: "Interacciones", costPerResult: 93.48, impressions: 47321, reach: 14660 },
  { name: "Abril sabe mejor en familia (Camp. 2)", results: 51, type: "Mensajes a WhatsApp", costPerResult: 2932.61, impressions: 24299, reach: 11608 },
  { name: "Solo contenido", results: 2066, type: "Interacciones", costPerResult: 72.60, impressions: 37032, reach: 11960 },
  { name: "¿Ya llevaron a sus chiquis...?", results: 33, type: "Mensajes a WhatsApp", costPerResult: 1081.03, impressions: 5741, reach: 4038 },
  { name: "Definitivamente aquí lo encuentras todo", results: 12, type: "Mensajes a WhatsApp", costPerResult: 3344.58, impressions: 5979, reach: 4426 }
];

const App = () => {
  // Cálculo de totales con validación de seguridad
  const totals = useMemo(() => {
    return campaignData.reduce((acc, curr) => {
      const spent = (curr.results || 0) * (curr.costPerResult || 0);
      acc.spent += spent;
      acc.impressions += (curr.impressions || 0);
      acc.reach += (curr.reach || 0);
      if (curr.type === "Mensajes a WhatsApp") acc.whatsapp += (curr.results || 0);
      if (curr.type === "Interacciones") acc.interactions += (curr.results || 0);
      return acc;
    }, { spent: 0, impressions: 0, reach: 0, whatsapp: 0, interactions: 0 });
  }, []);

  const formatCurrency = (val) => new Intl.NumberFormat('es-CO', { 
    style: 'currency', 
    currency: 'COP', 
    maximumFractionDigits: 0 
  }).format(val || 0);

  const formatNumber = (val) => new Intl.NumberFormat('es-CO').format(val || 0);

  return (
    <div className="min-h-screen bg-[#fcfcfd] text-slate-900 font-sans p-4 md:p-10 w-full">
      {/* Header Premium */}
      <header className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-orange-600 p-4 rounded-3xl shadow-2xl shadow-orange-200 rotate-3">
            <Pizza className="text-white w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-800">Memos Pizza</h1>
            <div className="flex items-center gap-2">
               <span className="text-orange-600 font-bold uppercase text-[10px] tracking-widest bg-orange-50 px-2 py-0.5 rounded-md">Abril 2026</span>
               <span className="text-slate-400 text-[10px] font-medium uppercase tracking-widest">Reporte de Performance</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 bg-white p-2 pr-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
            <Target className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">Estado de Cuenta</p>
            <p className="text-sm font-black text-slate-700">Activa & Optimizada</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-8">
        
        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            label="Inversión Mensual" 
            value={formatCurrency(totals.spent)} 
            icon={<DollarSign className="w-5 h-5" />} 
            color="emerald" 
          />
          <StatCard 
            label="Alcance Único" 
            value={formatNumber(totals.reach)} 
            icon={<Users className="w-5 h-5" />} 
            color="blue" 
          />
          <StatCard 
            label="Mensajes Directos" 
            value={formatNumber(totals.whatsapp)} 
            icon={<MessageCircle className="w-5 h-5" />} 
            color="orange" 
          />
          <StatCard 
            label="Costo Medio Conversión" 
            value={formatCurrency(totals.spent / (totals.whatsapp || 1))} 
            icon={<TrendingUp className="w-5 h-5" />} 
            color="rose" 
          />
        </div>

        {/* Campaign Table */}
        <section className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">Desglose de Pauta Publicitaria</h2>
              <p className="text-sm text-slate-400 mt-1">Resultados detallados de abril</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl text-slate-400 border border-slate-100">
              <Filter className="w-5 h-5" />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] text-slate-400 uppercase tracking-[0.15em] font-black border-b border-slate-50">
                  <th className="px-8 py-5">Campaña</th>
                  <th className="px-6 py-5 text-center">Resultados</th>
                  <th className="px-6 py-5 text-center">Objetivo</th>
                  <th className="px-6 py-5 text-right">Costo / Res</th>
                  <th className="px-8 py-5 text-right">Impresiones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {campaignData.map((ad, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-all group">
                    <td className="px-8 py-6">
                      <span className="font-bold text-slate-700 text-sm group-hover:text-orange-600 transition-colors">
                        {ad.name}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <span className="px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-black">
                        {formatNumber(ad.results)}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider ${
                        ad.type.includes('WhatsApp') ? 'bg-emerald-50 text-emerald-600' : 'bg-sky-50 text-sky-600'
                      }`}>
                        {ad.type}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <p className="text-sm font-bold text-slate-700">{formatCurrency(ad.costPerResult)}</p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span className="text-slate-500 font-medium text-sm">
                        {formatNumber(ad.impressions)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Visual Summary */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-4">Métricas de Impacto</h3>
              <p className="text-slate-400 mb-8 max-w-sm">Análisis de la eficiencia del presupuesto invertido este mes.</p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                  <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-2">Frecuencia</p>
                  <p className="text-3xl font-black">{(totals.impressions / (totals.reach || 1)).toFixed(2)}</p>
                </div>
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                  <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-2">Gasto Total</p>
                  <p className="text-2xl font-black">{formatCurrency(totals.spent)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm flex flex-col justify-center">
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-orange-500" />
              Conversiones vs Interacciones
            </h4>
            <div className="space-y-8">
              <ProgressItem label="Interacciones Totales" current={totals.interactions} max={4000} color="bg-sky-500" />
              <ProgressItem label="Mensajes WhatsApp" current={totals.whatsapp} max={500} color="bg-emerald-500" />
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-7xl mx-auto pt-8 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
          Memos Pizza © 2026 • Intelligence Dashboard
        </p>
      </footer>
    </div>
  );
};

const StatCard = ({ label, value, icon, color }) => {
  const colors = {
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100"
  };

  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm transition-all group">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border ${colors[color]}`}>
        {icon}
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-black text-slate-800 tracking-tight">{value}</p>
        <ArrowUpRight className="w-4 h-4 text-slate-200" />
      </div>
    </div>
  );
};

const ProgressItem = ({ label, current, max, color }) => {
  const percentage = Math.min((current / max) * 100, 100);
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs font-black text-slate-800 uppercase tracking-tighter">{label}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase">{current} registrados</p>
        </div>
        <span className="text-lg font-black text-slate-800">{Math.round(percentage)}%</span>
      </div>
      <div className="h-4 w-full bg-slate-50 rounded-full overflow-hidden p-1 border border-slate-100">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-1000 ease-out shadow-sm`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default App;
