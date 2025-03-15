import { Form } from 'radix-ui';
import Button from '@/components/Button';
import { FormInput } from '@/components/forms/FormInput';

const GettingStartedPage = () => {
  const formSubmission = async (formData: FormData) => {
    'use server';

    console.log(formData);
  };

  return (
    <main className="container-col">
      <Form.Root action={formSubmission}>
        <div className="flex flex-col gap-8 w-px-300 sm:w-px-640 motion-safe:animate-fade-left">
          <div>
            <div className="text-3xl font-semibold">Getting Started</div>
            <div className="text-sm">
              Answer the following questions to get started
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-3xl font-semibold">Academic Goals</div>
            <div className="flex flex-wrap justify-between gap-4">
              <FormInput
                name="email"
                label="Email"
                placeholder="dodo@ajr.dodo.ca"
                value="Example"
                required={false}
                type="email"
              ></FormInput>
              <FormInput
                name="num"
                label="Final GPA Goal"
                min={0}
                max={4}
                required={false}
                type="number"
              ></FormInput>
            </div>
          </div>

          <Form.Submit asChild>
            <Button>Submit</Button>
          </Form.Submit>
        </div>
      </Form.Root>
    </main>
  );
};

export default GettingStartedPage;
