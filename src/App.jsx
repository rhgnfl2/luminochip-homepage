import React, { useMemo, useState, useEffect } from "react";
import { Menu, X, Mail, MapPin, Phone, Factory, Boxes, Shield, FileText, Building2, Wrench, ArrowRight, Send, ChevronUp, CheckCircle } from "lucide-react";

const NAV_ITEMS = [
  { id: "about", label: "회사소개" },
  { id: "products", label: "제품소개" },
  { id: "materials", label: "물성표" },
  { id: "clients", label: "주요 거래처" },
  { id: "certs", label: "인증서" },
  { id: "inquiry", label: "견적문의" },
  { id: "map", label: "오시는 길" },
];

const PRODUCTS = [
  { name: "AMAT 0200-01009 NOZZLE", mat: "Al₂O₃ (Alumina)", desc: "반도체 장비용 노즐, 4-HOLES 60° BAFFLE" },
  { name: "LAM Wafer Lift Pin 300mm", mat: "SUS / Ceramics", desc: "웨이퍼 리프트 핀(300mm 공정 호환)" },
  { name: "NOVELLUS Fork Assy", mat: "Al₂O₃ / SiC", desc: "CVD/PECVD 대응 포크 어셈블리" },
  { name: "ESC Micro-hole Plate", mat: "Al₂O₃ / Sapphire", desc: "초미세 홀(≤50µm) 배열 가공 ESC 플레이트" },
  { name: "Quartz Ring", mat: "Quartz", desc: "플라즈마/고온 공정용 쿼츠 링" },
  { name: "Sapphire Window", mat: "Sapphire", desc: "고강도 투명 창, 스캐너/뷰포트용" },
];

const MATERIALS = [
  { name: "Quartz(쿼츠)", cte: "~0.55 ppm/K", temp: "20–400°C", note: "열변형 낮음, 고온 투명 재료" },
  { name: "Alumina(알루미나)", cte: "~7.5–8.0 ppm/K", temp: "20–400°C", note: "내마모/내열, 절연 세라믹" },
  { name: "Sapphire(사파이어)", cte: "~5.0–5.8 ppm/K", temp: "20–400°C", note: "고강도 투명 결정" },
  { name: "SiC(실리콘카바이드)", cte: "~4.0–4.5 ppm/K", temp: "20–400°C", note: "고경도/내열/내플라즈마" },
  { name: "YAG(야그)", cte: "~7–8 ppm/K", temp: "20–400°C", note: "레이저/광학 응용" },
];

const CLIENTS = [
  { name: "SK hynix" }, { name: "LAM Research" }, { name: "Applied Materials" },
  { name: "Novellus" }, { name: "Samsung" }, { name: "TEL" },
];

const CERTS = [
  { title: "ISO 9001", no: "QMS-XXXX", issuer: "KAB" },
  { title: "벤처기업확인", no: "VC-XXXX", issuer: "중소벤처기업부" },
  { title: "기업부설연구소", no: "RND-XXXX", issuer: "KOITA" },
];

const COMPANY = {
  name: "루미노칩 (LuminoChip)",
  tagline_ko: "투명하고 정밀한 가공으로 신뢰받는 파트너",
  tagline_en: "Trusted micro‑machining partner for semiconductors",
  regno: "사업자등록번호: 000-00-00000 (예시)",
  tel: "031-000-0000",
  email: "info@luminocheap.example",
  address_ko: "경기 화성시 동탄대로 636-3 C동 205호",
  address_en: "C-205, 636-3 Dongtan-daero, Hwaseong-si, Gyeonggi-do, Republic of Korea",
};

function useScrollTop(threshold=240){const [s,setS]=useState(false);useEffect(()=>{const f=()=>setS(window.scrollY>threshold);window.addEventListener("scroll",f);return()=>window.removeEventListener("scroll",f)},[threshold]);return s;}

function Header(){const[o,setO]=useState(false);return(<header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-900/70 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6"><a href="#top" className="flex items-center gap-3"><div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400"/><div><div className="text-sm tracking-wider text-zinc-300">{COMPANY.tagline_en}</div><div className="text-lg font-semibold text-white">{COMPANY.name}</div></div></a><nav className="hidden gap-6 md:flex">{NAV_ITEMS.map(n=>(<a key={n.id} href={`#${n.id}`} className="text-sm text-zinc-200 hover:text-white">{n.label}</a>))}</nav><button className="md:hidden" onClick={()=>setO(v=>!v)}>{o?<X className="h-6 w-6 text-white"/>:<Menu className="h-6 w-6 text-white"/>}</button></div>{o&&(<div className="border-t border-white/10 bg-zinc-900 md:hidden"><div className="mx-auto grid max-w-7xl gap-2 px-4 py-3">{NAV_ITEMS.map(n=>(<a key={n.id} href={`#${n.id}`} className="rounded-lg px-2 py-2 text-zinc-100 hover:bg-white/5" onClick={()=>setO(false)}>{n.label}</a>))}</div></div>)}</header>)}

function Hero(){return(<section id="top" className="relative overflow-hidden bg-gradient-to-b from-zinc-900 to-zinc-950"><div className="mx-auto max-w-7xl px-4 py-16"><h1 className="text-4xl font-bold text-white">루미노칩 홈페이지 메인</h1><p className="mt-4 text-zinc-300">초정밀 레이저·세라믹 가공, 반도체 부품 전문 제조업체</p></div></section>)}

function Section({id,icon:Icon,title,children}){return(<section id={id} className="border-t border-white/10 bg-zinc-950"><div className="mx-auto max-w-7xl px-4 py-14 md:px-6"><div className="mb-8 flex items-center gap-3">{Icon&&<Icon className="h-6 w-6 text-emerald-300"/>}<h2 className="text-2xl font-semibold text-white">{title}</h2></div>{children}</div></section>)}

function Products(){return(<Section id="products" icon={Boxes} title="제품소개"><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{PRODUCTS.map(p=>(<div key={p.name} className="rounded-2xl border border-white/10 bg-zinc-900/50 p-5"><h3 className="text-lg font-medium text-white">{p.name}</h3><div className="mt-1 text-sm text-emerald-300">{p.mat}</div><p className="mt-2 text-sm text-zinc-300">{p.desc}</p></div>))}</div></Section>)}

function About(){return(<Section id="about" icon={Building2} title="회사소개"><p className="text-zinc-300">루미노칩은 반도체 및 디스플레이 공정용 정밀 부품을 공급하는 제조/가공 전문 기업입니다.</p></Section>)}

function Materials(){return(<Section id="materials" icon={FileText} title="물성표"><table className="min-w-full divide-y divide-white/10"><tbody>{MATERIALS.map(m=>(<tr key={m.name}><td className="px-4 py-2 text-zinc-100">{m.name}</td><td className="px-4 py-2 text-zinc-300">{m.cte}</td><td className="px-4 py-2 text-zinc-300">{m.temp}</td><td className="px-4 py-2 text-zinc-300">{m.note}</td></tr>))}</tbody></table></Section>)}

function Clients(){return(<Section id="clients" icon={Factory} title="주요 거래처"><div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">{CLIENTS.map(c=>(<div key={c.name} className="flex h-20 items-center justify-center rounded-2xl border border-white/10 bg-zinc-900/40"><span className="text-sm text-zinc-200">{c.name}</span></div>))}</div></Section>)}

function Certs(){return(<Section id="certs" icon={Shield} title="인증서"><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{CERTS.map(c=>(<div key={c.title} className="rounded-2xl border border-white/10 bg-zinc-900/50 p-5"><div className="text-white">{c.title}</div><div className="text-sm text-zinc-300">{c.no} · {c.issuer}</div></div>))}</div></Section>)}

function Inquiry(){return(<Section id="inquiry" icon={Mail} title="견적문의"><p className="text-zinc-300">문의는 {COMPANY.email} 으로 부탁드립니다.</p></Section>)}

function MapSection(){return(<Section id="map" icon={MapPin} title="오시는 길"><p className="text-zinc-300">{COMPANY.address_ko}</p></Section>)}

function Footer(){return(<footer className="border-t border-white/10 bg-zinc-950"><div className="mx-auto max-w-7xl px-4 py-10 text-sm text-zinc-400">© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</div></footer>)}

export default function App(){const s=useScrollTop();return(<div className="min-h-screen bg-zinc-950 text-zinc-100"><Header/><Hero/><About/><Products/><Materials/><Clients/><Certs/><Inquiry/><MapSection/><Footer/>{s&&(<a href="#top" className="fixed bottom-6 right-6 rounded-full bg-zinc-900/80 px-4 py-2 text-sm text-zinc-200 border border-white/10">맨 위로</a>)}</div>)}
