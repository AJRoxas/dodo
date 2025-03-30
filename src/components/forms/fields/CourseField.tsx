import FormSwitch from '@/components/forms/FormSwitch';
import { FormInput } from '../FormInput';
import FormSelect from '../FormSelect';
import { courses, tags } from '@prisma/client';
import { CourseWithStats } from '@@/types';

interface CourseFieldProps {
  tags: tags[];
  selectPlaceholder?: string;
  course?: courses | CourseWithStats;
}

const CourseField = ({
  tags,
  selectPlaceholder,
  course,
}: Readonly<CourseFieldProps>) => {
  return (
    <div className="flex justify-between gap-5 flex-wrap mb-10">
      <FormInput
        name="course_code"
        label="Course Code"
        required={true}
        type="text"
        placeholder="BIO101"
        maxLen={20}
        value={course?.course_code}
      />
      <FormInput
        name="weight"
        label="Weight"
        min={0}
        required={true}
        type="number"
        placeholder="0.5"
        step="0.01"
        value={course?.weight}
      />
      <FormInput
        name="goal_grade"
        label="Goal Grade"
        min={0}
        required={true}
        type="number"
        placeholder="100"
        step="1"
        value={course?.goal_grade}
      />
      <FormSwitch
        name="is_pass_fail"
        label="Is a pass/fail course?"
        isChecked={course?.is_pass_fail}
      />
      <FormSelect options={tags} placeholder={selectPlaceholder} />
      <FormInput
        name="year"
        label="Starting Year"
        min={1900}
        max={2999}
        required={true}
        type="number"
        placeholder={new Date().getFullYear().toString()}
        step="1"
      />
    </div>
  );
};

export default CourseField;
