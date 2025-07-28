'use client';

import { DatePicker } from '@/components/ui/DatePicker';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { useState } from 'react';

interface DemoSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const DemoSection = ({ title, children, className = '' }: DemoSectionProps) => {
  return (
    <section
      className={`space-y-4 sm:space-y-6 rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm ${className}`}
    >
      <h3 className="border-b border-gray-100 pb-2 text-lg sm:text-xl font-semibold text-gray-900">{title}</h3>
      {children}
    </section>
  );
};

interface DemoItemProps {
  label: string;
  children: React.ReactNode;
}

const DemoItem = ({ label, children }: DemoItemProps) => {
  return (
    <div className="space-y-2 sm:space-y-3">
      <h4 className="text-xs sm:text-sm font-semibold tracking-wide text-gray-700 uppercase">{label}</h4>
      <div>{children}</div>
    </div>
  );
};

export const DatePickerDemo = () => {
  const [values, setValues] = useState({
    basic: null as Date | null,
    withLabel: null as Date | null,
    withError: null as Date | null,
    withSuccess: null as Date | null,
    withIcon: null as Date | null,
    departure: null as Date | null,
    arrival: null as Date | null,
  });

  const handleChange = (key: string) => (date: Date | null) => {
    setValues((prev) => ({ ...prev, [key]: date }));
  };

  // Date constraints
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const nextMonth = new Date();
  nextMonth.setMonth(today.getMonth() + 1);

  const lastMonth = new Date();
  lastMonth.setMonth(today.getMonth() - 1);

  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-8 overflow-hidden">
      <DemoSection title="Basic Examples">
        <div className="grid grid-cols-1 gap-4 sm:gap-8 md:grid-cols-2">
          <DemoItem label="Basic DatePicker">
            <DatePicker
              placeholder="Select date"
              value={values.basic}
              onDateChange={handleChange('basic')}
            />
          </DemoItem>
          <DemoItem label="Required DatePicker">
            <DatePicker
              label="Birth Date"
              placeholder="Select birth date"
              required
              value={values.withLabel}
              onDateChange={handleChange('withLabel')}
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Size Variants">
        <div className="grid grid-cols-1 gap-4 sm:gap-8 md:grid-cols-3">
          <DemoItem label="Small">
            <DatePicker size="sm" placeholder="Small date picker" />
          </DemoItem>
          <DemoItem label="Medium">
            <DatePicker size="md" placeholder="Medium date picker" />
          </DemoItem>
          <DemoItem label="Large">
            <DatePicker size="lg" placeholder="Large date picker" />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="State Variants">
        <div className="grid grid-cols-1 gap-4 sm:gap-8 md:grid-cols-2">
          <DemoItem label="Error State">
            <DatePicker
              variant="error"
              label="Event Date"
              placeholder="Select event date"
              error="Please select a valid date"
              value={values.withError}
              onDateChange={handleChange('withError')}
            />
          </DemoItem>
          <DemoItem label="Success State">
            <DatePicker
              variant="success"
              label="Booking Date"
              placeholder="Select booking date"
              success={true}
              value={values.withSuccess}
              onDateChange={handleChange('withSuccess')}
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="With Icons">
        <div className="grid grid-cols-1 gap-4 sm:gap-8 md:grid-cols-2">
          <DemoItem label="Calendar Icon">
            <DatePicker
              label="Schedule Date"
              placeholder="Select schedule date"
              leftIcon={<Calendar className="h-4 w-4" />}
              value={values.withIcon}
              onDateChange={handleChange('withIcon')}
            />
          </DemoItem>
          <DemoItem label="Location Icon">
            <DatePicker
              label="Visit Date"
              placeholder="Select visit date"
              leftIcon={<MapPin className="h-4 w-4" />}
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Date Constraints">
        <div className="grid grid-cols-1 gap-4 sm:gap-8 md:grid-cols-2">
          <DemoItem label="Future Dates Only">
            <DatePicker
              label="Appointment Date"
              placeholder="Select appointment date"
              minDate={today}
              helperText="Only future dates are allowed"
            />
          </DemoItem>
          <DemoItem label="Date Range">
            <DatePicker
              label="Event Date"
              placeholder="Select event date"
              minDate={today}
              maxDate={nextMonth}
              helperText="Select date within next month"
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="States">
        <div className="grid grid-cols-1 gap-4 sm:gap-8 md:grid-cols-2">
          <DemoItem label="Disabled">
            <DatePicker label="Disabled Date" placeholder="Cannot select date" disabled />
          </DemoItem>
          <DemoItem label="With Default Value">
            <DatePicker
              label="Meeting Date"
              placeholder="Select meeting date"
              defaultValue={today}
              helperText="Default to today"
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Business Use Cases">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Shipping Schedule">
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
              <DatePicker
                label="Departure Date"
                placeholder="Select departure date"
                leftIcon={<Clock className="h-4 w-4" />}
                minDate={today}
                value={values.departure}
                onDateChange={handleChange('departure')}
                helperText="Earliest departure: Today"
              />
              <DatePicker
                label="Arrival Date"
                placeholder="Select arrival date"
                leftIcon={<MapPin className="h-4 w-4" />}
                minDate={values.departure || today}
                value={values.arrival}
                onDateChange={handleChange('arrival')}
                helperText={
                  values.departure ? 'Must be after departure date' : 'Select departure date first'
                }
              />
            </div>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Complex Examples">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Booking Form">
            <div className="space-y-4">
              <DatePicker
                size="lg"
                label="Booking Date"
                placeholder="Select booking date"
                leftIcon={<Calendar className="h-5 w-5" />}
                minDate={nextWeek}
                helperText="Bookings must be made at least 7 days in advance"
              />
              <DatePicker
                variant="error"
                label="Contract Expiry"
                placeholder="Select contract expiry date"
                leftIcon={<Clock className="h-4 w-4" />}
                error="Contract expiry date is required"
                required
              />
            </div>
          </DemoItem>
        </div>
      </DemoSection>
    </div>
  );
};
