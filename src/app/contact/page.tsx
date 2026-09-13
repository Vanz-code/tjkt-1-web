export const metadata = { title: 'Kontak' };
export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <h1 className="text-3xl md:text-4xl font-bold">Kontak</h1>
      <div className="rounded-2xl border border-border bg-surface p-6 mt-8 text-sm space-y-3">
        <div className="flex justify-between border-b border-border pb-3"><span className="text-muted">Email</span><span>tjkt1@example.sch.id</span></div>
        <div className="flex justify-between"><span className="text-muted">Instagram</span><span>@tjkt1.official</span></div>
      </div>
    </div>
  );
}
