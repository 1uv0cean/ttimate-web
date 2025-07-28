'use client';

import { DateRangePicker, DateRange } from '@/components/ui/DateRangePicker';
import { Calendar, Clock, MapPin, Plane, Building } from 'lucide-react';
import { useState } from 'react';

interface DemoSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const DemoSection = ({ title, children, className = '' }: DemoSectionProps) => {
  return (
    <section className={`space-y-4 sm:space-y-6 rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm ${className}`}>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 border-b border-gray-100 pb-2">{title}</h3>
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
      <h4 className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">{label}</h4>
      <div>{children}</div>
    </div>
  );
};

export const DateRangePickerDemo = () => {
  const [values, setValues] = useState<{[key: string]: DateRange}>({
    basic: { startDate: null, endDate: null },
    withLabel: { startDate: null, endDate: null },
    withError: { startDate: null, endDate: null },
    withSuccess: { startDate: null, endDate: null },
    withIcon: { startDate: null, endDate: null },
    vacation: { startDate: null, endDate: null },
    project: { startDate: null, endDate: null },
    booking: { startDate: null, endDate: null },
    contract: { startDate: null, endDate: null },
  });

  const handleChange = (key: string) => (dateRange: DateRange) => {
    setValues(prev => ({ ...prev, [key]: dateRange }));
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          <DemoItem label="Basic DateRange">
            <DateRangePicker
              placeholder="Select date range"
              value={values.basic}
              onDateRangeChange={handleChange('basic')}
            />
          </DemoItem>
          <DemoItem label="Required DateRange">
            <DateRangePicker
              label="Event Period"
              placeholder="Select event dates"
              required
              value={values.withLabel}
              onDateRangeChange={handleChange('withLabel')}
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Size Variants">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
          <DemoItem label="Small">
            <DateRangePicker
              size="sm"
              placeholder="Small range picker"
            />
          </DemoItem>
          <DemoItem label="Medium">
            <DateRangePicker
              size="md"
              placeholder="Medium range picker"
            />
          </DemoItem>
          <DemoItem label="Large">
            <DateRangePicker
              size="lg"
              placeholder="Large range picker"
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="State Variants">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          <DemoItem label="Error State">
            <DateRangePicker
              variant="error"
              label="Booking Period"
              placeholder="Select booking dates"
              error="Please select a valid date range"
              value={values.withError}
              onDateRangeChange={handleChange('withError')}
            />
          </DemoItem>
          <DemoItem label="Success State">
            <DateRangePicker
              variant="success"
              label="Approved Period"
              placeholder="Select approved dates"
              success={true}
              value={values.withSuccess}
              onDateRangeChange={handleChange('withSuccess')}
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="With Icons">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          <DemoItem label="Calendar Icon">
            <DateRangePicker
              label="Event Period"
              placeholder="Select event dates"
              leftIcon={<Calendar className="h-4 w-4" />}
              value={values.withIcon}
              onDateRangeChange={handleChange('withIcon')}
            />
          </DemoItem>
          <DemoItem label="Location Icon">
            <DateRangePicker
              label="Travel Period"
              placeholder="Select travel dates"
              leftIcon={<MapPin className="h-4 w-4" />}
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Date Constraints">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          <DemoItem label="Future Dates Only">
            <DateRangePicker
              label="Reservation Period"
              placeholder="Select reservation dates"
              minDate={today}
              helperText="Only future dates are allowed"
            />
          </DemoItem>
          <DemoItem label="Limited Days (7 days max)">
            <DateRangePicker
              label="Vacation Period"
              placeholder="Select vacation dates"
              minDate={today}
              maxDays={7}
              helperText="Maximum 7 days vacation period"
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="States">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          <DemoItem label="Disabled">
            <DateRangePicker
              label="Disabled Range"
              placeholder="Cannot select dates"
              disabled
            />
          </DemoItem>
          <DemoItem label="With Default Value">
            <DateRangePicker
              label="Current Week"
              placeholder="Select date range"
              defaultValue={{
                startDate: today,
                endDate: nextWeek
              }}
              helperText="Default to current week"
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Business Use Cases">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Employee Vacation Request">
            <div className="space-y-4">
              <DateRangePicker
                label="Vacation Period"
                placeholder="Select vacation dates"
                leftIcon={<Calendar className="h-4 w-4" />}
                minDate={nextWeek}
                maxDays={14}
                value={values.vacation}
                onDateRangeChange={handleChange('vacation')}
                helperText="Vacation must be requested 7 days in advance (max 14 days)"
              />
              {values.vacation.startDate && values.vacation.endDate && (
                <div className="text-sm text-muted-foreground">
                  Duration: {Math.ceil((values.vacation.endDate.getTime() - values.vacation.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1} days
                </div>
              )}
            </div>
          </DemoItem>

          <DemoItem label="Project Timeline">
            <div className="space-y-4">
              <DateRangePicker
                size="lg"
                label="Project Duration"
                placeholder="Select project timeline"
                leftIcon={<Building className="h-5 w-5" />}
                minDate={today}
                value={values.project}
                onDateRangeChange={handleChange('project')}
                helperText="Select project start and end dates"
              />
              {values.project.startDate && values.project.endDate && (
                <div className="text-sm text-muted-foreground">
                  Project length: {Math.ceil((values.project.endDate.getTime() - values.project.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1} days
                  ({Math.ceil((values.project.endDate.getTime() - values.project.startDate.getTime()) / (1000 * 60 * 60 * 24 * 7))} weeks)
                </div>
              )}
            </div>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Shipping & Logistics">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Booking Window">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <DateRangePicker
                label="Booking Period"
                placeholder="Select booking window"
                leftIcon={<Clock className="h-4 w-4" />}
                minDate={today}
                maxDate={nextMonth}
                value={values.booking}
                onDateRangeChange={handleChange('booking')}
                helperText="Available booking window"
              />
              <DateRangePicker
                label="Contract Period"
                placeholder="Select contract duration"
                leftIcon={<Plane className="h-4 w-4" />}
                minDate={today}
                value={values.contract}
                onDateRangeChange={handleChange('contract')}
                helperText="Contract start and end dates"
              />
            </div>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Complex Examples">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Multi-constraint Booking">
            <div className="space-y-4">
              <DateRangePicker
                size="lg"
                label="Shipping Schedule"
                placeholder="Select shipping period"
                leftIcon={<Calendar className="h-5 w-5" />}
                minDate={nextWeek}
                maxDays={30}
                helperText="Shipping schedules must be booked 7 days in advance (max 30 days period)"
              />
              <DateRangePicker
                variant="error"
                label="Emergency Booking"
                placeholder="Select emergency dates"
                leftIcon={<Clock className="h-4 w-4" />}
                error="Emergency bookings require special approval"
                required
                maxDays={3}
              />
            </div>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Range Selection Tips">
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">How to use DateRangePicker:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Click to open calendar and select start date first</li>
              <li>• Then select end date to complete the range</li>
              <li>• Selected range is highlighted in calendar</li>
              <li>• Click "Clear" to reset the selection</li>
              <li>• Click "Select start date" to change start date</li>
            </ul>
          </div>
        </div>
      </DemoSection>
    </div>
  );
};