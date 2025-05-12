
import React from 'react';
import { motion } from 'framer-motion';
import { Copyright } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

const TermsOfUsePage = () => {
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
        <Copyright className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold clash-font text-primary mb-4">Terms of Use</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Please read these terms carefully before using our website.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-card p-6 sm:p-8 rounded-lg shadow-lg border prose prose-sm sm:prose-base max-w-none"
      >
        <h2 className="clash-font text-primary">1. Acceptance of Terms</h2>
        <p>By accessing and using COC Bases Layouts (clashofclanslayouts.com) ("the Website"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this Website.</p>

        <h2 className="clash-font text-primary">2. Use of Content</h2>
        <p>All content provided on the Website, including base layouts, images, text, graphics, and strategies, is for your personal, non-commercial use only. You may use the base layouts within the Clash of Clans game as intended.</p>
        <p>You are expressly prohibited from:</p>
        <ul>
          <li>Reproducing, duplicating, copying, selling, reselling, or exploiting any portion of the Website or its content for any commercial purposes without express written permission from us.</li>
          <li>Modifying, adapting, or hacking the Website or modifying another website so as to falsely imply that it is associated with the Website.</li>
          <li>Using any data mining, robots, or similar data gathering or extraction methods.</li>
        </ul>

        <h2 className="clash-font text-primary">3. Disclaimer of Warranties</h2>
        <p>The Website and its content are provided "as is" and "as available" without any warranties of any kind, express or implied. We do not warrant that the Website will be uninterrupted, timely, secure, or error-free. We do not warrant that the results that may be obtained from the use of the Website will be accurate or reliable.</p>
        <p>The base layouts and strategies provided are for informational and entertainment purposes. Success in the game Clash of Clans depends on various factors including skill, game updates, and opponent strategies. We do not guarantee any specific outcomes from using our layouts or strategies.</p>

        <h2 className="clash-font text-primary">4. Limitation of Liability</h2>
        <p>In no event shall COC Bases Layouts or its owners be liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses (even if we have been advised of the possibility of such damages), resulting from the use or the inability to use the Website or its content.</p>
        
        <h2 className="clash-font text-primary">5. Supercell Fan Content Policy</h2>
        <p>This material is unofficial and is not endorsed by Supercell. For more information see Supercell’s Fan Content Policy: <a href="https://www.supercell.com/fan-content-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.supercell.com/fan-content-policy</a>. We adhere to this policy in our content creation and presentation.</p>

        <h2 className="clash-font text-primary">6. Changes to Terms</h2>
        <p>We reserve the right to modify these Terms of Use at any time. We will notify users of any changes by posting the new Terms of Use on this page. Your continued use of the Website after any such changes constitutes your acceptance of the new Terms of Use.</p>

        <h2 className="clash-font text-primary">7. Governing Law</h2>
        <p>These Terms of Use shall be governed by and construed in accordance with the laws of the jurisdiction in which the website owner resides, without regard to its conflict of law provisions.</p>

        <h2 className="clash-font text-primary">Contact Us</h2>
        <p>If you have any questions about these Terms of Use, please contact us at <a href="mailto:support@clashofclanslayouts.com" className="text-primary hover:underline">support@clashofclanslayouts.com</a>.</p>
        
        <p className="text-xs text-muted-foreground mt-6">Last updated: {new Date().toLocaleDateString()}</p>
      </motion.div>
    </div>
  );
};

export default TermsOfUsePage;
