import { Download, FileText, Calendar, MapPin, Phone, Mail } from 'lucide-react';
import { backendDevelopment, programmingLanguages, cybersecurity, toolsAndDatabases, csFundamentals } from '@/data/skills';

export const Resume = () => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-primary/30 pb-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary font-hacker">
              AKASH KUMAR
            </h1>
            <p className="text-secondary font-mono">
              Computer Science Student • Backend & Cybersecurity
            </p>
          </div>
          <a href="/akashResume.pdf" download className="flex items-center gap-2 bg-primary/20 hover:bg-primary/30 text-primary px-4 py-2 rounded border border-primary/50 transition-all glow-primary">
            <Download className="w-4 h-4" />
            Download PDF
          </a>
        </div>
        
        <div className="flex items-center gap-6 mt-3 text-sm text-muted-foreground font-mono">
          <div className="flex items-center gap-1">
            <Mail className="w-4 h-4" />
            akash1.dev2.ak@gmail.com
          </div>
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            +91 8789918110
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            India
          </div>
        </div>
      </div>

      {/* Content ScrollArea */}
      <div className="flex-1 overflow-y-auto space-y-6">
        {/* Skills */}
        <section>
          <h2 className="text-lg font-bold text-secondary mb-3 font-hacker border-b border-secondary/30 pb-1">
            [TECHNICAL_SKILLS]
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-sm">
            <div>
              <h3 className="text-primary font-bold mb-2">Backend Development (Java):</h3>
              <ul className="text-foreground space-y-1">
                {backendDevelopment.map((s) => (
                  <li key={s}>→ {s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-primary font-bold mb-2">Programming Languages:</h3>
              <ul className="text-foreground space-y-1">
                {programmingLanguages.map((s) => (
                  <li key={s}>→ {s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-primary font-bold mb-2">Cybersecurity:</h3>
              <ul className="text-foreground space-y-1">
                {cybersecurity.map((s) => (
                  <li key={s}>→ {s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-primary font-bold mb-2">Tools & Databases:</h3>
              <ul className="text-foreground space-y-1">
                {toolsAndDatabases.map((s) => (
                  <li key={s}>→ {s}</li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-primary font-bold mb-2">CS Fundamentals:</h3>
              <ul className="text-foreground space-y-1">
                {csFundamentals.map((s) => (
                  <li key={s}>→ {s}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Work Experience intentionally omitted */}

        {/* Education & Certifications */}
        <section>
          <h2 className="text-lg font-bold text-secondary mb-3 font-hacker border-b border-secondary/30 pb-1">
            [EDUCATION_&_CERTS]
          </h2>
          <div className="space-y-4 font-mono text-sm">
            {/* Education */}
            <div className="border-l-2 border-accent/50 pl-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-accent font-bold">B.Tech in Computer Science and Engineering</h3>
                <span className="text-accent">2023 – 2027 (Expected)</span>
              </div>
              <p className="text-foreground">NIST University, Berhampur, Odisha</p>
            </div>
            <div className="border-l-2 border-accent/50 pl-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-accent font-bold">Higher Secondary (XII - Science)</h3>
                <span className="text-accent">2021 – 2023</span>
              </div>
              <p className="text-foreground">A.M College, Gaya, Bihar</p>
            </div>
            <div className="border-l-2 border-accent/50 pl-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-accent font-bold">Matriculation (X)</h3>
                <span className="text-accent">2020 – 2021</span>
              </div>
              <p className="text-foreground">Dini Academy, Gaya, Bihar</p>
            </div>

            {/* Certifications */}
            <div className="pt-2">
              <h3 className="text-primary font-bold mb-2">Certifications</h3>
              <ul className="text-foreground space-y-1 list-disc list-inside">
                <li>TryHackMe Junior Pentester</li>
                <li>TryHackMe Cybersecurity 101</li>
                <li>TryHackMe Pre-Security</li>
                <li>Networking Basics (Cisco)</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};