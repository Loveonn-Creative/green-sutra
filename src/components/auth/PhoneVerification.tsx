import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Smartphone, ArrowRight, Clock, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

interface PhoneVerificationProps {
  onVerificationComplete: (phone: string) => void;
  onBack?: () => void;
}

const PhoneVerification: React.FC<PhoneVerificationProps> = ({
  onVerificationComplete,
  onBack
}) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [demoOtp, setDemoOtp] = useState('');
  const isMobile = useIsMobile();

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Limit to 10 digits
    const limited = digits.slice(0, 10);
    
    // Format as XXX-XXX-XXXX
    if (limited.length >= 6) {
      return `${limited.slice(0, 3)}-${limited.slice(3, 6)}-${limited.slice(6)}`;
    } else if (limited.length >= 3) {
      return `${limited.slice(0, 3)}-${limited.slice(3)}`;
    }
    
    return limited;
  };

  const startCountdown = () => {
    setCountdown(30);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const sendOTP = async () => {
    if (!phone || phone.replace(/\D/g, '').length !== 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-otp', {
        body: { phone: phone.replace(/\D/g, '') }
      });

      if (error) throw error;

      // Store demo OTP for development
      if (data.otp) {
        setDemoOtp(data.otp);
      }

      toast.success('OTP sent successfully!');
      setStep('otp');
      startCountdown();
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error('Failed to send OTP. Please try again.');
    }
    setLoading(false);
  };

  const verifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter the complete 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('verify-otp', {
        body: { 
          phone: phone.replace(/\D/g, ''), 
          otp_code: otp 
        }
      });

      if (error) throw error;

      toast.success('Phone verified successfully!');
      onVerificationComplete(phone.replace(/\D/g, ''));
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('Invalid OTP. Please try again.');
      setOtp('');
    }
    setLoading(false);
  };

  const resendOTP = () => {
    if (countdown > 0) return;
    setOtp('');
    sendOTP();
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-card/40 backdrop-blur-xl border-primary/20">
      <CardHeader className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
          <Smartphone className="w-8 h-8 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl">
          {step === 'phone' ? 'Verify Your Phone' : 'Enter OTP'}
        </CardTitle>
        <CardDescription className="text-base">
          {step === 'phone' 
            ? 'We\'ll send you a verification code to secure your account'
            : `We've sent a 6-digit code to ${phone}`
          }
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {step === 'phone' ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-base font-medium">
                Phone Number
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  +91
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="XXX-XXX-XXXX"
                  value={phone}
                  onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                  className={`pl-12 h-12 text-lg ${isMobile ? 'text-base' : ''}`}
                  maxLength={12}
                />
              </div>
            </div>

            <Button 
              onClick={sendOTP}
              disabled={loading || !phone || phone.replace(/\D/g, '').length !== 10}
              className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent text-primary-foreground"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send OTP
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </>
        ) : (
          <>
            {/* Demo OTP Display */}
            {demoOtp && (
              <div className="p-4 bg-muted/50 rounded-lg border border-warning/20">
                <p className="text-sm text-muted-foreground text-center">
                  <strong>Demo OTP:</strong> {demoOtp}
                </p>
                <p className="text-xs text-muted-foreground text-center mt-1">
                  (In production, this will be sent via SMS)
                </p>
              </div>
            )}

            <div className="space-y-4">
              <Label className="text-base font-medium block text-center">
                Enter 6-digit verification code
              </Label>
              
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={setOtp}
                  className="gap-2"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="w-12 h-12 text-lg" />
                    <InputOTPSlot index={1} className="w-12 h-12 text-lg" />
                    <InputOTPSlot index={2} className="w-12 h-12 text-lg" />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={3} className="w-12 h-12 text-lg" />
                    <InputOTPSlot index={4} className="w-12 h-12 text-lg" />
                    <InputOTPSlot index={5} className="w-12 h-12 text-lg" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            <Button 
              onClick={verifyOTP}
              disabled={loading || otp.length !== 6}
              className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent text-primary-foreground"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify OTP'
              )}
            </Button>

            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Didn't receive the code?
              </p>
              <Button
                variant="ghost"
                onClick={resendOTP}
                disabled={countdown > 0 || loading}
                className="text-primary hover:text-primary-glow"
              >
                {countdown > 0 ? (
                  <>
                    <Clock className="w-4 h-4 mr-2" />
                    Resend in {countdown}s
                  </>
                ) : (
                  'Resend OTP'
                )}
              </Button>
            </div>

            <Button
              variant="outline"
              onClick={() => setStep('phone')}
              className="w-full"
            >
              Change Phone Number
            </Button>
          </>
        )}

        {onBack && (
          <Button
            variant="ghost"
            onClick={onBack}
            className="w-full text-muted-foreground"
          >
            Back to Login
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PhoneVerification;