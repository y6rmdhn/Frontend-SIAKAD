import PageHead from '@/components/commons/PageHead'
import { ReactNode } from 'react';

interface PropsType{
  title?: string;
  children: ReactNode;
}


const PegawaiLayout = (props: PropsType) => {
  const { children, title } = props;

  return (
    <div>
      <PageHead title={title} />
      <main>{children}</main>
    </div>
  )
}

export default PegawaiLayout
