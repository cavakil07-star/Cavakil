"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AuthDialog = ({ open, onOpenChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loginMethod, setLoginMethod] = useState("phone"); // "phone" or "email"

  const form = useForm({
    defaultValues: { phone: "", email: "" },
    mode: "onTouched",
  });

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    
    const values = form.getValues();
    const identifier = loginMethod === "phone" ? values.phone : values.email;
    
    // Validate based on method
    if (loginMethod === "phone" && !/^\d{10}$/.test(identifier)) {
      setErrorMsg("Enter a valid 10-digit phone number");
      return;
    }
    if (loginMethod === "email" && !emailRegex.test(identifier)) {
      setErrorMsg("Enter a valid email address");
      return;
    }
    
    setIsLoading(true);

    try {
      const signInData = {
        redirect: false,
        sessionId: "ABCX",
        otp: "8568",
      };
      
      if (loginMethod === "phone") {
        signInData.phone = values.phone;
      } else {
        signInData.email = values.email;
      }
      
      const result = await signIn("otp", signInData);

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
  };

  const handleMethodChange = (method) => {
    setLoginMethod(method);
    setErrorMsg("");
    form.reset({ phone: "", email: "" });
  };

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
                    Login with phone or email
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
                    Sign in with your phone number or email to continue.
                  </p>
                </DialogHeader>

                <div className="mt-4 flex rounded-xl bg-gray-100 p-1">
                  <button
                    type="button"
                    onClick={() => handleMethodChange("phone")}
                    className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                      loginMethod === "phone"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Phone
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMethodChange("email")}
                    className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                      loginMethod === "email"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Email
                  </button>
                </div>

                {loginMethod === "phone" ? (
                  <form onSubmit={handleSignIn} className="mt-6 space-y-5">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="8569856985"
                        {...form.register("phone")}
                        className="
                          mt-1.5
                          h-11
                          w-full
                          rounded-xl
                          border
                          border-gray-200
                          bg-white/80
                          px-3
                          text-sm
                          shadow-sm
                          transition-all
                          duration-200
                          outline-none
                          focus:ring-2
                          focus:ring-blue-500
                          focus:ring-offset-1
                        "
                      />
                    </div>

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
                ) : (
                  <form onSubmit={handleSignIn} className="mt-6 space-y-5">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        {...form.register("email")}
                        className="
                          mt-1.5
                          h-11
                          w-full
                          rounded-xl
                          border
                          border-gray-200
                          bg-white/80
                          px-3
                          text-sm
                          shadow-sm
                          transition-all
                          duration-200
                          outline-none
                          focus:ring-2
                          focus:ring-blue-500
                          focus:ring-offset-1
                        "
                      />
                    </div>

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
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
