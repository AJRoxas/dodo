import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormInput } from '@/components/forms/FormInput';
import Button from '@/components/Button';

interface GpaGradeProps {
  id: number;
  letter: string;
  gpa: number;
  grade: number;
  onClick: React.MouseEventHandler<HTMLElement>;
  changeLetter?: React.ChangeEventHandler<HTMLElement>;
  changeGpa?: React.ChangeEventHandler<HTMLElement>;
  changeGrade?: React.ChangeEventHandler<HTMLElement>;
}

const GpaGrade = ({
  id,
  letter,
  gpa,
  grade,
  onClick,
  changeLetter,
  changeGpa,
  changeGrade,
}: GpaGradeProps) => {
  return (
    <div className="min-w-75 max-w-160 flex gap-2 justify-between px-2 mb-2">
      <FormInput
        name={`${id}-letter`}
        value={letter}
        maxLen={3}
        label=""
        required={true}
        type="text"
        placeholder="A+"
        hasMessages={false}
        hasLabel={false}
        customStyles="gpa-cell"
        customOnChange={changeLetter}
      ></FormInput>
      <FormInput
        name={`${id}-gpa`}
        label=""
        value={gpa}
        min={0}
        required={true}
        type="number"
        placeholder="4.0"
        hasMessages={false}
        hasLabel={false}
        customStyles="gpa-cell"
        customOnChange={changeGpa}
      ></FormInput>
      <FormInput
        name={`${id}-grade`}
        value={grade}
        label=""
        min={0}
        required={true}
        type="number"
        placeholder="100"
        hasMessages={false}
        hasLabel={false}
        customStyles="gpa-cell"
        customOnChange={changeGrade}
      ></FormInput>
      <div className="w-6 flex flex-col justify-center">
        <Button icon={faXmark} size="fas" onClick={onClick} />
      </div>
    </div>
  );
};

export default GpaGrade;
