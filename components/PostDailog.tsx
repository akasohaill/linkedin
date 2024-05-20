import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import ProfilePhoto from "./shared/ProfilePhoto"
import { Textarea } from "./ui/textarea"
import { Ghost, Images } from "lucide-react"
import { useRef, useState } from "react"
import { readFileAsDataUrl } from "@/lib/utils"
import Image from "next/image"
import { createPostAction } from "@/lib/serveractions"

export function PostDailog({ open, setOpen, src }: { setOpen: any, open: boolean, src: string }) {

  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState("")
  const [inputText,setInputText]=useState("")

  const changeHandler = (e:any) =>{
    setInputText(e.target.value);
  }

  const postActionHandler=async (formData:FormData) =>{
    const inputText=formData.get('inputText') as string
    try {
      await createPostAction(inputText,selectedFile)
    } catch (error) {
      console.log('error occurred',error);
    }
    setInputText('')
    setOpen(false)
  }

  const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const dataUrl = await readFileAsDataUrl(file)
      setSelectedFile(dataUrl)
    }
  }


  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => { setOpen(false) }} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex gap-2">
            <ProfilePhoto src={src} />
            <div className="">
              <h1>akaSohaill</h1>
              <p className="text-xs">Post to anyone</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <form action={postActionHandler}>
          <div className="flex flex-col">
            <Textarea
              id="name"
              value={inputText}
              onChange={changeHandler}
              name="inputText"
              className="border-none text-lg focus-visible:ring-0"
              placeholder="Type Your Message Here" />
            <div className="my-4">
              {
                selectedFile && (
                  <Image
                    src={selectedFile}
                    alt='preview-image'
                    width={400}
                    height={400}
                  />
                )
              }
            </div>
          </div>
          <DialogFooter>
            <div className="flex items-center gap-4">
              <input ref={inputRef} onChange={fileChangeHandler} type="file" name="image" className="hidden" accept="image/*" />
              <Button type="submit">Post</Button>
            </div>
          </DialogFooter>
        </form>
        <Button className="gap-2" onClick={() => inputRef?.current?.click()} variant={'ghost'}>
          <Images className="text-blue-500" />
          <p>Media</p>
        </Button>
      </DialogContent>
    </Dialog>
  )
}
