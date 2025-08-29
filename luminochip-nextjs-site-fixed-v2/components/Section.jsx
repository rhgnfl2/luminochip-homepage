export default function Section({ id, icon, title, subtitle, children }){
  const Icon = icon;
  return (
    <section id={id} className="border-t border-white/10 bg-zinc-950">
      <div className="container py-14">
        <div className="mb-8 flex items-center gap-3">
          {Icon ? <Icon className="h-6 w-6 text-emerald-300" /> : null}
          <h2 className="text-2xl font-semibold text-white md:text-3xl">{title}</h2>
        </div>
        {subtitle ? <p className="mb-8 max-w-3xl text-zinc-300">{subtitle}</p> : null}
        {children}
      </div>
    </section>
  )
}
