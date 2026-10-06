import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useProfilesStore } from '../../store/profile'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Form, FormControl, FormField, FormItem, FormLabel, ErrorMessage } from '../../components/ui/Form'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card'
import { useFormContext } from 'react-hook-form'

const profileFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.number().min(18, 'Must be at least 18').max(80, 'Must be under 80'),
  height: z.number().min(130, 'Minimum height 130cm').max(200, 'Maximum height 200cm'),
  occupation: z.string().min(2, 'Please enter your occupation'),
  company: z.string().min(2, 'Please enter your company'),
  motherTongue: z.string().min(1, 'Please select mother tongue'),
  diet: z.enum(['veg', 'non-veg', 'jsr', 'other']),
  smoking: z.enum(['never', 'occasional', 'regular']),
  drinking: z.enum(['never', 'occasional', 'regular']),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function EditProfileForm() {
  const { updateProfile } = useProfilesStore()
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: '',
      age: 25,
      height: 170,
      occupation: '',
      company: '',
      motherTongue: 'Tamil',
      diet: 'veg',
      smoking: 'never',
      drinking: 'never',
    }
  })

  const onSubmit = (data: ProfileFormValues) => {
    updateProfile(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Update your core details that show in search</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Kumar" {...field} />
                    </FormControl>
                    <ErrorMessage>{form.formState.errors.name?.message}</ErrorMessage>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="25" 
                        {...field}
                        onChange={e => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <ErrorMessage>{form.formState.errors.age?.message}</ErrorMessage>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height (cm)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="170" 
                        {...field}
                        onChange={e => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <ErrorMessage>{form.formState.errors.height?.message}</ErrorMessage>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="motherTongue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mother Tongue</FormLabel>
                    <FormControl>
                      <select 
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        {...field}
                      >
                        <option value="Tamil">Tamil</option>
                        <option value="Telugu">Telugu</option>
                        <option value="Malayalam">Malayalam</option>
                        <option value="Kannada">Kannada</option>
                        <option value="Hindi">Hindi</option>
                      </select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Career Details</CardTitle>
            <CardDescription>Your professional background</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Occupation</FormLabel>
                    <FormControl>
                      <Input placeholder="Software Engineer" {...field} />
                    </FormControl>
                    <ErrorMessage>{form.formState.errors.occupation?.message}</ErrorMessage>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="TCS" {...field} />
                    </FormControl>
                    <ErrorMessage>{form.formState.errors.company?.message}</ErrorMessage>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lifestyle</CardTitle>
            <CardDescription>Your lifestyle preferences</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="diet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diet</FormLabel>
                  <FormControl>
                    <select 
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      {...field}
                    >
                      <option value="veg">Vegetarian</option>
                      <option value="non-veg">Non-Vegetarian</option>
                      <option value="jsr">Jain Strict</option>
                      <option value="other">Other</option>
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="smoking"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Smoking</FormLabel>
                    <FormControl>
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" {...field}>
                        <option value="never">Never</option>
                        <option value="occasional">Occasional</option>
                        <option value="regular">Regular</option>
                      </select>
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="drinking"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Drinking</FormLabel>
                    <FormControl>
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" {...field}>
                        <option value="never">Never</option>
                        <option value="occasional">Occasional</option>
                        <option value="regular">Regular</option>
                      </select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full lg:w-auto">Save Profile</Button>
      </form>
    </Form>
  )
}