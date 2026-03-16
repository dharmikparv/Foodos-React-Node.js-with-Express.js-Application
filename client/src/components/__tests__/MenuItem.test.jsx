import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../../store/CartContext';
import MenuItem from '../MenuItem';

const wrapper = ({ children }) => (
  <BrowserRouter>
    <CartProvider>{children}</CartProvider>
  </BrowserRouter>
);

const mockItem = {
  id: '1',
  name: 'Margherita Pizza',
  description: 'Classic tomato sauce, mozzarella, and basil',
  price: 12.99,
  image: 'https://example.com/pizza.jpg',
};

describe('MenuItem', () => {
  it('renders item name, description, and price', () => {
    render(<MenuItem item={mockItem} />, { wrapper });
    expect(screen.getByText('Margherita Pizza')).toBeInTheDocument();
    expect(screen.getByText(/Classic tomato sauce/)).toBeInTheDocument();
    expect(screen.getByText('$12.99')).toBeInTheDocument();
  });

  it('has Add to Cart button', () => {
    render(<MenuItem item={mockItem} />, { wrapper });
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
  });

  it('has quantity input', () => {
    render(<MenuItem item={mockItem} />, { wrapper });
    const input = screen.getByLabelText('Quantity');
    expect(input).toHaveValue(1);
    fireEvent.change(input, { target: { value: '3' } });
    expect(input).toHaveValue(3);
  });

  it('renders with data-testid menu-item', () => {
    render(<MenuItem item={mockItem} />, { wrapper });
    expect(screen.getByTestId('menu-item')).toBeInTheDocument();
  });
});
