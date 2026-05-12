import { Outlet, useLocation, Navigate } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { MobileNav } from '../components/MobileNav'
import { Toaster } from 'sonner'
import { Pizza } from 'lucide-react'

export const DashboardLayout = () => {
  const location = useLocation()
  
  if (location.pathname === '/') {
    return <Navigate to="/dashboard" replace />
  }

  const getPageTitle = () => {
    switch(location.pathname) {
      case '/dashboard': return 'Dashboard General'
      case '/ventas': return 'Gestión de Ventas'
      case '/gastos': return 'Gestión de Gastos'
      case '/resumen': return 'Resumen Financiero'
      default: return 'Pizzas Bien Criollo'
    }
  }

  return (
    <div className="flex h-screen bg-[#121212] overflow-hidden text-gray-100">
      <Sidebar />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="h-16 flex items-center justify-between px-6 bg-[#1a1a1a]/80 backdrop-blur-md border-b border-[#333] z-10 sticky top-0">
          <div className="flex items-center gap-2 md:hidden">
            <Pizza className="text-[#FF8C00]" size={24} />
            <h1 className="font-bold text-lg leading-tight">
              Bien <span className="text-[#FF8C00]">Criollo</span>
            </h1>
          </div>
          <h2 className="text-xl font-semibold hidden md:block text-gray-100">
            {getPageTitle()}
          </h2>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8B0000] to-[#FF8C00] flex items-center justify-center text-sm font-bold shadow-lg">
              PBC
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 md:pb-6 custom-scrollbar">
          <Outlet />
        </div>
      </main>

      <MobileNav />
      
      <Toaster 
        theme="dark" 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1E1E1E',
            border: '1px solid #333',
            color: '#fff',
          }
        }}
      />
    </div>
  )
}
