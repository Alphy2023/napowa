'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QRDonationForm } from '@/components/donations/qr-donation-form';
import { DonationForm } from '@/components/donations/donation-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DonationsPage() {
  const [activeTab, setActiveTab] = useState('qr');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-slate-900">Support NAPOWA</h1>
          <p className="text-xl text-slate-600">
            Your generous donations help us make a difference in our community
          </p>
        </div>

        {/* Donation Methods */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="qr">QR Code</TabsTrigger>
            <TabsTrigger value="form">Direct Form</TabsTrigger>
            <TabsTrigger value="info">More Info</TabsTrigger>
          </TabsList>

          <TabsContent value="qr" className="mt-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <QRDonationForm />
              <Card>
                <CardHeader>
                  <CardTitle>Quick Donation</CardTitle>
                  <CardDescription>
                    Generate a QR code for instant MPesa donations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">How it works:</h3>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                      <li>Select your donation amount</li>
                      <li>Click "Generate QR Code"</li>
                      <li>Scan with your phone camera</li>
                      <li>Complete payment on MPesa</li>
                      <li>Confirmation email within minutes</li>
                    </ol>
                  </div>
                  <div className="bg-blue-50 p-3 rounded text-sm text-blue-700">
                    This method is fastest and most secure. QR codes expire after 15 minutes.
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="form" className="mt-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <DonationForm />
              <Card>
                <CardHeader>
                  <CardTitle>Direct Donation Form</CardTitle>
                  <CardDescription>
                    Submit donation details manually
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Supported Methods:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      <li>M-Pesa (STK Push)</li>
                      <li>Credit/Debit Card</li>
                      <li>Bank Transfer</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-3 rounded text-sm text-green-700">
                    All transactions are secure and encrypted. Your data is never stored.
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="info" className="mt-8">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Why Donate?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-gray-600">
                  <p>
                    Your donations directly support our mission to empower communities and
                    create positive change. Every contribution makes a tangible difference.
                  </p>
                  <p>
                    We are transparent about how funds are used and provide regular impact
                    reports to our donors.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tax Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-gray-600">
                  <p>
                    NAPOWA is a registered NGO. Donations may be tax-deductible depending on
                    your jurisdiction.
                  </p>
                  <p>
                    You will receive a donation receipt via email for all contributions above
                    KES 1,000.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-gray-600">
                  <p>
                    All transactions are encrypted and processed securely through certified
                    payment gateways.
                  </p>
                  <p>
                    Your personal information is never shared with third parties and is
                    protected by industry-standard security measures.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Impact Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-gray-600">
                  <div>
                    <strong>Total Raised:</strong> KES 2,500,000+
                  </div>
                  <div>
                    <strong>Active Donors:</strong> 450+
                  </div>
                  <div>
                    <strong>Communities Served:</strong> 15
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Trust Indicators */}
        <Card className="bg-slate-50">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">256-bit</div>
                <div className="text-xs text-gray-600">SSL Encryption</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">24/7</div>
                <div className="text-xs text-gray-600">Support Available</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">100%</div>
                <div className="text-xs text-gray-600">Secure Payments</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">ISO</div>
                <div className="text-xs text-gray-600">Certified</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
