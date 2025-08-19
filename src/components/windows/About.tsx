import { Terminal, Shield, Code, Coffee, Brain, Zap } from 'lucide-react';
import { backendDevelopment, programmingLanguages, cybersecurity, toolsAndDatabases, csFundamentals } from '@/data/skills';

export const About = () => {
  const interests = [
    { icon: Shield, label: 'Ethical Hacking', color: 'text-primary' },
    { icon: Code, label: 'Open Source', color: 'text-secondary' },
    { icon: Brain, label: 'AI/ML Research', color: 'text-accent' },
    { icon: Terminal, label: 'Linux Systems', color: 'text-primary' },
    { icon: Coffee, label: 'Late Night Coding', color: 'text-secondary' },
    { icon: Zap, label: 'IoT Security', color: 'text-accent' }
  ];

  const renderBadges = (items: string[]) => (
    <div className="flex flex-wrap gap-2">
      {items.map((s) => (
        <span key={s} className="px-2 py-1 text-xs font-mono bg-primary/10 text-primary border border-primary/30 rounded">
          {s}
        </span>
      ))}
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-primary/30 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-primary font-hacker">
          [ABOUT_ME.txt]
        </h1>
        <p className="text-secondary font-mono mt-1">
          Computer Science Student • Backend & Cybersecurity
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6">
        {/* Bio Section */}
        <section className="border border-primary/20 rounded p-4 bg-card/30">
          <h2 className="text-lg font-bold text-secondary mb-3 font-hacker">
            {'>'} whoami
          </h2>
          <div className="font-mono text-sm text-foreground leading-relaxed space-y-3">
            <p>
              <span className="text-primary">$</span> Computer Science student specializing in backend development and cybersecurity.
            </p>
            <p>
              <span className="text-secondary">$</span> Strong foundation in Java and Spring ecosystem, with hands-on experience in security tooling.
            </p>
            <p>
              <span className="text-accent">$</span> Active learner—CTF, TryHackMe, open-source contributions, and building real-world projects.
            </p>
          </div>
        </section>

        {/* Skills (synced from Resume) */}
        <section>
          <h2 className="text-lg font-bold text-secondary mb-4 font-hacker">
            [SKILLS]
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-primary font-bold mb-2 font-mono text-sm">Backend Development (Java)</h3>
              {renderBadges(backendDevelopment)}
            </div>
            <div>
              <h3 className="text-primary font-bold mb-2 font-mono text-sm">Programming Languages</h3>
              {renderBadges(programmingLanguages)}
            </div>
            <div>
              <h3 className="text-primary font-bold mb-2 font-mono text-sm">Cybersecurity</h3>
              {renderBadges(cybersecurity)}
            </div>
            <div>
              <h3 className="text-primary font-bold mb-2 font-mono text-sm">Tools & Databases</h3>
              {renderBadges(toolsAndDatabases)}
            </div>
            <div>
              <h3 className="text-primary font-bold mb-2 font-mono text-sm">CS Fundamentals</h3>
              {renderBadges(csFundamentals)}
            </div>
          </div>
        </section>

        {/* Interests Grid */}
        <section>
          <h2 className="text-lg font-bold text-secondary mb-4 font-hacker">
            [INTERESTS_&_HOBBIES]
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {interests.map((interest, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 border border-primary/20 rounded bg-card/20 hover:border-primary/40 transition-all hover:glow-primary"
              >
                <interest.icon className={`w-5 h-5 ${interest.color}`} />
                <span className="font-mono text-sm text-foreground">
                  {interest.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Quote */}
        <section className="border-l-4 border-primary pl-4">
          <blockquote className="font-mono text-sm italic text-muted-foreground">
            "The best way to predict the future is to invent it. But first, 
            you need to secure it."
          </blockquote>
          <footer className="text-primary text-xs mt-2 font-hacker">
            - Alan Kay (adapted for cybersecurity)
          </footer>
        </section>

        {/* System Info */}
        <section className="bg-terminal-bg p-3 rounded font-mono text-xs border border-primary/30">
          <div className="text-terminal-prompt mb-2">root@kali:~# neofetch</div>
          <div className="text-terminal-text space-y-1">
            <div><span className="text-primary">User:</span> Akash Kumar</div>
            <div><span className="text-secondary">Location:</span> India</div>
            <div><span className="text-accent">Email:</span> akash1.dev2.ak@gmail.com</div>
            <div><span className="text-primary">GitHub:</span> @akash-dev-18</div>
            <div><span className="text-secondary">Status:</span> <span className="text-primary animate-pulse">ONLINE</span></div>
          </div>
        </section>
      </div>
    </div>
  );
};