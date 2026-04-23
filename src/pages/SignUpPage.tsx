import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { googleSignIn, signup } from "@/api/authApi";
import { setAccessToken } from "@/lib/authStorage";

const signupSchema = z.object({
  full_name: z.string().min(2).max(120),
  email: z.string().email(),
  password: z.string().min(6).max(128),
});

type SignupForm = z.infer<typeof signupSchema>;

declare global {
  interface Window {
    google?: any;
  }
}

export default function SignUpPage() {
  const navigate = useNavigate();
  const googleClientId = (
    import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined
  )?.trim();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isOneIdLoading, setIsOneIdLoading] = useState(false);
  const googleButtonRef = useRef<HTMLDivElement | null>(null);

  const form = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignupForm) => {
    try {
      setIsSubmitting(true);
      const res = await signup(values);
      toast.success(res.message || "Verification code sent");
      navigate(`/verify?email=${encodeURIComponent(values.email)}`);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Signup failed";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!googleClientId) return;

    const scriptId = "google-gsi-script";
    const existing = document.getElementById(scriptId) as HTMLScriptElement | null;
    const loadScript = () => {
      if (existing) return Promise.resolve();
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load Google Sign-In script"));
        document.head.appendChild(script);
      });
    };

    let cancelled = false;
    (async () => {
      try {
        await loadScript();
        if (cancelled) return;
        if (!window.google?.accounts?.id) return;

        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: async (response: any) => {
            const credential = response?.credential;
            if (!credential) return;
            try {
              setIsGoogleLoading(true);
              const res = await googleSignIn({ id_token: credential });
              setAccessToken(res.access_token);
              toast.success("Signed in with Google");
              navigate("/products");
            } catch (e) {
              const message = e instanceof Error ? e.message : "Google sign-in failed";
              toast.error(message);
            } finally {
              setIsGoogleLoading(false);
            }
          },
        });

        if (googleButtonRef.current) {
          window.google.accounts.id.renderButton(googleButtonRef.current, {
            theme: "outline",
            size: "large",
            width: "100%",
          });
        }
      } catch {
        // Keep form usable even if social SDK cannot load.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [googleClientId, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>
            Quick sign-up, then verify your email with a 6-digit code.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="full_name">Full name</Label>
              <Input
                id="full_name"
                placeholder="e.g. Usmon Karimov"
                className={form.formState.errors.full_name ? "border-red-500" : undefined}
                {...form.register("full_name")}
                disabled={isSubmitting || isGoogleLoading || isOneIdLoading}
              />
              {form.formState.errors.full_name?.message && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.full_name.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className={form.formState.errors.email ? "border-red-500" : undefined}
                {...form.register("email")}
                disabled={isSubmitting || isGoogleLoading || isOneIdLoading}
              />
              {form.formState.errors.email?.message && (
                <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="At least 6 characters"
                className={form.formState.errors.password ? "border-red-500" : undefined}
                {...form.register("password")}
                disabled={isSubmitting || isGoogleLoading || isOneIdLoading}
              />
              {form.formState.errors.password?.message && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || isGoogleLoading || isOneIdLoading}
              className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </span>
              ) : (
                "Sign up"
              )}
            </Button>

            <div className="relative py-1">
              <div className="border-t" />
              <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-gray-500">
                or continue with
              </span>
            </div>

            <div className="space-y-3">
              <div className="rounded-md border bg-white p-2 shadow-sm">
                <div ref={googleButtonRef} />
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full h-11 rounded-md border-sky-200 text-sky-700 hover:bg-sky-50"
                disabled={isSubmitting || isGoogleLoading || isOneIdLoading}
                onClick={() => {
                  setIsOneIdLoading(true);
                  toast.info("OneID integratsiyasi tez orada qo'shiladi");
                  setTimeout(() => setIsOneIdLoading(false), 400);
                }}
              >
                {isOneIdLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    OneID...
                  </span>
                ) : (
                  "Continue with OneID"
                )}
              </Button>
            </div>

            {isGoogleLoading && (
              <div className="text-sm text-gray-500">Processing Google...</div>
            )}

            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                className="text-emerald-700 hover:underline"
                onClick={() => navigate("/signin")}
                disabled={isSubmitting || isGoogleLoading || isOneIdLoading}
              >
                Sign in
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

