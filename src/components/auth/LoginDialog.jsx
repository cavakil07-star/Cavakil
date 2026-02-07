"use client";

import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Schema
const authSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  phone: z.string().regex(/^\d{10}$/, {
    message: "Enter a valid 10-digit phone number",
  }),
});

const AuthDialog = ({ open, onOpenChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const form = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      phone: "",
    },
    mode: "onTouched",
  });

  const handleSignIn = form.handleSubmit(async (values) => {
    setErrorMsg("");
    setIsLoading(true);

    try {
      const result = await signIn("otp", {
        redirect: false,
        email: values.email,
        phone: values.phone,
        sessionId: "ABCX",
        otp: "8568",
      });

      if (result?.error) {
        setErrorMsg(result.error);
      } else {
        onOpenChange(false);
        window.location.href = result?.url || "/";
      }
    } catch (error) {
      setErrorMsg("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          sm:max-w-2xl
          p-0
          border-0
          bg-transparent
          shadow-none
          animate-in
          fade-in-0
          zoom-in-95
          duration-300
        "
      >
        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            bg-white/80
            backdrop-blur-xl
            shadow-2xl
            ring-1
            ring-white/60
          "
        >
          <div className="grid md:grid-cols-2">
            {/* Left visual / background image */}
            <div className="relative hidden md:block overflow-hidden">
              <div className="absolute inset-0">
                <img
                  src="/bg1.jpg"
                  alt="CA Vakil login background"
                  className="
                    h-full
                    w-full
                    object-cover
                    scale-105
                    transform
                    transition-transform
                    duration-700
                    ease-out
                    hover:scale-110
                  "
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-700/60 to-indigo-500/60" />
              </div>
              <div className="relative flex h-full flex-col justify-between p-6 text-white">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100/80">
                    Secure Client Portal
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold leading-snug">
                    Fast, secure access to your
                    <span className="block text-blue-100">CA Vakil dashboard</span>
                  </h2>
                </div>
                <div className="mt-6 space-y-2 text-xs text-blue-100/80">
                  <p className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    2-step verification via email & phone
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
                    Enterprise-grade encryption for your data
                  </p>
                </div>
              </div>
            </div>

            {/* Right side: form */}
            <div className="relative p-7 md:p-8">
              <div className="absolute -top-24 -right-24 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />

              <div className="relative">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
                    Welcome back to
                    <span className="block bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                      CA Vakil
                    </span>
                  </DialogTitle>
                  <p className="mt-2 text-sm text-gray-500">
                    Sign in with your registered email and phone number to continue.
                  </p>
                </DialogHeader>

                <Form {...form}>
                  <form onSubmit={handleSignIn} className="mt-6 space-y-5">
                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="you@example.com"
                              className="
                                h-11
                                rounded-xl
                                border-gray-200
                                bg-white/80
                                text-sm
                                shadow-sm
                                transition-all
                                duration-200
                                focus-visible:ring-2
                                focus-visible:ring-blue-500
                                focus-visible:ring-offset-1
                              "
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Phone */}
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="8569856985"
                              className="
                                h-11
                                rounded-xl
                                border-gray-200
                                bg-white/80
                                text-sm
                                shadow-sm
                                transition-all
                                duration-200
                                focus-visible:ring-2
                                focus-visible:ring-blue-500
                                focus-visible:ring-offset-1
                              "
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="
                        relative
                        mt-1
                        flex
                        h-11
                        w-full
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-xl
                        text-sm
                        font-medium
                        tracking-wide
                        text-white
                        shadow-lg
                        shadow-blue-500/30
                        transition-all
                        duration-200
                        bg-gradient-to-r
                        from-blue-600
                        via-indigo-500
                        to-blue-600
                        hover:scale-[1.01]
                        hover:shadow-xl
                        hover:shadow-blue-500/40
                        disabled:opacity-80
                      "
                    >
                      <span className="relative z-10">
                        {isLoading ? "Signing in..." : "Sign in securely"}
                      </span>
                    </Button>

                    {errorMsg && (
                      <div className="relative mt-2 rounded-xl border border-red-100 bg-red-50/80 px-4 py-3 text-sm text-red-600 shadow-sm">
                        {errorMsg}
                      </div>
                    )}
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
