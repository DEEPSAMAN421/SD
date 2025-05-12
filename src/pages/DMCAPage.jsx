
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

const DMCAPage = () => {
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
        <ShieldAlert className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold clash-font text-primary mb-4">DMCA Policy</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Digital Millennium Copyright Act Notice & Takedown Policy.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-card p-6 sm:p-8 rounded-lg shadow-lg border prose prose-sm sm:prose-base max-w-none"
      >
        <h2 className="clash-font text-primary">Reporting Copyright Infringement</h2>
        <p>COC Bases Layouts (clashofclanslayouts.com) respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act (DMCA), we will respond expeditiously to notices of alleged copyright infringement that are reported to our Designated Copyright Agent, identified below.</p>

        <h2 className="clash-font text-primary">Notice of Copyright Infringement</h2>
        <p>If you are a copyright owner, or are authorized to act on behalf of one, or authorized to act under any exclusive right under copyright, please report alleged copyright infringements taking place on or through the Website by completing the following DMCA Notice of Alleged Infringement and delivering it to our Designated Copyright Agent.</p>
        <p>Upon receipt of the Notice as described below, we will take whatever action, in our sole discretion, we deem appropriate, including removal of the challenged material from the Website.</p>
        
        <p>Your DMCA Notice must include the following information:</p>
        <ol>
          <li>Identify the copyrighted work that you claim has been infringed, or - if multiple copyrighted works are covered by this Notice - you may provide a representative list of the copyrighted works that you claim have been infringed.</li>
          <li>Identify the material or link you claim is infringing (or the subject of infringing activity) and that access to which is to be disabled, including at a minimum, if applicable, the URL of the link shown on the Website where such material may be found.</li>
          <li>Provide your mailing address, telephone number, and, if available, email address.</li>
          <li>Include both of the following statements in the body of the Notice:
            <ul>
              <li>"I hereby state that I have a good faith belief that the disputed use of the copyrighted material is not authorized by the copyright owner, its agent, or the law (e.g., as a fair use)."</li>
              <li>"I hereby state that the information in this Notice is accurate and, under penalty of perjury, that I am the owner, or authorized to act on behalf of the owner, of the copyright or of an exclusive right under the copyright that is allegedly infringed."</li>
            </ul>
          </li>
          <li>Provide your full legal name and your electronic or physical signature.</li>
        </ol>

        <h2 className="clash-font text-primary">Designated Copyright Agent</h2>
        <p>Deliver this Notice, with all items completed, to our Designated Copyright Agent:</p>
        <p>
          Copyright Agent<br />
          COC Bases Layouts<br />
          Email: <a href="mailto:support@clashofclanslayouts.com" className="text-primary hover:underline">support@clashofclanslayouts.com</a> (Subject: DMCA Takedown Request)
        </p>
        <p>Please note that DMCA notices should go to the Copyright Agent; any other feedback, comments, requests for technical support, and other communications should be directed to our general support email.</p>

        <h2 className="clash-font text-primary">Counter-Notification Procedures</h2>
        <p>If you believe that material you posted on the site was removed or access to it was disabled by mistake or misidentification, you may file a counter-notification with us by submitting written notification to our copyright agent. The counter-notification must include substantially the following: (1) Your physical or electronic signature. (2) An identification of the material that has been removed or to which access has been disabled and the location at which the material appeared before it was removed or access disabled. (3) A statement under penalty of perjury by you that you have a good faith belief that the material was removed or disabled as a result of mistake or misidentification of the material to be removed or disabled. (4) Your name, address, telephone number, and a statement that you consent to the jurisdiction of the Federal Court for the judicial district in which your address is located (or if you are outside the United States, for any judicial district in which the Website may be found) and that you will accept service of process from the person who provided notification of the alleged infringement.</p>
        
        <p className="text-xs text-muted-foreground mt-6">Last updated: {new Date().toLocaleDateString()}</p>
      </motion.div>
    </div>
  );
};

export default DMCAPage;
