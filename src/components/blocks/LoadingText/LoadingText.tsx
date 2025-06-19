
const LoadingText = () => {
  return (
    <div>
      <h1 className="mt-5 text-2xl mb-5 font-roboto font-medium flex flex-col items-center gap-2">
        Loading...
        <p className="text-muted-foreground text-xs">
          Sedang memuat data, mohon tunggu sebentar
        </p>
      </h1>
    </div>
  );
};

export default LoadingText;
