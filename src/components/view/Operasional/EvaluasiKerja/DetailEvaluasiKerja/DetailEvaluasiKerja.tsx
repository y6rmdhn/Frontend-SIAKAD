import { useParams } from "react-router-dom";
import EvaluasiScoringForm from "../EvaluasiScoringForm";

const DetailEvaluasiKerja = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <EvaluasiScoringForm 
      evaluasiId={id || ""} 
      title="Form Evaluasi Kerja Dosen" 
    />
  );
};

export default DetailEvaluasiKerja;
