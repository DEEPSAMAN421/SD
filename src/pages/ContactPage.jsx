
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from '@/components/ThemeProvider';

const ContactPage = () => {
  const { toast } = useToast();
  const { setTheme } = useTheme();

  React.useEffect(() => {
    setTheme('default');
  }, [setTheme]);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Message Sent (Simulated)",
      description: "Thank you for your message! We'll get back to you soon. (This is a demo, no email was actually sent).",
    });
    e.target.reset();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 theme-default">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <Mail className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold clash-font text-primary mb-4">Contact Us</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Have questions, suggestions, or need support? Reach out to us!
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card p-6 sm:p-8 rounded-lg shadow-lg border"
        >
          <h2 className="text-2xl font-semibold clash-font text-primary mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Full Name</label>
              <Input type="text" name="name" id="name" required className="bg-background" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email Address</label>
              <Input type="email" name="email" id="email" required className="bg-background" />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1">Subject</label>
              <Input type="text" name="subject" id="subject" required className="bg-background" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">Message</label>
              <Textarea name="message" id="message" rows="4" required className="bg-background" />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Send Message</Button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-8"
        >
          <div className="bg-card p-6 rounded-lg shadow-lg border">
            <h3 className="text-xl font-semibold clash-font text-primary mb-3 flex items-center">
              <Mail className="h-6 w-6 mr-3 text-primary/80" /> Email Support
            </h3>
            <p className="text-muted-foreground">
              For all inquiries, please email us at:
            </p>
            <a href="mailto:support@clashofclanslayouts.com" className="text-primary hover:underline font-medium">
              support@clashofclanslayouts.com
            </a>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-lg border">
            <h3 className="text-xl font-semibold clash-font text-primary mb-3 flex items-center">
              <MapPin className="h-6 w-6 mr-3 text-primary/80" /> Our Location (Virtual)
            </h3>
            <p className="text-muted-foreground">
              We are a fully remote team dedicated to bringing you the best Clash of Clans content from around the globe!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
