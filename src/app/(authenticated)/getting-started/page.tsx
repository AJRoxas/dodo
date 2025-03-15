import { Form } from 'radix-ui';
import Button from '@/components/Button';
import { FormEmail } from '@/components/forms/FormInput';

const GettingStartedPage = () => {
  const formSubmission = async (formData: FormData) => {
    'use server';

    console.log(formData);
  };

  return (
    <main className="container-col">
      <Form.Root action={formSubmission}>
        <div className="flex flex-col gap-8 w-px-300 sm:w-px-640 motion-safe:animate-fade-left">
          <div className="mb-8">
            <div className="text-3xl font-semibold">Getting Started</div>
            <div className="text-sm">
              Answer the following questions to get started
            </div>
          </div>

          <FormEmail
            name="email"
            label="Email"
            type="email"
            placeholder="dodo@ajr.dodo.ca"
            required={false}
          ></FormEmail>

          <Form.Submit asChild>
            <Button>Submit</Button>
          </Form.Submit>
        </div>
      </Form.Root>
    </main>
  );
};

export default GettingStartedPage;
