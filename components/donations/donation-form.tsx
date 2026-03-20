'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function DonationForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    paymentMethod: 'mpesa',
    donorName: '',
    donorEmail: '',
    donorPhone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Validate required fields
      if (!formData.amount) {
        throw new Error('Amount is required');
      }
      if (!anonymous && !formData.donorEmail) {
        throw new Error('Email is required for non-anonymous donations');
      }
      if (!formData.donorPhone) {
        throw new Error('Phone number is required');
      }

      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount),
          anonymous,
          donorName: anonymous ? null : formData.donorName,
          donorEmail: anonymous ? null : formData.donorEmail,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to process donation');
      }

      const data = await response.json();

      // Redirect to payment
      if (formData.paymentMethod === 'mpesa') {
        window.location.href = `/donations/pay?id=${data.donation.id}`;
      } else {
        setSuccess(true);
        setFormData({
          amount: '',
          paymentMethod: 'mpesa',
          donorName: '',
          donorEmail: '',
          donorPhone: '',
          message: '',
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Make a Donation</CardTitle>
        <CardDescription>Support NAPOWA with your contribution</CardDescription>
      </CardHeader>
      <CardContent>
        {success && (
          <Alert className="mb-4 bg-green-50 border-green-200">
            <AlertDescription className="text-green-700">
              Donation received! You will receive a confirmation email shortly.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Amount */}
          <div>
            <Label htmlFor="amount">Donation Amount (KES)</Label>
            <Input
              id="amount"
              type="number"
              min="100"
              max="1000000"
              step="100"
              required
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="500"
              className="mt-2"
            />
            <p className="text-xs text-gray-500 mt-1">Minimum: 100 KES, Maximum: 1,000,000 KES</p>
          </div>

          {/* Payment Method */}
          <div>
            <Label htmlFor="method">Payment Method</Label>
            <Select value={formData.paymentMethod} onValueChange={(value) =>
              setFormData({ ...formData, paymentMethod: value })
            }>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mpesa">M-Pesa (STK Push)</SelectItem>
                <SelectItem value="card">Credit/Debit Card</SelectItem>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Anonymous Donation */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="anonymous"
              checked={anonymous}
              onCheckedChange={(checked) => setAnonymous(!!checked)}
            />
            <Label htmlFor="anonymous" className="cursor-pointer">
              Make this donation anonymous
            </Label>
          </div>

          {/* Donor Information */}
          {!anonymous && (
            <>
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  required
                  value={formData.donorName}
                  onChange={(e) =>
                    setFormData({ ...formData, donorName: e.target.value })
                  }
                  placeholder="John Doe"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.donorEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, donorEmail: e.target.value })
                  }
                  placeholder="john@example.com"
                  className="mt-2"
                />
              </div>
            </>
          )}

          {/* Phone Number */}
          <div>
            <Label htmlFor="phone">Phone Number (254XXXXXXXXX)</Label>
            <Input
              id="phone"
              required
              value={formData.donorPhone}
              onChange={(e) =>
                setFormData({ ...formData, donorPhone: e.target.value })
              }
              placeholder="254712345678"
              className="mt-2"
            />
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Share why this cause matters to you..."
              maxLength={500}
              className="mt-2"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.message.length}/500 characters
            </p>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Processing...' : `Donate KES ${formData.amount || '0'}`}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Your donation is secure and encrypted. No payment info is stored.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
