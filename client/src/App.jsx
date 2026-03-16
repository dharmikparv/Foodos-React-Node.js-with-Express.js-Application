/**
 * Root app: layout + route definitions for menu, cart, checkout, and orders.
 */
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderStatusPage from './pages/OrderStatusPage';
import OrdersListPage from './pages/OrdersListPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/orders" element={<OrdersListPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order/:orderId" element={<OrderStatusPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
