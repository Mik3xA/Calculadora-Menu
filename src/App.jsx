import { useState } from "react"
import { menuItems } from "./db/db"
import Header from "./components/Header"
import MenuItem from "./components/MenuItem"
import OrderContents from "./components/OrderContents"
import OrderTotals from "./components/OrderTotals"
import TipPercentageForm from "./components/TipPercentageForm"

function App() {

  const [order, setOrder] = useState([])
  const [tip, setTip] = useState(0)

  const addItem = (item) => {
    const itemExist = order.find(orderItem => orderItem.id === item.id)
    if(itemExist) {
      const updatedOrder = order.map( orderItem => orderItem.id === item.id ? 
        {...orderItem, quantity: orderItem.quantity + 1} : 
        orderItem
      )
      setOrder(updatedOrder)
    } else {
      const newItem = {...item, quantity: 1}
      setOrder([...order, newItem])
    }
  }

  const removeItem = (id) => {
    setOrder(order.filter( item => item.id !== id))
  }

  const placeOrder = () => {
    setOrder([])
    setTip(0)
  }

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto py-20 px-5 grid md:grid-cols-2 gap-10">
        <div className="p-5">
          <h2 className="text-4xl font-black">Menú</h2>
          <div className="mt-10 space-y-3">
            {menuItems.map(item => (
              <MenuItem 
                key={item.id}
                item={item}
                addItem={addItem}
              />
            ))}
          </div>
        </div>
        <div className="border border-dashed border-slate-300 p-5 rounded-lg space-y-10">
          {order.length > 0 ? (
            <>
              <OrderContents 
                order={order}
                removeItem={removeItem}
              />

              <TipPercentageForm 
                setTip={setTip}
                tip={tip}
              />

              <OrderTotals 
                order={order}
                tip={tip}
                placeOrder={placeOrder}
              />
            </>
          ) : (
            <p className="text-center">La orden esta vacia</p>
          )}
        </div>

      </main>
    </>
  )
}

export default App