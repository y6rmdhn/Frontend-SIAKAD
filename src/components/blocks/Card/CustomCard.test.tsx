// src/components/blocks/Card/CustomCard.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CustomCard from './CustomCard'; // Adjust the import path if needed

// Mock shadcn/ui components
// This is often necessary because shadcn components might rely on context
// or other internal logic that you don't need to test when testing *your* component.
// We'll create simple mock components that just render their children and props.
vi.mock("@/components/ui/card", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>), // Keep original exports if needed, but for basic rendering tests, mocks are simpler
    Card: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <div data-testid="mock-card" className={className}>
        {children}
      </div>
    ),
    CardHeader: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="mock-card-header">{children}</div>
    ),
    CardTitle: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <h2 data-testid="mock-card-title" className={className}>{children}</h2>
    ),
    CardContent: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="mock-card-content">{children}</div>
    ),
    CardFooter: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="mock-card-footer">{children}</div>
    ),
  };
});


describe('CustomCard', () => {

  it('renders with minimal props', () => {
    render(<CustomCard />);

    // Check that the basic structure is rendered
    expect(screen.getByTestId('mock-card')).toBeInTheDocument();
    expect(screen.getByTestId('mock-card-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-card-title')).toBeInTheDocument(); // CardTitle is always rendered
    expect(screen.getByTestId('mock-card-content')).toBeInTheDocument();

    // Footer should NOT be in the document if not provided
    expect(screen.queryByTestId('mock-card-footer')).not.toBeInTheDocument();

    // Check default class
    expect(screen.getByTestId('mock-card')).toHaveClass('border-t-yellow-uika');
    expect(screen.getByTestId('mock-card')).toHaveClass('border-t-3');
     expect(screen.getByTestId('mock-card')).toHaveClass('mt-5'); // Class always present
     expect(screen.getByTestId('mock-card')).toHaveClass('border-t-1'); // Class always present
  });

  it('renders the title prop', () => {
    const testTitle = 'Employee Details';
    render(<CustomCard title={testTitle} />);

    expect(screen.getByTestId('mock-card-title')).toHaveTextContent(testTitle);
    // Check the title specific class
    expect(screen.getByTestId('mock-card-title')).toHaveClass('text-3xl');
    expect(screen.getByTestId('mock-card-title')).toHaveClass('text-[#FDA31A]');

  });

  it('renders the children prop in CardContent', () => {
    const testChildren = <p>This is the card content.</p>;
    render(<CustomCard>{testChildren}</CustomCard>);

    // Find the content wrapper and check its content
    const contentWrapper = screen.getByTestId('mock-card-content');
    expect(contentWrapper).toBeInTheDocument();
    expect(contentWrapper).toContainHTML('<p>This is the card content.</p>');
  });

  it('renders the actions prop in CardHeader', () => {
    const testActions = <button>Edit</button>;
    render(<CustomCard actions={testActions} />);

    // Find the header wrapper and check if the button is inside
    const headerWrapper = screen.getByTestId('mock-card-header');
    expect(headerWrapper).toBeInTheDocument();
    expect(headerWrapper).toContainHTML('<button>Edit</button>'); // Or use getByRole inside headerWrapper
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
  });

  it('renders the cardFooter prop', () => {
    const testFooter = <span>Card Footer Text</span>;
    render(<CustomCard cardFooter={testFooter} />);

    // Footer should be in the document
    const footerWrapper = screen.getByTestId('mock-card-footer');
    expect(footerWrapper).toBeInTheDocument();
    expect(footerWrapper).toHaveTextContent('Card Footer Text');
  });

  it('applies custom cardStyle class', () => {
    const customStyle = 'bg-blue-500 border-t-red-500 border-t-8';
    render(<CustomCard cardStyle={customStyle} />);

    const cardElement = screen.getByTestId('mock-card');

    // Should have the custom class
    expect(cardElement).toHaveClass(customStyle);

    // Should NOT have the default border class when customStyle is provided
    expect(cardElement).not.toHaveClass('border-t-yellow-uika');
    expect(cardElement).not.toHaveClass('border-t-3');

    // Should still have the base classes
    expect(cardElement).toHaveClass('mt-5');
    expect(cardElement).toHaveClass('border-t-1');
  });
});