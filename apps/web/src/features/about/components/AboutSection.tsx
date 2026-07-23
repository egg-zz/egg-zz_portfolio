import { motion } from "motion/react";
import { Github, Mail } from "lucide-react";

interface AboutSectionProps {
  sectionRef: (el: HTMLElement | null) => void;
}

export function AboutSection({ sectionRef }: AboutSectionProps) {
  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 px-6 bg-foreground text-background"
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid sm:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4">About Me</p>
            <h2 className="text-heading sm:text-heading-lg font-bold mb-6">
              권수린,<br /><span className="italic text-accent">개발자</span>
            </h2>
            <p className="text-background/80 leading-relaxed mb-4 text-sm">
              저는 AI를 활용해 구현 속도를 높이지만, 문제 정의와 설계·검증·수정·최종 결과에 대한 책임은 제가 집니다.
            </p>
            <p className="text-background/80 leading-relaxed text-sm">
              AI가 코드를 작성할 수는 있지만, 어떤 문제를 해결해야 하는지 결정하고 그 결과가 실제 서비스에서 올바르게 작동하는지 책임지는 것은 개발자의 역할이라고 생각합니다.
            </p>

            <div className="flex items-center gap-3 mt-8">
              <a
                href="https://github.com/egg-zz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-background/30 text-background/80 hover:text-background hover:border-background text-sm transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="mailto:surin@example.com"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white hover:bg-accent text-sm transition-colors font-semibold"
              >
                <Mail className="w-4 h-4" />
                이메일 보내기
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-4"
          >
            {[
              { label: "문제를 정의한다", desc: "AI에게 바로 코드를 요청하기 전에, 사용자가 어디서 불편한지·어떤 상태가 필요한지·예외 상황은 무엇인지를 먼저 판단합니다." },
              { label: "AI의 결과를 검증한다", desc: "생성된 코드가 기존 정책과 맞는지, API 응답 형식과 일치하는지, 운영 환경에서도 동작하는지 직접 확인합니다." },
              { label: "여러 요소를 연결한다", desc: "AI는 컴포넌트 하나를 만들 수 있지만, 프론트엔드·백엔드·인증·AI 모델·배포 환경이 전부 맞아야 서비스가 됩니다." },
              { label: "결과에 책임진다", desc: "AI가 만든 코드가 오류를 내도 면접관은 AI에게 책임을 묻지 않습니다. 개발자에게 묻습니다." },
            ].map(({ label, desc }) => (
              <div key={label} className="border border-background/10 rounded-xl px-4 py-3 bg-background/5">
                <p className="text-xs font-semibold text-primary mb-1">{label}</p>
                <p className="text-xs text-background/70 leading-relaxed">{desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
