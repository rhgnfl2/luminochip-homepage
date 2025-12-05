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
  MessageCircle,
} from "lucide-react";

/* --------------------------
   기본 설정 + 데이터
--------------------------- */

const NAV_ITEMS = [
  { id: "about", label: "회사소개" },
  { id: "products", label: "제품소개" },
  { id: "materials", label: "물성표" },
  { id: "clients", label: "보유장비" },
  { id: "certs", label: "인증서" },
  { id: "inquiry", label: "견적문의" },
  { id: "guestbook", label: "방명록" },
  { id: "map", label: "오시는 길" },
];

const COMPANY = {
  name: "루미노칩 (LuminoChip)",
  tagline_ko: "투명하고 정밀한 가공으로 신뢰받는 파트너",
  tagline_en: "Trusted micro-machining partner for semiconductors",
  tel: "010-4698-9493",
  email: "luminochip@naver.com",
  address_ko: "경상북도 구미시 공단동 260-10 한라시그마벨리 9층 919호",
  address_en: "212, 1gongdan-ro, Gumi-si, Gyeongsangbuk-do, Republic of Korea",
  regno: "사업자등록번호: 329-01-03642",
  ceo: "김윤성 (YunSeong Kim)",
};

const PLACEHOLDER = "/images/placeholder.png";

/* --------------------------
   스크롤 감지
--------------------------- */
function useScrollTop(threshold = 240) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return show;
}

/* --------------------------
   Header
--------------------------- */
function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-900/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <a href="#top" className="flex items-center gap-3">
          <img src="/images/logo.png" className="h-14 w-14 rounded-2xl object-cover" />
          <div>
            <div className="text-sm tracking-wider text-zinc-300">{COMPANY.tagline_en}</div>
            <div className="text-lg font-semibold text-white">{COMPANY.name}</div>
          </div>
        </a>

        <nav className="hidden gap-6 md:flex">
          {NAV_ITEMS.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="text-zinc-200 hover:text-white">
              {n.label}
            </a>
          ))}
        </nav>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-zinc-900 md:hidden">
          <div className="mx-auto max-w-7xl grid gap-2 px-4 py-3">
            {NAV_ITEMS.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="px-2 py-2 text-zinc-100 hover:bg-white/5 rounded-lg"
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

/* --------------------------
   Hero Section
--------------------------- */
function Hero() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
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
    <section id="top" className="relative bg-gradient-to-b from-zinc-900 to-zinc-950 min-h-[85vh]">
      <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-10 px-4 py-12">
        <div>
          <h1 className="text-4xl text-white font-bold">
            초정밀 LASER · SAPPHIRE 가공으로{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
              공정 신뢰성
            </span>
            을 높입니다.
          </h1>
          <p className="mt-4 text-zinc-300">
            초미세 HOLE(≤50µm) · Sapphire · Quartz · Ceramic · SiC 정밀 가공 전문 기업입니다.
          </p>

          <div className="mt-6 flex gap-3">
            <a
              href="#inquiry"
              className="px-4 py-2 rounded-xl border border-emerald-300/40 bg-emerald-300/10 text-emerald-200"
            >
              견적 문의하기
            </a>
          </div>
        </div>

        <div>
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            className="rounded-xl border border-white/10 w-full h-full object-cover"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>

          <button
            onClick={toggleMute}
            className="absolute bottom-6 right-6 bg-black/50 px-3 py-1 rounded-lg text-white"
          >
            {muted ? "🔇 음소거 해제" : "🔊 음소거"}
          </button>
        </div>
      </div>
    </section>
  );
}

/* --------------------------
   Section Wrapper
--------------------------- */
function Section({ id, icon: Icon, title, subtitle, children }) {
  return (
    <section id={id} className="border-t border-white/10 bg-zinc-950 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-6">
          {Icon && <Icon className="h-6 w-6 text-emerald-400" />}
          <h2 className="text-3xl text-white font-semibold">{title}</h2>
        </div>
        {subtitle && <p className="text-zinc-300 mb-8">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}

/* --------------------------
   방명록 (디씨인사이드 스타일)
--------------------------- */
function Guestbook() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [entries, setEntries] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !password.trim() || !message.trim()) {
      alert("닉네임, 비밀번호, 내용을 모두 입력해 주세요.");
      return;
    }
    const entry = {
      id: Date.now(),
      name,
      message,
      password,
      createdAt: new Date().toLocaleString(),
    };
    setEntries([entry, ...entries]);
    setName("");
    setPassword("");
    setMessage("");
  };

  const handleDelete = (id) => {
    const pwd = prompt("비밀번호를 입력하세요");
    if (!pwd) return;

    const found = entries.find((e) => e.id === id);
    if (!found || found.password !== pwd) {
      alert("비밀번호가 맞지 않습니다.");
      return;
    }
    setEntries(entries.filter((e) => e.id !== id));
  };

  return (
    <Section
      id="guestbook"
      icon={MessageCircle}
      title="방명록"
      subtitle="디씨인사이드 댓글 형식으로 방명록을 남겨 주세요."
    >
      <div className="bg-zinc-900/70 border border-white/10 p-6 rounded-2xl space-y-6">
        {/* 입력폼 */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full bg-zinc-800 border border-white/10 p-2 rounded-lg text-sm text-white"
            placeholder="닉네임 / 회사명"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="password"
            className="w-full bg-zinc-800 border border-white/10 p-2 rounded-lg text-sm text-white"
            placeholder="비밀번호 (삭제용)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <textarea
            className="w-full bg-zinc-800 border border-white/10 p-2 rounded-lg text-sm text-white min-h-[80px]"
            placeholder="내용을 입력하세요."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button className="px-4 py-2 rounded-xl bg-emerald-300/10 border border-emerald-300/40 text-emerald-200">
            등록
          </button>
        </form>

        {/* 댓글 리스트 */}
        <div className="bg-zinc-950/60 border border-white/10 rounded-xl">
          <div className="px-4 py-2 text-xs text-zinc-400 border-b border-white/10">
            댓글 {entries.length}개
          </div>

          {entries.length === 0 && (
            <div className="px-4 py-6 text-center text-sm text-zinc-500">
              아직 댓글이 없습니다. 첫 댓글을 남겨 주세요 🙂
            </div>
          )}

          <ul className="divide-y divide-white/10">
            {entries.map((e, idx) => (
              <li key={e.id} className="px-4 py-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-emerald-300 font-medium">
                    No.{entries.length - idx} {e.name}
                  </span>
                  <span className="text-xs text-zinc-400">{e.createdAt}</span>
                </div>

                <p className="text-zinc-200 mt-1 whitespace-pre-wrap">{e.message}</p>

                <button
                  className="text-red-300 text-xs mt-2"
                  onClick={() => handleDelete(e.id)}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* --------------------------
   Inquiry, Materials, Clients 등
   (삭제 없이 그대로 사용)
--------------------------- */

/* ---- (중요) 나머지 섹션은 기존 코드와 동일하므로 생략하지 말고 그대로 유지하면 됨 ---- */

/* --------------------------
   Footer
--------------------------- */
function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 py-8 text-zinc-400">
        © {new Date().getFullYear()} LuminoChip. All rights reserved.
      </div>
    </footer>
  );
}

/* --------------------------
   App
--------------------------- */
export default function App() {
  const showTop = useScrollTop();

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen">
      <Header />
      <Hero />
      <About />
      <Products />
      <Materials />
      <Clients />
      <Certs />
      <Inquiry />
      <Guestbook />
      <MapSection />
      <Footer />

      {showTop && (
        <a
          href="#top"
          className="fixed bottom-6 right-6 px-4 py-2 rounded-full bg-zinc-900/80 border border-white/10 text-sm text-zinc-200"
        >
          <ChevronUp className="h-4 w-4" />
        </a>
      )}
    </div>
  );
}
