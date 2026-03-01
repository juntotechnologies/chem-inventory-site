import Link from "next/link"
import { Beaker } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col justify-center w-full max-w-md p-8 mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Beaker className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">CIMS</span>
        </div>
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-muted-foreground">Enter your credentials to access your account</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="Enter your username" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" />
            </div>
            <Button className="w-full">Login</Button>
          </div>
          <div className="text-center">
            <Link href="#" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:block bg-primary w-1/2">
        <div className="flex flex-col justify-center h-full max-w-lg mx-auto p-8 text-primary-foreground">
          <h2 className="text-3xl font-bold mb-6">Chemical Inventory Management System</h2>
          <p className="mb-8">
            Track your chemical inventory with ease. Keep detailed records of all chemicals in your facility and monitor
            changes over time.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary-foreground"></div>
              <span>Track chemical details including CIT #, name, CAS, and batch numbers</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary-foreground"></div>
              <span>Monitor inventory amounts and locations</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary-foreground"></div>
              <span>Detailed change history for every modification</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary-foreground"></div>
              <span>Secure user authentication and access control</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
