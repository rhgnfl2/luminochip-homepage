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
  MessageCircle, // ✅ 방명록 아이콘 추가
} from "lucide-react";

/**
 * 루미노칩(사용자 회사)용 원페이지 기업 사이트 템플릿
 * - 참고 사이트 구조 반영: 회사소개 / 제품소개 / 물성표 / 보유장비 / 인증서 / 견적문의 / 오시는 길
 * - 기술스택: React + TailwindCSS
 * - 아이콘: lucide-react
 * - 정적 배포형(HTML로 빌드 가능). 폼은 mailto 기반.
 */

const NAV_ITEMS = [
  { id: "about", label: "회사소개" },
  { id: "products", label: "제품소개" },
  { id: "materials", label: "물성표" },
  { id: "clients", label: "보유장비" },
  { id: "certs", label: "인증서" },
  { id: "inquiry", label: "견적문의" },          // ✅ 견적문의 먼저
  { id: "guestbook", label: "비공개 방명록" },   // ✅ 그 다음 비공개 방명록
  { id: "map", label: "오시는 길" },
];

const PRODUCTS = [
  { name: "Quartz 미세홀 가공", img: "/images/Quartz미세홀가공.png" },
  { name: "SiC 미세홀(40x40) 2400EA", img: "/images/SiC미세홀(40x40)2400EA.png" },
  {
    name: "UV코팅, AR 코팅, 일반 SAPPHIRE, Quartz Polishing & Laser marking",
    img: "/images/UV코팅,AR코팅,일반SAPPHIRE쿼츠폴리싱&레이저마킹.png",
  },

  // 🔧 위쪽이 잘리던 3개만 'contain + top'으로 지정
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

const CLIENTS = [
  { name: "Nanosecond Laser Marking Machine", img: "/images/Nanosecond.png" },
  { name: "Picosecond Laser Marking Machine", img: "/images/Picosecond.png" },
  { name: "1500x Optical Microscope", img: "/images/광학현미경.png" },
  { name: "Polishing Machine", img: "/images/POLISHING MACHINE2.png" },
  { name: "Surface Roughness Tester", img: "/images/표면조도기.png" },
  { name: "Micro Vickers Tester", img: "/images/마이크로 비커스.png" },
];

// 분석자료를 PNG 4장으로 노출 (public/certs/* 에 파일 배치)
const CERT_IMAGES = [
  { src: "/certs/analysis-1.png", alt: "분석자료 1" },
  { src: "/certs/analysis-2.png", alt: "분석자료 2" },
  { src: "/certs/analysis-3.png", alt: "분석자료 3" },
  { src: "/certs/analysis-4.png", alt: "분석자료 4" },
];

// (선택) ISO 9001 같은 이미지는 따로 카드로 보여주고 싶다면 여기에 추가 배열을 둬도 됨
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
        {/* 로고 + 회사명 */}
        <a href="#top" className="flex items-center gap-3">
          <img
            src="/images/logo.png"
            alt="Luminochip Logo"
            className="h-14 w-14 rounded-2xl object-cover"
          />
          <div>
            <div className="text-sm tracking-wider text-zinc-300">{COMPANY.tagline_en}</div>
            <div className="text-lg font-semibold text-white">{COMPANY.name}</div>
          </div>
        </a>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden gap-6 md:flex">
          {NAV_ITEMS.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="text-2g text-zinc-200 hover:text-white"
            >
              {n.label}
            </a>
          ))}
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <button
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="toggle menu"
        >
          {open ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
        </button>
      </div>

      {/* 모바일 메뉴 */}
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(true); // 🔊 음소거 상태

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onCanPlay = () => setReady(true);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);

    // 자동재생 정책 대응: 초기 무음
    v.muted = true;

    return () => {
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    setMuted(next);
    if (!next) v.play().catch(() => {});
  };

  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-zinc-900 to-zinc-950 min-h-[88svh] md:min-h-[72svh]">
      {/* 배경 */}
      <div
        className="absolute inset-0 -z-10 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(600px 200px at 10% 10%, rgba(16,185,129,0.25), transparent), radial-gradient(600px 200px at 90% 0%, rgba(34,211,238,0.2), transparent)",
        }}
      />

      {/* 좌우 2컬럼: 좌(카피), 우(미디어) */}
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:px-6 md:py-14">
        {/* 왼쪽 칼럼 */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
            <CheckCircle className="h-4 w-4" /> ISO 기반 품질관리 · 반도체 부품 특화
          </div>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
            초정밀 LASER·SAPPHIRE 가공으로{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">공정 신뢰성</span>
            을 높입니다.
          </h1>
          <p className="mt-4 max-w-prose text-zinc-300">
            초미세 HOLE(≤50µm)/Sapphire/Quartz/Ceramic/SiC 정밀 가공 전문 회사 입니다.
            회사는 현재 경북 구미시로 이전중이며, 공장이전으로 노후화된 장비를 매각 후 소형 사파이어 폴리싱과 초정밀 레이저 가공 위주로 재편중에 있습니다.
          </p>

          {/* CTA */}
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#inquiry"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("inquiry");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="inline-flex items-center gap-2 rounded-2xl border border-emerald-300/40 bg-emerald-300/10 px-4 py-2 font-medium text-emerald-200 hover:bg-emerald-300/20"
            >
              <Send className="h-4 w-4" /> 견적 문의하기
            </a>
            <a
              href="#products"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("products");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-2 text-zinc-200 hover:bg-white/5"
            >
              <ArrowRight className="h-4 w-4" /> 제품 바로보기
            </a>
          </div>
        </div>

        {/* 오른쪽: 동영상 1/3, 이미지 2/3 */}
        <div className="relative w-full md:h-[560px]">
          <div className="grid h-full grid-cols-1 gap-3 md:grid-cols-3 items-stretch">
            {/* 동영상: 왼쪽 1칸 */}
            <div className="relative md:col-span-1">
              {/* 모바일: 비율 유지 / 데스크톱: 타일 높이 채움 */}
              <div className="aspect-video md:aspect-auto md:h-full">
                <video
                  ref={videoRef}
                  className="h-full w-full rounded-2xl border border-white/10 shadow-2xl
                             object-contain md:object-cover"
                  autoPlay
                  muted={muted}
                  loop
                  playsInline
                  webkit-playsinline="true"
                  preload="metadata"
                  poster="/images/hero-poster.jpg"
                >
                  <source src="/videos/hero.mp4" type="video/mp4" />
                  <source src="/videos/hero.webm" type="video/webm" />
                  브라우저가 HTML5 동영상을 지원하지 않습니다.
                </video>
              </div>

              {/* 🔊 음소거/해제 버튼 */}
              <button
                type="button"
                onClick={toggleMute}
                className="absolute bottom-3 right-3 z-10 rounded-full border border-white/20
                           bg-black/50 px-3 py-1.5 text-xs text-white backdrop-blur hover:bg-black/60"
                aria-label={muted ? "음소거 해제" : "음소거"}
              >
                {muted ? "🔇 음소거 해제" : "🔊 음소거"}
              </button>
            </div>

            {/* 이미지: 오른쪽 2칸 세로 2장 */}
            <div className="grid gap-3 md:col-span-2 md:grid-rows-2">
              <div className="relative h-64 md:h-full overflow-hidden rounded-2xl border border-white/10">
                <img
                  src="/images/hero-1.png"
                  alt="LuminoChip sample 1"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  loading="lazy"
                />
              </div>
              <div className="relative h-64 md:h-full overflow-hidden rounded-2xl border border-white/10">
                <img
                  src="/images/hero-2.png"
                  alt="LuminoChip sample 2"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  loading="lazy"
                />
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

  const handleImgError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = PLACEHOLDER;
  };

  return (
    <Section id="products" icon={Boxes} title="제품소개">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((p) => (
          <div
            key={p.name}
            className="group rounded-2xl border border-white/10 bg-zinc-900/50 p-5 transition hover:bg-zinc-900"
          >
            {/* 이미지 영역 */}
            <div
              className="mb-3 aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-800 cursor-pointer"
              onClick={() => setSelectedImg(p.img)}
            >
              <img
                src={p.img || PLACEHOLDER}
                alt={p.name}
                loading="lazy"
                onError={handleImgError}
                className={[
                  "h-full w-full",
                  p?.fit === "contain" ? "object-contain" : "object-cover",
                  p?.pos === "top" ? "object-top" : "object-center",
                  "transition-transform duration-300",
                  p?.fit === "contain" ? "" : "group-hover:scale-105",
                ].join(" ").trim()}
              />
            </div>

            <h3 className="text-lg font-medium text-white text-center">{p.name}</h3>
            <div className="mt-1 text-sm text-emerald-300">{p.mat}</div>
            {p.desc && (
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                {p.desc}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <a
          href="#inquiry"
          className="inline-flex items-center gap-2 text-sm text-emerald-300 hover:underline"
        >
          필요한 품목 리스트 보내기 <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      {/* 모달 (팝업) */}
      {selectedImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute -top-10 right-0 text-white hover:text-emerald-300"
            >
              <X className="h-8 w-8" />
            </button>
            <img
              src={selectedImg}
              alt="제품 이미지"
              className="max-h-[90vh] w-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </Section>
  );
}

function About() {
  return (
    <Section
      id="about"
      icon={Building2}
      title="회사소개"
      subtitle="루미노칩은 반도체 및 디스플레이 공정용 정밀 부품을 공급하는 제조/가공 전문 기업입니다. 투명하고 깨끗한 경영과 데이터 기반 공정 관리로 고객 신뢰를 쌓아갑니다."
      pad="compact"
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
          <h4 className="mb-2 font-semibold text-white">비전</h4>
          <p className="text-zinc-300">
            정밀 가공으로 공정 신뢰성 향상에 기여하여, 글로벌 파운드리/디바이스 고객에게 사랑받는 파트너가 됩니다.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
          <h4 className="mb-2 font-semibold text-white">핵심역량</h4>
          <ul className="list-disc pl-5 text-zinc-300">
            <li>초미세 HOLE(≤50µm) 가공 및 배열 최적화</li>
            <li>Sapphire/Quartz/Ceramic/SiC 정밀 가공</li>
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
    <Section
      id="materials"
      icon={FileText}
      title="물성표"
      subtitle="대표 소재의 열팽창계수(참고치). 실제 사양은 공급사·로트에 따라 달라질 수 있습니다."
    >
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
      <p className="mt-3 text-sm text-zinc-400">
        ※ 자료는 레퍼런스 값이며 설계 시 고객 사양과 공정 조건에 맞춰 재검증합니다.
      </p>
    </Section>
  );
}

function Clients() {
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImgError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = PLACEHOLDER;
  };

  return (
    <Section
      id="clients"
      icon={Factory}
      title="보유장비"
      subtitle="초미세 HOLE(≤50µm)/Sapphire/Quartz/Ceramic/SiC 정밀 가공을 위한 최적의 장비를 보유하고 있습니다."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CLIENTS.map((c) => (
          <div
            key={c.name}
            className="group rounded-2xl border border-white/10 bg-zinc-900/50 p-5 cursor-pointer hover:bg-zinc-900"
            onClick={() => setSelectedImg(c.img)}
          >
            <div className="mb-3 aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-800">
              <img
                src={c.img || PLACEHOLDER}
                alt={c.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={handleImgError}
              />
            </div>
            <h3 className="text-lg font-medium text-white text-center">{c.name}</h3>
          </div>
        ))}
      </div>

      {/* 모달 */}
      {selectedImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute -top-10 right-0 text-white hover:text-emerald-300"
            >
              <X className="h-8 w-8" />
            </button>
            <img
              src={selectedImg}
              alt="장비 이미지"
              className="max-h-[90vh] w-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </Section>
  );
}

function Certs() {
  const [selectedImg, setSelectedImg] = useState(null);

  const onError = (e) => {
    e.currentTarget.onerror = null; // 무한 루프 방지
    e.currentTarget.src = "/images/placeholder.png";
  };

  return (
    <Section id="certs" icon={Shield} title="인증서">
      {/* ✅ 분석자료 + ISO 한 그리드로 통합 */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* 📄 분석자료 카드 (CERT_IMAGES 전체 사용) */}
        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-3 sm:col-span-2 lg:col-span-2">
          <div className="grid grid-cols-2 gap-2">
            {CERT_IMAGES.map((img) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setSelectedImg(img.src)}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-800/60 group"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  onError={onError}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
          <div className="mt-2 text-sm text-zinc-300 text-center">
            분석자료 (1–{CERT_IMAGES.length})
          </div>
        </div>

        {/* ISO 등 기타 인증 카드들 */}
        {CERT_MISC?.map((c) => (
          <div key={c.title} className="rounded-2xl border border-white/10 bg-zinc-900/50 p-5">
            <div className="mb-3 aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-zinc-800/60">
              <img
                src={c.img}
                alt={c.title}
                loading="lazy"
                onError={onError}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="text-white">{c.title}</div>

            {/* 컨설팅 아이콘 뱃지 */}
            {c.note && c.note.includes("컨설팅") && (
              <div
                className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-amber-400/30
                           bg-amber-400/10 px-2.5 py-1 text-xs text-amber-300"
                title="현재 컨설팅 중"
              >
                <Wrench className="h-3.5 w-3.5" />
                현재 컨설팅 중
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 확대 모달 */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImg(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-h-[90vh] w-full max-w-5xl">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImg(null);
              }}
              className="absolute -top-10 right-0 text-white hover:text-emerald-300"
              aria-label="닫기"
            >
              <X className="h-8 w-8" />
            </button>
            <img
              src={selectedImg}
              alt="분석자료 확대 이미지"
              className="max-h-[90vh] w-auto rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </Section>
  );
}

/* ✅ 비공개 방명록 + 비밀번호 삭제 기능 */
function Guestbook() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [entries, setEntries] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !message.trim() || !password.trim()) {
      alert("이름, 비밀번호, 내용을 모두 입력해 주세요.");
      return;
    }

    const newEntry = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),      // 실제 내용은 저장
      password: password.trim(),    // 삭제용 비밀번호
      createdAt: new Date().toLocaleString(),
    };

    setEntries((prev) => [newEntry, ...prev]);

    setName("");
    setMessage("");
    setPassword("");
  };

  const handleDelete = (id) => {
    const pwd = window.prompt("작성 시 입력한 비밀번호를 입력해 주세요.");
    if (!pwd) return;

    setEntries((prev) => {
      const target = prev.find((e) => e.id === id);
      if (!target) {
        alert("해당 방명록을 찾을 수 없습니다.");
        return prev;
      }
      if (target.password !== pwd) {
        alert("비밀번호가 일치하지 않습니다.");
        return prev;
      }
      return prev.filter((e) => e.id !== id);
    });
  };

  return (
    <Section
      id="guestbook"
      icon={MessageCircle}
      title="비공개 방명록"
      subtitle="작성자만 비밀번호로 삭제할 수 있는 비공개 방명록입니다. 내용은 공개되지 않습니다."
    >
      <div className="grid gap-8 md:grid-cols-2">
        {/* 왼쪽: 입력 폼 */}
        <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">비공개 방명록 남기기 ✍️</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm text-zinc-300">이름 / 회사명</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="예) 홍길동 / ○○전자"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-zinc-300">비밀번호 (삭제용)</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="글 삭제할 때 사용할 비밀번호"
              />
              <p className="mt-1 text-xs text-zinc-400">
                ※ 비밀번호는 서버에 저장되지 않고, 이 페이지에서만 사용됩니다.
              </p>
            </div>

            <div>
              <label className="mb-1 block text-sm text-zinc-300">메시지</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[100px] w-full rounded-xl border border-white/10 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="고객사·서비스에 대한 의견, 요청사항 등을 자유롭게 남겨 주세요. 내용은 공개되지 않습니다."
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-emerald-300/40 bg-emerald-300/10 px-4 py-2 text-sm font-medium text-emerald-200 hover:bg-emerald-300/20 md:w-auto"
            >
              <MessageCircle className="h-4 w-4" />
              비공개 방명록 남기기
            </button>
            <p className="text-xs text-zinc-400">
              ※ 현재는 테스트용으로, 페이지를 새로고침하면 작성 내용이 모두 삭제됩니다. (서버 미연동)
            </p>
          </form>
        </div>

        {/* 오른쪽: 방명록 리스트 (내용 비공개 표시) */}
        <div className="max-h-[340px] space-y-3 overflow-y-auto pr-1">
          {entries.length === 0 && (
            <div className="rounded-2xl border border-dashed border-white/20 bg-zinc-900/50 p-6 text-center text-sm text-zinc-400">
              아직 등록된 비공개 방명록이 없습니다.
              <br />
              첫 번째 메시지를 남겨 주세요 🙂
            </div>
          )}

          {entries.map((entry) => (
            <div
              key={entry.id}
              className="rounded-2xl border border-white/10 bg-zinc-900/70 p-4"
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-semibold text-emerald-200">
                  {entry.name}
                </span>
                <span className="text-[11px] text-zinc-400">
                  {entry.createdAt}
                </span>
              </div>
              <p className="text-sm text-zinc-300">
                🔒 비공개 메시지입니다. 작성자만 비밀번호로 삭제할 수 있습니다.
              </p>
              <div className="mt-2 text-right">
                <button
                  type="button"
                  onClick={() => handleDelete(entry.id)}
                  className="text-xs text-red-300 hover:text-red-200 underline"
                >
                  내 방명록 삭제하기
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
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
    <Section
      id="inquiry"
      icon={Mail}
      title="견적문의"
      subtitle="도면(도면번호/규격), 수량, 요구 납기, 적용 장비/공정을 함께 알려주시면 빠르게 드립니다."
    >
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
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-zinc-800 px-3 py-2 text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-400"
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-zinc-300">이메일</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-zinc-800 px-3 py-2 text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-400"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-zinc-300">연락처</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-zinc-800 px-3 py-2 text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm text-zinc-300">문의 내용</label>
              <textarea
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-zinc-800 px-3 py-2 text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="예) AMAT 0200-xxxx 노즐 10ea, 납기 2주, 재질: Al₂O₃, 표면: Ra≤0.2µm"
              />
            </div>
            <div className="flex items-center justify-between">
              <a href={mailto} className="text-sm text-zinc-400 hover:underline">
                메일 앱으로 열기
              </a>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-2xl border border-emerald-300/40 bg-emerald-300/10 px-4 py-2 font-medium text-emerald-200 hover:bg-emerald-300/20"
              >
                <Send className="h-4 w-4" /> 보내기
              </button>
            </div>
          </div>
        </form>
        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
          <h4 className="mb-2 font-semibold text-white">연락처</h4>

          {/* ✅ 대표자 표시 추가 */}
          <div className="mt-1 flex items-center gap-3 text-zinc-300">
            <Building2 className="h-4 w-4 text-emerald-300" /> 대표 : {COMPANY.ceo}
          </div>

          <div className="mt-2 flex items-center gap-3 text-zinc-300">
            <Phone className="h-4 w-4 text-emerald-300" /> {COMPANY.tel}
          </div>
          <div className="mt-1 flex items-center gap-3 text-zinc-300">
            <Mail className="h-4 w-4 text-emerald-300" /> {COMPANY.email}
          </div>
          <div className="mt-1 flex items-center gap-3 text-zinc-300">
            <MapPin className="h-4 w-4 text-emerald-300" /> {COMPANY.address_ko}
          </div>
          <p className="mt-4 text-sm text-zinc-400">
            ※ 도면(PDF/DWG/DXF)과 스펙을 함께 보내주시면 견적이 빨라집니다.
          </p>
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
              className="block h-full w-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3223.664049524649!2d128.38167247443442!3d36.1016766332434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3565c14f3c98f86f%3A0x7d86ec9530bbd04a!2z7ZWc65287Iuc6re466eI67C466as7KeA7Iud7IKw7JeF7IS87YSw!5e0!3m2!1sko!2skr!4v1758028726441!5m2!1sko!2skr"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
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
          <div className="text-sm text-zinc-400">
            © {new Date().getFullYear()} LuminoChip. All rights reserved.
          </div>
        </div>
      </div>
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
      <Inquiry />    {/* ✅ 견적문의 먼저 */}
      <Guestbook />  {/* ✅ 그 다음 비공개 방명록 */}
      <MapSection />
      <Footer />

      {showTop && (
        <a
          href="#top"
          className="fixed bottom-6 right-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/80 px-4 py-2 text-sm text-zinc-200 shadow-2xl backdrop-blur hover:bg-zinc-900"
          aria-label="맨 위로"
        >
          <ChevronUp className="h-4 w-4" /> 맨 위로
        </a>
      )}
    </div>
  );
}
