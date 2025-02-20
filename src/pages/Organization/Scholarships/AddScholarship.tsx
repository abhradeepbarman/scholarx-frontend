import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

function AddScholarship() {
    const addScholarshipSchema = z.object({
        title: z.string().min(1, "Title is required"),
        description: z.string().min(1, "Description is required"),
        eligibility_criteria: z
            .string()
            .min(1, "Eligibility criteria is required"),
        deadline: z.coerce.date().refine((date) => date >= new Date(), {
            message: "Deadline must be in the future",
        }),
        amount: z.number().min(1000, "Amount must be at least 1000 Rs."),
        location: z.string().min(1, "Location is required"),
        requirements: z
            .array(z.string())
            .min(1, "At least one requirement is required"),
    });

    const form = useForm({
        resolver: zodResolver(addScholarshipSchema),
        defaultValues: {
            title: "",
            description: "",
            eligibility_criteria: "",
            deadline: new Date(),
            amount: 0,
            location: "",
            requirements: [],
        },
    });

    const onSubmit = (data: z.infer<typeof addScholarshipSchema>) => {
        console.log(data);
    };

    return (
        <div className="w-[80%] mx-auto">
            <h1 className="text-2xl font-bold mb-4">Add Scholarship</h1>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    {/* title  */}
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter scholarship title"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* description  */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter scholarship description"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Eligibility Criteria  */}
                    <FormField
                        control={form.control}
                        name="eligibility_criteria"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Eligibility Criteria</FormLabel>
                                <FormControl>
                                    <Select
                                        {...field}
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an Eligibility Criteria" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="graduate">
                                                Graduate Degree Holder
                                            </SelectItem>
                                            <SelectItem value="postgraduate">
                                                Postgraduate Degree Holder
                                            </SelectItem>
                                            <SelectItem value="working_professional">
                                                Working Professional (1+ years
                                                experience)
                                            </SelectItem>
                                            <SelectItem value="merit_based">
                                                Merit-Based (Minimum 75% in Last
                                                Exam)
                                            </SelectItem>
                                        </SelectContent>
                                        <FormMessage />
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <div className="flex items-center gap-x-10">
                        {/* Deadline  */}
                        <FormField
                            control={form.control}
                            name="deadline"
                            render={({ field }) => (
                                <FormItem className=" flex flex-col">
                                    <FormLabel>Deadline</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[280px] pl-3 text-left font-normal",
                                                        !field.value &&
                                                            "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(
                                                            field.value,
                                                            "PPP"
                                                        )
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date()
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Amount  */}
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem className="w-[50%]">
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter scholarship amount"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/*TODO: Requirements  */}


                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
}

export default AddScholarship;
