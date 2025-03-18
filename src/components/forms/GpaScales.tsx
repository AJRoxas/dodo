'use client';

import Button from '@/components/Button';
import GpaGrade from '@/components/forms/GpaGrade';
import { faArrowUp91 } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

type Scale = {
  id: number;
  user_id?: string;
  letter: string;
  gpa: number;
  grade: number;
};

const initialScales: Scale[] = [
  { id: 1, letter: 'A+', gpa: 4.0, grade: 90 },
  { id: 2, letter: 'A', gpa: 4.0, grade: 85 },
  { id: 3, letter: 'A-', gpa: 3.7, grade: 80 },
  { id: 4, letter: 'B+', gpa: 3.3, grade: 77 },
  { id: 5, letter: 'B', gpa: 3.0, grade: 73 },
  { id: 6, letter: 'B-', gpa: 2.7, grade: 70 },
  { id: 7, letter: 'C+', gpa: 2.3, grade: 67 },
  { id: 8, letter: 'C', gpa: 2.0, grade: 63 },
  { id: 9, letter: 'C-', gpa: 1.7, grade: 60 },
  { id: 10, letter: 'D+', gpa: 1.3, grade: 57 },
  { id: 11, letter: 'D', gpa: 1.0, grade: 53 },
  { id: 12, letter: 'D-', gpa: 0.7, grade: 50 },
  { id: 13, letter: 'F', gpa: 0, grade: 0 },
];

const GpaScales = () => {
  const [scale, setScale] = useState<Scale[]>(initialScales);

  // To be used in the future
  useEffect(() => {
    setScale(initialScales);
  }, []);

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
    setScale([...initialScales]);
  };

  // 80 and 180
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="text-2xl font-semibold">GPA Scale</div>
        <div className="text-sm">
          Letter grades must be between 1 to 3 characters, GPAs must be at least
          0 or above, Grades must be at least 0 or above
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
    </div>
  );
};

export default GpaScales;
