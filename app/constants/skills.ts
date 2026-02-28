export interface Skill {
    name: string;
    category: 'Frontend' | 'Backend' | 'Tools' | 'Soft Skills';
    level: number; // 0 to 100
}

export const SKILLS: Skill[] = [
    { name: 'React.js', category: 'Frontend', level: 90 },
    { name: 'Next.js', category: 'Frontend', level: 85 },
    { name: 'JavaScript', category: 'Frontend', level: 95 },
    { name: 'TypeScript', category: 'Frontend', level: 80 },
    { name: 'Three.js / R3F', category: 'Frontend', level: 75 },
    { name: 'Tailwind CSS', category: 'Frontend', level: 90 },
    { name: 'Node.js', category: 'Backend', level: 80 },
    { name: 'Express.js', category: 'Backend', level: 75 },
    { name: 'MongoDB', category: 'Backend', level: 85 },
    { name: 'Java', category: 'Backend', level: 85 },
    { name: 'Git', category: 'Tools', level: 90 },
    { name: 'Postman', category: 'Tools', level: 85 },
    { name: 'Figma', category: 'Tools', level: 75 },
];
