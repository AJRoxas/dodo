import { Form } from 'radix-ui';
import FormSwitch from '@/components/forms/FormSwitch';


const CourseField = () => {
  return (
    <div className='flex gap-5 flex-wrap mb-10'>
      <FormSwitch name="switch" label="Is pass/fail?" />
      <FormSwitch name="switch" label="Is pass/fail?" />
      <FormSwitch name="switch" label="Is pass/fail?" />
    </div>
  );
};

export default CourseField;
