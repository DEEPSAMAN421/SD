
import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

const PrivacyPolicyPage = () => {
  const { setTheme } = useTheme();

  React.useEffect(() => {
    setTheme('default');
  }, [setTheme]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 theme-default">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <FileText className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold clash-font text-primary mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Your privacy is important to us. This policy explains how we handle your information.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-card p-6 sm:p-8 rounded-lg shadow-lg border prose prose-sm sm:prose-base max-w-none"
      >
        <h2 className="clash-font text-primary">Introduction</h2>
        <p>Welcome to COC Bases Layouts (clashofclanslayouts.com). We are committed to protecting your privacy. This Privacy Policy outlines our practices concerning the information we collect and how we use it.</p>

        <h2 className="clash-font text-primary">Information We Do Not Collect</h2>
        <p>We want to be clear: <strong>we do not collect any personal information from our users.</strong></p>
        <ul>
          <li>You are not required to create an account to use our website.</li>
          <li>We do not ask for your name, email address, location, or any other personally identifiable information.</li>
          <li>Our services, including base layouts and strategy guides, are provided completely free of cost.</li>
        </ul>

        <h2 className="clash-font text-primary">Website Monetization</h2>
        <p>To support the operational costs of this website and continue providing free content, we may use third-party advertising services, such as Google AdSense. These services may use cookies or similar technologies to serve ads based on a user's prior visits to this and other websites. </p>
        <p>Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet. Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ads Settings</a>.</p>
        <p>We do not have access to or control over the cookies or information that may be collected by these third-party advertisers.</p>
        
        <h2 className="clash-font text-primary">Use of Content and Copyright</h2>
        <p>All base layouts, images, and textual content provided on clashofclanslayouts.com are for personal, non-commercial use only. You are welcome to use these layouts in your Clash of Clans game.</p>
        <p>However, you are <strong>strictly prohibited</strong> from:</p>
        <ul>
          <li>Reproducing, distributing, or publicly displaying any material from this website for commercial purposes.</li>
          <li>Selling or attempting to sell any content or material found on this website.</li>
          <li>Claiming ownership of any layouts or content provided by us.</li>
        </ul>
        <p>Doing so may result in copyright infringement and potential legal action. We respect intellectual property rights and expect our users to do the same.</p>

        <h2 className="clash-font text-primary">Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

        <h2 className="clash-font text-primary">Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@clashofclanslayouts.com" className="text-primary hover:underline">support@clashofclanslayouts.com</a>.</p>
        
        <p className="text-xs text-muted-foreground mt-6">Last updated: {new Date().toLocaleDateString()}</p>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicyPage;
