import crypto from 'crypto';
import { encryptData, decryptData } from './encryption';

const TILL_API_KEY = process.env.TILL_API_KEY || '';
const TILL_SECRET = process.env.TILL_SECRET || '';
const TILL_API_URL = process.env.TILL_API_URL || 'https://api.till.com';
const TILL_NUMBER = process.env.TILL_NUMBER || '';

export interface TillCheckoutRequest {
  amount: number;
  phoneNumber: string;
  description?: string;
  referenceId: string;
  callbackUrl: string;
}

export interface TillCheckoutResponse {
  success: boolean;
  checkoutRequestId?: string;
  qrCode?: string;
  error?: string;
}

export interface TillCallbackPayload {
  checkoutRequestId: string;
  resultCode: number;
  resultDescription: string;
  mpesaReceiptNumber?: string;
  mpesaTransactionCode?: string;
  amount?: number;
  timestamp: string;
  signature: string;
}

// Initialize Till checkout
export const initiateTillCheckout = async (
  request: TillCheckoutRequest
): Promise<TillCheckoutResponse> => {
  try {
    const payload = {
      amount: request.amount,
      phoneNumber: request.phoneNumber,
      till_number: TILL_NUMBER,
      description: request.description || 'NAPOWA Donation',
      reference_id: request.referenceId,
      callback_url: request.callbackUrl,
      timestamp: new Date().toISOString(),
    };

    // Create signature
    const signature = createTillSignature(payload);

    const response = await fetch(`${TILL_API_URL}/v1/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TILL_API_KEY}`,
        'X-Signature': signature,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('[v0] Till checkout error:', error);
      return {
        success: false,
        error: error.message || 'Till checkout failed',
      };
    }

    const data = await response.json();

    return {
      success: true,
      checkoutRequestId: data.checkoutRequestId,
      qrCode: data.qrCode,
    };
  } catch (error) {
    console.error('[v0] Till API error:', error);
    return {
      success: false,
      error: 'Failed to initiate checkout',
    };
  }
};

// Create Till API signature
export const createTillSignature = (payload: any): string => {
  const payloadString = JSON.stringify(payload);
  const signature = crypto
    .createHmac('sha256', TILL_SECRET)
    .update(payloadString)
    .digest('hex');

  return signature;
};

// Verify Till callback signature
export const verifyTillSignature = (payload: TillCallbackPayload, signature: string): boolean => {
  const payloadForSignature = {
    checkoutRequestId: payload.checkoutRequestId,
    resultCode: payload.resultCode,
    resultDescription: payload.resultDescription,
    mpesaReceiptNumber: payload.mpesaReceiptNumber || '',
    mpesaTransactionCode: payload.mpesaTransactionCode || '',
    amount: payload.amount || 0,
    timestamp: payload.timestamp,
  };

  const expectedSignature = createTillSignature(payloadForSignature);
  return expectedSignature === signature;
};

// Check checkout status
export const checkTillCheckoutStatus = async (
  checkoutRequestId: string
): Promise<{ status: string; resultCode?: number; mpesaReceiptNumber?: string }> => {
  try {
    const response = await fetch(`${TILL_API_URL}/v1/checkout/${checkoutRequestId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${TILL_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to check status');
    }

    const data = await response.json();

    return {
      status: data.status,
      resultCode: data.resultCode,
      mpesaReceiptNumber: data.mpesaReceiptNumber,
    };
  } catch (error) {
    console.error('[v0] Till status check error:', error);
    return {
      status: 'error',
    };
  }
};

// Encrypt payment data for storage
export const encryptPaymentData = (data: any): string => {
  return encryptData(JSON.stringify(data));
};

// Decrypt payment data from storage
export const decryptPaymentData = (encryptedData: string): any => {
  try {
    const decrypted = decryptData(encryptedData);
    return JSON.parse(decrypted);
  } catch (error) {
    console.error('[v0] Payment data decryption error:', error);
    return null;
  }
};

// Generate QR code data for Till payment
export const generateTillQRData = (
  amount: number,
  referenceId: string,
  description: string
): string => {
  const qrPayload = {
    till: TILL_NUMBER,
    amount,
    reference: referenceId,
    description,
    timestamp: new Date().toISOString(),
  };

  return JSON.stringify(qrPayload);
};
