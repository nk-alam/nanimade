"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye, Users, Mail, Phone } from "lucide-react"

const sections = [
  {
    id: "information-collection",
    title: "Information We Collect",
    icon: Users,
    content: [
      {
        subtitle: "Personal Information",
        text: "When you create an account, place an order, or contact us, we may collect personal information such as your name, email address, phone number, billing and shipping addresses, and payment information."
      },
      {
        subtitle: "Usage Information",
        text: "We automatically collect information about how you interact with our website, including your IP address, browser type, device information, pages visited, and the time and date of your visits."
      },
      {
        subtitle: "Cookies and Tracking",
        text: "We use cookies and similar technologies to enhance your browsing experience, remember your preferences, and analyze website traffic. You can control cookie settings through your browser."
      }
    ]
  },
  {
    id: "information-use",
    title: "How We Use Your Information",
    icon: Eye,
    content: [
      {
        subtitle: "Order Processing",
        text: "We use your personal information to process and fulfill your orders, communicate about your purchases, and provide customer support."
      },
      {
        subtitle: "Service Improvement",
        text: "We analyze usage data to improve our website functionality, product offerings, and overall user experience."
      },
      {
        subtitle: "Marketing Communications",
        text: "With your consent, we may send you promotional emails about new products, special offers, and company updates. You can unsubscribe at any time."
      },
      {
        subtitle: "Legal Compliance",
        text: "We may use your information to comply with applicable laws, regulations, and legal processes."
      }
    ]
  },
  {
    id: "information-sharing",
    title: "Information Sharing and Disclosure",
    icon: Shield,
    content: [
      {
        subtitle: "Service Providers",
        text: "We share information with trusted third-party service providers who help us operate our business, such as payment processors, shipping companies, and customer service platforms."
      },
      {
        subtitle: "Business Transfers",
        text: "In the event of a merger, acquisition, or sale of our business, your information may be transferred to the acquiring entity."
      },
      {
        subtitle: "Legal Requirements",
        text: "We may disclose your information if required by law, court order, or government regulation, or if we believe disclosure is necessary to protect our rights or prevent harm."
      },
      {
        subtitle: "Never Sold",
        text: "We never sell, rent, or trade your personal information to third parties for their marketing purposes."
      }
    ]
  },
  {
    id: "data-security",
    title: "Data Security",
    icon: Lock,
    content: [
      {
        subtitle: "Security Measures",
        text: "We implement industry-standard security measures to protect your personal information, including encryption, secure servers, and regular security audits."
      },
      {
        subtitle: "Payment Security",
        text: "All payment transactions are processed through secure, PCI-compliant payment gateways. We do not store your credit card information on our servers."
      },
      {
        subtitle: "Data Breach Response",
        text: "In the unlikely event of a data breach, we will notify affected users and relevant authorities as required by law and take immediate steps to secure our systems."
      }
    ]
  },
  {
    id: "your-rights",
    title: "Your Rights and Choices",
    icon: Users,
    content: [
      {
        subtitle: "Access and Correction",
        text: "You have the right to access, update, or correct your personal information. You can do this through your account settings or by contacting us directly."
      },
      {
        subtitle: "Data Deletion",
        text: "You can request the deletion of your personal information, subject to certain legal and business requirements. Some information may be retained for legitimate business purposes."
      },
      {
        subtitle: "Marketing Opt-out",
        text: "You can opt out of marketing communications at any time by clicking the unsubscribe link in our emails or updating your preferences in your account."
      },
      {
        subtitle: "Cookie Control",
        text: "You can control cookie preferences through your browser settings. Note that disabling certain cookies may affect website functionality."
      }
    ]
  }
]

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="h-4 w-4 mr-2" />
              Privacy & Data Protection
            </span>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Privacy
              <span className="block text-blue-600">Policy</span>
            </h1>
            
            <p className="text-xl text-gray-700 leading-relaxed">
              Your privacy is important to us. This policy explains how we collect, 
              use, and protect your personal information when you use our services.
            </p>
            
            <div className="mt-8 text-sm text-gray-600">
              <p>Last updated: January 2024</p>
              <p>Effective date: January 1, 2024</p>
            </div>
          </motion.div>

          {/* Quick Overview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <Shield className="h-6 w-6 text-blue-600 mr-2" />
                  Your Privacy at a Glance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Lock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">Secure Data</h3>
                    <p className="text-sm text-gray-600">
                      All data is encrypted and stored securely using industry best practices.
                    </p>
                  </div>
                  <div className="text-center">
                    <Eye className="h-8 w-8 text-green-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">Transparent Use</h3>
                    <p className="text-sm text-gray-600">
                      We clearly explain how and why we use your personal information.
                    </p>
                  </div>
                  <div className="text-center">
                    <Users className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">Your Control</h3>
                    <p className="text-sm text-gray-600">
                      You have full control over your data and can modify or delete it anytime.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Policy Sections */}
          <div className="max-w-4xl mx-auto space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                      <section.icon className="h-6 w-6 text-orange-600 mr-3" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {item.subtitle}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Additional Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                    <Mail className="h-6 w-6 text-orange-600 mr-3" />
                    Contact Us About Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      If you have any questions about this Privacy Policy, your data rights, 
                      or our data practices, please don't hesitate to contact us:
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <Mail className="h-4 w-4 text-blue-600 mr-2" />
                          Email Us
                        </h4>
                        <p className="text-gray-600">privacy@nanimade.com</p>
                        <p className="text-gray-600">support@nanimade.com</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <Phone className="h-4 w-4 text-green-600 mr-2" />
                          Call Us
                        </h4>
                        <p className="text-gray-600">+91 98765 43210</p>
                        <p className="text-gray-600">Mon-Sat, 9 AM - 6 PM IST</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg mt-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Data Protection Officer</h4>
                      <p className="text-gray-600 text-sm">
                        For specific privacy concerns or data protection inquiries, 
                        you can reach our Data Protection Officer at dpo@nanimade.com
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Policy Updates */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Updates to This Policy
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    We may update this Privacy Policy from time to time to reflect changes in our 
                    practices or applicable laws. We will notify you of any material changes by 
                    posting the updated policy on our website and sending you an email notification. 
                    Your continued use of our services after such changes constitutes acceptance 
                    of the updated policy.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}