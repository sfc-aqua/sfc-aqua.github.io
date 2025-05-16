import Link from "next/link"
import { cn } from "@/components/utils"
import { TMember } from "./members-data"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { EllipsisIcon } from "lucide-react"


const MemberCardV2 = ({ member }: { member: TMember }) => {
  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle>{member.name}</CardTitle>
        <CardDescription>A.K.A. {member.login}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 items-center">
        <img
          className="w-32 h-32 rounded-md object-cover"
          src={member.imagePath}
          alt={member.name}
        />
        <div className="flex flex-wrap gap-1 justify-center">
          {member.role.map((role, index) => (
            <Badge key={index}>{role}</Badge>
          ))}
        </div>
        <p>{member.description}</p>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger className="absolute bottom-2 right-4 size-6">
            <EllipsisIcon />
          </DialogTrigger>
          <DialogContent className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 items-center">
              <img
                className="w-32 h-32 rounded-md object-cover"
                src={member.imagePath}
                alt={member.name}
              />
              <div className="text-2xl font-semibold">{member.name}</div>
              <div>
                <span className="font-light italic">A.K.A.</span>
                {member.login}
              </div>
              <div className="flex flex-wrap gap-1 justify-center">
                {member.role.map((role, index) => (
                  <Badge key={index}>{role}</Badge>
                ))}
              </div>
              <p className="bg-primary text-primary-foreground p-4 rounded-2xl italic">
                ...{member.description}...
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col ">
                {member.stat?.map((stat, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center m-1"
                  >
                    <div className="text-sm">{stat.name}</div>
                    <div className="w-32 h-2 bg-base-300 rounded-full">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(stat.value / stat.max) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {member.links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button asChild variant="link">{link.name}</Button>
                  </Link>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}

export default MemberCardV2
