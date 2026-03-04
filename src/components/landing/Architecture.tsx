import { Card, CardContent } from "@/components/ui/card";

export default function Architecture() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">기술 구조</span>
          </h2>
          <p className="text-gray-400 text-lg">
            스마트폰 + AI 클라우드 하이브리드
          </p>
        </div>

        <Card className="p-6 sm:p-8 overflow-x-auto">
          <pre className="text-xs sm:text-sm font-mono text-gray-300 leading-relaxed whitespace-pre">
{`
  ┌─────────────────────────────────────────────────────────┐
  │              📱 경기장 중앙 스마트폰                       │
  │                                                         │
  │  ┌──────────┐    ┌──────────────┐    ┌───────────────┐  │
  │  │ 카메라    │───▶│ AI 이벤트    │───▶│ 이벤트 전송   │  │
  │  │ 녹화     │    │ 자동 감지     │    │ (골/파울/...)  │  │
  │  └──────────┘    └──────────────┘    └───────┬───────┘  │
  └──────────────────────────────────────────────┼──────────┘
                                                 │
                      ▼ Event JSON (< 1KB)       │
                                                 │
  ┌──────────────────────────────────────────────┼──────────┐
  │              ☁️  AI 클라우드                   │          │
  │                                              │          │
  │  ┌──────────────┐    ┌──────────────┐    ┌───▼───────┐  │
  │  │ AI 음성 합성  │◀───│ 멀티 캐스터   │◀───│  이벤트   │  │
  │  │ (TTS)        │    │ AI 대본 생성  │    │  수신기   │  │
  │  └──────┬───────┘    └──────────────┘    └───────────┘  │
  └─────────┼───────────────────────────────────────────────┘
            │
            ▼ 완성된 중계 콘텐츠

  ┌─────────────────────────────────────────────────────────┐
  │              📺 시청 & 공유                               │
  │                                                         │
  │  ┌──────────┐    ┌──────────────┐    ┌───────────────┐  │
  │  │ 영상+음성 │───▶│ 하이라이트    │───▶│ SNS 공유      │  │
  │  │ 합성     │    │ 자동 편집     │    │ YouTube/Insta │  │
  │  └──────────┘    └──────────────┘    └───────────────┘  │
  └─────────────────────────────────────────────────────────┘
`}
          </pre>
        </Card>

        <div className="grid sm:grid-cols-3 gap-4 mt-8">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold mb-2">{"< 100ms"}</div>
              <div className="text-sm text-gray-400">이벤트 감지 속도</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold mb-2">{"< 2s"}</div>
              <div className="text-sm text-gray-400">AI 해설 생성 속도</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold mb-2">3명</div>
              <div className="text-sm text-gray-400">동시 AI 캐스터</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
