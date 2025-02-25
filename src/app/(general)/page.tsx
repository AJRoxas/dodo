import HookSection from '@/components/landing-page/HookSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGraduationCap,
  faPencil,
  faGears,
  faChartPie,
  faCompassDrafting,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

interface FeatureIconProps {
  icon: IconDefinition;
  title: string;
  description: string;
}
const FeatureIcon = ({ icon, title, description }: FeatureIconProps) => {
  return (
    <div className="w-75 h-20 flex gap-2 items-center">
      <div className="flex justify-center items-center h-20 w-20">
        <FontAwesomeIcon icon={icon} className="h-12! w-fit fill-light" />
      </div>
      <div className="w-55">
        <div className="font-medium">{title}</div>
        <div className="text-sm">{description}</div>
      </div>
    </div>
  );
};

const currentFeatures = [
  {
    icon: faGraduationCap,
    title: 'Create goals easily',
    description: 'Set goals for your courses and academic career',
  },
  {
    icon: faPencil,
    title: 'Track Grades',
    description: 'Record assessments, with marks calculated for you',
  },
  {
    icon: faGears,
    title: 'Course Insights',
    description: 'See how well you’re doing with progress analysis',
  },
];

const upcomingFeatures = [
  {
    icon: faChartPie,
    title: 'Data Visualization',
    description: 'See useful charts that help analyze your progress',
  },
  {
    icon: faCompassDrafting,
    title: 'Customization',
    description: 'Create custom course tags, assessment categories',
  },
];

const Home = () => {
  return (
    <main className="">
      <HookSection></HookSection>
      <div className="flex flex-col justify-center items-center gap-8 p-10 sm:p-20 bg-gradient-primary text-light">
        <div className="font-semibold text-3xl">What can dodo do?</div>
        <div className="w-full max-w-5xl flex justify-center items-center flex-wrap gap-5">
          {currentFeatures.map((feature, index) => (
            <FeatureIcon
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            ></FeatureIcon>
          ))}
        </div>
        <div className="font-semibold text-3xl">What to expect soon!</div>
        <div className="w-full max-w-5xl flex justify-center items-center flex-wrap gap-5">
          {upcomingFeatures.map((feature, index) => (
            <FeatureIcon
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            ></FeatureIcon>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-1 p-10 sm:p-20">
        <div className="max-w-xs font-semibold text-3xl text-center text-primary">
          Want to know more about dodo?
        </div>
        <div className="max-w-xs text-center w-full">
          You can visit the{' '}
          <a href="https://github.com/AJRoxas/dodo">
            <u>dodo repository</u>
          </a>{' '}
          to learn more about this project!
        </div>
      </div>
    </main>
  );
};

export default Home;
