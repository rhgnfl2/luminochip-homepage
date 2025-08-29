export default function Footer(){
  return (
    <footer className="border-t border-white/10 bg-zinc-950">
      <div className="container grid gap-6 py-10 md:grid-cols-2">
        <div>
          <div className="text-lg font-semibold text-white">루미노칩 (LuminoChip)</div>
          <div className="mt-1 text-zinc-300">투명하고 정밀한 가공으로 신뢰받는 파트너</div>
          <div className="mt-2 text-sm text-zinc-400">사업자등록번호: 000-00-00000 (예시)</div>
        </div>
        <div className="md:text-right">
          <div className="text-sm text-zinc-400">© {new Date().getFullYear()} LuminoChip. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}
