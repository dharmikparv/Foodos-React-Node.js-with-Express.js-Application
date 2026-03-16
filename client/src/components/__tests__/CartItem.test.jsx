import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../../store/CartContext';
import CartItem from '../CartItem';

const wrapper = ({ children }) => (
  <BrowserRouter>
    <CartProvider>{children}</CartProvider>
  </BrowserRouter>
);

const mockItem = {
  id: '1',
  name: 'Margherita Pizza',
  price: 12.99,
  quantity: 2,
  image: 'https://example.com/pizza.jpg',
};

describe('CartItem', () => {
  it('renders item name, price, and quantity', () => {
    render(<CartItem item={mockItem} />, { wrapper });
    expect(screen.getByText('Margherita Pizza')).toBeInTheDocument();
    expect(screen.getByText('$12.99 each')).toBeInTheDocument();
    expect(screen.getByTestId('cart-item-qty')).toHaveTextContent('2');
  });

  it('shows line total', () => {
    render(<CartItem item={mockItem} />, { wrapper });
    expect(screen.getByText('$25.98')).toBeInTheDocument();
  });

  it('has decrease and increase buttons', () => {
    render(<CartItem item={mockItem} />, { wrapper });
    expect(screen.getByLabelText('Decrease quantity')).toBeInTheDocument();
    expect(screen.getByLabelText('Increase quantity')).toBeInTheDocument();
  });

  it('renders with data-testid cart-item', () => {
    render(<CartItem item={mockItem} />, { wrapper });
    expect(screen.getByTestId('cart-item')).toBeInTheDocument();
  });
});
