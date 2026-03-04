import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: "🎙️",
    title: "AI 멀티 캐스터",
    description:
      "실황 캐스터, 해설위원, 엔터테이너까지. 3명의 AI가 동네 축구를 프로 예능처럼 중계합니다.",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: "📱",
    title: "스마트폰 하나로",
    description:
      "경기장 중앙에 스마트폰만 세워두세요. 별도 장비 없이 프로급 중계가 시작됩니다.",
    gradient: "from-purple-500 to-pink-400",
  },
  {
    icon: "⚡",
    title: "실시간 이벤트 감지",
    description:
      "골, 파울, 코너킥 등 경기 이벤트를 자동으로 인식하여 즉각적인 해설을 생성합니다.",
    gradient: "from-amber-500 to-orange-400",
  },
  {
    icon: "🎬",
    title: "자동 하이라이트",
    description:
      "주요 장면을 자동으로 편집하여 SNS에 바로 올릴 수 있는 숏폼 영상을 생성합니다.",
    gradient: "from-green-500 to-emerald-400",
  },
  {
    icon: "🔊",
    title: "자연스러운 AI 음성",
    description:
      "감정이 살아있는 자연스러운 캐스팅 음성으로 경기 몰입감을 높입니다.",
    gradient: "from-red-500 to-rose-400",
  },
  {
    icon: "🏘️",
    title: "동네 예능 콘텐츠",
    description:
      "일반인들의 경기도 프로 못지않은 예능 콘텐츠로 만들어 드립니다.",
    gradient: "from-indigo-500 to-blue-400",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">핵심 기능</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            동네 축구도 BoomCast와 함께하면 프로 예능 스포츠가 됩니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:border-blue-500/30 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
