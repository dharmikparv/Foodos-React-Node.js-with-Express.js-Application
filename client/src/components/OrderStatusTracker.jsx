/**
 * Order progress: step indicators (Received → Preparing → Out for Delivery → Delivered).
 */
import { ORDER_STATUS_LABELS } from '../utils/constants';

const STEPS = [
  'Order Received',
  'Preparing',
  'Out for Delivery',
  'Delivered',
];

export default function OrderStatusTracker({ currentStatus }) {
  const currentStep = ORDER_STATUS_LABELS[currentStatus]?.step ?? 0;

  return (
    <div data-testid="order-status-tracker">
      <div className="flex items-start md:flex-row flex-col">
        {STEPS.map((status, idx) => {
          const isActive = idx <= currentStep;
          const isCurrent = idx === currentStep;
          return (
            <div key={status} className="flex md:items-start md:flex-row flex-col flex-1 last:flex-none">
              <div className="flex md:flex-col flex-row max-md:gap-2 items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition shrink-0 ${
                    isActive
                      ? 'bg-primary-500 text-white'
                      : 'bg-stone-200 text-stone-500'
                  } ${isCurrent ? 'ring-4 ring-primary-200' : ''}`}
                >
                  {idx + 1}
                </div>
                <span
                  className={`md:mt-2 md:text-center text-sm font-medium md:max-w-[80px] ${
                    isActive ? 'text-stone-900' : 'text-stone-400'
                  }`}
                >
                  {status}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div
                  className={`md:flex-1 md:h-1 h-8 mx-1 max-md:w-1 max-md:ml-[22px] md:mt-6 md:rounded ${
                    idx < currentStep ? 'bg-primary-500' : 'bg-stone-200'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-8 p-4 rounded-xl bg-primary-50 border border-primary-100">
        <p className="text-center font-display font-semibold text-primary-800">
          Current status: {currentStatus}
        </p>
      </div>
    </div>
  );
}
