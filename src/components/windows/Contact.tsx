import { 
  Mail, 
  Github, 
  Linkedin, 
  MessageSquare, 
  Send,
  MapPin,
  Clock,
  Shield
} from 'lucide-react';
import { useState } from 'react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(formData.subject);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      const mailtoLink = `mailto:akash1.dev2.ak@gmail.com?subject=${subject}&body=${body}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Small delay for UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Success message
      alert('Email client opened! Your message is ready to send.');
    } catch (error) {
      setIsSubmitting(false);
      alert('Error opening email client. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      url: 'https://github.com/akash-dev-18/',
      username: '@akash-dev-18',
      color: 'hover:text-primary'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/akash-kumar-17576132b/',
      username: '/in/akash-kumar-17576132b',
      color: 'hover:text-secondary'
    },
    {
      icon: Mail,
      label: 'Email',
      url: 'mailto:akash1.dev2.ak@gmail.com',
      username: 'akash1.dev2.ak@gmail.com',
      color: 'hover:text-primary'
    }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-primary/30 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-primary font-hacker">
          [CONTACT_INTERFACE]
        </h1>
        <p className="text-muted-foreground font-mono mt-1">
          Establish secure communication channel
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Form */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-secondary font-hacker border-b border-secondary/30 pb-2">
              {'>'} send_message.sh
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4 font-mono">
              <div>
                <label className="block text-sm text-primary mb-1">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-input border border-primary/30 rounded px-3 py-2 text-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="Enter your name..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm text-primary mb-1">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-input border border-primary/30 rounded px-3 py-2 text-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="your.email@domain.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm text-primary mb-1">Subject:</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-input border border-primary/30 rounded px-3 py-2 text-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="What's this about?"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm text-primary mb-1">Message:</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-input border border-primary/30 rounded px-3 py-2 text-foreground focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                  placeholder="Type your message here..."
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 py-2 px-4 rounded font-bold transition-all glow-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Execute Send
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-6">
            {/* Social Links */}
            <div>
              <h2 className="text-lg font-bold text-secondary font-hacker border-b border-secondary/30 pb-2 mb-4">
                [SOCIAL_NETWORKS]
              </h2>
              <div className="space-y-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-3 border border-primary/20 rounded bg-card/20 transition-all ${link.color} hover:border-primary/40 hover:glow-primary group`}
                  >
                    <link.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <div className="font-mono">
                      <div className="text-sm font-bold">{link.label}</div>
                      <div className="text-xs text-muted-foreground">{link.username}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-lg font-bold text-secondary font-hacker border-b border-secondary/30 pb-2 mb-4">
                [SYSTEM_INFO]
              </h2>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Location: India</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="w-4 h-4 text-secondary" />
                  <span>Timezone: IST (UTC+5:30)</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MessageSquare className="w-4 h-4 text-accent" />
                  <span>Phone: +91 8789918110</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Encryption: PGP available</span>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="border border-primary/30 rounded p-4 bg-terminal-bg">
              <div className="font-mono text-xs">
                <div className="text-terminal-prompt mb-2">root@kali:~# status</div>
                <div className="text-terminal-text space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-primary">AVAILABLE FOR HIRE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                    <span className="text-secondary">OPEN TO COLLABORATIONS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                    <span className="text-accent">BUG BOUNTY HUNTING</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};