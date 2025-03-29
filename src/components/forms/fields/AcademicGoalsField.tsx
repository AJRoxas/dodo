import { FormInput } from '@/components/forms/FormInput';

const AcademicGoalsField = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="text-2xl font-semibold">Academic Goals</div>
        <div className="flex flex-wrap justify-between gap-4">
          <FormInput
            name="required_credits"
            label="Required Credits"
            min={0}
            required={true}
            type="number"
            placeholder="20.0"
            step="0.01"
          ></FormInput>
          <FormInput
            name="final_gpa_goal"
            label="Final GPA Goal"
            min={0}
            required={true}
            type="number"
            placeholder="4.0"
            step="0.01"
          ></FormInput>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <div className="text-xl font-semibold">Add Completed Courses</div>
          <div className="text-sm">
            If you already completed courses, you can add your current GPA
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-4">
          <FormInput
            name="initial_credits"
            label="Initial Credits"
            min={0}
            required={true}
            type="number"
            placeholder="20.0"
            step="0.01"
          ></FormInput>
          <FormInput
            name="initial_gpa"
            label="Initial GPA"
            min={0}
            required={true}
            type="number"
            placeholder="4.0"
            step="0.01"
          ></FormInput>
        </div>
      </div>
    </>
  );
};

export default AcademicGoalsField;
