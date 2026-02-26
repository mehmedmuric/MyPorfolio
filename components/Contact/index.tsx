"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../Common/SectionTitle";
import Container from "../Container";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Github, Linkedin, Twitter, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { cn } from "@/lib/utils";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setStatus("idle");

    if (!formRef.current) return;

    try {
      await emailjs.sendForm(
        "service_jt0dhte",
        "template_i0djgfp",
        formRef.current,
        "e3HwtEEiXF4PsfjEl"
      );
      setStatus("success");
      setStatusMessage("Message sent successfully! I'll get back to you soon.");
      formRef.current.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
      setStatusMessage("Failed to send message. Please try again or email me directly.");
    } finally {
      setIsSending(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-background relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] opacity-50 translate-x-1/3 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] opacity-40 -translate-x-1/3 translate-y-1/3" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <SectionTitle
              title="Get In Touch"
              paragraph="Have a project in mind or want to collaborate? Let's build something amazing together."
              align="center"
            />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start mt-16 mb-12 relative">
            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-10">
              <div className="prose dark:prose-invert">
                <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-emerald-400 to-emerald-200">
                  Let's create together
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                  I'm currently open to new opportunities and freelance projects.
                  Whether you have a question, a project idea, or just want to explore possibilities, I'm here to help you turn your vision into reality.
                </p>
              </div>

              <div className="space-y-6">
                <ContactItem icon={Mail} label="Email me at" value="mehmedmuric22@gmail.com" href="mailto:mehmedmuric22@gmail.com" />
                <ContactItem icon={MapPin} label="Location" value="Novi Pazar, Serbia" />
              </div>

              {/* Social Links */}
              <div className="pt-8 border-t border-white/10">
                <p className="text-sm font-medium text-emerald-400 mb-5 tracking-wide uppercase">Connect With Me</p>
                <div className="flex gap-4">
                  <SocialLink href="https://github.com/mehmedmuric" icon={Github} ariaLabel="GitHub Profile" />
                  <SocialLink href="https://linkedin.com/in/mehmed-muric" icon={Linkedin} ariaLabel="LinkedIn Profile" />
                  <SocialLink href="https://twitter.com/mehmedmuricc" icon={Twitter} ariaLabel="Twitter Profile" />
                </div>
              </div>

              <div className="p-6 bg-gradient-to-tr from-emerald-500/10 to-transparent rounded-2xl border border-emerald-500/10 mt-8 backdrop-blur-md relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex items-center gap-4">
                  <div className="relative flex h-4 w-4 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
                  </div>
                  <div>
                    <h4 className="text-emerald-400 font-medium text-sm mb-1">Available for new projects</h4>
                    <p className="text-white/70 text-sm">Typically responds within 24 hours</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div variants={itemVariants} className="relative group">
              {/* Form Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-primary/20 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-70 transition duration-500" />

              <Card className="relative bg-black/40 backdrop-blur-xl border-white/10 shadow-2xl rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                <CardContent className="p-8 sm:p-10 relative z-10">
                  <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2.5">
                        <label className="text-sm font-medium text-foreground/90 ml-1">Name</label>
                        <Input
                          name="user_name"
                          required
                          className="h-14 bg-white/5 border-white/10 focus-visible:ring-emerald-500/50 hover:bg-white/10 transition-all text-base rounded-xl px-5"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2.5">
                        <label className="text-sm font-medium text-foreground/90 ml-1">Email</label>
                        <Input
                          name="user_email"
                          type="email"
                          required
                          className="h-14 bg-white/5 border-white/10 focus-visible:ring-emerald-500/50 hover:bg-white/10 transition-all text-base rounded-xl px-5"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <label className="text-sm font-medium text-foreground/90 ml-1">Message</label>
                      <Textarea
                        name="message"
                        required
                        rows={5}
                        className="min-h-[160px] bg-white/5 border-white/10 focus-visible:ring-emerald-500/50 hover:bg-white/10 transition-all resize-y text-base rounded-xl p-5"
                        placeholder="Tell me about your project, timeline, and goals..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSending}
                      className="w-full h-14 text-base font-semibold shadow-lg shadow-emerald-500/20 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-all duration-300 hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0"
                    >
                      {isSending ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending Message...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-5 h-5" />
                          Send Message
                        </span>
                      )}
                    </Button>

                    {status !== 'idle' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-xl text-sm font-medium border backdrop-blur-sm mt-4",
                          status === 'success'
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-red-500/10 text-red-400 border-red-500/20"
                        )}
                      >
                        {status === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                        <p>{statusMessage}</p>
                      </motion.div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

const ContactItem = ({ icon: Icon, label, value, href }: any) => (
  <div className="flex items-center gap-5 group">
    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <Icon className="w-6 h-6 relative z-10" />
    </div>
    <div>
      <p className="text-sm text-muted-foreground font-medium mb-1 group-hover:text-emerald-400/70 transition-colors">{label}</p>
      {href ? (
        <a href={href} className="text-lg font-semibold text-foreground hover:text-emerald-400 transition-colors line-clamp-1 break-all">{value}</a>
      ) : (
        <p className="text-lg font-semibold text-foreground">{value}</p>
      )}
    </div>
  </div>
);

const SocialLink = ({ href, icon: Icon, ariaLabel }: { href: string; icon: any, ariaLabel: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}
    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-emerald-500 hover:border-emerald-500 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(16,185,129,0.3)] transition-all duration-300"
  >
    <Icon className="w-5 h-5" />
  </a>
);

export default Contact;
