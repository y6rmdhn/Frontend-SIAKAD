import { render, screen } from '@testing-library/react';
import { vi,describe, it, expect, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event'

// --- Aku benci mocking >:( ---

vi.mock('../Card/CustomCard', ()=>({
    default: ({ children, actions, cardStyle} : {children: React.ReactNode; actions: React.ReactNode; cardStyle: string}) =>(
        <div data-testid= "mock-custom-card" className={cardStyle}>
            <div data-testid = "mock-custom-card-actions">{actions}</div>
            <div data-testid = "mock-custom-card-children">{children}</div>
        </div>
    ),
}));

vi.mock('@/components/ui/button', ()=>({
    Button: ({ children, onClick, className } : { children: React.ReactNode; onClick?: ()=> void; className?: string }) =>(
        <button onClick={onClick} className={className} data-testid={`mock-button-${children?.toString().replace(/\s+/g, '-')}`}>
            {children}
        </button>
    ),
}));

// Mock Icons (they don't render interactive elements we need to test)
vi.mock('react-icons/io5', () => ({
    IoStatsChart: () => <svg data-testid="icon-stats" />,
  }));
  vi.mock('react-icons/fa', () => ({
    FaCircle: () => <svg data-testid="icon-circle" />,
  }));

vi.mock('@/components/commons/Charts/PieChart/ChartLingkaran', () => ({
    ChartLingkaran: vi.fn(({ title, data, config, dataKey, nameKey, valueLabel, titleFooter }) => (
      <div data-testid="mock-chart-lingkaran">
        <span data-testid="chart-lingkaran-title">{title}</span>
        <span data-testid="chart-lingkaran-data">{JSON.stringify(data)}</span>
        <span data-testid="chart-lingkaran-dataKey">{dataKey}</span>
        <span data-testid ="chart-lingkaran-nameKey">{nameKey}</span>
        <span data-testid="chart-lingkaran-config">{JSON.stringify(config)}</span>
        <span data-testid="chart-lingkaran-valueLabel">{valueLabel}</span>
         {titleFooter && <div data-testid="chart-lingkaran-footer">{titleFooter}</div>}
      </div>
    )),
  }));
  
  vi.mock('@/components/commons/Charts/BarChart/BarChartLabel', () => ({
    BarChartWithLabel: vi.fn(({ title, data, config, dataKey, footer }) => (
      <div data-testid="mock-chart-bar-with-label">
        <span data-testid="chart-bar-with-label-title">{title}</span>
         <span data-testid="chart-bar-with-label-data">{JSON.stringify(data)}</span>
         <span data-testid="chart-bar-with-config">{JSON.stringify(config)}</span>
         <span data-testid="chart-bar-with-dataKey">{dataKey}</span>
         {footer && <div data-testid="chart-bar-with-label-footer">{footer}</div>}
      </div>
    )),
  }));
  
  vi.mock('@/components/commons/Charts/BarChart/BarChartJenjangPendidikan', () => ({
    BarChartJenjagPendidikan: vi.fn(({ title, data, config, dataKey, footer }) => (
      <div data-testid="mock-chart-jenjang-pendidikan">
         <span data-testid="chart-jenjang-pendidikan-title">{title}</span>
         <span data-testid="chart-jenjang-pendidikan-data">{JSON.stringify(data)}</span>
         <span data-testid="chart-jenjang-pendidikan-config">{JSON.stringify(config)}</span>
         <span data-testid="chart-jenjang-pesndidikan-dataKey">{dataKey}</span>
         {footer && <div data-testid="chart-jenjang-pendidikan-footer">{footer}</div>}
      </div>
    )),
  }));
  
  vi.mock('@/components/commons/Charts/BarChart/BarChartPendidikanNonAkademik', () => ({
    BarChartPendidikanNonAkademik: vi.fn(({ title, data, config, dataKey, footer }) => (
      <div data-testid="mock-chart-pendidikan-non-akademik">
        <span data-testid="chart-pendidikan-non-akademik-title">{title}</span>
         <span data-testid="chart-pendidikan-non-akademik-data">{JSON.stringify(data)}</span>
         <span data-testid="chart-pendidkan-non-akademik-config">{JSON.stringify(config)}</span>
         <span data-testid="chart-pendidikan-non-akademik-dataKey">{dataKey}</span>
         {footer && <div data-testid="chart-pendidikan-non-akademik-footer">{footer}</div>}
      </div>
    )),
  }));
  
  
  // Mock shadcn/ui Table components - Just need a wrapper to check if the table section renders
  vi.mock("@/components/ui/table", () => ({
    Table: ({ children }: { children: React.ReactNode }) => <table data-testid="mock-table">{children}</table>,
    TableBody: ({ children }: { children: React.ReactNode }) => <tbody data-testid="mock-table-body">{children}</tbody>,
    TableCell: ({ children }: { children: React.ReactNode }) => <td data-testid="mock-table-cell">{children}</td>,
    TableHead: ({ children }: { children: React.ReactNode }) => <th data-testid="mock-table-head">{children}</th>,
    TableHeader: ({ children }: { children: React.ReactNode }) => <thead data-testid="mock-table-header">{children}</thead>,
    TableRow: ({ children }: { children: React.ReactNode }) => <tr data-testid="mock-table-row">{children}</tr>,
  }));
  
import { ChartLingkaran } from '@/components/commons/Charts/PieChart/ChartLingkaran'; // Import Chart (named export)
import { BarChartWithLabel } from '@/components/commons/Charts/BarChart/BarChartLabel'; // Import Chart (named export)
import { BarChartJenjagPendidikan } from '@/components/commons/Charts/BarChart/BarChartJenjangPendidikan'; // Import Chart (named export)
import { BarChartPendidikanNonAkademik } from '@/components/commons/Charts/BarChart/BarChartPendidikanNonAkademik'; // <-- ADD THIS IMPORT

// Important: Also import the component you are testing AFTER mocks but BEFORE tests
import CardStatistikPegawai from './CardStatistikPegawai';


  describe('CardStatistikPegawai', () => {

    // Reset mocks before each test to ensure isolation
    beforeEach(() => {
      vi.clearAllMocks();
    });
  
    it('renders correctly initially with Fungsional view active', () => {
      render(<CardStatistikPegawai />);
  
      // Check CustomCard is rendered with correct actions and style
      const customCard = screen.getByTestId('mock-custom-card');
      expect(customCard).toBeInTheDocument();
      expect(customCard).toHaveClass('border-t-[#106D63]');
  
      // Check the title and icon within actions
      const actionsContainer = screen.getByTestId('mock-custom-card-actions');
      expect(actionsContainer).toBeInTheDocument();
      expect(actionsContainer).toHaveTextContent('Statistik Kepegawaian');
      expect(screen.getByTestId('icon-stats')).toBeInTheDocument(); // Check the icon is rendered
  
      // Check all button are correct with initial classes
      const fungsionalButton = screen.getByRole('button', { name: 'Fungsional' });
      const hubunganKerjaButton = screen.getByRole('button', { name: 'Hubungan Kerja' });
      const pendidikanButton = screen.getByRole('button', { name: 'Pendidikan' });
      const pendidikanNonAkademikButton = screen.getByRole('button', { name: 'Pendidikan Non Akademik' });
  
      expect(fungsionalButton).toBeInTheDocument();
      expect(hubunganKerjaButton).toBeInTheDocument();
      expect(pendidikanButton).toBeInTheDocument();
      expect(pendidikanNonAkademikButton).toBeInTheDocument();
        
      // Check active/inactive button
      expect(fungsionalButton).toHaveClass('bg-[#FFAC07]');
      expect(hubunganKerjaButton).toHaveClass('bg-[#CDCDCD]');
      expect(pendidikanButton).toHaveClass('bg-[#CDCDCD]');
      expect(pendidikanNonAkademikButton).toHaveClass('bg-[#CDCDCD]'); 
  
  

      expect(screen.getByTestId('mock-chart-lingkaran')).toBeInTheDocument();
      expect(screen.getByTestId('mock-table')).toBeInTheDocument(); // Check for the Table wrapper
  

      expect(screen.queryByTestId('mock-chart-bar-with-label')).not.toBeInTheDocument();
      expect(screen.queryByTestId('mock-chart-jenjang-pendidikan')).not.toBeInTheDocument();
      expect(screen.queryByTestId('mock-chart-pendidikan-non-akademik')).not.toBeInTheDocument();
  

      const chartLingkaranMock = vi.mocked(ChartLingkaran);
      expect(chartLingkaranMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Jabatan Fungsional',
          data: expect.any(Array), 
          config: expect.any(Object),
          dataKey: 'visitors',
          nameKey: 'browser',
          valueLabel: 'Visitors',
          titleFooter: expect.any(Object) 
        }),
        undefined 
      );
    });
  
    it('switches to Hubungan Kerja view when button is clicked', async () => {
      render(<CardStatistikPegawai />);
      const user = userEvent.setup(); // Use userEvent for better click simulation
  
      const hubunganKerjaButton = screen.getByRole('button', { name: 'Hubungan Kerja' });
  
      // Click the button
      await user.click(hubunganKerjaButton);
  
      // Check button classes are updated
      expect(screen.getByRole('button', { name: 'Fungsional' })).toHaveClass('bg-[#CDCDCD]'); // Now inactive
      expect(hubunganKerjaButton).toHaveClass('bg-[#FFAC07]'); // Now active
  

      expect(screen.getByTestId('mock-chart-bar-with-label')).toBeInTheDocument();
      expect(screen.getByTestId('mock-table')).toBeInTheDocument();
  

      expect(screen.queryByTestId('mock-chart-lingkaran')).not.toBeInTheDocument();
      expect(screen.queryByTestId('mock-chart-jenjang-pendidikan')).not.toBeInTheDocument();
      expect(screen.queryByTestId('mock-chart-pendidikan-non-akademik')).not.toBeInTheDocument();
  

       const chartBarWithLabelMock = vi.mocked(BarChartWithLabel);
       expect(chartBarWithLabelMock).toHaveBeenCalledWith(
          expect.objectContaining({
              title: 'Berdasarkan Hubungan Kerja',
              data: expect.any(Array),
              config: expect.any(Object),
              dataKey: 'desktop',
              footer: expect.any(Object) 
          }),
          undefined 
       );
    });
  
    it('switches to Pendidikan view when button is clicked', async () => {
       render(<CardStatistikPegawai />);
       const user = userEvent.setup();
  
       const pendidikanButton = screen.getByRole('button', { name: 'Pendidikan' });
       await user.click(pendidikanButton);
  
       // Check button classes
       expect(screen.getByRole('button', { name: 'Fungsional' })).toHaveClass('bg-[#CDCDCD]');
       expect(screen.getByRole('button', { name: 'Hubungan Kerja' })).toHaveClass('bg-[#CDCDCD]');
       expect(pendidikanButton).toHaveClass('bg-[#FFAC07]'); // Active
       expect(screen.getByRole('button', { name: 'Pendidikan Non Akademik' })).toHaveClass('bg-[#CDCDCD]');
  
  
       expect(screen.getByTestId('mock-chart-jenjang-pendidikan')).toBeInTheDocument();
       expect(screen.getByTestId('mock-table')).toBeInTheDocument();
  
       // Check other charts are not rendered
       expect(screen.queryByTestId('mock-chart-lingkaran')).not.toBeInTheDocument();
       expect(screen.queryByTestId('mock-chart-bar-with-label')).not.toBeInTheDocument();
       expect(screen.queryByTestId('mock-chart-pendidikan-non-akademik')).not.toBeInTheDocument();

        const chartJenjangPendidikanMock = vi.mocked(BarChartJenjagPendidikan);
        expect(chartJenjangPendidikanMock).toHaveBeenCalledWith(
           expect.objectContaining({
               title: 'Berdasarkan Jenjang pendidikan',
               data: expect.any(Array),
               config: expect.any(Object),
               dataKey: 'desktop',
               footer: expect.any(Object)
           }),
           undefined 
        );
     });
  
      it('switches to Pendidikan Non Akademik view when button is clicked', async () => {
       render(<CardStatistikPegawai />);
       const user = userEvent.setup();
  
       const pendidikanNonAkademikButton = screen.getByRole('button', { name: 'Pendidikan Non Akademik' });
       await user.click(pendidikanNonAkademikButton);
  
       // Check button classes
       expect(screen.getByRole('button', { name: 'Fungsional' })).toHaveClass('bg-[#CDCDCD]');
       expect(screen.getByRole('button', { name: 'Hubungan Kerja' })).toHaveClass('bg-[#CDCDCD]');
       expect(screen.getByRole('button', { name: 'Pendidikan' })).toHaveClass('bg-[#CDCDCD]');
       expect(pendidikanNonAkademikButton).toHaveClass('bg-[#FFAC07]'); // Active
  

       expect(screen.getByTestId('mock-chart-pendidikan-non-akademik')).toBeInTheDocument();
       expect(screen.getByTestId('mock-table')).toBeInTheDocument();

       expect(screen.queryByTestId('mock-chart-lingkaran')).not.toBeInTheDocument();
       expect(screen.queryByTestId('mock-chart-bar-with-label')).not.toBeInTheDocument();
       expect(screen.queryByTestId('mock-chart-jenjang-pendidikan')).not.toBeInTheDocument();
  

        const chartPendidikanNonAkademikMock = vi.mocked(BarChartPendidikanNonAkademik);

        expect(chartPendidikanNonAkademikMock).toHaveBeenCalledWith(
        expect.objectContaining({
            title: 'Berdasarkan Jenjang pendidikan',
            data: expect.any(Array),
            config: expect.any(Object),
            dataKey: 'desktop',
            footer: expect.any(Object)
        }),
        undefined 
        );
     });
  });