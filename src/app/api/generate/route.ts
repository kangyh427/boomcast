import { NextRequest, NextResponse } from "next/server";
import { getCasterSystemPrompt } from "@/lib/casters";
import { Caster, MatchEvent } from "@/lib/types";

interface GenerateRequest {
  event: MatchEvent;
  caster: Caster;
  matchContext: {
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
  };
  provider?: "claude" | "gemini" | "mock";
}

// Mock commentary generator for demo
function generateMockCommentary(
  event: MatchEvent,
  caster: Caster,
  context: GenerateRequest["matchContext"]
): string {
  const templates: Record<string, Record<string, string[]>> = {
    goal: {
      play_by_play: [
        `골~~~~~~!!!! ${event.player}!!!!! 놀라운 골입니다!!! ${context.homeTeam} ${context.homeScore}-${context.awayScore} ${context.awayTeam}!`,
      ],
      analyst: [
        `${event.player} 선수의 결정력이 빛나는 순간이었습니다. 수비 라인의 간격을 정확히 파고든 움직임이 인상적입니다.`,
      ],
      entertainer: [
        `${event.player} 선수 대박!!! 이게 바로 원탑 클래스죠!! 이 맛에 축구 봅니다!!`,
      ],
    },
    foul: {
      play_by_play: [
        `${event.player || "선수"}에 대한 거친 태클! 심판이 호각을 불었습니다!`,
      ],
      analyst: [
        `전술적으로 위험한 위치에서의 반칙이었습니다. 세트피스 기회가 생겼네요.`,
      ],
      entertainer: [
        `아이고~ 그렇게 막으면 반칙이죠! 심판님 눈은 못 속입니다~`,
      ],
    },
  };

  const eventTemplates = templates[event.type] || templates.foul;
  const roleTemplates =
    eventTemplates?.[caster.role] || [`${event.description}`];
  return roleTemplates[Math.floor(Math.random() * roleTemplates.length)];
}

export async function POST(request: NextRequest) {
  const body: GenerateRequest = await request.json();
  const { event, caster, matchContext, provider = "mock" } = body;

  if (provider === "claude" || provider === "gemini") {
    // Placeholder for real API integration
    // Claude: Use Anthropic SDK with caster system prompt
    // Gemini: Use Google AI SDK with caster system prompt
    const systemPrompt = getCasterSystemPrompt(caster);
    const userPrompt = `경기 상황: ${matchContext.homeTeam} ${matchContext.homeScore}-${matchContext.awayScore} ${matchContext.awayTeam}
이벤트: ${event.description}
${event.player ? `관련 선수: ${event.player}` : ""}

위 상황에 대해 2-3문장으로 해설해주세요.`;

    // For now, return mock since no API keys are configured in this environment
    return NextResponse.json({
      commentary: generateMockCommentary(event, caster, matchContext),
      provider: "mock",
      systemPrompt,
      userPrompt,
      note: "API 키가 설정되면 실제 AI 생성으로 전환됩니다.",
    });
  }

  // Default mock mode
  const commentary = generateMockCommentary(event, caster, matchContext);

  return NextResponse.json({
    commentary,
    provider: "mock",
  });
}
