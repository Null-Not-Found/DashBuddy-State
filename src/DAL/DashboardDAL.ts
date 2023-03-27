import { PrismaClient, Dashboard } from '@prisma/client'

const PRISMA = new PrismaClient();

export async function GetAllDashboards() {
    const DASHBOARDS: Dashboard[] = await PRISMA.dashboard.findMany();
    console.log(DASHBOARDS);
    return DASHBOARDS;
}

GetAllDashboards()
    .catch(e => {
        console.error(e)
    })
    .finally(async () => {
        await PRISMA.$disconnect()
    })