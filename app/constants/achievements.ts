export interface Achievement {
    id: number;
    title: string;
    description: string;
    date: string;
    url?: string;
}

export const ACHIEVEMENTS: Achievement[] = [
    {
        id: 1,
        title: "SIH 2025 Winner",
        description: "Secured top position at the Smart India Hackathon 2025 building innovative tech solutions.",
        date: "2025"
    },
    {
        id: 2,
        title: "GDG 3rd Place",
        description: "Won 3rd place at Google Developer Groups hackathon for an impactful community project.",
        date: "2025"
    },
    {
        id: 3,
        title: "Klymo 3rd Place",
        description: "Awarded 3rd place at Klymo Hack for building a high-performance scalable application.",
        date: "2024"
    },
    {
        id: 4,
        title: "SehatSathi Platform",
        description: "Built an AI-powered healthcare platform optimizing rural and urban medical access.",
        date: "2024"
    }
];
