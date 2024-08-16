export default function SectionHeaders({subHeader,mainHeader} : {subHeader: string, mainHeader: string}) {
    return (
      <section className="pt-24 pb-8 flex flex-col gap-2">
        <h3 className="uppercase text-black text-xs tracking-widest font-semibold leading-4">
          {subHeader}
        </h3>
        <h2 className="text-primary font-bold text-6xl">
          {mainHeader}
        </h2>
      </section>
    );
  }