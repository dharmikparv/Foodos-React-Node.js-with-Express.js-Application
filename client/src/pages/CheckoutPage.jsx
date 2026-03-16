/**
 * Checkout: delivery form (name, address, phone), submit order, redirect to order status.
 * Redirects to cart if cart is empty. Shows API errors inline.
 */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useCart } from '../store/CartContext';
import { ordersApi } from '../services/api';
import { formatCurrency } from '../utils/format';
import { PageHeader, Button } from '../components/ui';

const CHECKOUT_SCHEMA = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  address: Yup.string()
    .min(5, 'Address must be at least 5 characters')
    .required('Address is required'),
  phoneNumber: Yup.string()
    .matches(
      /^\+?[\d\s\-()]{10,20}$/,
      'Enter a valid phone number (10-20 digits)'
    )
    .required('Phone number is required'),
});

const INITIAL_VALUES = {
  name: '',
  address: '',
  phoneNumber: '',
};

const inputClassName =
  'w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500';
const errorClassName = 'mt-1 text-sm text-red-500';
const labelClassName = 'block text-sm font-medium text-stone-700 mb-1';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart', { replace: true });
    }
  }, [cart.length, navigate]);

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    setStatus(null);
    try {
      const body = {
        deliveryDetails: values,
        items: cart.map((i) => ({ menuItemId: i.id, quantity: i.quantity })),
      };
      const order = await ordersApi.create(body);
      clearCart();
      navigate(`/order/${order.id}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to place order';
      setStatus(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return null;
  }

  return (
    <div>
      <PageHeader
        title="Checkout"
        subtitle="Enter your delivery details to complete the order."
      />

      <div className="max-w-2xl">
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={CHECKOUT_SCHEMA}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form className="space-y-6">
              {status && (
                <div
                  className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
                  role="alert"
                >
                  {status}
                </div>
              )}

              <div>
                <label htmlFor="checkout-name" className={labelClassName}>
                  Full Name
                </label>
                <Field
                  id="checkout-name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className={inputClassName}
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className={errorClassName}
                />
              </div>

              <div>
                <label htmlFor="checkout-address" className={labelClassName}>
                  Delivery Address
                </label>
                <Field
                  id="checkout-address"
                  name="address"
                  as="textarea"
                  rows={3}
                  placeholder="123 Main St, City, State, ZIP"
                  className={inputClassName}
                />
                <ErrorMessage
                  name="address"
                  component="p"
                  className={errorClassName}
                />
              </div>

              <div>
                <label htmlFor="checkout-phone" className={labelClassName}>
                  Phone Number
                </label>
                <Field
                  id="checkout-phone"
                  name="phoneNumber"
                  type="text"
                  placeholder="+1 555-123-4567"
                  className={inputClassName}
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="p"
                  className={errorClassName}
                />
              </div>

              <div className="flex items-center gap-4 pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="px-8 py-3"
                >
                  {isSubmitting
                    ? 'Placing Order...'
                    : `Place Order (${formatCurrency(totalPrice)})`}
                </Button>
                <button
                  type="button"
                  onClick={() => navigate('/cart')}
                  className="px-6 py-3 text-stone-600 hover:text-stone-800 font-medium"
                >
                  Back to Cart
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
