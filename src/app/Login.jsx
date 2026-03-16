import AuthLayout from "../layout/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Field, FieldContent, FieldLabel } from "../components/ui/Field"
import { Separator } from "../components/ui/Separator"
import { Link } from "react-router"

function Login() {

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
          <div className="space-y-4">
            <Field>
              <FieldLabel className="text-sm font-medium">Email</FieldLabel>
              <FieldContent>
                <Input placeholder="Enter your email" className="h-12 bg-transparent" />
              </FieldContent>
            </Field>
            
            <Field>
              <FieldLabel className="text-sm font-medium">Password</FieldLabel>
              <FieldContent>
                <Input variant="password" placeholder="Enter your password" className="h-12 bg-transparent" />
              </FieldContent>
            </Field>
            
            <div className="flex items-center justify-end w-full pt-1 pb-2">
              <Link to="/forgot-password" className="text-[13px] font-semibold text-[#5F2EEA] hover:underline hover:text-[#5F2EEA]/80">
                Forgot your password?
              </Link>
            </div>
            
            <Button className="w-full bg-[#5F2EEA] hover:bg-[#5F2EEA]/90 text-white h-12 text-base font-medium">
              Login
            </Button>
          </div>

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
