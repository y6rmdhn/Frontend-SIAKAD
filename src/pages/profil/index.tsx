import PageHead from "@/components/commons/PageHead";
import Profil from "@/components/view/Profil";

const ProfilPage = () => {
  return (
    <>
      <PageHead title="Profil" />
      <main className="relative min-h-screen overflow-hidden">
        <div className="fixed inset-0 -z-10">
          <img
            src="/images/background/UIKA 2.webp"
            alt="uika-background"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <section className="relative z-10">
          <Profil />
        </section>
      </main>
    </>
  );
};

export default ProfilPage;
