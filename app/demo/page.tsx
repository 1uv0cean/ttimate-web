'use client';

import { AccordionDemo } from '@/components/demo/AccordionDemo';
import { BadgeDemo } from '@/components/demo/BadgeDemo';
import { BreadcrumbDemo } from '@/components/demo/BreadcrumbDemo';
import { ButtonDemo } from '@/components/demo/ButtonDemo';
import { CardDemo } from '@/components/demo/CardDemo';
import { CheckboxDemo } from '@/components/demo/CheckboxDemo';
import { DataTableDemo } from '@/components/demo/DataTableDemo';
import { DatePickerDemo } from '@/components/demo/DatePickerDemo';
import { DateRangePickerDemo } from '@/components/demo/DateRangePickerDemo';
import { DialogDemo } from '@/components/demo/DialogDemo';
import { FileUploadDemo } from '@/components/demo/FileUploadDemo';
import { InputDemo } from '@/components/demo/InputDemo';
import { ProgressDemo } from '@/components/demo/ProgressDemo';
import { RatingDemo } from '@/components/demo/RatingDemo';
import { SelectDemo } from '@/components/demo/SelectDemo';
import { SectionDemo } from '@/components/demo/SectionDemo';
import { SidebarDemo } from '@/components/demo/SidebarDemo';
import { StepperDemo } from '@/components/demo/StepperDemo';
import { SwitchDemo } from '@/components/demo/SwitchDemo';
import { TableDemo } from '@/components/demo/TableDemo';
import { TextareaDemo } from '@/components/demo/TextareaDemo';
import { ToastDemo } from '@/components/demo/ToastDemo';
import { TopNavigatorDemo } from '@/components/demo/TopNavigatorDemo';
import { TypographyDemo } from '@/components/demo/TypographyDemo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { ToastProvider } from '@/components/ui/Toast';

// Component configuration for easy management and extensibility
const componentTabs = [
  { id: 'accordion', label: 'Accordion', component: AccordionDemo },
  { id: 'badge', label: 'Badge', component: BadgeDemo },
  { id: 'breadcrumb', label: 'Breadcrumb', component: BreadcrumbDemo },
  { id: 'button', label: 'Button', component: ButtonDemo },
  { id: 'card', label: 'Card', component: CardDemo },
  { id: 'checkbox', label: 'Checkbox', component: CheckboxDemo },
  { id: 'datatable', label: 'Data Table', component: DataTableDemo },
  { id: 'datepicker', label: 'Date Picker', component: DatePickerDemo },
  { id: 'daterange', label: 'Date Range', component: DateRangePickerDemo },
  { id: 'dialog', label: 'Dialog', component: DialogDemo },
  { id: 'fileupload', label: 'File Upload', component: FileUploadDemo },
  { id: 'input', label: 'Input', component: InputDemo },
  { id: 'progress', label: 'Progress', component: ProgressDemo },
  { id: 'rating', label: 'Rating', component: RatingDemo },
  { id: 'select', label: 'Select', component: SelectDemo },
  { id: 'section', label: 'Section', component: SectionDemo },
  { id: 'sidebar', label: 'Sidebar', component: SidebarDemo },
  { id: 'stepper', label: 'Stepper', component: StepperDemo },
  { id: 'switch', label: 'Switch', component: SwitchDemo },
  { id: 'table', label: 'Table', component: TableDemo },
  { id: 'textarea', label: 'Textarea', component: TextareaDemo },
  { id: 'toast', label: 'Toast', component: ToastDemo },
  { id: 'topnavigation', label: 'Top Navigation', component: TopNavigatorDemo },
  { id: 'typography', label: 'Typography', component: TypographyDemo },
] as const;

const DemoPage = () => {
  return (
    <ToastProvider>
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="mb-2 text-2xl sm:text-4xl font-bold tracking-tight">Component Library</h1>
          <p className="text-muted-foreground text-sm sm:text-lg">
            Explore our comprehensive collection of UI components
          </p>
        </div>

        <Tabs defaultValue="accordion" className="space-y-6">
          {/* Responsive Tab Navigation */}
          <div className="w-full">
            <div className="mx-auto max-w-6xl">
              <TabsList className="bg-muted/50 grid h-auto grid-cols-2 gap-0.5 sm:gap-1 rounded-xl p-0.5 sm:p-1 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                {componentTabs.map(({ id, label }) => (
                  <TabsTrigger
                    key={id}
                    value={id}
                    className="data-[state=active]:bg-background rounded-md sm:rounded-lg px-2 py-1.5 sm:py-2 text-xs sm:text-sm font-medium whitespace-nowrap transition-all data-[state=active]:shadow-sm"
                  >
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>
          {/* Dynamic Tab Content */}
          {componentTabs.map(({ id, component: Component }) => (
            <TabsContent
              key={id}
              value={id}
              className="from-background to-muted/20 rounded-xl sm:rounded-2xl border bg-gradient-to-br p-4 sm:p-6 shadow-sm md:p-8"
            >
              <div className="mx-auto w-full max-w-6xl overflow-hidden">
                <div className="w-full min-w-0">
                  <Component />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </ToastProvider>
  );
};

export default DemoPage;
