export default function Navbar() {
  const items = [
    ["about", "회사소개"],
    ["products", "제품소개"],
    ["materials", "물성표"],
    ["clients", "거래처"],
    ["certs", "인증서"],
    ["inquiry", "견적문의"],
    ["map", "오시는 길"],
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-900/70 backdrop-blur">
      <div className="container flex items-center justify-between py-3">
        <a href="#top" className="flex items-center gap-3">
          <img src="/logo.svg" alt="루미노칩" className="h-9 w-9" />
          <div className="text-lg font-semibold">루미노칩</div>
        </a>
        <nav className="hidden gap-6 md:flex">
          {items.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="text-sm text-zinc-200 hover:text-white">
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
