'use client';

import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
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

export const TypographyDemo = () => {
  const [selectedVariant, setSelectedVariant] = useState<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'large' | 'small' | 'muted' | 'lead' | 'blockquote' | 'code'>('h1');
  const [selectedSize, setSelectedSize] = useState<'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'>('base');
  const [selectedWeight, setSelectedWeight] = useState<'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black'>('normal');
  const [selectedAlign, setSelectedAlign] = useState<'left' | 'center' | 'right' | 'justify'>('left');
  const [selectedColor, setSelectedColor] = useState<'default' | 'muted' | 'primary' | 'secondary' | 'destructive' | 'success' | 'warning' | 'info'>('default');

  const sampleText = "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet and is commonly used for typography demonstrations.";

  return (
    <div className="max-w-full space-y-6 sm:space-y-8">
      <DemoSection title="Heading Variants">
        <div className="space-y-4">
          <Typography variant="h1">Heading 1 - Main Title</Typography>
          <Typography variant="h2">Heading 2 - Section Title</Typography>
          <Typography variant="h3">Heading 3 - Subsection Title</Typography>
          <Typography variant="h4">Heading 4 - Minor Heading</Typography>
          <Typography variant="h5">Heading 5 - Small Heading</Typography>
          <Typography variant="h6">Heading 6 - Smallest Heading</Typography>
        </div>
      </DemoSection>

      <DemoSection title="Text Variants">
        <div className="space-y-4">
          <Typography variant="p">
            This is a regular paragraph. It has proper line height and spacing for comfortable reading. 
            Paragraphs are the foundation of good typography and should be easy to scan and read.
          </Typography>
          <Typography variant="large">Large text for emphasis and important information.</Typography>
          <Typography variant="small">Small text for fine print and secondary information.</Typography>
          <Typography variant="muted">Muted text for less important details and subtle information.</Typography>
          <Typography variant="lead">
            This is lead text that introduces a section or article. It's slightly larger and helps draw attention.
          </Typography>
          <Typography variant="blockquote">
            "This is a blockquote. It's perfect for highlighting important quotes, testimonials, or key insights from your content."
          </Typography>
          <Typography variant="code">const message = "Hello, World!";</Typography>
        </div>
      </DemoSection>

      <DemoSection title="Color Variants">
        <div className="space-y-3">
          <Typography color="default">Default text color for standard content</Typography>
          <Typography color="muted">Muted text for secondary information</Typography>
          <Typography color="primary">Primary colored text for brand emphasis</Typography>
          <Typography color="secondary">Secondary colored text for alternative emphasis</Typography>
          <Typography color="destructive">Destructive text for errors and warnings</Typography>
          <Typography color="success">Success text for positive feedback</Typography>
          <Typography color="warning">Warning text for cautionary messages</Typography>
          <Typography color="info">Info text for helpful information</Typography>
        </div>
      </DemoSection>

      <DemoSection title="Size Variants">
        <div className="space-y-3">
          <Typography size="xs">Extra small text (xs)</Typography>
          <Typography size="sm">Small text (sm)</Typography>
          <Typography size="base">Base text size (base)</Typography>
          <Typography size="lg">Large text (lg)</Typography>
          <Typography size="xl">Extra large text (xl)</Typography>
          <Typography size="2xl">2xl text size</Typography>
          <Typography size="3xl">3xl text size</Typography>
          <Typography size="4xl">4xl text size</Typography>
        </div>
      </DemoSection>

      <DemoSection title="Font Weights">
        <div className="space-y-3">
          <Typography weight="thin">Thin weight typography</Typography>
          <Typography weight="light">Light weight typography</Typography>
          <Typography weight="normal">Normal weight typography</Typography>
          <Typography weight="medium">Medium weight typography</Typography>
          <Typography weight="semibold">Semibold weight typography</Typography>
          <Typography weight="bold">Bold weight typography</Typography>
          <Typography weight="extrabold">Extra bold weight typography</Typography>
          <Typography weight="black">Black weight typography</Typography>
        </div>
      </DemoSection>

      <DemoSection title="Text Alignment">
        <div className="space-y-4">
          <Typography align="left">Left aligned text - This is the default alignment for most languages and provides the best readability.</Typography>
          <Typography align="center">Center aligned text - Used for titles, headers, and special emphasis.</Typography>
          <Typography align="right">Right aligned text - Sometimes used for quotes, captions, or special design purposes.</Typography>
          <Typography align="justify">Justified text - Creates even margins on both sides by adjusting word spacing. This can improve the visual appearance of text blocks but may create awkward spacing in some cases.</Typography>
        </div>
      </DemoSection>

      <DemoSection title="Special Features">
        <div className="space-y-4">
          <Typography truncate className="max-w-xs">
            This is a very long text that will be truncated when it exceeds the container width. You can see how it gets cut off with an ellipsis.
          </Typography>
          <Typography gradient variant="h2">
            Gradient Text Effect
          </Typography>
          <Typography customColor="#ff6b6b" variant="h3">
            Custom Color Text
          </Typography>
          <Typography as="span" variant="code">
            Using custom element (span instead of default)
          </Typography>
        </div>
      </DemoSection>

      <DemoSection title="Interactive Typography Builder">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium">Variant</label>
              <select
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value as any)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="h1">H1</option>
                <option value="h2">H2</option>
                <option value="h3">H3</option>
                <option value="h4">H4</option>
                <option value="h5">H5</option>
                <option value="h6">H6</option>
                <option value="p">Paragraph</option>
                <option value="large">Large</option>
                <option value="small">Small</option>
                <option value="muted">Muted</option>
                <option value="lead">Lead</option>
                <option value="blockquote">Blockquote</option>
                <option value="code">Code</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Size</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value as any)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="xs">Extra Small</option>
                <option value="sm">Small</option>
                <option value="base">Base</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
                <option value="2xl">2XL</option>
                <option value="3xl">3XL</option>
                <option value="4xl">4XL</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Weight</label>
              <select
                value={selectedWeight}
                onChange={(e) => setSelectedWeight(e.target.value as any)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="thin">Thin</option>
                <option value="light">Light</option>
                <option value="normal">Normal</option>
                <option value="medium">Medium</option>
                <option value="semibold">Semibold</option>
                <option value="bold">Bold</option>
                <option value="extrabold">Extra Bold</option>
                <option value="black">Black</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Alignment</label>
              <select
                value={selectedAlign}
                onChange={(e) => setSelectedAlign(e.target.value as any)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
                <option value="justify">Justify</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Color</label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value as any)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="default">Default</option>
                <option value="muted">Muted</option>
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="destructive">Destructive</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="info">Info</option>
              </select>
            </div>
          </div>

          <div className="rounded-lg border border-dashed border-gray-300 p-6">
            <Typography
              variant={selectedVariant}
              size={selectedSize}
              weight={selectedWeight}
              align={selectedAlign}
              color={selectedColor}
            >
              {sampleText}
            </Typography>
          </div>

          <div className="rounded bg-muted p-4">
            <Typography variant="code" className="text-xs">
              {`<Typography variant="${selectedVariant}" size="${selectedSize}" weight="${selectedWeight}" align="${selectedAlign}" color="${selectedColor}">`}
            </Typography>
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Real-world Examples">
        <div className="space-y-6 sm:space-y-8">
          <article className="space-y-4">
            <Typography variant="h1">The Future of Web Typography</Typography>
            <Typography variant="lead">
              Exploring how modern CSS features are revolutionizing the way we handle text on the web.
            </Typography>
            <Typography variant="p">
              Typography has always been a cornerstone of good design, but recent advances in web technology 
              have opened up new possibilities for creating beautiful, readable, and accessible text experiences.
            </Typography>
            <Typography variant="h2">Variable Fonts</Typography>
            <Typography variant="p">
              Variable fonts represent a significant leap forward in web typography. Unlike traditional fonts 
              that require separate files for different weights and styles, variable fonts contain multiple 
              variations within a single file.
            </Typography>
            <Typography variant="blockquote">
              "Typography is the craft of endowing human language with a durable visual form."
            </Typography>
            <Typography variant="small" color="muted">
              — Robert Bringhurst, The Elements of Typographic Style
            </Typography>
          </article>
        </div>
      </DemoSection>
    </div>
  );
};