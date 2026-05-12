import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Receipt, DollarSign, PieChart, Pizza } from 'lucide-react'

export const Sidebar = () => {
  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { path: '/ventas', name: 'Ventas', icon: Receipt },
    { path: '/gastos', name: 'Gastos', icon: DollarSign },
    { path: '/resumen', name: 'Resumen', icon: PieChart },
  ]

  return (
    <aside className="bg-[#1a1a1a] w-64 h-screen border-r border-[#333] hidden md:flex flex-col sticky top-0">
      <div className="p-6 flex items-center gap-3 border-b border-[#333]">
        <div className="bg-[#FF8C00] p-2 rounded-lg text-black">
          <Pizza size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white leading-tight">Pizzas</h1>
          <h2 className="text-sm font-semibold text-[#FF8C00] leading-tight">Bien Criollo</h2>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                isActive
                  ? 'bg-gradient-to-r from-[#8B0000] to-[#5a0000] text-white shadow-lg shadow-red-900/20'
                  : 'text-gray-400 hover:bg-[#2a2a2a] hover:text-white'
              }`
            }
          >
            <item.icon size={20} />
            {item.name}
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-[#333] text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Pizzas Bien Criollo
      </div>
    </aside>
  )
}
