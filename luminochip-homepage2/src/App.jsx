import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Mail,
  MapPin,
  Phone,
  Factory,
  Boxes,
  Shield,
  FileText,
  Building2,
  Wrench,
  ArrowRight,
  Send,
  ChevronUp,
  CheckCircle,
} from "lucide-react";

/**
 * 루미노칩(사용자 회사)용 원페이지 기업 사이트 템플릿
 */

const NAV_ITEMS = [
  { id: "about", label: "회사소개" },
  { id: "products", label: "제품소개" },
  { id: "materials", label: "물성표" },
  { id: "clients", label: "보유장비" },
  { id: "certs", label: "인증서" },
  { id: "inquiry", label: "견적문의" },
  { id: "map", label: "오시는 길" },
];

const PRODUCTS = [
  { name: "Quartz 미세홀 가공", img: "/images/Quartz미세홀가공.png" },
  { name: "SiC 미세홀(40x40) 2400EA", img: "/images/SiC미세홀(40x40)2400EA.png" },
  {
    name: "UV코팅, AR 코팅, 일반 SAPPHIRE, Quartz Polishing & Laser marking",
    img: "/images/UV코팅,AR코팅,일반SAPPHIRE쿼츠폴리싱&레이저마킹.png",
  },
  { name: "원형 Si3N4", img: "/images/원형Si3N4.png", fit: "contain", pos: "top" },
  { name: "Al2O3 Hot Press 미세홀", img: "/images/Al2O3 Hot Press 미세홀.png", fit: "contain", pos: "top" },
  { name: "Al2O3 Hot Press 미세홀 내측", img: "/images/Al2O3 Hot Press 미세홀 내측.png", fit: "contain", pos: "top" },
];

const PLACEHOLDER = "/images/placeholder.png";

const MATERIALS = [
  { name: "Quartz(쿼츠)", cte: "~0.55 ppm/K", temp: "20–400°C", note: "열변형 낮음, 고온 투명 재료" },
  { name: "Alumina(알루미나)", cte: "~7.5–8.0 ppm/K", temp: "20–400°C", note: "내마모/내열, 절연 세라믹" },
  { name: "Sapphire(사파이어)", cte: "~5.0–5.8 ppm/K", temp: "20–400°C", note: "고강도 투명 결정" },
  { name: "SiC(실리콘카바이드)", cte: "~4.0–4.5 ppm/K", temp: "20–400°C", note: "고경도/내열/내플라즈마" },
  { name: "YAG(야그)", cte: "~7–8 ppm/K", temp: "20–400°C", note: "레이저/광학 응용" },
];

// --- [수정 구간] CLIENTS 데이터에 신규 장비 4종 추가 ---
const CLIENTS = [
  { name: "중/대형 CNC 머시닝센터 (Mynx 시리즈)", img: "/images/1번MCT장비.png" },
  { name: "CNC 머시닝센터 (DNC 8060)", img: "/images/2번MCT장비.png" },
  { name: "초정밀 평면 연삭 설비 (YGS 시리즈)", img: "/images/3번평면장비.png" },
  { name: "고속 CNC 탭핑센터 (HiT-400)", img: "/images/4번CNC장비.png" },
  { name: "Nanosecond Laser Marking Machine", img: "/images/Nanosecond.png" },
  { name: "Picosecond Laser Marking Machine", img: "/images/Picosecond.png" },
  { name: "1500x Optical Microscope", img: "/images/광학현미경.png" },
  { name: "Polishing Machine", img: "/images/POLISHING MACHINE2.png" },
  { name: "Surface Roughness Tester", img: "/images/표면조도기.png" },
  { name: "Micro Vickers Tester", img: "/images/마이크로 비커스.png" },
];

const CERT_IMAGES = [
  { src: "/certs/analysis-1.png", alt: "분석자료 1" },
  { src: "/certs/analysis-2.png", alt: "분석자료 2" },
  { src: "/certs/analysis-3.png", alt: "분석자료 3" },
  { src: "/certs/analysis-4.png", alt: "분석자료 4" },
];

const CERT_MISC = [
  {
    title: "ISO 9001",
    note: "현재 컨설팅 중 입니다",
    img: "/images/ISO9001.png",
  },
];

const COMPANY = {
  name: "루미노칩 (LuminoChip)",
  tagline_ko: "투명하고 정밀한 가공으로 신뢰받는 파트너",
  tagline_en: "Trusted micro-machining partner for semiconductors",
  regno: "사업자등록번호: 329-01-03642",
  tel: "010-4698-9493",
  email: "luminochip@naver.com",
  address_ko: "경상북도 구미시 공단동 260-10 한라시그마벨리 9층 919호",
  address_en: "212, 1gongdan-ro, Gumi-si, Gyeongsangbuk-do, Republic of Korea",
  ceo: "김윤성 (YunSeong Kim)",
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
          <img src="/images/logo.png" alt="Luminochip Logo" className="h-14 w-14 rounded-2xl object-cover" />
          <div>
            <div className="text-sm tracking-wider text-zinc-300">{COMPANY.tagline_en}</div>
            <div className="text-lg font-semibold text-white">{COMPANY.name}</div>
          </div>
        </a>
        <nav className="hidden gap-6 md:flex">
          {NAV_ITEMS.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="text-2g text-zinc-200 hover:text-white">
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
              <a
                key={n.id}
                href={`#${n.id}`}
                className="rounded-lg px-2 py-2 text-zinc-100 hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
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
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !muted;
    setMuted(!muted);
  };

  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-zinc-900 to-zinc-950 min-h-[88svh] md:min-h-[72svh]">
      <div
        className="absolute inset-0 -z-10 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(600px 200px at 10% 10%, rgba(16,185,129,0.25), transparent), radial-gradient(600px 200px at 90% 0%, rgba(34,211,238,0.2), transparent)",
        }}
      />
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:px-6 md:py-14">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
            <CheckCircle className="h-4 w-4" /> ISO 기반 품질관리 · 반도체 부품 특화
          </div>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
            세라믹, SiC, Y₂O₃, Sapphire 등 난삭재 가공으로 <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">공정 신뢰성</span>을 높입니다.
          </h1>
          <p className="mt-4 max-w-prose text-zinc-300">
            * 반도체·디스플레이 공정용 정밀 부품 가공을 수행
            고속 CNC 가공 설비와 고강성 머시닝센터, 초정밀 연삭 공정을 기반으로
            레이저 가공 및 정밀 측정·검사 설비까지 통합 구축하여
            정밀 부품 생산의 전 공정을 대응하고 있습니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#inquiry" className="inline-flex items-center gap-2 rounded-2xl border border-emerald-300/40 bg-emerald-300/10 px-4 py-2 font-medium text-emerald-200 hover:bg-emerald-300/20">
              <Send className="h-4 w-4" /> 견적 문의하기
            </a>
            <a href="#products" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-2 text-zinc-200 hover:bg-white/5">
              <ArrowRight className="h-4 w-4" /> 제품 바로보기
            </a>
          </div>
        </div>
        <div className="relative w-full md:h-[560px]">
          <div className="grid h-full grid-cols-1 gap-3 md:grid-cols-3 items-stretch">
            <div className="relative md:col-span-1">
              <video ref={videoRef} className="h-full w-full rounded-2xl border border-white/10 shadow-2xl object-contain md:object-cover" autoPlay muted loop playsInline poster="/images/hero-poster.jpg">
                <source src="/videos/hero.mp4" type="video/mp4" />
              </video>
              <button type="button" onClick={toggleMute} className="absolute bottom-3 right-3 z-10 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-xs text-white backdrop-blur">
                {muted ? "🔇 음소거 해제" : "🔊 음소거"}
              </button>
            </div>
            <div className="grid gap-3 md:col-span-2 md:grid-rows-2">
              <div className="relative h-64 md:h-full overflow-hidden rounded-2xl border border-white/10">
                <img src="/images/hero-1.png" alt="LuminoChip 1" className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <div className="relative h-64 md:h-full overflow-hidden rounded-2xl border border-white/10">
                <img src="/images/hero-2.png" alt="LuminoChip 2" className="absolute inset-0 h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({ id, icon: Icon, title, subtitle, children, pad = "normal" }) {
  const padY = pad === "compact" ? "py-10" : "py-14";
  return (
    <section id={id} className="border-t border-white/10 bg-zinc-950 scroll-mt-24">
      <div className={`mx-auto max-w-7xl px-4 ${padY} md:px-6`}>
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
  const [selectedImg, setSelectedImg] = useState(null);
  return (
    <Section id="products" icon={Boxes} title="제품소개">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((p) => (
          <div key={p.name} className="group rounded-2xl border border-white/10 bg-zinc-900/50 p-5 transition hover:bg-zinc-900">
            <div className="mb-3 aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-800 cursor-pointer" onClick={() => setSelectedImg(p.img)}>
              <img src={p.img || PLACEHOLDER} alt={p.name} className={`h-full w-full ${p?.fit === "contain" ? "object-contain" : "object-cover"} transition-transform duration-300 group-hover:scale-105`} onError={(e) => (e.target.src = PLACEHOLDER)} />
            </div>
            <h3 className="text-lg font-medium text-white text-center">{p.name}</h3>
          </div>
        ))}
      </div>
      {selectedImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setSelectedImg(null)}>
          <div className="relative max-w-4xl max-h-[90vh]">
            <img src={selectedImg} alt="제품" className="max-h-[90vh] w-auto rounded-lg shadow-lg" />
          </div>
        </div>
      )}
    </Section>
  );
}

function About() {
  return (
    <Section id="about" icon={Building2} title="회사소개" subtitle="루미노칩은 반도체 및 디스플레이 공정용 정밀 부품을 공급하는 제조/가공 전문 기업입니다." pad="compact">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
          <h4 className="mb-2 font-semibold text-white">비전</h4>
          <p className="text-zinc-300">정밀 가공으로 공정 신뢰성 향상에 기여하는 글로벌 파트너가 됩니다.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
          <h4 className="mb-2 font-semibold text-white">핵심역량</h4>
          <ul className="list-disc pl-5 text-zinc-300">
            <li>초미세 HOLE(≤50µm) 가공</li>
            <li>Sapphire/Quartz/Ceramic 정밀 가공</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
          <h4 className="mb-2 font-semibold text-white">품질정책</h4>
          <p className="text-zinc-300">ISO 기반 표준 공정으로 납기와 품질을 보장합니다.</p>
        </div>
      </div>
    </Section>
  );
}

function Materials() {
  return (
    <Section id="materials" icon={FileText} title="물성표">
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full divide-y divide-white/10">
          <thead className="bg-zinc-900/60">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-200">소재</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-200">열팽창계수(CTE)</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-200">비고</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {MATERIALS.map((m) => (
              <tr key={m.name} className="hover:bg-white/5">
                <td className="px-4 py-3 text-zinc-100">{m.name}</td>
                <td className="px-4 py-3 text-zinc-300">{m.cte}</td>
                <td className="px-4 py-3 text-zinc-300">{m.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

// --- [수정 구간] Clients 컴포넌트: 그리드 레이아웃을 4열로 조정 ---
function Clients() {
  const [selectedImg, setSelectedImg] = useState(null);
  return (
    <Section id="clients" icon={Factory} title="보유장비" subtitle="신규 도입된 MCT 및 CNC 장비를 포함하여 정밀 가공을 위한 최신 설비를 구축하고 있습니다.">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {CLIENTS.map((c) => (
          <div key={c.name} className="group rounded-2xl border border-white/10 bg-zinc-900/50 p-5 cursor-pointer hover:bg-zinc-900" onClick={() => setSelectedImg(c.img)}>
            <div className="mb-3 aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-800">
              <img src={c.img || PLACEHOLDER} alt={c.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" onError={(e) => (e.target.src = PLACEHOLDER)} />
            </div>
            <h3 className="text-sm font-medium text-white text-center">{c.name}</h3>
          </div>
        ))}
      </div>
      {selectedImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setSelectedImg(null)}>
          <div className="relative max-w-4xl max-h-[90vh]">
            <img src={selectedImg} alt="장비" className="max-h-[90vh] w-auto rounded-lg shadow-lg" />
          </div>
        </div>
      )}
    </Section>
  );
}

function Certs() {
  const [selectedImg, setSelectedImg] = useState(null);
  return (
    <Section id="certs" icon={Shield} title="인증서">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-3 sm:col-span-2 lg:col-span-2">
          <div className="grid grid-cols-2 gap-2">
            {CERT_IMAGES.map((img) => (
              <button key={img.src} onClick={() => setSelectedImg(img.src)} className="aspect-[4/3] overflow-hidden rounded-xl border border-white/10">
                <img src={img.src} alt={img.alt} className="h-full w-full object-cover" onError={(e) => (e.target.src = PLACEHOLDER)} />
              </button>
            ))}
          </div>
        </div>
        {CERT_MISC.map((c) => (
          <div key={c.title} className="rounded-2xl border border-white/10 bg-zinc-900/50 p-5">
            <img src={c.img} alt={c.title} className="mb-3 aspect-[4/3] w-full object-contain rounded-xl" onError={(e) => (e.target.src = PLACEHOLDER)} />
            <div className="text-white text-center">{c.title}</div>
          </div>
        ))}
      </div>
      {selectedImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setSelectedImg(null)}>
          <img src={selectedImg} alt="인증서" className="max-h-[90vh] rounded-xl shadow-2xl" />
        </div>
      )}
    </Section>
  );
}

function Inquiry() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const mailto = `mailto:${COMPANY.email}?subject=[루미노칩] 견적문의&body=성함:${form.name}%0D%0A연락처:${form.phone}%0D%0A내용:${form.message}`;

  return (
    <Section id="inquiry" icon={Mail} title="견적문의">
      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={(e) => { e.preventDefault(); window.location.href = mailto; }} className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
          <div className="grid gap-4">
            <input placeholder="성함/회사" className="w-full rounded-xl border border-white/10 bg-zinc-800 px-3 py-2 text-zinc-100 outline-none" required onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input type="email" placeholder="이메일" className="w-full rounded-xl border border-white/10 bg-zinc-800 px-3 py-2 text-zinc-100 outline-none" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <textarea rows={4} placeholder="문의 내용" className="w-full rounded-xl border border-white/10 bg-zinc-800 px-3 py-2 text-zinc-100 outline-none" onChange={(e) => setForm({ ...form, message: e.target.value })} />
            <button type="submit" className="w-full rounded-2xl bg-emerald-500 py-2 font-bold text-white hover:bg-emerald-600 transition">문의 보내기</button>
          </div>
        </form>
        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 text-zinc-300">
          <p>대표 : {COMPANY.ceo}</p>
          <p>Tel : {COMPANY.tel}</p>
          <p>Email : {COMPANY.email}</p>
          <p className="mt-2 text-sm text-zinc-500">{COMPANY.address_ko}</p>
        </div>
      </div>
    </Section>
  );
}

function MapSection() {
  return (
    <Section id="map" icon={MapPin} title="오시는 길">
      <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10">
        <iframe title="map" className="h-full w-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3224.2750379462!2d128.3752!3d36.11!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3565e39669528f9d%3A0x8687009405f63d04!2z7ZWc65287Iuc6re466eI67Ko66as!5e0!3m2!1sko!2skr!4v1700000000000" loading="lazy" />
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950 py-10 text-center">
      <div className="text-white font-semibold">{COMPANY.name}</div>
      <div className="text-sm text-zinc-500 mt-2">© {new Date().getFullYear()} LuminoChip. All rights reserved.</div>
    </footer>
  );
}

export default function App() {
  const showTop = useScrollTop();
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden">
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
        <a href="#top" className="fixed bottom-6 right-6 rounded-full bg-zinc-900/80 p-3 shadow-2xl backdrop-blur">
          <ChevronUp className="h-6 w-6" />
        </a>
      )}
    </div>
  );
}
