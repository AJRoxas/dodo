'use client';

import Button from '@/components/Button';
import GpaGrade from '@/components/forms/GpaGrade';
import { Scale } from '@@/types';
import { faArrowUp91 } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { FormInput } from '@/components/forms/FormInput';
import {
  validateGpaScaleGpas,
  validateGpaScaleGrades,
  validateGpaScaleHasFailingGrade,
  validateGpaScaleLetters,
} from '@/lib/utils/validations';

const defaultScale: Scale[] = (() => {
  let key = 1;

  return [
    { id: ++key, letter: 'A+', gpa: 4.0, grade: 90 },
    { id: ++key, letter: 'A', gpa: 4.0, grade: 85 },
    { id: ++key, letter: 'A-', gpa: 3.7, grade: 80 },
    { id: ++key, letter: 'B+', gpa: 3.3, grade: 77 },
    { id: ++key, letter: 'B', gpa: 3.0, grade: 73 },
    { id: ++key, letter: 'B-', gpa: 2.7, grade: 70 },
    { id: ++key, letter: 'C+', gpa: 2.3, grade: 67 },
    { id: ++key, letter: 'C', gpa: 2.0, grade: 63 },
    { id: ++key, letter: 'C-', gpa: 1.7, grade: 60 },
    { id: ++key, letter: 'D+', gpa: 1.3, grade: 57 },
    { id: ++key, letter: 'D', gpa: 1.0, grade: 53 },
    { id: ++key, letter: 'D-', gpa: 0.7, grade: 50 },
    { id: ++key, letter: 'F', gpa: 0, grade: 0 },
  ];
})();

interface GpaScaleProps {
  initScale?: Scale[];
}

const GpaScale = ({ initScale = defaultScale }: GpaScaleProps) => {
  const [scale, setScale] = useState<Scale[]>(initScale);

  // To be used in the future
  useEffect(() => {
    setScale([...initScale]);
  }, [initScale]);

  const removeGrade = (id: number) => {
    setScale(scale.filter((grade) => id != grade.id));
  };

  const modifyLetter = (id: number, letter: string) => {
    setScale(
      scale.map((grade) => {
        if (grade.id == id) {
          return {
            ...grade,
            letter: letter,
          };
        } else {
          return grade;
        }
      })
    );
  };

  const modifyGpa = (id: number, gpa: number) => {
    setScale(
      scale.map((grade) => {
        if (grade.id == id) {
          return {
            ...grade,
            gpa: gpa,
          };
        } else {
          return grade;
        }
      })
    );
  };

  const modifyGrade = (id: number, min: number) => {
    setScale(
      scale.map((grade) => {
        if (grade.id == id) {
          return {
            ...grade,
            grade: min,
          };
        } else {
          return grade;
        }
      })
    );
  };

  const sortScale = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    scale.sort((a: Scale, b: Scale) => b.grade - a.grade);
    setScale([...scale]);
  };

  const resetScale = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    setScale([...initScale]);
  };

  // 80 and 180
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="text-2xl font-semibold">GPA Scale</div>
        <div className="text-sm">
          To submit your GPA scale, your scale must meet the following
          requirements:
          <div className="text-xs font-semibold">
            <li
              className={
                validateGpaScaleLetters(scale) ? undefined : 'text-error'
              }
            >
              Letter grades must be between 1 to 3 characters and unique
            </li>
            <li
              className={validateGpaScaleGpas(scale) ? undefined : 'text-error'}
            >
              GPAs must be at least 0 or above
            </li>
            <li
              className={
                validateGpaScaleGrades(scale) ? undefined : 'text-error'
              }
            >
              Grades must be at least 0 or above and unique
            </li>
            <li
              className={
                validateGpaScaleHasFailingGrade(scale)
                  ? undefined
                  : 'text-error'
              }
            >
              One grade must have a minimum grade of 0
            </li>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-2">
        <Button icon={faArrowUp91} isHalved={true} onClick={sortScale}>
          Sort
        </Button>
        <Button isHalved={true} onClick={resetScale}>
          Reset to Default
        </Button>
      </div>
      <div>
        <div className="min-w-75 max-w-160 flex gap-2 justify-between px-2 mb-2">
          <div className="gpa-cell font-semibold text-sm">Letter</div>
          <div className="gpa-cell font-semibold text-sm">GPA</div>
          <div className="gpa-cell w-full font-semibold text-sm">
            Min. Grade
          </div>
          <div className="min-w-6"></div>
        </div>
        {scale.map(({ id, letter, gpa, grade }) => (
          <GpaGrade
            key={id}
            id={id}
            letter={letter}
            gpa={gpa}
            grade={grade}
            onClick={(e) => {
              e.preventDefault();
              removeGrade(id);
            }}
            changeLetter={(e: React.ChangeEvent<HTMLInputElement>) => {
              modifyLetter(id, e.target.value as string);
            }}
            changeGpa={(e: React.ChangeEvent<HTMLInputElement>) => {
              modifyGpa(id, Number(e.target.value));
            }}
            changeGrade={(e: React.ChangeEvent<HTMLInputElement>) => {
              modifyGrade(id, Number(e.target.value));
            }}
          />
        ))}
      </div>
      <FormInput
        name={`gpa_scale`}
        value={JSON.stringify(scale)}
        label=""
        type="hidden"
      ></FormInput>
    </div>
  );
};

export default GpaScale;
