import { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

interface TerminalLine {
  type: 'command' | 'output' | 'prompt';
  content: string;
  timestamp: number;
}

export const Terminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const hackerCommands = [
    { cmd: 'whoami', output: 'root@kali:~# elite_hacker' },
    { cmd: 'pwd', output: '/home/hacker/portfolio' },
    { cmd: 'ls -la', output: 'drwxr-xr-x 4 root root 4096 Jan 19 2025 .\ndrwxr-xr-x 3 root root 4096 Jan 19 2025 ..\n-rw-r--r-- 1 root root 2048 Jan 19 2025 resume.pdf\ndrwxr-xr-x 2 root root 4096 Jan 19 2025 projects\ndrwxr-xr-x 2 root root 4096 Jan 19 2025 about\n-rw-r--r-- 1 root root 1024 Jan 19 2025 contact.txt' },
    { cmd: 'cat /etc/passwd | grep root', output: 'root:x:0:0:root:/root:/bin/bash' },
    { cmd: 'nmap -sS localhost', output: 'Starting Nmap scan...\n22/tcp   open  ssh\n80/tcp   open  http\n443/tcp  open  https\nNmap done: 1 IP address (1 host up)' },
    { cmd: 'ps aux | grep portfolio', output: 'root     1337  0.1  0.5  12345  6789 pts/0    S+   15:30   0:01 ./portfolio --hacker-mode' },
    { cmd: 'uname -a', output: 'Linux kali 5.15.0-kali3 #1 SMP Debian x86_64 GNU/Linux' },
    { cmd: 'echo "Welcome to my portfolio"', output: 'Welcome to my portfolio' }
  ];

  const typeCommand = async (command: string, delay = 100) => {
    setIsTyping(true);
    setCurrentCommand('');
    
    for (let i = 0; i <= command.length; i++) {
      setCurrentCommand(command.slice(0, i));
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    setIsTyping(false);
    return command;
  };

  const addLine = (type: TerminalLine['type'], content: string) => {
    setLines(prev => [...prev, { type, content, timestamp: Date.now() }]);
  };

  const runCommand = async (command: string) => {
    const hackerCmd = hackerCommands.find(cmd => cmd.cmd === command);
    
    addLine('prompt', `root@kali:~# ${command}`);
    
    if (hackerCmd) {
      await new Promise(resolve => setTimeout(resolve, 500));
      addLine('output', hackerCmd.output);
    } else {
      await new Promise(resolve => setTimeout(resolve, 300));
      addLine('output', `bash: ${command}: command not found`);
    }
    
    setCurrentCommand('');
  };

  const executeRandomCommands = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    for (let i = 0; i < hackerCommands.length; i++) {
      const command = hackerCommands[i];
      await typeCommand(command.cmd, 80);
      await new Promise(resolve => setTimeout(resolve, 500));
      await runCommand(command.cmd);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    // Keep terminal alive
    setCurrentCommand('');
    addLine('prompt', 'root@kali:~# ');
  };

  useEffect(() => {
    addLine('output', 'Kali GNU/Linux Rolling - kali tty1');
    addLine('output', '');
    addLine('output', 'Last login: Sat Jan 19 15:30:21 2025 from 127.0.0.1');
    executeRandomCommands();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines, currentCommand]);

  return (
    <div className="terminal h-full flex flex-col">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 p-2 border-b border-primary/30 bg-muted/20">
        <TerminalIcon className="w-4 h-4 text-primary" />
        <span className="text-sm font-mono text-foreground">Terminal - root@kali</span>
        <div className="flex gap-1 ml-auto">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="flex-1 p-4 overflow-y-auto font-mono text-sm leading-relaxed"
      >
        {lines.map((line, index) => (
          <div key={index} className="mb-1">
            {line.type === 'prompt' && (
              <span className="terminal-prompt">{line.content}</span>
            )}
            {line.type === 'output' && (
              <pre className="text-terminal-text whitespace-pre-wrap">{line.content}</pre>
            )}
          </div>
        ))}
        
        {/* Current command being typed */}
        <div className="flex items-center">
          <span className="terminal-prompt">root@kali:~# </span>
          <span className="text-terminal-text">
            {currentCommand}
            {isTyping && <span className="typewriter">|</span>}
          </span>
        </div>
      </div>
    </div>
  );
};
