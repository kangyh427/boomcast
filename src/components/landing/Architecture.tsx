export default function Architecture() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">시스템 아키텍처</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Edge + Cloud 하이브리드 파이프라인
          </p>
        </div>

        <div className="glass rounded-2xl p-8 overflow-x-auto">
          <pre className="text-xs sm:text-sm font-mono text-gray-300 leading-relaxed whitespace-pre">
{`
  ┌─────────────────────────────────────────────────────────┐
  │                    📱 EDGE (스마트폰)                     │
  │                                                         │
  │  ┌──────────┐    ┌──────────────┐    ┌───────────────┐  │
  │  │ 카메라    │───▶│ YOLOv8-nano  │───▶│ 이벤트 트리거 │  │
  │  │ 캡처     │    │ 객체 감지     │    │ (골/파울/...)  │  │
  │  └──────────┘    └──────────────┘    └───────┬───────┘  │
  │                                              │          │
  └──────────────────────────────────────────────┼──────────┘
                                                 │
                        ▼ Event JSON (< 1KB)     │
                                                 │
  ┌──────────────────────────────────────────────┼──────────┐
  │                    ☁️  CLOUD (서버리스)        │          │
  │                                              │          │
  │  ┌──────────────┐    ┌──────────────┐    ┌───▼───────┐  │
  │  │ TTS 합성     │◀───│ 멀티 페르소나 │◀───│  이벤트   │  │
  │  │ (ElevenLabs) │    │ LLM 대본생성  │    │  수신기   │  │
  │  └──────┬───────┘    └──────────────┘    └───────────┘  │
  │         │                                               │
  └─────────┼───────────────────────────────────────────────┘
            │
            ▼ Audio Stream

  ┌─────────────────────────────────────────────────────────┐
  │                    📱 LOCAL MUXING                       │
  │                                                         │
  │  ┌──────────┐    ┌──────────────┐    ┌───────────────┐  │
  │  │ 오디오    │───▶│ 영상 + 음성   │───▶│ 다이렉트      │  │
  │  │ 덕킹     │    │ 믹싱         │    │ 업로드        │  │
  │  └──────────┘    └──────────────┘    └───────────────┘  │
  │                                              │          │
  └──────────────────────────────────────────────┼──────────┘
                                                 │
                                    ▼ YouTube / Instagram / TikTok
`}
          </pre>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mt-8">
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">{"< 100ms"}</div>
            <div className="text-sm text-gray-400">Edge 이벤트 감지 지연</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">{"< 2s"}</div>
            <div className="text-sm text-gray-400">대본 생성 + TTS 합성</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">Zero Storage</div>
            <div className="text-sm text-gray-400">서버 저장 없이 직접 업로드</div>
          </div>
        </div>
      </div>
    </section>
  );
}
