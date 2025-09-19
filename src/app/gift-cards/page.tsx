"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { Gift, Calendar, IndianRupee, Mail, User, MessageCircle } from "lucide-react"

export default function GiftCardsPage() {
  const [amount, setAmount] = useState("")
  const [recipientName, setRecipientName] = useState("")
  const [recipientEmail, setRecipientEmail] = useState("")
  const [senderName, setSenderName] = useState("")
  const [message, setMessage] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("")

  const presetAmounts = [500, 1000, 1500, 2000, 2500, 5000]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, this would connect to your payment system
    alert("Gift card purchase initiated! In a real implementation, this would connect to your payment system.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <Gift className="mr-3 text-orange-600" />
              Gift Cards
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Share the taste of authentic Malda pickles with your loved ones
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Gift Card Preview */}
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Preview Your Gift</h2>
              <div className="relative flex-1">
                <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl p-8 h-full flex flex-col justify-between shadow-2xl">
                  <div>
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <h3 className="text-white text-2xl font-bold">NaniMade</h3>
                        <p className="text-orange-100">Authentic Pickles</p>
                      </div>
                      <Gift className="text-white h-8 w-8" />
                    </div>
                    <div className="mb-8">
                      <p className="text-orange-100 mb-2">Gift Card Value</p>
                      <p className="text-white text-4xl font-bold">
                        {amount ? `₹${amount}` : "₹0"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="border-t border-orange-300 pt-4">
                      <p className="text-orange-100 text-sm mb-1">From</p>
                      <p className="text-white font-medium">
                        {senderName || "Your Name"}
                      </p>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-orange-200 text-xs">
                        This gift card can be used for any products on nanimade.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gift Card Form */}
            <div>
              <Card className="overflow-hidden h-full">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <Gift className="mr-2 h-6 w-6" />
                    Create Your Gift Card
                  </CardTitle>
                  <p className="text-orange-100">Spread the joy of authentic flavors</p>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Amount Selection */}
                    <div>
                      <label className="text-base font-semibold text-gray-900 mb-3 block">
                        Gift Amount
                      </label>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        {presetAmounts.map((preset) => (
                          <Button
                            key={preset}
                            type="button"
                            variant={amount === preset.toString() ? "default" : "outline"}
                            onClick={() => setAmount(preset.toString())}
                            className={amount === preset.toString() 
                              ? "bg-orange-600 hover:bg-orange-700" 
                              : ""
                            }
                          >
                            ₹{preset}
                          </Button>
                        ))}
                      </div>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          type="number"
                          placeholder="Or enter custom amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="pl-10"
                          min="100"
                        />
                      </div>
                    </div>

                    {/* Recipient Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="recipientName" className="text-base font-semibold text-gray-900">
                          Recipient's Name
                        </label>
                        <div className="relative mt-2">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <Input
                            id="recipientName"
                            placeholder="Enter name"
                            value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="recipientEmail" className="text-base font-semibold text-gray-900">
                          Recipient's Email
                        </label>
                        <div className="relative mt-2">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <Input
                            id="recipientEmail"
                            type="email"
                            placeholder="Enter email"
                            value={recipientEmail}
                            onChange={(e) => setRecipientEmail(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Sender Information */}
                    <div>
                      <label htmlFor="senderName" className="text-base font-semibold text-gray-900">
                        Your Name (Sender)
                      </label>
                      <div className="relative mt-2">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="senderName"
                          placeholder="Enter your name"
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {/* Personal Message */}
                    <div>
                      <label htmlFor="message" className="text-base font-semibold text-gray-900">
                        Personal Message
                      </label>
                      <div className="relative mt-2">
                        <MessageCircle className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Textarea
                          id="message"
                          placeholder="Add a personal message (optional)"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="pl-10"
                          rows={3}
                        />
                      </div>
                    </div>

                    {/* Delivery Date */}
                    <div>
                      <label htmlFor="deliveryDate" className="text-base font-semibold text-gray-900">
                        Delivery Date
                      </label>
                      <div className="relative mt-2">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="deliveryDate"
                          type="date"
                          value={deliveryDate}
                          onChange={(e) => setDeliveryDate(e.target.value)}
                          className="pl-10"
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Leave blank for immediate delivery
                      </p>
                    </div>

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-lg py-6"
                      disabled={!amount || !recipientName || !recipientEmail || !senderName}
                    >
                      Purchase Gift Card - ₹{amount || 0}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Gift Card Benefits */}
              <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                <h3 className="font-bold text-lg text-amber-800 mb-4">Gift Card Benefits</h3>
                <ul className="space-y-2 text-amber-700">
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">✓</span>
                    <span>Can be used for any product on our website</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">✓</span>
                    <span>No expiration date</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">✓</span>
                    <span>Can be redeemed partially (balance remains on card)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">✓</span>
                    <span>Delivered instantly via email</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">✓</span>
                    <span>Perfect for birthdays, festivals, and special occasions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}