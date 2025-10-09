import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Server,
  Network,
  Code2,
  BarChart3,
  Shield,
  Workflow,
  CheckCircle2,
  ArrowRight,
  Menu,
  X,
  Linkedin
} from 'lucide-react'

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('submitting')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormStatus('success')
        setFormData({ name: '', email: '', company: '', message: '' })
        setTimeout(() => setFormStatus('idle'), 3000)
      } else {
        setFormStatus('error')
        setTimeout(() => setFormStatus('idle'), 3000)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setFormStatus('error')
      setTimeout(() => setFormStatus('idle'), 3000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-bold">
              <span className="text-white">DC</span>
              <span className="text-[#0047AB]"> Infrastructures</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('home')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('why-us')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Why Choose Us
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Contact
              </button>
              <Button
                onClick={() => scrollToSection('contact')}
                className="bg-[#0047AB] hover:bg-[#0056d6]"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-4 border-t border-white/10">
              <button
                onClick={() => scrollToSection('home')}
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('why-us')}
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Why Choose Us
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Contact
              </button>
              <Button
                onClick={() => scrollToSection('contact')}
                className="w-full bg-[#0047AB] hover:bg-[#0056d6]"
              >
                Get Started
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="section-padding pt-32 md:pt-40">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="gradient-text">
                Empowering<br />Organizations
              </span>
              <br />
              <span className="text-white">Through Modern Infrastructure</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              Transform your technology infrastructure into a strategic asset with comprehensive assessment,
              thoughtful design, and expert implementation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                onClick={() => scrollToSection('contact')}
                className="bg-[#0047AB] hover:bg-[#0056d6] text-lg"
              >
                Start Your Journey
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('services')}
                className="border-[#0047AB] text-[#0047AB] hover:bg-[#0047AB]/10 text-lg"
              >
                Explore Services
              </Button>
            </div>
          </div>

          {/* Feature Icons Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-20">
            {[
              { icon: Server, label: 'Infrastructure' },
              { icon: Network, label: 'Networking' },
              { icon: Code2, label: 'Automation' },
              { icon: Workflow, label: 'GitOps' },
              { icon: BarChart3, label: 'Monitoring' },
              { icon: Shield, label: 'Security' }
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-3 p-6 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-all border border-white/10 hover:border-[#0047AB]/50"
              >
                <item.icon size={32} className="text-[#0047AB]" />
                <span className="text-sm text-gray-300">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Comprehensive <span className="gradient-text">Infrastructure Solutions</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We partner with organizations to transform their technology infrastructure into a strategic asset
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Infrastructure Automation */}
            <div className="group p-8 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-[#0047AB]/50 transition-all">
              <div className="w-12 h-12 rounded-lg bg-[#0047AB]/20 flex items-center justify-center mb-4 group-hover:bg-[#0047AB]/30 transition-colors">
                <Workflow className="text-[#0047AB]" size={24} />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Infrastructure Automation</h3>
              <p className="text-gray-400 leading-relaxed">
                Eliminate repetitive tasks and reduce human error through comprehensive configuration management
                and operational workflows. Free your team to focus on innovation rather than maintenance.
              </p>
            </div>

            {/* Network Architecture */}
            <div className="group p-8 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-[#0047AB]/50 transition-all">
              <div className="w-12 h-12 rounded-lg bg-[#0047AB]/20 flex items-center justify-center mb-4 group-hover:bg-[#0047AB]/30 transition-colors">
                <Network className="text-[#0047AB]" size={24} />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Network Architecture</h3>
              <p className="text-gray-400 leading-relaxed">
                Build robust and secure infrastructure with carefully architected routing, switching, and security
                protocols that protect your assets while maintaining peak performance.
              </p>
            </div>

            {/* Infrastructure as Code */}
            <div className="group p-8 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-[#0047AB]/50 transition-all">
              <div className="w-12 h-12 rounded-lg bg-[#0047AB]/20 flex items-center justify-center mb-4 group-hover:bg-[#0047AB]/30 transition-colors">
                <Code2 className="text-[#0047AB]" size={24} />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Infrastructure as Code</h3>
              <p className="text-gray-400 leading-relaxed">
                Leverage Kubernetes orchestration and GitOps methodologies to make your infrastructure reproducible,
                version-controlled, and easily manageable across all environments.
              </p>
            </div>

            {/* Monitoring & Visualization */}
            <div className="group p-8 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-[#0047AB]/50 transition-all">
              <div className="w-12 h-12 rounded-lg bg-[#0047AB]/20 flex items-center justify-center mb-4 group-hover:bg-[#0047AB]/30 transition-colors">
                <BarChart3 className="text-[#0047AB]" size={24} />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Monitoring & Visualization</h3>
              <p className="text-gray-400 leading-relaxed">
                Gain comprehensive insights with monitoring and visualization solutions that enable informed
                decision-making and maintain operational excellence across your infrastructure.
              </p>
            </div>
          </div>

          {/* Additional Description */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="p-8 rounded-xl bg-gradient-to-r from-[#0047AB]/10 to-transparent border border-[#0047AB]/20">
              <h3 className="text-2xl font-semibold mb-4">End-to-End Solutions</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                We don't just implement technology—we develop custom tools tailored to your specific challenges
                and transfer knowledge to ensure your team can confidently manage and evolve your infrastructure.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Whether you're migrating to cloud-native architectures, automating legacy systems, or building
                greenfield infrastructure, we bring the expertise and pragmatism needed to deliver results that
                stand the test of time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why <span className="gradient-text">Choose Us</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our commitment to sustainable solutions and practical expertise sets us apart
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Deep Technical Expertise',
                description: 'Our team brings years of hands-on experience across the full spectrum of infrastructure modernization, from legacy system automation to cutting-edge cloud-native solutions.'
              },
              {
                title: 'Business-Focused Approach',
                description: 'We combine technical excellence with practical understanding of business needs, ensuring every solution delivers measurable value and aligns with your strategic goals.'
              },
              {
                title: 'Sustainable Solutions',
                description: 'We build infrastructure that scales with your growth and stands the test of time, with comprehensive knowledge transfer to empower your team.'
              },
              {
                title: 'Custom Tool Development',
                description: 'Beyond standard implementations, we develop bespoke tools tailored to your unique challenges, providing competitive advantages specific to your needs.'
              },
              {
                title: 'Knowledge Transfer',
                description: 'We ensure your team can confidently manage and evolve your infrastructure through comprehensive documentation and hands-on training.'
              },
              {
                title: 'Proven Methodologies',
                description: 'Leveraging industry best practices including GitOps, Infrastructure as Code, and modern DevOps workflows to ensure reliability and repeatability.'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#0047AB]/50 transition-all"
              >
                <CheckCircle2 className="text-[#0047AB] mb-4" size={28} />
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Let's <span className="gradient-text">Get Started</span>
              </h2>
              <p className="text-xl text-gray-400">
                Ready to transform your infrastructure? Reach out to discuss your needs.
              </p>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">
                      Name <span className="text-[#0047AB]">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="bg-black/[0.35] border-white/20 focus:border-[#0047AB]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email <span className="text-[#0047AB]">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className="bg-black/[0.35] border-white/20 focus:border-[#0047AB]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-white">
                    Company
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Company Name"
                    className="bg-black/[0.35] border-white/20 focus:border-[#0047AB]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">
                    Message <span className="text-[#0047AB]">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your infrastructure needs..."
                    className="bg-black/[0.35] border-white/20 focus:border-[#0047AB] min-h-[150px]"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-[#0047AB] hover:bg-[#0056d6] text-lg"
                >
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                  {formStatus === 'idle' && <ArrowRight className="ml-2" size={20} />}
                </Button>

                {formStatus === 'success' && (
                  <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center">
                    Message sent successfully! We'll get back to you soon.
                  </div>
                )}

                {formStatus === 'error' && (
                  <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center">
                    Failed to send message. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container-custom">
          <div className="text-center text-gray-400">
            <p className="mb-6">
              <span className="text-white font-semibold text-lg">DC Infrastructures, Inc.</span>
            </p>
            <div className="flex justify-center gap-6 mb-6">
              <a
                href="https://www.linkedin.com/company/dc-infrastructures-inc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-[#0047AB] transition-colors group"
                aria-label="Follow us on LinkedIn"
              >
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-[#0047AB]/20 transition-colors">
                  <Linkedin size={28} />
                </div>
                <span className="text-sm font-medium">Follow us on LinkedIn</span>
              </a>
            </div>
            <p className="text-sm">
              © {new Date().getFullYear()} DC Infrastructures, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
