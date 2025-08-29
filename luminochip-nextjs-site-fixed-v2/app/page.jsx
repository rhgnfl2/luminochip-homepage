import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";

import { Mail, MapPin, Phone, Factory, Boxes, Shield, FileText, Building2, Wrench, ArrowRight, Send, CheckCircle } from "lucide-react";

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

export default function Home() {
  return (
    <main id="top">
      <Navbar />
      <section className="relative overflow-hidden bg-gradient-to-b from-zinc-900 to-zinc-950">
        <div className="absolute inset-0 -z-10 opacity-30" style={{backgroundImage: "radial-gradient(600px 200px at 10% 10%, rgba(16,185,129,0.25), transparent), radial-gradient(600px 200px at 90% 0%, rgba(34,211,238,0.2), transparent)"}} />
        <div className="container grid items-center gap-10 py-16 md:grid-cols-2 md:py-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
              <CheckCircle className="h-4 w-4" /> ISO 기반 품질관리 · 반도체 부품 특화
            </div>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
              초정밀 레이저·세라믹 가공으로 <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">공정 신뢰성</span>을 높입니다.
            </h1>
            <p className="mt-4 max-w-prose text-zinc-300">
              ESC 플레이트 초미세 홀(≤50µm)·사파이어/쿼츠/알루미나·SiC 정밀 가공, AMAT/LAM/NOVELLUS 등 장비 호환 부품 생산까지 원스톱으로 지원합니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#inquiry" className="inline-flex items-center gap-2 rounded-2xl border border-emerald-300/40 bg-emerald-300/10 px-4 py-2 font-medium text-emerald-200 hover:bg-emerald-300/20">
                <Send className="h-4 w-4" /> 견적 문의하기
              </a>
              <a href="#products" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-2 text-zinc-200 hover:bg-white/5">
                제품 바로보기
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

      <Section id="clients" icon={Factory} title="주요 거래처" subtitle="국내외 반도체/디스플레이 제조사 및 장비사와 협력합니다.">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {["SK hynix","LAM Research","Applied Materials","Novellus","Samsung","TEL"].map((c) => (
            <div key={c} className="flex h-24 items-center justify-center rounded-2xl border border-white/10 bg-zinc-900/40">
              <span className="text-lg font-semibold text-zinc-200">{c}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="certs" icon={Shield} title="인증서">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {["ISO 9001 (KAB)","벤처기업확인 (중기부)","기업부설연구소 (KOITA)"].map((c) => (
            <div key={c} className="rounded-2xl border border-white/10 bg-zinc-900/50 p-5">
              <div className="mb-3 aspect-[4/3] rounded-xl border border-white/10 bg-zinc-800/60" />
              <div className="text-white">{c}</div>
              <div className="text-sm text-zinc-300">서류 스캔본 교체 업로드</div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="inquiry" icon={Mail} title="견적문의" subtitle="도면(번호/규격), 수량, 요구 납기, 적용 장비/공정을 알려주시면 빠르게 견적드립니다.">
        <div className="grid gap-6 lg:grid-cols-2">
          <form className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6" action={`mailto:${COMPANY.email}`} method="post" encType="text/plain">
            <div className="grid gap-4">
              <div>
                <label className="mb-1 block text-sm text-zinc-300">성함/회사</label>
                <input name="name" className="w-full rounded-xl border border-white/10 bg-zinc-800 px-3 py-2 text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-400" required />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-zinc-300">이메일</label>
                  <input type="email" name="email" className="w-full rounded-xl border border-white/10 bg-zinc-800 px-3 py-2 text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-400" required />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-zinc-300">연락처</label>
                  <input name="phone" className="w-full rounded-xl border border-white/10 bg-zinc-800 px-3 py-2 text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-400" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm text-zinc-300">문의 내용</label>
                <textarea rows={6} name="message" className="w-full rounded-xl border border-white/10 bg-zinc-800 px-3 py-2 text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-400" placeholder="예) AMAT 0200-xxxx 노즐 10ea, 납기 2주, 재질: Al₂O₃, 표면: Ra≤0.2µm"></textarea>
              </div>
              <div className="flex items-center justify-between">
                <a href={`mailto:${COMPANY.email}`} className="text-sm text-zinc-400 hover:underline">메일 앱으로 열기</a>
                <button type="submit" className="rounded-2xl border border-emerald-300/40 bg-emerald-300/10 px-4 py-2 font-medium text-emerald-200 hover:bg-emerald-300/20">
                  보내기
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

      <Section id="map" icon={MapPin} title="오시는 길">
        <div className="container grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 lg:col-span-1">
            <div className="text-white">{COMPANY.name}</div>
            <div className="mt-2 text-zinc-300">{COMPANY.address_ko}</div>
            <div className="text-zinc-400">{COMPANY.address_en}</div>
            <div className="mt-2 text-zinc-300">Tel. {COMPANY.tel}</div>
            <div className="text-zinc-300">E-mail. {COMPANY.email}</div>
          </div>
          <div className="lg:col-span-2">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10">
              <iframe title="map" className="h-full w-full" src="https://www.google.com/maps?q=Dongtan-daero%20636-3%20Hwaseong&output=embed" loading="lazy" />
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
