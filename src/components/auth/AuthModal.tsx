import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { X, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const signupSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

interface AuthModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  defaultTab?: "login" | "signup";
  onLogin?: (data: z.infer<typeof loginSchema>) => void;
  onSignup?: (data: z.infer<typeof signupSchema>) => void;
}

const AuthModal = ({
  isOpen = true,
  onClose = () => {},
  defaultTab = "login",
  onLogin = (data) => console.log("Login data:", data),
  onSignup = (data) => console.log("Signup data:", data),
}: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleLoginSubmit = async (data: z.infer<typeof loginSchema>) => {
    loginForm.clearErrors();
    try {
      const { email, password } = data;
      const result = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (result.error) {
        console.error("Login error:", result.error);

        // Daha detaylı hata mesajları
        if (result.error.message.includes("Invalid login credentials")) {
          loginForm.setError("root", {
            type: "manual",
            message:
              "E-posta veya şifre hatalı. Lütfen bilgilerinizi kontrol edin.",
          });
        } else if (result.error.message.includes("Email not confirmed")) {
          loginForm.setError("root", {
            type: "manual",
            message:
              "E-posta adresiniz henüz doğrulanmamış. Lütfen e-postanızı kontrol edin ve doğrulama bağlantısına tıklayın.",
          });
        } else if (result.error.message.includes("rate limit")) {
          loginForm.setError("root", {
            type: "manual",
            message:
              "Çok fazla giriş denemesi yaptınız. Lütfen bir süre bekleyin ve tekrar deneyin.",
          });
        } else {
          loginForm.setError("root", {
            type: "manual",
            message:
              result.error.message ||
              "Giriş başarısız. Lütfen bilgilerinizi kontrol edin.",
          });
        }
        return;
      }

      onLogin(data);
    } catch (error) {
      console.error("Login error:", error);
      loginForm.setError("root", {
        type: "manual",
        message:
          "Giriş yapılırken bir hata oluştu. Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin.",
      });
    }
  };

  const handleSignupSubmit = async (data: z.infer<typeof signupSchema>) => {
    signupForm.clearErrors();
    try {
      const { name, email, password } = data;

      // Create auth user
      const result = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (result.error) {
        console.error("Signup error:", result.error);

        // Daha detaylı kayıt hata mesajları
        if (result.error.message.includes("already registered")) {
          signupForm.setError("root", {
            type: "manual",
            message:
              "Bu e-posta adresi zaten kayıtlı. Lütfen giriş yapın veya farklı bir e-posta adresi kullanın.",
          });
        } else if (result.error.message.includes("password")) {
          signupForm.setError("root", {
            type: "manual",
            message:
              "Şifre gereksinimleri karşılanmıyor. Şifreniz en az 6 karakter uzunluğunda olmalıdır.",
          });
        } else if (result.error.message.includes("valid email")) {
          signupForm.setError("root", {
            type: "manual",
            message: "Lütfen geçerli bir e-posta adresi girin.",
          });
        } else if (result.error.message.includes("rate limit")) {
          signupForm.setError("root", {
            type: "manual",
            message:
              "Çok fazla kayıt denemesi yaptınız. Lütfen bir süre bekleyin ve tekrar deneyin.",
          });
        } else {
          signupForm.setError("root", {
            type: "manual",
            message:
              result.error.message ||
              "Kayıt işlemi başarısız oldu. Lütfen tekrar deneyin.",
          });
        }
        return;
      }

      // Create user record in the database
      if (result.data.user) {
        const { error: profileError } = await supabase.from("users").insert({
          id: result.data.user.id,
          email: email,
          full_name: name,
        });

        if (profileError) {
          console.error("Error creating user profile:", profileError.message);
          signupForm.setError("root", {
            type: "manual",
            message:
              "Hesap oluşturuldu ancak profil kurulumu başarısız oldu. Lütfen destek ekibiyle iletişime geçin.",
          });
          return;
        }

        // Create initial user points record
        await supabase.from("user_points").insert({
          user_id: result.data.user.id,
          total_points: 10,
          level: 1,
        });

        // Award First Login achievement
        const { data: achievement } = await supabase
          .from("achievements")
          .select("id")
          .eq("name", "First Login")
          .single();

        if (achievement) {
          await supabase.from("user_achievements").insert({
            user_id: result.data.user.id,
            achievement_id: achievement.id,
          });
        }
      }

      onSignup(data);
    } catch (error) {
      console.error("Signup error:", error);
      signupForm.setError("root", {
        type: "manual",
        message:
          "Hesap oluşturulurken bir hata oluştu. Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin.",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Welcome to English Learning Platform
          </DialogTitle>
          <DialogDescription className="text-center">
            Join our community of language learners
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue={activeTab}
          onValueChange={(value) => setActiveTab(value as "login" | "signup")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <Form {...loginForm}>
              <form
                onSubmit={loginForm.handleSubmit(handleLoginSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            type="email"
                            className="pl-10"
                            {...field}
                          />
                        </FormControl>
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            placeholder="Enter your password"
                            type={showPassword ? "text" : "password"}
                            className="pl-10"
                            {...field}
                          />
                        </FormControl>
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1 h-7 w-7"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="link"
                    className="text-sm text-blue-600"
                  >
                    Forgot password?
                  </Button>
                </div>

                {loginForm.formState.errors.root && (
                  <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm mb-3 flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{loginForm.formState.errors.root.message}</span>
                  </div>
                )}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loginForm.formState.isSubmitting}
                >
                  {loginForm.formState.isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </form>
            </Form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <svg
                  className="mr-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="48px"
                  height="48px"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                </svg>
                Google
              </Button>
              <Button variant="outline" className="w-full">
                <svg
                  className="mr-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="48px"
                  height="48px"
                >
                  <linearGradient
                    id="Ld6sqrtcxMyckEl6xeDdMa"
                    x1="9.993"
                    x2="40.615"
                    y1="9.993"
                    y2="40.615"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#2aa4f4" />
                    <stop offset="1" stopColor="#007ad9" />
                  </linearGradient>
                  <path
                    fill="url(#Ld6sqrtcxMyckEl6xeDdMa)"
                    d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
                  />
                  <path
                    fill="#fff"
                    d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
                  />
                </svg>
                Facebook
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <Form {...signupForm}>
              <form
                onSubmit={signupForm.handleSubmit(handleSignupSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={signupForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            className="pl-10"
                            {...field}
                          />
                        </FormControl>
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            type="email"
                            className="pl-10"
                            {...field}
                          />
                        </FormControl>
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            placeholder="Create a password"
                            type={showPassword ? "text" : "password"}
                            className="pl-10"
                            {...field}
                          />
                        </FormControl>
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1 h-7 w-7"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signupForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            placeholder="Confirm your password"
                            type={showConfirmPassword ? "text" : "password"}
                            className="pl-10"
                            {...field}
                          />
                        </FormControl>
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1 h-7 w-7"
                          onClick={toggleConfirmPasswordVisibility}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-2">
                  {signupForm.formState.errors.root && (
                    <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm mb-3 flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{signupForm.formState.errors.root.message}</span>
                    </div>
                  )}
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={signupForm.formState.isSubmitting}
                  >
                    {signupForm.formState.isSubmitting
                      ? "Creating Account..."
                      : "Create Account"}
                  </Button>
                </div>
              </form>
            </Form>

            <div className="text-center text-sm text-gray-500 mt-4">
              By signing up, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
