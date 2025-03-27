'use client';

import Button from '@/components/Button';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
// Should not be used as an element

const CourseAssessmentCard = () => {
  const hasLink = Math.random() < 0.5;
  const Element = hasLink ? 'div' : 'a';

  const code = 'Into to Machine Learning';
  const credits = 0.5;
  const res = Math.random() < 0.5;
  const grade = 80;
  const gpa = {
    letter: 'A-',
    gpa: 3.7,
  };
  const progress = 50;

  return (
    <div className="w-75 h-32 p-2 flex flex-col gap-1 bg-light rounded-lg shadow-card">
      <div>
        <div className="w-full flex items-center justify-between">
          <Element
            className="font-semibold text-xl w-36 whitespace-nowrap overflow-hidden text-ellipsis"
            href={res ? undefined : '/'}
          >
            {code}
          </Element>
          <div className="flex gap-1">
            <Button size="fas" icon={faEdit} ariaLabel={`Edit ${code}`} />
            <Button size="fas" icon={faTrash} ariaLabel={`Delete ${code}`} />
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div>Grade: {`${grade}% | ${gpa.gpa} | ${gpa.letter}`}</div>
          <div>Credits: {`${credits}`}</div>
        </div>
      </div>
      <div>
        <div className="font-semibold text-sm">Progress</div>
        <div></div>
        <div className="font-semibold">{progress}%</div>
      </div>
    </div>
  );
};

export default CourseAssessmentCard;
