import { useParams } from "react-router-dom";
import EvaluasiScoringForm from "../EvaluasiScoringForm";

const DetailEvaluasiKerjaPegawai = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <EvaluasiScoringForm 
      evaluasiId={id || ""} 
      title="Form Evaluasi Kerja Pegawai (Staff)" 
    />
  );
};

export default DetailEvaluasiKerjaPegawai;
