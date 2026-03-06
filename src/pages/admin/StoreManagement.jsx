import { useState } from 'react'
import { FiDownload, FiEdit2, FiPackage } from 'react-icons/fi'
import './Admin.css'

const mockProducts = [
  { id: 1, name: 'Samrajya Lakshmi Deity Photo (Framed)', price: '₹999', stock: 45 },
  { id: 2, name: 'Brass Deepam (Traditional)', price: '₹450', stock: 120 },
  { id: 3, name: 'Kumkum & Vibhuti Set', price: '₹199', stock: 200 },
]

const mockOrders = [
  { id: 'ORD-091', customer: 'Ramesh K.', items: 2, total: '₹1,449', status: 'New', date: '2026-03-06' },
  { id: 'ORD-090', customer: 'Priya N.', items: 1, total: '₹501', status: 'Shipped', date: '2026-03-05' },
]

export default function StoreManagement() {
  const [tab, setTab] = useState('store')

  return (
    <div>
      <h2 className="admin-section-title">Store</h2>

      <div className="admin-tabs">
        <button type="button" className={tab === 'store' ? 'active' : ''} onClick={() => setTab('store')}>View and Manage Store</button>
        <button type="button" className={tab === 'orders' ? 'active' : ''} onClick={() => setTab('orders')}>View and Manage Orders</button>
        <button type="button" className="btn btn-secondary" style={{ marginLeft: 'auto' }}><FiDownload /> Export reports</button>
      </div>

      {tab === 'store' && (
        <div className="admin-card">
          <div className="admin-toolbar">
            <button type="button" className="btn btn-maroon"><FiPackage /> Add Product</button>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {mockProducts.map((p) => (
                  <tr key={p.id}>
                    <td><strong>{p.name}</strong></td>
                    <td>{p.price}</td>
                    <td>{p.stock}</td>
                    <td><button type="button" className="btn btn-secondary btn--sm"><FiEdit2 /> Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'orders' && (
        <div className="admin-card">
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.map((o) => (
                  <tr key={o.id}>
                    <td><strong>{o.id}</strong></td>
                    <td>{o.customer}</td>
                    <td>{o.items}</td>
                    <td>{o.total}</td>
                    <td><span className="admin-badge admin-badge--pending">{o.status}</span></td>
                    <td>{o.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
