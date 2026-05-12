import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Receipt, DollarSign, PieChart } from 'lucide-react'

export const MobileNav = () => {
  const menuItems = [
    { path: '/dashboard', name: 'Dash', icon: LayoutDashboard },
    { path: '/ventas', name: 'Ventas', icon: Receipt },
    { path: '/gastos', name: 'Gastos', icon: DollarSign },
    { path: '/resumen', name: 'Resumen', icon: PieChart },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-[#333] z-50">
      <div className="flex justify-around items-center p-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center p-2 rounded-lg w-16 transition-all duration-300 ${
                isActive
                  ? 'text-[#FF8C00]'
                  : 'text-gray-400 hover:text-gray-200'
              }`
            }
          >
            <item.icon size={22} className="mb-1" />
            <span className="text-[10px] font-medium">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
