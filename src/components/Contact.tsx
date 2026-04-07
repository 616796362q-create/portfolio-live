'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [status, setStatus] = useState<null | 'loading' | 'success' | 'error'>(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(result.message);
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setStatus('error');
      setMessage('Failed to send inquiry. Please try again.');
    }
  };

  return (
    <section id="contacts" className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-10 max-w-7xl">
        <div className="mb-20 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4 block text-sm font-black uppercase tracking-[0.2em] text-primary"
          >
            — Get In Touch
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-black text-foreground font-playfair">
            Contact Me
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mx-auto mt-4 h-1.5 w-24 origin-center rounded-full bg-primary"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-2xl bg-white p-8 md:p-12 shadow-2xl rounded-3xl"
        >
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <label htmlFor="name" className="block text-lg font-bold text-foreground">Name</label>
              <input
                id="name"
                name="name"
                required
                type="text"
                className="h-14 w-full rounded-xl border border-gray-200 px-6 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="abdikarim"
              />
            </div>
            <div className="space-y-4">
              <label htmlFor="email" className="block text-lg font-bold text-foreground">Email</label>
              <input
                id="email"
                name="email"
                required
                type="email"
                className="h-14 w-full rounded-xl border border-gray-200 px-6 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="abdi@example.com"
              />
            </div>
            <div className="space-y-4">
              <label htmlFor="message" className="block text-lg font-bold text-foreground">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full resize-none rounded-2xl border border-gray-200 p-6 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="I have a project idea..."
              />
            </div>

            <button
              disabled={status === 'loading'}
              className="mt-4 h-16 w-full rounded-xl bg-primary text-lg font-black text-foreground transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-primary/20"
            >
              {status === 'loading' ? 'Processing...' : 'Send Message'}
            </button>

            {status && status !== 'loading' && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className={`mt-6 p-4 text-center rounded-xl font-bold ${status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
              >
                {message}
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
