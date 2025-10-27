/**
 * Terms and Conditions Page
 * Legal information and usage guidelines
 */

import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, AlertTriangle, Scale } from 'lucide-react';
import Footer from '../components/Footer';

function TermsAndConditions() {
  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="py-8 px-4 border-b border-dark-border dark:border-dark-border">
        <div className="container mx-auto max-w-4xl">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Terms & Conditions
          </h1>
          <p className="text-light-muted dark:text-dark-muted mt-2">
            Last updated: October 27, 2025
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-pink dark:prose-invert max-w-none space-y-8">
          
          {/* Introduction */}
          <section className="bg-light-card dark:bg-dark-card rounded-xl p-6 border-l-4 border-primary">
            <div className="flex items-start gap-3">
              <Shield className="text-primary flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="text-2xl font-bold mb-3 text-light-text dark:text-dark-text">
                  Welcome to SayIt
                </h2>
                <p className="text-light-text dark:text-dark-text leading-relaxed">
                  By using SayIt, you agree to these terms and conditions. SayIt is an anonymous message board 
                  where users can share short messages freely. Please read these terms carefully before using our service.
                </p>
              </div>
            </div>
          </section>

          {/* Privacy & Data */}
          <section className="bg-light-card dark:bg-dark-card rounded-xl p-6">
            <div className="flex items-start gap-3 mb-4">
              <Eye className="text-primary flex-shrink-0 mt-1" size={24} />
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text">
                Privacy & Data Collection
              </h2>
            </div>
            <div className="space-y-4 text-light-text dark:text-dark-text">
              <p className="leading-relaxed">
                <strong>No Personal Data:</strong> SayIt does not collect, store, or process any personal information. 
                We do not require registration, login, or any identifying information from users.
              </p>
              <p className="leading-relaxed">
                <strong>Message Content:</strong> Only the message content, recipient field, and timestamp are stored. 
                Messages are completely anonymous and cannot be traced back to any individual user.
              </p>
              <p className="leading-relaxed">
                <strong>No Tracking:</strong> We do not use cookies, analytics, or any tracking mechanisms to 
                monitor user behavior or collect usage data.
              </p>
            </div>
          </section>

          {/* Acceptable Use */}
          <section className="bg-light-card dark:bg-dark-card rounded-xl p-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="text-primary flex-shrink-0 mt-1" size={24} />
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text">
                Acceptable Use Policy
              </h2>
            </div>
            <div className="space-y-4 text-light-text dark:text-dark-text">
              <p className="leading-relaxed font-semibold">
                Users must NOT post messages containing:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Profanity, obscenity, or vulgar language</li>
                <li>Hate speech, discrimination, or harassment</li>
                <li>Threats, violence, or illegal activities</li>
                <li>Sexually explicit or adult content</li>
                <li>Personal information about others</li>
                <li>Spam, advertising, or promotional content</li>
                <li>Content that violates intellectual property rights</li>
              </ul>
              <p className="leading-relaxed bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <strong>⚠️ Content Filtering:</strong> All messages are automatically screened using AI-powered 
                profanity detection. Messages containing inappropriate content will be rejected immediately.
              </p>
            </div>
          </section>

          {/* User Responsibilities */}
          <section className="bg-light-card dark:bg-dark-card rounded-xl p-6">
            <div className="flex items-start gap-3 mb-4">
              <Scale className="text-primary flex-shrink-0 mt-1" size={24} />
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text">
                User Responsibilities
              </h2>
            </div>
            <div className="space-y-4 text-light-text dark:text-dark-text">
              <ul className="list-disc pl-6 space-y-2">
                <li>You are solely responsible for the content you post</li>
                <li>You must comply with all applicable laws and regulations</li>
                <li>You must respect the rights and dignity of others</li>
                <li>You acknowledge that messages are public and visible to everyone</li>
                <li>You waive any expectation of privacy for posted messages</li>
              </ul>
            </div>
          </section>

          {/* Service Terms */}
          <section className="bg-light-card dark:bg-dark-card rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-light-text dark:text-dark-text">
              Service Terms
            </h2>
            <div className="space-y-4 text-light-text dark:text-dark-text">
              <p className="leading-relaxed">
                <strong>Service Availability:</strong> SayIt is provided "as is" without warranties of any kind. 
                We do not guarantee uninterrupted or error-free service.
              </p>
              <p className="leading-relaxed">
                <strong>Content Moderation:</strong> We reserve the right to remove any content that violates 
                these terms or is deemed inappropriate at our sole discretion.
              </p>
              <p className="leading-relaxed">
                <strong>Modifications:</strong> We may modify these terms at any time. Continued use of SayIt 
                constitutes acceptance of any changes.
              </p>
              <p className="leading-relaxed">
                <strong>Termination:</strong> We may terminate or suspend access to our service immediately, 
                without prior notice, for conduct that we believe violates these terms.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="bg-light-card dark:bg-dark-card rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-light-text dark:text-dark-text">
              Limitation of Liability
            </h2>
            <p className="text-light-text dark:text-dark-text leading-relaxed">
              SayIt and its operators shall not be liable for any direct, indirect, incidental, special, 
              consequential, or punitive damages resulting from your use or inability to use the service, 
              or from any content posted by users.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 text-center">
            <h2 className="text-2xl font-bold mb-3 text-light-text dark:text-dark-text">
              Questions?
            </h2>
            <p className="text-light-text dark:text-dark-text leading-relaxed">
              If you have any questions about these Terms & Conditions, please reach out through our 
              community channels or submit feedback through the platform.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default TermsAndConditions;