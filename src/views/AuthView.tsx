
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '../contexts/NavigationContext';
import Layout from '../components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { CircleParking, Key, LogIn, Phone, SmartphoneNfc, UserPlus } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const signupSchema = loginSchema.extend({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const phoneSchema = z.object({
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
});

const otpSchema = z.object({
  otp: z.string().min(6, { message: "Please enter the complete verification code" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;
type PhoneFormValues = z.infer<typeof phoneSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;

const AuthView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("login");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  
  const { navigateTo } = useNavigation();
  const { signIn, signUp, user, sendOTP, verifyOTP } = useAuth();
  const isMobile = useIsMobile();
  
  // Redirect if user is already authenticated
  React.useEffect(() => {
    if (user) {
      navigateTo('home');
    }
  }, [user, navigateTo]);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
    },
  });

  const phoneForm = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: "",
    },
  });

  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const handleLogin = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const { error } = await signIn(data.email, data.password);
      if (!error) {
        navigateTo('home');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (data: SignupFormValues) => {
    setIsLoading(true);
    try {
      const { error } = await signUp(data.email, data.password, data.fullName);
      if (!error) {
        setActiveTab("login");
        signupForm.reset();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOTP = async (data: PhoneFormValues) => {
    setIsLoading(true);
    try {
      const formattedPhone = formatPhoneNumber(data.phone);
      setPhoneNumber(formattedPhone);
      
      const { error } = await sendOTP(formattedPhone);
      if (!error) {
        setOtpSent(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (data: OtpFormValues) => {
    setIsLoading(true);
    try {
      const { error } = await verifyOTP(phoneNumber, data.otp);
      if (!error) {
        navigateTo('home');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatPhoneNumber = (phone: string): string => {
    // Simple formatting to ensure it starts with +91 for India
    if (!phone.startsWith('+')) {
      return `+91${phone.replace(/^0/, '')}`;
    }
    return phone;
  };

  const resetOTP = () => {
    setOtpSent(false);
    setPhoneNumber("");
    phoneForm.reset();
    otpForm.reset();
  };

  return (
    <Layout title="Account" showBackButton={false} className="bg-gradient-to-b from-background via-background/95 to-background/90">
      <div className="flex flex-col items-center pt-4 relative min-h-[calc(100vh-80px)]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 w-full h-64 opacity-20 bg-blue-600 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-3/4 h-64 opacity-15 bg-primary blur-[100px]" />
        </div>
        
        {/* Bengaluru skyline silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-24 opacity-20 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="currentColor" fillOpacity="1" d="M0,224L34.3,229.3C68.6,235,137,245,206,224C274.3,203,343,149,411,149.3C480,149,549,203,617,229.3C685.7,256,754,256,823,224C891.4,192,960,128,1029,112C1097.1,96,1166,128,1234,160C1302.9,192,1371,224,1406,240L1440,256L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path>
          </svg>
        </div>

        <div className="w-full max-w-md space-y-6 p-4 z-10">
          <div className="flex items-center justify-center mb-6">
            <CircleParking className="text-primary w-10 h-10 md:w-12 md:h-12 mr-2" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">ParkIt</h1>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-primary">Welcome Back</h2>
            <p className="text-muted-foreground">Sign in to continue to your account</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="login" className="flex items-center gap-1">
                <LogIn size={16} /> <span>Login</span>
              </TabsTrigger>
              <TabsTrigger value="signup" className="flex items-center gap-1">
                <UserPlus size={16} /> <span>Sign up</span>
              </TabsTrigger>
              <TabsTrigger value="phone" className="flex items-center gap-1">
                <Phone size={16} /> <span>Phone</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="mt-4 space-y-4">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="absolute top-3 right-3 w-20 h-20 bg-primary/5 rounded-full blur-2xl"></div>
                
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" type="email" {...field} />
                          </FormControl>
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
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                    
                    <div className="text-center text-sm text-muted-foreground">
                      <button 
                        type="button"
                        className="hover:underline text-primary"
                        onClick={() => {
                          // In a real app, we'd implement password reset functionality
                          alert("Password reset functionality would be implemented here");
                        }}
                      >
                        Forgot password?
                      </button>
                    </div>
                  </form>
                </Form>
              </div>
              
              {/* Bengaluru-specific imagery */}
              <div className="mt-6 rounded-lg overflow-hidden h-48 relative">
                <img 
                  src="https://images.unsplash.com/photo-1587047515797-76670c85310b?q=80&w=2070" 
                  alt="Bengaluru traffic" 
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent flex items-end p-4">
                  <p className="text-white text-lg font-medium">Bengaluru's smart parking solution</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="signup" className="mt-4 space-y-4">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <Form {...signupForm}>
                  <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
                    <FormField
                      control={signupForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} />
                          </FormControl>
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
                          <FormControl>
                            <Input placeholder="your.email@example.com" type="email" {...field} />
                          </FormControl>
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
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
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
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                </Form>
              </div>
            </TabsContent>

            <TabsContent value="phone" className="mt-4 space-y-4">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                {!otpSent ? (
                  <Form {...phoneForm}>
                    <form onSubmit={phoneForm.handleSubmit(handleSendOTP)} className="space-y-4">
                      <FormField
                        control={phoneForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <div className="flex rounded-md overflow-hidden">
                                <div className="bg-secondary/50 text-foreground flex items-center justify-center px-3 border border-r-0 border-input rounded-l-md">
                                  +91
                                </div>
                                <Input 
                                  placeholder="9876543210" 
                                  type="tel" 
                                  className="rounded-l-none" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary/90 flex items-center gap-2" 
                        disabled={isLoading}
                      >
                        <SmartphoneNfc size={18} />
                        {isLoading ? "Sending OTP..." : "Send OTP"}
                      </Button>
                    </form>
                  </Form>
                ) : (
                  <Form {...otpForm}>
                    <form onSubmit={otpForm.handleSubmit(handleVerifyOTP)} className="space-y-4">
                      <div className="text-center mb-4">
                        <p className="text-sm text-muted-foreground mb-1">
                          We've sent a verification code to
                        </p>
                        <p className="text-primary font-medium">{phoneNumber}</p>
                      </div>
                    
                      <FormField
                        control={otpForm.control}
                        name="otp"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Verification Code</FormLabel>
                            <FormControl>
                              <InputOTP maxLength={6} {...field}>
                                <InputOTPGroup>
                                  <InputOTPSlot index={0} />
                                  <InputOTPSlot index={1} />
                                  <InputOTPSlot index={2} />
                                  <InputOTPSlot index={3} />
                                  <InputOTPSlot index={4} />
                                  <InputOTPSlot index={5} />
                                </InputOTPGroup>
                              </InputOTP>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary/90 flex items-center gap-2" 
                        disabled={isLoading}
                      >
                        <Key size={18} />
                        {isLoading ? "Verifying..." : "Verify OTP"}
                      </Button>
                      
                      <div className="text-center text-sm">
                        <button 
                          type="button"
                          className="text-primary hover:underline"
                          onClick={resetOTP}
                        >
                          Change phone number
                        </button>
                      </div>
                    </form>
                  </Form>
                )}
              </div>
              
              <div className="mt-4 rounded-lg overflow-hidden h-48 relative">
                <img 
                  src="https://images.unsplash.com/photo-1598633919372-a08bb5ed7abd?q=80&w=2070" 
                  alt="Bengaluru city" 
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent flex items-end p-4">
                  <p className="text-white text-lg font-medium">Parking made easy in Silicon Valley of India</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="text-center text-sm text-muted-foreground">
            <p>By continuing, you agree to our</p>
            <div className="flex justify-center gap-2">
              <a href="#" className="text-primary hover:underline">Terms of Service</a>
              <span>&</span>
              <a href="#" className="text-primary hover:underline">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuthView;
