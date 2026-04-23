import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loader2 } from "lucide-react";

import { resendCode, verifyCode } from "@/api/authApi";
import { setAccessToken } from "@/lib/authStorage";

const verifySchema = z.object({
  email: z.string().email(),
  code: z.string().regex(/^[0-9]{6}$/, "Code must be 6 digits"),
});

type VerifyForm = z.infer<typeof verifySchema>;

export default function VerifyCodePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialEmail = useMemo(
    () => searchParams.get("email") ?? "",
    [searchParams],
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSeconds, setResendSeconds] = useState(0);

  const form = useForm<VerifyForm>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      email: initialEmail,
      code: "",
    },
    mode: "onChange",
  });

  // Countdown timer for "Resend code"
  useEffect(() => {
    if (resendSeconds <= 0) return;
    const t = setInterval(() => setResendSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [resendSeconds]);

  const onSubmit = async (values: VerifyForm) => {
    try {
      setIsSubmitting(true);
      const res = await verifyCode(values);
      setAccessToken(res.access_token);
      toast.success("Email verified. Welcome!");
      navigate("/products");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Verification failed";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onResend = async () => {
    const email = form.getValues("email");
    if (!email) {
      toast.error("Email is required");
      return;
    }
    try {
      setResendLoading(true);
      const res = await resendCode({ email });
      toast.success(res.message || "Code resent");
      setResendSeconds(60);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Resend failed";
      toast.error(message);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Verify your code</CardTitle>
          <CardDescription>
            We sent a 6-digit code to your email. Enter it below to verify.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className={form.formState.errors.email ? "border-red-500" : undefined}
                {...form.register("email")}
                disabled={isSubmitting || resendLoading}
              />
              {form.formState.errors.email?.message && (
                <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label>6-digit code</Label>
              <InputOTP
                maxLength={6}
                value={form.watch("code")}
                onChange={(v) => form.setValue("code", v, { shouldValidate: true })}
                containerClassName="flex items-center gap-2 justify-center"
                disabled={isSubmitting || resendLoading}
              >
                <InputOTPGroup className="gap-2">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              {form.formState.errors.code?.message && (
                <p className="text-sm text-red-600 text-center">
                  {form.formState.errors.code.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || resendLoading}
              className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </span>
              ) : (
                "Verify"
              )}
            </Button>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>
                Didn&apos;t get the code?
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onResend}
                disabled={resendSeconds > 0 || resendLoading || isSubmitting}
                className="border-emerald-300 text-emerald-700 hover:border-emerald-400"
              >
                {resendSeconds > 0 ? `Resend (${resendSeconds}s)` : "Resend code"}
              </Button>
            </div>

            <div className="text-center text-sm text-gray-600">
              <button
                type="button"
                className="text-emerald-700 hover:underline"
                onClick={() => navigate("/signin")}
                disabled={isSubmitting || resendLoading}
              >
                Back to sign in
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

