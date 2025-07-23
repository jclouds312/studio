import type { Application } from "@prisma/client";
import { allUsers } from "./users";
import { allJobs } from "./jobs";

const workerUser = allUsers.find(u => u.email === 'trabajador@test.com');
const anaUser = allUsers.find(u => u.email === 'ana.garcia@example.com');
const frontendJob = allJobs.find(j => j.title.includes('Frontend Developer'));
const designJob = allJobs.find(j => j.title.includes('Diseñador/a UX/UI'));

export const allApplications: Application[] = [];

if (workerUser && frontendJob) {
    allApplications.push({
        id: 'app_1',
        userId: workerUser.id,
        jobId: frontendJob.id,
        status: 'CONTACTADO',
        customAnswers: JSON.stringify([
             { question: '¿Cuál es tu experiencia con Next.js App Router?', answer: 'Tengo más de 1 año de experiencia trabajando con el App Router en proyectos profesionales.' },
             { question: 'Describe un proyecto complejo en el que hayas trabajado.', answer: 'Desarrollé una plataforma de e-commerce con un dashboard de analíticas en tiempo real.' }
        ]),
        createdAt: new Date('2024-07-22T10:00:00Z'),
        updatedAt: new Date('2024-07-22T10:00:00Z'),
    });
}

if (anaUser && designJob) {
    allApplications.push({
        id: 'app_2',
        userId: anaUser.id,
        jobId: designJob.id,
        status: 'EN_REVISION',
        customAnswers: JSON.stringify([
            { question: 'Por favor, comparte un enlace a tu portafolio.', answer: 'Claro, mi portafolio está en mi.sitio.com/portfolio' },
            { question: '¿Cuál es tu proceso de diseño habitual?', answer: 'Comienzo con investigación de usuario, luego wireframing, prototipado en Figma y finalmente pruebas de usabilidad.' }
        ]),
        createdAt: new Date('2024-07-21T15:30:00Z'),
        updatedAt: new Date('2024-07-21T15:30:00Z'),
    });
}
