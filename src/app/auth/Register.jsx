import AuthLayout from "../../layout/auth"
import { Card, CardContent } from "../../shared/components/ui/Card"
import { Button } from "../../shared/components/ui/Button"
import { Input } from "../../shared/components/ui/Input"
import { Field, FieldContent, FieldLabel } from "../../shared/components/ui/Field"
import { Separator } from "../../shared/components/ui/Separator"
import { Label } from "../../shared/components/ui/Label"
import { Checkbox } from "../../shared/components/ui/Checkbox"
import { Link } from "react-router"

function Register() {
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
            
            <div className="flex items-center gap-3 pt-1 pb-3">
              <Checkbox id="terms" className="data-[state=checked]:bg-[#003049] data-[state=checked]:border-[#003049]" />
              <Label htmlFor="terms" className="text-[13px] font-normal text-muted-foreground cursor-pointer">I agree to terms & conditions</Label>
            </div>
            
            <Button className="w-full bg-[#003049] hover:bg-[#003049]/90 text-white h-12 text-base font-medium">
              Join For Free Now
            </Button>
            
            <div className="flex items-center justify-center pt-2">
              <span className="text-sm text-foreground font-medium mr-[6px]">Already have an account?</span>
              <Link to="/login" className="text-sm font-semibold text-[#003049] hover:underline hover:text-[#003049]/80">
                Log In
              </Link>
            </div>
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

export default Register
