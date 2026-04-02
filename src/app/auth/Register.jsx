import AuthLayout from "../../layout/auth"
import { Card, CardContent } from "../../shared/components/ui/Card"
import { Button } from "../../shared/components/ui/Button"
import { Input } from "../../shared/components/ui/Input"
import { Field, FieldContent, FieldLabel } from "../../shared/components/ui/Field"
import { Separator } from "../../shared/components/ui/Separator"
import { Label } from "../../shared/components/ui/Label"
import { Checkbox } from "../../shared/components/ui/Checkbox"
import { Link } from "react-router"

import { useForm, Controller } from "react-hook-form"
import { useNavigate } from "react-router"
import apiClient from "../../lib/api-client"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const registerSchema = yup.object({
  email: yup.string().required("Email is required").email("Invalid email format"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  terms: yup.boolean().oneOf([true], "You must agree to the terms & conditions").required()
}).required()

function Register() {
  const navigate = useNavigate()
  
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      terms: false
    }
  })

  const onSubmit = async (data) => {
    try {
      const userData = { ...data }
      delete userData.terms
      
      await apiClient.post("/auth/register", userData)
      // On successful registration, typically we redirected to login
      navigate("/login")
    } catch (err) {
      console.log("error", err)
    }
  }

  return (
    <AuthLayout>
      <Card className="w-full border-none shadow-xl rounded-2xl">
        <CardContent className="pt-8 px-8 pb-8 space-y-6">
          {/* Stepper */}
          <div className="flex items-center justify-between pb-2">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#003049] text-white text-sm font-medium">1</div>
              <span className="text-[11px] text-muted-foreground font-medium">Fill Form</span>
            </div>
            <div className="h-px flex-1 border-dashed border-t-2 border-muted-foreground/30 mx-2 mb-[22px]" />
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/50 text-muted-foreground/50 text-sm font-medium">2</div>
              <span className="text-[11px] text-muted-foreground/50 font-medium">Activate</span>
            </div>
            <div className="h-px flex-1 border-dashed border-t-2 border-muted-foreground/30 mx-2 mb-[22px]" />
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/50 text-muted-foreground/50 text-sm font-medium">3</div>
              <span className="text-[11px] text-muted-foreground/50 font-medium">Done</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Field>
              <FieldLabel className="text-sm font-medium">Email</FieldLabel>
              <FieldContent>
                <Input 
                  {...register("email")}
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
                  {...register("password")}
                  variant="password" 
                  placeholder="Enter your password" 
                  className={`h-12 bg-transparent ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.password && <span className="text-xs text-red-500 mt-1">{errors.password.message}</span>}
              </FieldContent>
            </Field>
            
            <div className="flex flex-col gap-1 pt-1 pb-3">
              <div className="flex items-center gap-3">
                <Controller
                  name="terms"
                  control={control}
                  render={({ field }) => (
                    <Checkbox 
                      id="terms" 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-[#003049] data-[state=checked]:border-[#003049]" 
                    />
                  )}
                />
                <Label htmlFor="terms" className="text-[13px] font-normal text-muted-foreground cursor-pointer">I agree to terms & conditions</Label>
              </div>
              {errors.terms && <span className="text-xs text-red-500 ml-8">{errors.terms.message}</span>}
            </div>
            
            <Button 
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#003049] hover:bg-[#003049]/90 text-white h-12 text-base font-medium disabled:opacity-70"
            >
              {status === "loading" ? "Creating account..." : "Join For Free Now"}
            </Button>
            
            <div className="flex items-center justify-center pt-2">
              <span className="text-sm text-foreground font-medium mr-[6px]">Already have an account?</span>
              <Link to="/login" className="text-sm font-semibold text-[#003049] hover:underline hover:text-[#003049]/80">
                Log In
              </Link>
            </div>
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

export default Register
