'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function QRDonationForm() {
  const [amount, setAmount] = useState('500');
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [donationId, setDonationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);

  const generateQRCode = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/donations/qr-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseInt(amount),
          currency: 'KES',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate QR code');
      }

      const data = await response.json();
      setQrCode(data.donation.qrCodeUrl);
      setDonationId(data.donation.id);
      setExpiresAt(new Date(data.donation.qrCodeExpiry));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrCode) return;

    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `NAPOWA-Donation-${donationId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Donate via QR Code</CardTitle>
        <CardDescription>Generate a QR code for quick MPesa donations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!qrCode ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Amount (KES)</label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="100"
                max="1000000"
                placeholder="500"
              />
              <p className="text-xs text-gray-500 mt-1">Min: 100 KES, Max: 1,000,000 KES</p>
            </div>

            <div className="flex gap-2">
              <Button onClick={generateQRCode} disabled={loading} className="flex-1">
                {loading ? 'Generating...' : 'Generate QR Code'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
              <img
                src={qrCode}
                alt="Donation QR Code"
                className="w-64 h-64 object-cover"
              />
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <strong>Amount:</strong> KES {parseInt(amount).toLocaleString('en-KE')}
              </p>
              <p>
                <strong>Expires:</strong>{' '}
                {expiresAt?.toLocaleTimeString('en-KE', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              <p className="text-xs text-gray-500">Scan with your phone camera or MPesa app</p>
            </div>

            <div className="flex gap-2">
              <Button onClick={downloadQRCode} variant="outline" className="flex-1">
                Download QR Code
              </Button>
              <Button
                onClick={() => {
                  setQrCode(null);
                  setDonationId(null);
                  setExpiresAt(null);
                }}
                variant="outline"
                className="flex-1"
              >
                Generate New
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
