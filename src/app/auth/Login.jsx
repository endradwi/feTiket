import AuthLayout from "../../layout/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../shared/components/ui/Card"
import { Button } from "../../shared/components/ui/Button"
import { Input } from "../../shared/components/ui/Input"
import { Field, FieldContent, FieldLabel } from "../../shared/components/ui/Field"
import { Separator } from "../../shared/components/ui/Separator"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import apiClient from "../../lib/api-client"
import { setCookie } from "../../lib/cookies"

function Login() {
  const navigate = useNavigate()
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = async (data) => {
    try {
      const response = await apiClient.post("/auth/login", data)
      console.log("response", response)
      // const { user, token } = response
      // console.log("isi token", token)
      // console.log("isi user", user)
      
      // Simpan token di cookie
      setCookie("access_token", response.result.token, 7)
      setCookie("userId", response.result.userId || response.result.user?.id, 7)
      
      // Update user state di redux
      // dispatch(setUser(response.results.user))
      
      navigate("/")
    } catch (err) {
      console.log("error", err)
    }
  }

  return (
    <AuthLayout >
      <Card className="w-full border-none shadow-xl rounded-2xl">
        <CardHeader className="space-y-3 pb-6 pt-10 px-8 text-left">
          <CardTitle className="text-[28px] font-bold">Welcome Back<span className="text-[28px] ml-1">👋</span></CardTitle>
          <CardDescription className="text-sm text-muted-foreground font-medium leading-[1.6]">
            Sign in with your data that you entered during your registration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 px-8 pb-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            <Field>
              <FieldLabel className="text-sm font-medium">Email</FieldLabel>
              <FieldContent>
                <Input 
                  {...register("email", { 
                    required: "Email is required", 
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" } 
                  })}
                  placeholder="Enter your email" 
                  className={`h-12 bg-transparent ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`} 
                />
                {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email.message}</span>}
              </FieldContent>
            </Field>
            
            <Field>
              <FieldLabel className="text-sm font-medium">Password</FieldLabel>
              <FieldContent>
                <Input 
                  {...register("password", { required: "Password is required" })}
                  variant="password" 
                  placeholder="Enter your password" 
                  className={`h-12 bg-transparent ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.password && <span className="text-xs text-red-500 mt-1">{errors.password.message}</span>}
              </FieldContent>
            </Field>
            
            <div className="flex items-center justify-end w-full pt-1 pb-2">
              <Link to="/forgot-password" className="text-[13px] font-semibold text-[#003049] hover:underline hover:text-[#003049]/80">
                Forgot your password?
              </Link>
            </div>
            
            <Button 
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#003049] hover:bg-[#003049]/90 text-white h-12 text-base font-medium disabled:opacity-70"
            >
              {status === "loading" ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="flex items-center gap-3 py-1">
            <Separator className="flex-1"/>
            <span className="text-muted-foreground text-xs font-medium">or</span>
            <Separator className="flex-1"/>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full h-12 font-medium shadow-sm border-input hover:bg-muted/30">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-[18px] h-[18px] mr-2" alt="Google" />
              <span className="text-muted-foreground">Google</span>
            </Button>
            <Button variant="outline" className="w-full h-12 font-medium shadow-sm border-input hover:bg-muted/30">
              <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-[18px] h-[18px] mr-2" alt="Facebook" />
              <span className="text-muted-foreground">Facebook</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}

export default Login
