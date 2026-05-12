import { useEffect, useMemo, useState } from 'react'
import { ShoppingCart, DollarSign, Pizza, Wallet, Plus, Trash2, LayoutDashboard } from 'lucide-react'

const PRECIOS = {
  Muzza: 4000,
  Cebolla: 4500,
}

export default function App() {
  const [pagina, setPagina] = useState('dashboard')

  const [ventas, setVentas] = useState([
    {
      id: 1,
      vendedor: 'Diego',
      variedad: 'Muzza',
      cantidad: 3,
      negocio: 'Kiosco Central',
      total: 12000,
      fecha: new Date().toLocaleString(),
    },
    {
      id: 2,
      vendedor: 'Ariel',
      variedad: 'Cebolla',
      cantidad: 2,
      negocio: 'Bar El Galpón',
      total: 9000,
      fecha: new Date().toLocaleString(),
    },
  ])

  const [gastos, setGastos] = useState([
    {
      id: 1,
      responsable: 'Diego',
      donde: 'Mayorista Uno',
      monto: 5000,
      fecha: new Date().toLocaleString(),
    },
  ])

  const [ventaForm, setVentaForm] = useState({
    vendedor: 'Diego',
    variedad: 'Muzza',
    cantidad: 1,
    negocio: '',
  })

  const [gastoForm, setGastoForm] = useState({
    responsable: 'Diego',
    donde: '',
    monto: '',
  })

  const totalVentas = useMemo(
    () => ventas.reduce((acc, v) => acc + v.total, 0),
    [ventas]
  )

  const totalGastos = useMemo(
    () => gastos.reduce((acc, g) => acc + Number(g.monto), 0),
    [gastos]
  )

  const ganancia = totalVentas - totalGastos

  const pizzasVendidas = useMemo(
    () => ventas.reduce((acc, v) => acc + Number(v.cantidad), 0),
    [ventas]
  )

  const resumenDiego = useMemo(() => {
    const ventasDiego = ventas
      .filter((v) => v.vendedor === 'Diego')
      .reduce((acc, v) => acc + v.total, 0)

    const gastosDiego = gastos
      .filter((g) => g.responsable === 'Diego')
      .reduce((acc, g) => acc + Number(g.monto), 0)

    return {
      ventas: ventasDiego,
      gastos: gastosDiego,
      ganancia: ventasDiego - gastosDiego,
    }
  }, [ventas, gastos])

  const resumenAriel = useMemo(() => {
    const ventasAriel = ventas
      .filter((v) => v.vendedor === 'Ariel')
      .reduce((acc, v) => acc + v.total, 0)

    const gastosAriel = gastos
      .filter((g) => g.responsable === 'Ariel')
      .reduce((acc, g) => acc + Number(g.monto), 0)

    return {
      ventas: ventasAriel,
      gastos: gastosAriel,
      ganancia: ventasAriel - gastosAriel,
    }
  }, [ventas, gastos])

  const guardarVenta = () => {
    if (!ventaForm.negocio) {
      alert('Completá el negocio')
      return
    }

    const precio = PRECIOS[ventaForm.variedad]
    const total = precio * Number(ventaForm.cantidad)

    const nuevaVenta = {
      id: Date.now(),
      ...ventaForm,
      total,
      fecha: new Date().toLocaleString(),
    }

    setVentas([nuevaVenta, ...ventas])

    setVentaForm({
      vendedor: 'Diego',
      variedad: 'Muzza',
      cantidad: 1,
      negocio: '',
    })
  }

  const guardarGasto = () => {
    if (!gastoForm.donde || !gastoForm.monto) {
      alert('Completá todos los campos')
      return
    }

    const nuevoGasto = {
      id: Date.now(),
      ...gastoForm,
      fecha: new Date().toLocaleString(),
    }

    setGastos([nuevoGasto, ...gastos])

    setGastoForm({
      responsable: 'Diego',
      donde: '',
      monto: '',
    })
  }

  const eliminarVenta = (id) => {
    if (!confirm('¿Eliminar venta?')) return
    setVentas(ventas.filter((v) => v.id !== id))
  }

  const eliminarGasto = (id) => {
    if (!confirm('¿Eliminar gasto?')) return
    setGastos(gastos.filter((g) => g.id !== id))
  }

  const Card = ({ titulo, valor, icono }) => (
    <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-zinc-400 text-sm">{titulo}</h3>
        {icono}
      </div>

      <p className="text-3xl font-bold text-white">{valor}</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-black text-white flex">
      <aside className="w-64 bg-zinc-950 border-r border-zinc-800 p-5 hidden md:block">
        <h1 className="text-2xl font-bold text-orange-400 mb-10">
          🍕 Pizzas Bien Criollo
        </h1>

        <nav className="space-y-3">
          <button
            onClick={() => setPagina('dashboard')}
            className="w-full text-left px-4 py-3 rounded-xl bg-zinc-900 hover:bg-red-700 transition"
          >
            Dashboard
          </button>

          <button
            onClick={() => setPagina('ventas')}
            className="w-full text-left px-4 py-3 rounded-xl bg-zinc-900 hover:bg-red-700 transition"
          >
            Ventas
          </button>

          <button
            onClick={() => setPagina('gastos')}
            className="w-full text-left px-4 py-3 rounded-xl bg-zinc-900 hover:bg-red-700 transition"
          >
            Gastos
          </button>

          <button
            onClick={() => setPagina('resumen')}
            className="w-full text-left px-4 py-3 rounded-xl bg-zinc-900 hover:bg-red-700 transition"
          >
            Resumen
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-5 md:p-8">
        <div className="md:hidden flex gap-2 mb-5 overflow-auto">
          <button onClick={() => setPagina('dashboard')} className="bg-zinc-900 px-4 py-2 rounded-xl">Dashboard</button>
          <button onClick={() => setPagina('ventas')} className="bg-zinc-900 px-4 py-2 rounded-xl">Ventas</button>
          <button onClick={() => setPagina('gastos')} className="bg-zinc-900 px-4 py-2 rounded-xl">Gastos</button>
          <button onClick={() => setPagina('resumen')} className="bg-zinc-900 px-4 py-2 rounded-xl">Resumen</button>
        </div>

        {pagina === 'dashboard' && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              <Card
                titulo="Ventas Totales"
                valor={`$${totalVentas.toLocaleString()}`}
                icono={<DollarSign className="text-green-400" />}
              />

              <Card
                titulo="Gastos Totales"
                valor={`$${totalGastos.toLocaleString()}`}
                icono={<Wallet className="text-red-400" />}
              />

              <Card
                titulo="Ganancia"
                valor={`$${ganancia.toLocaleString()}`}
                icono={<ShoppingCart className="text-orange-400" />}
              />

              <Card
                titulo="Pizzas Vendidas"
                valor={pizzasVendidas}
                icono={<Pizza className="text-yellow-400" />}
              />
            </div>

            <div className="mt-10 bg-zinc-900 rounded-2xl p-5 border border-zinc-800">
              <h3 className="text-xl font-semibold mb-5">Últimas ventas</h3>

              <div className="space-y-3">
                {ventas.slice(0, 5).map((venta) => (
                  <div
                    key={venta.id}
                    className="bg-zinc-800 rounded-xl p-4 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-bold">{venta.vendedor}</p>
                      <p className="text-zinc-400 text-sm">
                        {venta.variedad} x {venta.cantidad}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-orange-400 font-bold">
                        ${venta.total.toLocaleString()}
                      </p>
                      <p className="text-zinc-500 text-sm">{venta.negocio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {pagina === 'ventas' && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Ventas</h2>

            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block mb-2 text-zinc-400">Vendedor</label>
                  <select
                    value={ventaForm.vendedor}
                    onChange={(e) =>
                      setVentaForm({ ...ventaForm, vendedor: e.target.value })
                    }
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3"
                  >
                    <option>Diego</option>
                    <option>Ariel</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-zinc-400">Variedad</label>
                  <select
                    value={ventaForm.variedad}
                    onChange={(e) =>
                      setVentaForm({ ...ventaForm, variedad: e.target.value })
                    }
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3"
                  >
                    <option>Muzza</option>
                    <option>Cebolla</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-zinc-400">Negocio</label>
                  <input
                    value={ventaForm.negocio}
                    onChange={(e) =>
                      setVentaForm({ ...ventaForm, negocio: e.target.value })
                    }
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3"
                    placeholder="Ej: Kiosco Central"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-zinc-400">Cantidad</label>
                  <input
                    type="number"
                    min="1"
                    value={ventaForm.cantidad}
                    onChange={(e) =>
                      setVentaForm({ ...ventaForm, cantidad: e.target.value })
                    }
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3"
                  />
                </div>
              </div>

              <div className="mt-6 bg-zinc-800 rounded-xl p-4">
                <p className="text-zinc-400 mb-2">Total calculado</p>
                <p className="text-3xl font-bold text-orange-400">
                  ${(
                    PRECIOS[ventaForm.variedad] * ventaForm.cantidad
                  ).toLocaleString()}
                </p>
              </div>

              <button
                onClick={guardarVenta}
                className="mt-6 bg-red-700 hover:bg-red-600 transition px-6 py-3 rounded-xl font-bold flex items-center gap-2"
              >
                <Plus size={18} />
                Guardar venta
              </button>
            </div>

            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
              <table className="w-full">
                <thead className="bg-zinc-800">
                  <tr>
                    <th className="text-left p-4">Vendedor</th>
                    <th className="text-left p-4">Pizza</th>
                    <th className="text-left p-4">Cantidad</th>
                    <th className="text-left p-4">Negocio</th>
                    <th className="text-left p-4">Total</th>
                    <th className="text-left p-4">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {ventas.map((venta) => (
                    <tr key={venta.id} className="border-t border-zinc-800">
                      <td className="p-4">{venta.vendedor}</td>
                      <td className="p-4">{venta.variedad}</td>
                      <td className="p-4">{venta.cantidad}</td>
                      <td className="p-4">{venta.negocio}</td>
                      <td className="p-4 text-orange-400 font-bold">
                        ${venta.total.toLocaleString()}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => eliminarVenta(venta.id)}
                          className="bg-red-700 p-2 rounded-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {pagina === 'gastos' && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Gastos</h2>

            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block mb-2 text-zinc-400">Responsable</label>
                  <select
                    value={gastoForm.responsable}
                    onChange={(e) =>
                      setGastoForm({
                        ...gastoForm,
                        responsable: e.target.value,
                      })
                    }
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3"
                  >
                    <option>Diego</option>
                    <option>Ariel</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-zinc-400">Dónde compró</label>
                  <input
                    value={gastoForm.donde}
                    onChange={(e) =>
                      setGastoForm({ ...gastoForm, donde: e.target.value })
                    }
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3"
                    placeholder="Mayorista"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-zinc-400">Monto</label>
                  <input
                    type="number"
                    value={gastoForm.monto}
                    onChange={(e) =>
                      setGastoForm({ ...gastoForm, monto: e.target.value })
                    }
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3"
                    placeholder="5000"
                  />
                </div>
              </div>

              <button
                onClick={guardarGasto}
                className="mt-6 bg-red-700 hover:bg-red-600 transition px-6 py-3 rounded-xl font-bold flex items-center gap-2"
              >
                <Plus size={18} />
                Guardar gasto
              </button>
            </div>

            <div className="space-y-4">
              {gastos.map((gasto) => (
                <div
                  key={gasto.id}
                  className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 flex justify-between items-center"
                >
                  <div>
                    <p className="font-bold">{gasto.responsable}</p>
                    <p className="text-zinc-400">{gasto.donde}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="text-red-400 font-bold text-xl">
                      ${Number(gasto.monto).toLocaleString()}
                    </p>

                    <button
                      onClick={() => eliminarGasto(gasto.id)}
                      className="bg-red-700 p-2 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {pagina === 'resumen' && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Resumen General</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              <Card
                titulo="Ventas"
                valor={`$${totalVentas.toLocaleString()}`}
                icono={<DollarSign className="text-green-400" />}
              />

              <Card
                titulo="Gastos"
                valor={`$${totalGastos.toLocaleString()}`}
                icono={<Wallet className="text-red-400" />}
              />

              <Card
                titulo="Ganancia"
                valor={`$${ganancia.toLocaleString()}`}
                icono={<Pizza className="text-orange-400" />}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
                <h3 className="text-2xl font-bold text-orange-400 mb-5">
                  Diego
                </h3>

                <div className="space-y-3">
                  <p>Ventas: ${resumenDiego.ventas.toLocaleString()}</p>
                  <p>Gastos: ${resumenDiego.gastos.toLocaleString()}</p>
                  <p className="font-bold text-green-400">
                    Ganancia: ${resumenDiego.ganancia.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
                <h3 className="text-2xl font-bold text-orange-400 mb-5">
                  Ariel
                </h3>

                <div className="space-y-3">
                  <p>Ventas: ${resumenAriel.ventas.toLocaleString()}</p>
                  <p>Gastos: ${resumenAriel.gastos.toLocaleString()}</p>
                  <p className="font-bold text-green-400">
                    Ganancia: ${resumenAriel.ganancia.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
