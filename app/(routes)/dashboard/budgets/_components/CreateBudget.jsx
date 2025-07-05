"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'

const CreateBudget = ({refreshData}) => {
    const [emojiIcon, setEmojiIcon] = useState('😊');
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState();
    const [amount, setAmount] = useState()
    const { user } = useUser();

    const onCreateBudget = async () => {
        const result = await db.insert(Budgets)
            .values({
                name: name,
                amount: amount,
                icon: emojiIcon,
                createdBy: user?.primaryEmailAddress?.emailAddress,
            }).returning({ insertedId: Budgets.id })

        if (result) {
            refreshData();
            toast('New Budget Created')
        }
    }
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className='bg-slate-100 p-10 flex flex-col items-center border-2 border-dashed
                        cursor-pointer hover:shadow-md rounded-md'>
                        <h2 className='text-3xl font-medium'>+</h2>
                        <h2 className='font-medium'>Create New Budget</h2>
                    </div>
                </DialogTrigger>
                <DialogContent >
                    <DialogHeader>
                        <DialogTitle>Create New Budget</DialogTitle>
                        <DialogDescription asChild>
                            <div className='mt-5'>
                                <Button variant={'outline'}
                                    className={'text-lg'}
                                    onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>{emojiIcon}</Button>
                                <div className='absolute z-20 top-17.5 left-22'>
                                    <EmojiPicker
                                        open={openEmojiPicker}
                                        onEmojiClick={(e) => {
                                            setEmojiIcon(e.emoji)
                                            setOpenEmojiPicker(false)
                                        }}
                                    />
                                </div>
                                <div className='mt-2'>
                                    <h2 className='text-black font-medium my-1'>Budget Name</h2>
                                    <Input
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. Home Decor" />
                                </div>
                                <div className='mt-2'>
                                    <h2 className='text-black font-medium my-1'>Budget Amount</h2>
                                    <Input
                                        type={'number'}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="e.g. 5000$"
                                    />
                                </div>
                                
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button
                                disabled={!(name && amount)}
                                onClick={onCreateBudget}
                                className={'w-full mt-2 bg-violet-500'}>
                                    Create Budget
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateBudget
