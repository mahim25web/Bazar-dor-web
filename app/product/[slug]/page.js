import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProduct } from "@/lib/api";
import ChangeBadge from "@/components/ChangeBadge";
import { marketStats, takaBn, toBn, unitLabel } from "@/lib/format";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug).catch(() => null);
  return { title: product ? product.nameBn : "পণ্য" };
}

function Stat({ label, value, tone }) {
  return (
    <div className="rounded-box border border-base-300 bg-white p-4">
      <p className="text-xs text-base-content/60">{label}</p>
      <p className={`mt-1 text-xl font-bold ${tone || ""}`}>{value}</p>
    </div>
  );
}

export default async function ProductPage({ params }) {
  const { slug } = await params;

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(`/signin?redirect=${encodeURIComponent(`/product/${slug}`)}&reason=protected`);
  }

  const product = await getProduct(slug);
  if (!product) notFound();

  const { min, max, avg } = marketStats(product);
  const markets = product.markets || [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:py-8">
      <section className="rounded-box border border-base-300 bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-4xl">
            {product.image || product.categoryIcon}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-extrabold sm:text-2xl">{product.nameBn}</h1>
            <p className="mt-1 text-sm text-base-content/70">
              {unitLabel(product.unit)} · {product.categoryNameBn}
            </p>
            <p className="mt-2 text-xs text-base-content/70">
              {toBn(markets.length)}টি বাজারের দামের ভিত্তিতে আজকের দাম
              {product.change?.dir === "up"
                ? " বেড়েছে"
                : product.change?.dir === "down"
                  ? " কমেছে"
                  : " অপরিবর্তিত"}
              ।
            </p>
          </div>
          <div className="flex items-center justify-between gap-3 rounded-2xl bg-base-200 px-4 py-3 sm:flex-col sm:items-end sm:justify-center">
            <div className="sm:text-right">
              <p className="text-xs text-base-content/60">বাংলাদেশ দাম</p>
              <p className="text-2xl font-extrabold text-primary">{toBn(product.today)}</p>
              <p className="text-xs text-base-content/60">{unitLabel(product.unit)}</p>
            </div>
            <ChangeBadge product={product} />
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-box border border-base-300 bg-white p-4 sm:p-5">
        <h2 className="mb-3 text-base font-bold">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
          <Stat label="সর্বনিম্ন দাম" value={takaBn(min)} tone="text-success" />
          <Stat label="সর্বোচ্চ দাম" value={takaBn(max)} tone="text-error" />
          <Stat label="গড় দাম" value={takaBn(avg)} tone="text-success" />
        </div>

        <h2 className="mb-2 mt-5 text-base font-bold">বাজারভিত্তিক আজকের দাম</h2>
        {markets.length === 0 ? (
          <p className="rounded-box border border-base-300 p-4 text-sm text-base-content/60">
            বাজারভিত্তিক তথ্য পাওয়া যায়নি।
          </p>
        ) : (
          <div className="overflow-x-auto rounded-box border border-base-300">
            <table className="table table-zebra table-sm min-w-[620px]">
              <thead>
                <tr>
                  <th>বাজার</th>
                  <th>বিভাগ</th>
                  <th className="text-right">সর্বনিম্ন</th>
                  <th className="text-right">সর্বোচ্চ</th>
                  <th className="text-right">গড়</th>
                </tr>
              </thead>
              <tbody>
                {markets.map((market) => (
                  <tr key={`${market.division}-${market.market}`}>
                    <td className="font-medium">{market.market}</td>
                    <td>{market.division}</td>
                    <td className="text-right">{takaBn(market.min)}</td>
                    <td className="text-right">{takaBn(market.max)}</td>
                    <td className="text-right font-semibold">
                      {takaBn(Math.round((market.min + market.max) / 2))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
