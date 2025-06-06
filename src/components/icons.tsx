import {
  FunctionIcon,
  RulerIcon,
  ArrowRightIcon,
  ArrowsOutCardinalIcon,
  CircleDashedIcon,
  LightningIcon,
  TargetIcon,
  ArrowClockwiseIcon,
  PlanetIcon,
  DropIcon,
  ThermometerIcon,
  FireIcon,
  AtomIcon,
  CubeIcon,
  WaveformIcon,
  LightningSlashIcon,
  BatteryChargingIcon,
  MagnetIcon,
  MagnetStraightIcon,
  SpiralIcon,
  WaveSquareIcon,
  RadioIcon,
  EyeIcon,
  WaveTriangleIcon,
  RadioactiveIcon,
  CpuIcon,
  BroadcastIcon,
  FlaskIcon,
  BookOpenIcon,
  CaretRightIcon,
  WaveSineIcon,
  ScalesIcon,
  ClockIcon,
  ChartLineIcon,
  TriangleIcon,
  TableIcon,
  CalculatorIcon,
  CircleNotchIcon,
  ArrowLeftIcon,
  ArrowLineUpIcon,
  UserCircleDashedIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  Icon,
} from "@phosphor-icons/react";

// Icons for each subject
export const getSubjectIcon = (subjectId: string) => {
  const subjectLower = subjectId.toLowerCase();

  switch (subjectLower) {
    case "physics":
      return AtomIcon;
    case "chemistry":
      return FlaskIcon;
    case "mathematics":
      return FunctionIcon;
    default:
      return BookOpenIcon;
  }
};


export const getChapterIconMap = (): Record<string, Icon> => {
  return {
    // Physics chapters
    "Mathematics in Physics": FunctionIcon,
    "Units and Dimensions": RulerIcon,
    "Motion In One Dimension": ArrowRightIcon,
    "Motion In Two Dimensions": ArrowsOutCardinalIcon,
    "Laws of Motion": CircleDashedIcon,
    "Work Power Energy": LightningIcon,
    "Center of Mass Momentum and Collision": TargetIcon,
    "Rotational Motion": ArrowClockwiseIcon,
    Gravitation: PlanetIcon,
    "Mechanical Properties of Solids": CubeIcon,
    "Mechanical Properties of Fluids": DropIcon,
    "Thermal Properties of Matter": ThermometerIcon,
    Thermodynamics: FireIcon,
    "Kinetic Theory of Gases": AtomIcon,
    Oscillations: WaveSineIcon,
    "Waves and Sound": WaveformIcon,
    Electrostatics: LightningSlashIcon,
    Capacitance: BatteryChargingIcon,
    "Current Electricity": LightningIcon,
    "Magnetic Properties of Matter": MagnetIcon,
    "Magnetic Effects of Current": MagnetStraightIcon,
    "Electromagnetic Induction": SpiralIcon,
    "Alternating Current": WaveSquareIcon,
    "Electromagnetic Waves": RadioIcon,
    "Ray Optics": EyeIcon,
    "Wave Optics": WaveTriangleIcon,
    "Dual Nature of Matter": AtomIcon,
    "Atomic Physics": AtomIcon,
    "Nuclear Physics": RadioactiveIcon,
    Semiconductors: CpuIcon,
    "Communication System": BroadcastIcon,
    "Experimental Physics": FlaskIcon,

    // Chemistry chapters
    "Some Basic Concepts of Chemistry": FlaskIcon,
    "Structure of Atom": AtomIcon,
    "Classification of Elements and Periodicity in Properties": TableIcon,
    "Chemical Bonding and Molecular Structure": AtomIcon,
    "States of Matter": DropIcon,
    "Thermodynamics (C)": FireIcon,
    "Chemical Equilibrium": ScalesIcon,
    "Ionic Equilibrium": DropIcon,
    "Redox Reactions": ArrowClockwiseIcon,
    Hydrogen: AtomIcon,
    "s Block Elements": CubeIcon,
    "p Block Elements": CubeIcon,
    "p Block Elements (Group 13 & 14)": CubeIcon,
    "p Block Elements (Group 15, 16, 17 & 18)": CubeIcon,
    "d and f Block Elements": CubeIcon,
    "General Organic Chemistry": FlaskIcon,
    Hydrocarbons: FlaskIcon,
    "Environmental Chemistry": DropIcon,
    "Solid State": CubeIcon,
    Solutions: DropIcon,
    Electrochemistry: LightningIcon,
    "Chemical Kinetics": ClockIcon,
    "Surface Chemistry": DropIcon,
    "General Principles and Processes of Isolation of Metals": CubeIcon,
    "Coordination Compounds": AtomIcon,
    "Haloalkanes and Haloarenes": FlaskIcon,
    "Alcohols Phenols and Ethers": FlaskIcon,
    "Aldehydes and Ketones": FlaskIcon,
    "Carboxylic Acid Derivatives": FlaskIcon,
    Amines: FlaskIcon,
    Biomolecules: FlaskIcon,
    Polymers: FlaskIcon,
    "Chemistry in Everyday Life": FlaskIcon,
    "Practical Chemistry": FlaskIcon,

    // Mathematics chapters
    "Basic of Mathematics": CalculatorIcon,
    "Quadratic Equation": FunctionIcon,
    "Complex Number": FunctionIcon,
    "Permutation Combination": CalculatorIcon,
    "Sequences and Series": FunctionIcon,
    "Mathematical Induction": FunctionIcon,
    "Binomial Theorem": FunctionIcon,
    "Trigonometric Ratios & Identities": WaveSineIcon,
    "Trigonometric Equations": WaveSineIcon,
    "Straight Lines": RulerIcon,
    "Pair of Lines": RulerIcon,
    Circle: CircleDashedIcon,
    Parabola: WaveformIcon,
    Ellipse: CircleDashedIcon,
    Hyperbola: WaveformIcon,
    Limits: FunctionIcon,
    "Mathematical Reasoning": FunctionIcon,
    Statistics: ChartLineIcon,
    "Heights and Distances": ArrowsOutCardinalIcon,
    "Properties of Triangles": TriangleIcon,
    "Sets and Relations": FunctionIcon,
    Matrices: TableIcon,
    Determinants: TableIcon,
    "Inverse Trigonometric Functions": WaveSineIcon,
    Functions: FunctionIcon,
    "Continuity and Differentiability": WaveformIcon,
    Differentiation: FunctionIcon,
    "Application of Derivatives": FunctionIcon,
    "Indefinite Integration": FunctionIcon,
    "Definite Integration": FunctionIcon,
    "Area Under Curves": FunctionIcon,
    "Differential Equations": FunctionIcon,
    "Vector Algebra": ArrowsOutCardinalIcon,
    "Three Dimensional Geometry": CubeIcon,
    "Linear Programming": FunctionIcon,
    Probability: TargetIcon,
  };
};
export const getChapterIcon = (chapterName: string) => {
  const iconMap = getChapterIconMap();
  return iconMap[chapterName] ?? BookOpenIcon;
};


// Trend icons for comparing values
export const StraightTrendUp = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M7 17L17 7M17 7H7M17 7V17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const StraightTrendDown = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M17 7L7 17M7 17H17M7 17V7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const getTrendIcon = (current: number, previous: number) => {
  if (current > previous) return StraightTrendUp;
  if (current < previous) return StraightTrendDown;
  return null;
};

export const getChapterIconJSX = (chapterName: string) => {
  const IconComponent = getChapterIcon(chapterName);
  return <IconComponent className="h-5 w-5" />;
};

export const getSubjectIconJSX = (subjectId: string) => {
  const IconComponent = getSubjectIcon(subjectId);
  return <IconComponent className="h-5 w-5" />;
};

export const getTrendIconJSX = (current: number, previous: number) => {
  if (current > previous) {
    return <ArrowUpIcon className="h-4 w-4 text-green-500" />;
  } else if (current < previous) {
    return <ArrowDownIcon className="h-4 w-4 text-red-500" />;
  }
  return null;
};
