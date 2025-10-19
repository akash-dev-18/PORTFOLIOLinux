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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: z.infer<typeof contactSchema>) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({ success: true, message: result.message });
        reset();
      } else {
        setSubmitStatus({ success: false, message: result.message });
      }
    } catch (error) {
      setSubmitStatus({ success: false, message: 'Something went wrong. Please try again later.' });
    }

    setIsSubmitting(false);
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
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-mono">
              <div>
                <label className="block text-sm text-primary mb-1">Name:</label>
                <input
                  type="text"
                  {...register('name')}
                  className="w-full bg-input border border-primary/30 rounded px-3 py-2 text-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="Enter your name..."
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              
              <div>
                <label className="block text-sm text-primary mb-1">Email:</label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full bg-input border border-primary/30 rounded px-3 py-2 text-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="your.email@domain.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              
              <div>
                <label className="block text-sm text-primary mb-1">Subject:</label>
                <input
                  type="text"
                  {...register('subject')}
                  className="w-full bg-input border border-primary/30 rounded px-3 py-2 text-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="What's this about?"
                />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
              </div>
              
              <div>
                <label className="block text-sm text-primary mb-1">Message:</label>
                <textarea
                  {...register('message')}
                  rows={4}
                  className="w-full bg-input border border-primary/30 rounded px-3 py-2 text-foreground focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                  placeholder="Type your message here..."
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
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
              {submitStatus && (
                <p className={`text-sm mt-2 ${submitStatus.success ? 'text-green-500' : 'text-red-500'}`}>
                  {submitStatus.message}
                </p>
              )}
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