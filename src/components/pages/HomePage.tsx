// HPI 1.5-V
import { Link } from 'react-router-dom';
import { Video, Users, Calendar, Shield, Monitor, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Video,
    title: 'HD Video Quality',
    description: 'Crystal-clear video with adaptive streaming technology for optimal performance.'
  },
  {
    icon: Monitor,
    title: 'Screen Sharing',
    description: 'Share your screen seamlessly with advanced presentation controls.'
  },
  {
    icon: MessageSquare,
    title: 'Real-Time Chat',
    description: 'Integrated messaging for instant communication during meetings.'
  },
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'Schedule and manage meetings with intelligent calendar integration.'
  },
  {
    icon: Users,
    title: 'Participant Controls',
    description: 'Comprehensive host controls for managing attendees and permissions.'
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'End-to-end encryption ensuring your conversations remain confidential.'
  }
];

const MotionLink = motion(Link);

export default function HomePage() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  } as const;

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <main>
        {/* Hero Section */}
        <section className="w-full min-h-screen flex flex-col">
          <div className="w-full max-w-[120rem] mx-auto flex-grow grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col justify-center p-8 sm:p-12 md:p-16 lg:p-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl xl:text-9xl uppercase tracking-wide z-10 relative">
                  CONNECT
                  <br />
                  ANYWHERE
                </h1>
                <p className="font-paragraph text-lg lg:text-xl text-subtletext max-w-md mt-8 mb-12 leading-relaxed">
                  Experience seamless video conferencing with crystal-clear quality. Host meetings, collaborate in real-time, and connect with teams across the globe.
                </p>
                <Link to="/meetings">
                  <Button
                    className="bg-primary text-primary-foreground hover:bg-foreground/80 rounded-none px-10 py-7 text-base font-paragraph uppercase tracking-wider group"
                  >
                    Start a Meeting
                    <ArrowRight className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>
            </div>
            <div className="border-l border-gridline/20 p-8 sm:p-12 md:p-16 lg:p-24 flex items-center justify-center">
               <motion.div 
                className="w-full h-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
               >
                <img
                    src="https://static.wixstatic.com/media/b5d5a7_b160f1beded74c4193a1f610c0ac5568~mv2.png?originWidth=768&originHeight=768"
                    alt="Abstract representation of a modern, minimalist conference room with clean lines and a large screen."
                    width={800}
                    height={800}
                    className="w-full h-full object-contain"
                />
               </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full bg-primary text-primary-foreground py-24 lg:py-40">
          <div className="max-w-[120rem] mx-auto px-8 sm:px-12 md:px-16 lg:px-24">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={itemVariants}
            >
              <h2 className="font-heading text-5xl lg:text-7xl uppercase tracking-wide">
                Engineered for Clarity
              </h2>
              <p className="font-paragraph text-lg lg:text-xl text-primary-foreground/70 mt-6 leading-relaxed">
                Our platform is built on a foundation of powerful features designed to make your virtual interactions as seamless and productive as real-life ones.
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gridline"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="bg-primary p-10 lg:p-12"
                  variants={itemVariants}
                >
                  <feature.icon className="w-10 h-10 mb-8 text-primary-foreground" strokeWidth={1} />
                  <h3 className="font-heading text-2xl uppercase mb-4 tracking-wider">
                    {feature.title}
                  </h3>
                  <p className="font-paragraph text-base text-primary-foreground/60 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Showcase Section */}
        <section className="w-full bg-background py-24 lg:py-40 overflow-clip">
            <div className="max-w-[120rem] mx-auto px-8 sm:px-12 md:px-16 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div 
                  className="lg:pr-12"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={itemVariants}
                >
                    <h2 className="font-heading text-5xl lg:text-7xl uppercase tracking-wide">
                        Collaborate
                        <br />
                        Without Limits
                    </h2>
                    <p className="font-paragraph text-lg lg:text-xl text-subtletext mt-8 mb-10 leading-relaxed">
                        Share your ideas, present your work, and brainstorm with your team in a high-fidelity environment. Our screen sharing is optimized for clarity and speed, ensuring your presentations are impactful and your collaborations are productive.
                    </p>
                    <Link to="/meetings">
                        <Button
                            variant="outline"
                            className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground rounded-none px-10 py-7 text-base font-paragraph uppercase tracking-wider group"
                        >
                            Present Your Work
                            <ArrowRight className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </motion.div>
                <motion.div 
                  className="w-full h-[60vh] lg:h-[80vh]"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <img
                        src="https://static.wixstatic.com/media/b5d5a7_9b7dbf37dbd947c4bda24df18ff41a31~mv2.png?originWidth=960&originHeight=768"
                        alt="A clean and modern user interface for a video conferencing application, showing participants and screen sharing controls."
                        width={1000}
                        height={800}
                        className="w-full h-full object-cover object-left"
                        style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)' }}
                    />
                </motion.div>
            </div>
        </section>

        {/* Testimonial Section */}
        <section className="w-full bg-background py-24 lg:py-32">
            <div className="max-w-[120rem] mx-auto px-8 sm:px-12 md:px-16 lg:px-24">
                <motion.div 
                  className="text-center max-w-4xl mx-auto"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={itemVariants}
                >
                    <p className="font-heading text-3xl md:text-4xl lg:text-5xl leading-tight tracking-wide">
                        "This platform has transformed our remote workflow. The quality and reliability are unmatched, making it an indispensable tool for our global team."
                    </p>
                    <p className="font-paragraph text-lg uppercase tracking-widest mt-12">
                        Alex Johnson
                    </p>
                    <p className="font-paragraph text-base text-subtletext mt-1">
                        CEO, Innovatech
                    </p>
                </motion.div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="w-full bg-primary text-primary-foreground py-24 lg:py-32">
          <div className="max-w-[100rem] mx-auto px-8 lg:px-16 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={itemVariants}
            >
              <h2 className="font-heading text-5xl lg:text-7xl uppercase mb-8 tracking-wide">
                Ready to Connect?
              </h2>
              <p className="font-paragraph text-lg lg:text-xl mb-12 max-w-3xl mx-auto text-primary-foreground/70">
                Join thousands of professionals who trust our platform for their daily communications. Start your first meeting in seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <MotionLink 
                  to="/meetings"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button className="bg-background text-foreground hover:bg-background/80 rounded-none px-10 py-7 text-base font-paragraph uppercase tracking-wider w-full sm:w-auto">
                    New Meeting
                  </Button>
                </MotionLink>
                <MotionLink 
                  to="/schedule"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button variant="outline" className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground hover:text-primary rounded-none px-10 py-7 text-base font-paragraph uppercase tracking-wider w-full sm:w-auto">
                    Schedule for Later
                  </Button>
                </MotionLink>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}