import teamWarehouseAsset from "@/assets/team-warehouse.png.asset.json";

export function QuoteBanner() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-[1280px] px-4 py-16 md:px-12 md:py-20">
        <div className="overflow-hidden rounded-lg border border-border">
          <img
            src={teamWarehouseAsset.url}
            alt="Fire safety engineers inspecting equipment inside an industrial warehouse, with the quote: Protecting lives and assets with structural integrity and unwavering operational excellence."
            className="h-auto w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
