import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const toyota = await prisma.brand.create({
    data: {
      name: 'Toyota',

    },
  });

  const honda = await prisma.brand.create({
    data: {
      name: 'Honda',
    },
  });

  const red = await prisma.color.create({
    data: {
      name: 'Red',

    },
  });

  const blue = await prisma.color.create({
    data: {
      name: 'Blue',

    },
  });

  const vehicle1 = await prisma.vehicle.create({
    data: {
      brand_id: toyota.id,
      model: 'Corolla',
      year: 2021,
      price: 20000,

    } as any,
  });

  const vehicle2 = await prisma.vehicle.create({
    data: {
      brand_id: honda.id,
      model: 'Civic',
      year: 2022,
      price: 22.000,

    } as any,
  });

  await prisma.vehicle_color.create({
    data: {
      vehicle_id: vehicle1.id,
      color_id: red.id,
      image: 'corolla_red.jpg',
      default: true,

    } as any,
  });

  await prisma.vehicle_color.create({
    data: {
      vehicle_id: vehicle2.id,
      color_id: blue.id,
      image: 'civic_blue.jpg',
      default: true,

    } as any,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
