import * as THREE from "three";
import { WorkTimelinePoint } from "../types";

export const WORK_TIMELINE: WorkTimelinePoint[] = [
  {
    point: new THREE.Vector3(0, 0, 0),
    year: 'School',
    title: 'Little Flower Convent School',
    subtitle: 'Schooling',
    position: 'right',
  },
  {
    point: new THREE.Vector3(-4, -4, -3),
    year: 'Current',
    title: 'Newton School of Technology',
    subtitle: 'B.Tech in CS & Technology',
    position: 'left',
  },
  {
    point: new THREE.Vector3(-3, -1, -6),
    year: '2025',
    title: 'TopSkill',
    subtitle: 'Intern — 3 Months',
    position: 'left',
  },
  {
    point: new THREE.Vector3(0, -1, -10),
    year: new Date().toLocaleDateString('default', { year: 'numeric' }),
    title: '?',
    subtitle: 'What\'s Next...',
    position: 'right',
  },
]