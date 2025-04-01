'use client';
// Should not be used as an element

import Button from '@/components/Button';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import ProgressBar from './ProgressBar';

interface CourseAssessmentCardProps {
  isAssessment: boolean;
  label: string;
  subOne: string;
  subTwo: string;
  barLabel: string;
  barValue: number;
  onEdit: React.MouseEventHandler;
  onDelete: React.MouseEventHandler;
}

const CourseAssessmentCard = ({
  isAssessment,
  label,
  subOne,
  subTwo,
  barLabel,
  barValue,
  onEdit,
  onDelete,
}: CourseAssessmentCardProps) => {
  const Element = isAssessment ? 'div' : 'a';

  return (
    <div className="w-75 h-32 p-2 flex flex-col gap-1 bg-light rounded-lg shadow-card motion-safe:animate-fade-up">
      <div>
        <div className="w-full flex items-center justify-between">
          <Element
            className={`font-semibold text-xl w-36 whitespace-nowrap overflow-hidden text-ellipsis ${
              isAssessment ? undefined : 'hover:underline'
            }`}
            href={isAssessment ? undefined : '/'}
          >
            {label}
          </Element>
          <div className="flex gap-1">
            <Button
              size="fas"
              icon={faEdit}
              ariaLabel={`Edit ${label}`}
              onClick={onEdit}
            />
            <Button
              size="fas"
              icon={faTrash}
              ariaLabel={`Delete ${label}`}
              onClick={onDelete}
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div>{subOne}</div>
          <div>{subTwo}</div>
        </div>
      </div>
      <div>
        <div className="font-semibold text-sm">{barLabel}</div>
        <ProgressBar percent={barValue} className="h-2" />
        <div className="font-semibold">{barValue}%</div>
      </div>
    </div>
  );
};

export default CourseAssessmentCard;
