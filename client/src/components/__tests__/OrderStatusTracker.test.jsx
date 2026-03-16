import { render, screen } from '@testing-library/react';
import OrderStatusTracker from '../OrderStatusTracker';

describe('OrderStatusTracker', () => {
  it('shows current status', () => {
    render(<OrderStatusTracker currentStatus="Preparing" />);
    expect(screen.getByText('Current status: Preparing')).toBeInTheDocument();
  });

  it('renders all status steps', () => {
    render(<OrderStatusTracker currentStatus="Order Received" />);
    expect(screen.getByText('Order Received')).toBeInTheDocument();
    expect(screen.getByText('Preparing')).toBeInTheDocument();
    expect(screen.getByText('Out for Delivery')).toBeInTheDocument();
    expect(screen.getByText('Delivered')).toBeInTheDocument();
  });

  it('has data-testid order-status-tracker', () => {
    render(<OrderStatusTracker currentStatus="Order Received" />);
    expect(screen.getByTestId('order-status-tracker')).toBeInTheDocument();
  });
});
