'use client';

import Button from '@/components/Button';
import GpaScaleRow from '@/components/forms/GpaScaleRow';
import { GpaScaleEntry } from '@@/types';
import { faArrowUp91, faDiagramNext, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { FormInput } from '@/components/forms/FormInput';
import {
  validateGpaScaleGpas,
  validateGpaScaleGrades,
  validateGpaScaleHasFailingGrade,
  validateGpaScaleLetters,
} from '@/lib/utils/validations';

const defaultScale: GpaScaleEntry[] = (() => {
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
  initScale?: GpaScaleEntry[];
}

const GpaScale = ({ initScale = defaultScale }: GpaScaleProps) => {
  const [scale, setScale] = useState<GpaScaleEntry[]>(initScale);

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

  const sortScale = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    scale.sort((a: GpaScaleEntry, b: GpaScaleEntry) => {
      if (b === undefined) return -1;
      if (a === undefined) return 1;
      return b.grade! - a.grade!;
    });
    setScale([...scale]);
  };

  const addToScale = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    setScale([...scale, {
      id: Date.now()
    }]);
  };

  const resetScale = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    setScale([...initScale]);
  };

  // 80 and 180
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="text-2xl font-semibold">GPA Scale</div>
        <div className="text-sm">
          To submit your GPA scale, it must meet the following
          requirements:
          <div className="text-xs font-semibold">
            <li
              className={
                validateGpaScaleLetters(scale) ? undefined : 'text-error'
              }
            >
              Letters are 1&minus;3 characters and unique
            </li>
            <li
              className={validateGpaScaleGpas(scale) ? undefined : 'text-error'}
            >
              GPAs are 0 or higher
            </li>
            <li
              className={
                validateGpaScaleGrades(scale) ? undefined : 'text-error'
              }
            >
              Grades are 0 or higher and unique
            </li>
            <li
              className={
                validateGpaScaleHasFailingGrade(scale)
                  ? undefined
                  : 'text-error'
              }
            >
              At least one grade must start at 0
            </li>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-2">
        <Button icon={faArrowUp91} isHalved={true} onClick={sortScale}>
          Sort
        </Button>
        <Button icon={faDiagramNext} isHalved={true} onClick={addToScale}>
          Add
        </Button>
        <Button icon={faRotateRight} isHalved={true} onClick={resetScale}>
          Reset
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
          <GpaScaleRow
            key={id}
            id={id}
            letter={letter}
            gpa={gpa}
            grade={grade}
            onClick={(e) => {
              e.preventDefault();
              removeGrade(id);
            }}
            changeLetter={(event: React.ChangeEvent<HTMLInputElement>) => {
              modifyLetter(id, event.target.value as string);
            }}
            changeGpa={(event: React.ChangeEvent<HTMLInputElement>) => {
              modifyGpa(id, Number(event.target.value));
            }}
            changeGrade={(event: React.ChangeEvent<HTMLInputElement>) => {
              modifyGrade(id, Number(event.target.value));
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
