import Link from "next/link"
import { cn } from "@/components/utils"
import { TMember } from "./members-data"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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



const MemberCard = ({ member }: { member: TMember }) => (
  <div
    className={cn(
      "member-card gap-2 flex flex-col items-center justify-center p-10 bg-base-200 rounded-xl w-[275px] mb-4 break-inside-avoid"
    )}
  >
    <img
      className="w-32 h-32 rounded-full object-cover"
      src={member.imagePath}
      alt={member.name}
    />
    <div className="text-xl font-bold">{member.name}</div>
    <div className="text-xl font-bold">{member.login}</div>
    <div className="flex flex-wrap gap-1 justify-center">
      {member.role.map((role, index) => (
        <span
          className="badge badge-primary rounded-full font-bold h-min text-center"
          key={index}
        >
          {role}
        </span>
      ))}
    </div>
    <div className="prose dark:prose-invert">
      <q >{member.description}</q>
    </div>
    <Accordion type="single" collapsible>
      <AccordionItem value={member.name}>
        <AccordionTrigger>More details</AccordionTrigger>
        <AccordionContent className="pl-8">
          <div className="flex flex-wrap items-center justify-center mt-2">
            {member.links.map((link, index) => (
              <Link
                key={index}
                className="btn btn-primary btn-sm m-1 rounded-full"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center mt-2">
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
)

const MemberCardV2 = ({ member }: { member: TMember }) => {
  return (<Card className='relative'>
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
          <Badge
            key={index}
          >
            {role}
          </Badge>
        ))}
      </div>
      <p>{member.description}</p>
    </CardContent>
    <CardFooter>
      <Dialog>
        <DialogTrigger className='absolute bottom-2 right-4'>
          <Button variant="ghost" size='icon'>
            <EllipsisIcon />
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 items-center">
            <img
              className="w-32 h-32 rounded-md object-cover"
              src={member.imagePath}
              alt={member.name}
            />
            <div className="text-2xl font-semibold">
              {member.name}
            </div>
            <div>
              <span className="font-light italic">A.K.A.</span>
              {member.login}
            </div>
            <div className="flex flex-wrap gap-1 justify-center">
              {member.role.map((role, index) => (
                <Badge
                  key={index}
                >
                  {role}
                </Badge>
              ))}
            </div>
            <p className="bg-primary text-primary-foreground p-4 rounded-2xl italic">...{member.description}...</p>
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
                  <Button
                    variant="outline"
                  >
                    {link.name}
                  </Button>
                </Link>

              ))}
            </div>

          </div>
        </DialogContent>
      </Dialog>
    </CardFooter>
  </Card>)
}

export default MemberCardV2
