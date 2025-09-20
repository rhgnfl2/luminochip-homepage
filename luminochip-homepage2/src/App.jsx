import React, { useMemo, useState, useEffect } from "react";
import { Menu, X, Mail, MapPin, Phone, Factory, Boxes, Shield, FileText, Building2, Wrench, ArrowRight, Send, ChevronUp, CheckCircle } from "lucide-react";

/**
 * 루미노칩(사용자 회사)용 원페이지 기업 사이트 템플릿
 * - 참고 사이트 구조 반영: 회사소개 / 제품소개 / 물성표 / 보유 장비 / 인증서 / 견적문의 / 오시는 길
 * - 기술스택: React + TailwindCSS
 * - 아이콘: lucide-react
 * - 정적 배포형(HTML로 빌드 가능). 폼은 mailto 기반.
 */

const NAV_ITEMS = [
  { id: "about", label: "회사소개" },
  { id: "products", label: "제품소개" },
  { id: "materials", label: "물성표" },
  { id: "clients", label: "보유 장비" },
  { id: "certs", label: "인증서" },
  { id: "inquiry", label: "견적문의" },
  { id: "map", label: "오시는 길" },
];

const PRODUCTS = [
  {
    name: "AMAT 0200-01009 NOZZLE",
    mat: "Al₂O₃ (Alumina)",
    desc: "반도체 장비용 노즐, 4-HOLES 60° BAFFLE",
  },
  {
    name: "LAM Wafer Lift Pin 300mm",
    mat: "SUS / Ceramics",
    desc: "웨이퍼 리프트 핀(300mm 공정 호환)",
  },
  {
    name: "NOVELLUS Fork Assy",
    mat: "Al₂O₃ / SiC",
    desc: "CVD/PECVD 대응 포크 어셈블리",
  },
  {
    name: "ESC Micro-hole Plate",
    mat: "Al₂O₃ / Sapphire",
    desc: "초미세 홀(≤50µm) 배열 가공 ESC 플레이트",
  },
  {
    name: "Quartz Ring",
    mat: "Quartz",
    desc: "플라즈마/고온 공정용 쿼츠 링",
  },
  {
    name: "Sapphire Window",
    mat: "Sapphire",
    desc: "고강도 투명 창, 스캐너/뷰포트용",
  },
];

const MATERIALS = [
  { name: "Quartz(쿼츠)", cte: "~0.55 ppm/K", temp: "20–400°C", note: "열변형 낮음, 고온 투명 재료" },
  { name: "Alumina(알루미나)", cte: "~7.5–8.0 ppm/K", temp: "20–400°C", note: "내마모/내열, 절연 세라믹" },
  { name: "Sapphire(사파이어)", cte: "~5.0–5.8 ppm/K", temp: "20–400°C", note: "고강도 투명 결정" },
  { name: "SiC(실리콘카바이드)", cte: "~4.0–4.5 ppm/K", temp: "20–400°C", note: "고경도/내열/내플라즈마" },
  { name: "YAG(야그)", cte: "~7–8 ppm/K", temp: "20–400°C", note: "레이저/광학 응용" },
];

const CLIENTS = [
  { name: "SK hynix", init: "H" },
  { name: "LAM Research", init: "L" },
  { name: "Applied Materials", init: "A" },
  { name: "Novellus", init: "N" },
  { name: "Samsung", init: "S" },
  { name: "TEL", init: "T" },
];

const CERTS = [
  { title: "ISO 9001", no: "QMS-XXXX", issuer: "KAB" }

  
];

const COMPANY = {
  name: "루미노칩 (LuminoChip)",
  tagline_ko: "투명하고 정밀한 가공으로 신뢰받는 파트너",
  tagline_en: "Trusted micro‑machining partner for semiconductors",
  regno: "사업자등록번호: 000-00-00000 (예시)",
  tel: "031-000-0000",
  email: "info@luminocheap.example",
  address_ko: "경상북도 구미시 공단동 260-10 한라시그마벨리 9층 919호 (기술 영업사무소)",
  address_en: "212, 1gongdan-ro, Gumi-si, Gyeongsangbuk-do, Republic of Korea",
};

function useScrollTop(threshold = 240) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return show;
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-900/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <a href="#top" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400" />
          <div>
            <div className="text-sm tracking-wider text-zinc-300">{COMPANY.tagline_en}</div>
            <div className="text-lg font-semibold text-white">{COMPANY.name}</div>
          </div>
        </a>
        <nav className="hidden gap-6 md:flex">
          {NAV_ITEMS.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="text-sm text-zinc-200 hover:text-white">
              {n.label}
            </a>
          ))}
        </nav>
        <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="toggle menu">
          {open ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-zinc-900 md:hidden">
          <div className="mx-auto grid max-w-7xl gap-2 px-4 py-3">
            {NAV_ITEMS.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="rounded-lg px-2 py-2 text-zinc-100 hover:bg-white/5" onClick={() => setOpen(false)}>
                {n.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-zinc-900 to-zinc-950">
        {/* 배경이 클릭을 막지 않도록 처리 */}
      <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none" style={{backgroundImage: "radial-gradient(600px 200px at 10% 10%, rgba(16,185,129,0.25), transparent), radial-gradient(600px 200px at 90% 0%, rgba(34,211,238,0.2), transparent)"}} />
        {/* 콘텐츠: 배경보다 위로 */}
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-20">
        {/* ...왼쪽 칼럼(버튼 포함)... */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
            <CheckCircle className="h-4 w-4" /> ISO 기반 품질관리 · 반도체 부품 특화
          </div>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
            초정밀 Laser·Sapphire 가공으로 <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">공정 신뢰성</span>을 높입니다.
          </h1>
          <p className="mt-4 max-w-prose text-zinc-300">
            ESC 플레이트 초미세 홀(≤50µm)/Sapphire/Quartz/Ceramic/SiC 정밀 가공 전문 회사 입니다.
            회사는 현재 경북 구미시로 이전중이며, 공장이전으로 노후화된 장비를 매각 후 소형 사파이어 폴리싱과 초정밀 레이저 가공 위주로 재편중에 있습니다.
            26년 상반기까지 임가공 장비와 라인 구축을 준비중에 있습니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
          </a>
  href="#inquiry"
  onClick={(e) => {
    e.preventDefault();
    const el = document.getElementById("inquiry");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    // (선택) 주소창에 #inquiry 남기고 싶으면:
    // history.replaceState(null, "", "#inquiry");
  }}
  className="inline-flex items-center gap-2 rounded-2xl border border-emerald-300/40 bg-emerald-300/10 px-4 py-2 font-medium text-emerald-200 hover:bg-emerald-300/20 cursor-pointer"
>
  <Send className="h-4 w-4" /> 견적 문의하기
</a>
            <Send className="h-4 w-4" /> 견적 문의하기
          </a>
            
            <a href="#products" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-2 text-zinc-200 hover:bg-white/5">
              <ArrowRight className="h-4 w-4" /> 제품 바로보기
            </a>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4 text-sm text-zinc-300">
            <div className="rounded-2xl border border-white/10 p-4">
              <Factory className="mb-2 h-5 w-5 text-emerald-300" /> 세라믹/투명재 가공
            </div>
            <div className="rounded-2xl border border-white/10 p-4">
              <Wrench className="mb-2 h-5 w-5 text-cyan-300" /> 장비 호환 부품 제작
            </div>
            <div className="rounded-2xl border border-white/10 p-4">
              <Shield className="mb-2 h-5 w-5 text-sky-300" /> 품질·보안 관리
            </div>
          </div>
        </div>
        <div className="relative h-72 w-full md:h-[440px]">
          <div className="absolute inset-0 rounded-3xl border border-white/10 bg-[conic-gradient(at_30%_10%,#10b98111,transparent_30%,#22d3ee11_60%,transparent)] shadow-2xl" />
          <div className="absolute inset-4 rounded-3xl border border-white/10 bg-zinc-900/60" />
          <div className="absolute inset-8 grid grid-cols-3 gap-3 p-2">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-zinc-800/60" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({ id, icon: Icon, title, subtitle, children }) {
  return (
    <section id={id} className="border-t border-white/10 bg-zinc-950 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="mb-8 flex items-center gap-3">
          {Icon && <Icon className="h-6 w-6 text-emerald-300" />}
          <h2 className="text-2xl font-semibold text-white md:text-3xl">{title}</h2>
        </div>
        {subtitle && <p className="mb-8 max-w-3xl text-zinc-300">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}

function Products() {
  return (
    <Section id="products" icon={Boxes} title="제품소개" subtitle="AMAT / LAM / NOVELLUS 등 장비 호환 부품과 ESC·쿼츠·사파이어·SiC 정밀 가공품을 공급합니다.">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((p) => (
          <div key={p.name} className="group rounded-2xl border border-white/10 bg-zinc-900/50 p-5 transition hover:bg-zinc-900">
            <div className="mb-3 aspect-[4/3] w-full rounded-xl border border-white/10 bg-gradient-to-br from-zinc-800 to-zinc-900" />
            <h3 className="text-lg font-medium text-white">{p.name}</h3>
            <div className="mt-1 text-sm text-emerald-300">{p.mat}</div>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">{p.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 text-right">
        <a href="#inquiry" className="inline-flex items-center gap-2 text-sm text-emerald-300 hover:underline">
          필요한 품목 리스트 보내기 <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </Section>
  );
}

function About() {
  return (
    <Section id="about" icon={Building2} title="회사소개" subtitle="루미노칩은 반도체 및 디스플레이 공정용 정밀 부품을 공급하는 제조/가공 전문 기업입니다. 투명하고 깨끗한 경영과 데이터 기반 공정 관리로 고객 신뢰를 쌓아갑니다.">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
          <h4 className="mb-2 font-semibold text-white">비전</h4>
          <p className="text-zinc-300">정밀 가공으로 공정 신뢰성 향상에 기여하여, 글로벌 파운드리/디바이스 고객에게 사랑받는 파트너가 됩니다.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
          <h4 className="mb-2 font-semibold text-white">핵심역량</h4>
          <ul className="list-disc pl-5 text-zinc-300">
            <li>초미세 홀(≤50µm) 가공 및 배열 최적화</li>
            <li>사파이어/쿼츠/알루미나/SiC 등 소재 가공</li>
            <li>AMAT/LAM/NOVELLUS 등 장비 호환 부품</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
          <h4 className="mb-2 font-semibold text-white">품질정책</h4>
          <p className="text-zinc-300">ISO 기반 표준 공정·전수 검사·추적성 관리로 납기와 품질을 보장합니다.</p>
        </div>
      </div>
    </Section>
  );
}

function Materials() {
  return (
    <Section id="materials" icon={FileText} title="물성표" subtitle="대표 소재의 열팽창계수(참고치). 실제 사양은 공급사·로트에 따라 달라질 수 있습니다.">
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full divide-y divide-white/10">
          <thead className="bg-zinc-900/60">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-200">소재</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-200">열팽창계수(CTE)</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-200">온도범위</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-200">비고</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {MATERIALS.map((m) => (
              <tr key={m.name} className="hover:bg-white/5">
                <td className="px-4 py-3 text-zinc-100">{m.name}</td>
                <td className="px-4 py-3 text-zinc-300">{m.cte}</td>
                <td className="px-4 py-3 text-zinc-300">{m.temp}</td>
                <td className="px-4 py-3 text-zinc-300">{m.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-zinc-400">※ 자료는 레퍼런스 값이며 설계 시 고객 사양과 공정 조건에 맞춰 재검증합니다.</p>
    </Section>
  );
}

function Clients() {
  return (
    <Section id="clients" icon={Factory} title="보유 장비" subtitle="초미세 홀(≤50µm)/Sapphire/Quartz/Ceramic/SiC 정밀 가공을 위한 최적의 장비를 보유하고 있습니다./.">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        {CLIENTS.map((c) => (
          <div key={c.name} className="flex h-24 items-center justify-center rounded-2xl border border-white/10 bg-zinc-900/40">
            <span className="text-lg font-semibold text-zinc-200">{c.name}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Certs() {
  return (
    <Section id="certs" icon={Shield} title="인증서">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CERTS.map((c) => (
          <div key={c.title} className="rounded-2xl border border-white/10 bg-zinc-900/50 p-5">
            <div className="mb-3 aspect-[4/3] rounded-xl border border-white/10 bg-zinc-800/60" />
            <div className="text-white">{c.title}</div>
            <div className="text-sm text-zinc-300">{c.no} · {c.issuer}</div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-zinc-400">원본 스캔본(이미지/PDF)을 여기 섹션에 교체 업로드하면 됩니다.</p>
    </Section>
  );
}

function Inquiry() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const mailto = useMemo(() => {
    const to = COMPANY.email || "sales@example.com";
    const subject = encodeURIComponent("[루미노칩] 견적/문의");
    const body = encodeURIComponent(
      `성함: ${form.name}\n연락처: ${form.phone}\n이메일: ${form.email}\n\n문의내용:\n${form.message}`
    );
    return `mailto:${to}?subject=${subject}&body=${body}`;
  }, [form]);

  return (
    <Section id="inquiry" icon={Mail} title="견적문의" subtitle="도면(도면번호/규격), 수량, 요구 납기, 적용 장비/공정을 함께 알려주시면 빠르게 드립니다.">
      <div className="grid gap-6 lg:grid-cols-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = mailto;
          }}
          className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6"
        >
          <div className="grid gap-4">
            <div>
              <label className="mb-1 block text-sm text-zinc-300">성함/회사</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-white/10 bg-zinc-800 px-3 py-2 text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-400" required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-zinc-300">이메일</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border border-white/10 bg-zinc-800 px-3 py-2 text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-400" required />
              </div>
              <div>
                <label className="mb-1 block text-sm text-zinc-300">연락처</label>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-xl border border-white/10 bg-zinc-800 px-3 py-2 text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-400" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm text-zinc-300">문의 내용</label>
              <textarea rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-xl border border-white/10 bg-zinc-800 px-3 py-2 text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-400" placeholder="예) AMAT 0200-xxxx 노즐 10ea, 납기 2주, 재질: Al₂O₃, 표면: Ra≤0.2µm" />
            </div>
            <div className="flex items-center justify-between">
              <a href={mailto} className="text-sm text-zinc-400 hover:underline">메일 앱으로 열기</a>
              <button type="submit" className="inline-flex items-center gap-2 rounded-2xl border border-emerald-300/40 bg-emerald-300/10 px-4 py-2 font-medium text-emerald-200 hover:bg-emerald-300/20">
                <Send className="h-4 w-4" /> 보내기
              </button>
            </div>
          </div>
        </form>
        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
          <h4 className="mb-2 font-semibold text-white">연락처</h4>
          <div className="mt-2 flex items-center gap-3 text-zinc-300"><Phone className="h-4 w-4 text-emerald-300" /> {COMPANY.tel}</div>
          <div className="mt-1 flex items-center gap-3 text-zinc-300"><Mail className="h-4 w-4 text-emerald-300" /> {COMPANY.email}</div>
          <div className="mt-1 flex items-center gap-3 text-zinc-300"><MapPin className="h-4 w-4 text-emerald-300" /> {COMPANY.address_ko}</div>
          <p className="mt-4 text-sm text-zinc-400">※ 도면(PDF/DXF)과 스펙을 함께 보내주시면 견적이 빨라집니다.</p>
        </div>
      </div>
    </Section>
  );
}

function MapSection() {
  return (
    <Section id="map" icon={MapPin} title="오시는 길">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 lg:col-span-1">
          <div className="text-white">{COMPANY.name}</div>
          <div className="mt-2 text-zinc-300">{COMPANY.address_ko}</div>
          <div className="text-zinc-400">{COMPANY.address_en}</div>
          <div className="mt-2 text-zinc-300">Tel. {COMPANY.tel}</div>
          <div className="text-zinc-300">E-mail. {COMPANY.email}</div>
        </div>
        <div className="lg:col-span-2">
          <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3223.664049524649!2d128.38167247443442!3d36.1016766332434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3565c14f3c98f86f%3A0x7d86ec9530bbd04a!2z7ZWc65287Iuc6re466eI67C466as7KeA7Iud7IKw7JeF7IS87YSw!5e0!3m2!1sko!2skr!4v1758028726441!5m2!1sko!2skr"
              width="600" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:grid-cols-2 md:px-6">
        <div>
          <div className="text-lg font-semibold text-white">{COMPANY.name}</div>
          <div className="mt-1 text-zinc-300">{COMPANY.tagline_ko}</div>
          <div className="mt-2 text-sm text-zinc-400">{COMPANY.regno}</div>
        </div>
        <div className="md:text-right">
          <div className="text-sm text-zinc-400">© {new Date().getFullYear()} LuminoChip. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const showTop = useScrollTop();
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header />
      <Hero />
      <About />
      <Products />
      <Materials />
      <Clients />
      <Certs />
      <Inquiry />
      <MapSection />
      <Footer />

      {showTop && (
        <a href="#top" className="fixed bottom-6 right-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/80 px-4 py-2 text-sm text-zinc-200 shadow-2xl backdrop-blur hover:bg-zinc-900" aria-label="맨 위로">
          <ChevronUp className="h-4 w-4" /> 맨 위로
        </a>
      )}
    </div>
  );
}
