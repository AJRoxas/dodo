import FormSwitch from '@/components/forms/FormSwitch';
import { FormInput } from '../FormInput';

const CourseField = () => {
  return (
    <div className="flex justify-between gap-5 flex-wrap mb-10">
      <FormInput
        name="course_code"
        label="Course Code"
        required={true}
        type="text"
        placeholder="BIO101"
        maxLen={20}
      />
      <FormInput
        name="weight"
        label="Weight"
        min={0}
        required={true}
        type="number"
        placeholder="0.5"
        step="0.01"
      ></FormInput>
      <FormInput
        name="goal_grade"
        label="Goal Grade"
        min={0}
        required={true}
        type="number"
        placeholder="100"
        step="1"
      ></FormInput>
      <FormSwitch name="is_pass_fail" label="Is a pass/fail course?" />
    </div>
  );
};

export default CourseField;
