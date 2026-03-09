import { PrismaClient } from "../src/generated/prisma/client.ts";
import { PrismaNeon } from '@prisma/adapter-neon'
import "dotenv/config";

const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaNeon({ connectionString })
const prisma = new PrismaClient({adapter})


const userId = "ad6487aa-959d-4642-a361-5174bb425f2a"
const movies = [
  {
    "title": "Hyouka",
    "overview": "Energy-conservative Houtarou Oreki ends up joining the Classic Literature Club and gets dragged into solving various school mysteries by the inquisitive Eru Chitanda.",
    "releaseYear": 2012,
    "genres": ["Mystery", "Romance", "Slice of Life"],
    "runtime": 25,
    "posterUrl": "https://example.com/hyouka.jpg",
    "createdBy": userId
  },
  {
    "title": "The Angel Next Door Spoils Me Rotten",
    "overview": "After Amane Fujimiya lends his umbrella to the school's 'Angel', Mahiru Shiina, a sweet and slow-burning relationship begins to develop between the two neighbors.",
    "releaseYear": 2023,
    "genres": ["Romance", "Slice of Life"],
    "runtime": 24,
    "posterUrl": "https://example.com/otonari-tenshi.jpg",
    "createdBy": userId
  },
  {
    "title": "My Dress-Up Darling",
    "overview": "Wakana Gojo, a shy boy who dreams of becoming a Hina doll craftsman, finds his life turned upside down when the popular Marin Kitagawa asks him to help her with cosplay.",
    "releaseYear": 2022,
    "genres": ["Romance", "Slice of Life", "Seinen"],
    "runtime": 24,
    "posterUrl": "https://example.com/sono-bisque.jpg",
    "createdBy": userId
  },
  {
    "title": "Kaguya-sama: Love is War",
    "overview": "In the elite Shuchiin Academy, Student Council leaders Kaguya Shinomiya and Miyuki Shirogane engage in a series of psychological battles to force the other to confess their love first.",
    "releaseYear": 2019,
    "genres": ["Comedy", "Romance", "Psychological"],
    "runtime": 24,
    "posterUrl": "https://example.com/kaguya.jpg",
    "createdBy": userId
  },
  {
    "title": "Horimiya",
    "overview": "The secret lives of the popular Kyouko Hori and the gloomy-looking Izumi Miyamura intersect outside of school, leading to an unexpected and wholesome bond.",
    "releaseYear": 2021,
    "genres": ["Romance", "Slice of Life", "School"],
    "runtime": 24,
    "posterUrl": "https://example.com/horimiya.jpg",
    "createdBy": userId
  },
  {
    "title": "Kimi ni Todoke: From Me to You",
    "overview": "Sawako Kuronuma, often misunderstood due to her resemblance to the girl from 'The Ring', begins to break out of her shell after the popular Kazehaya starts talking to her.",
    "releaseYear": 2009,
    "genres": ["Romance", "Shoujo", "Slice of Life"],
    "runtime": 23,
    "posterUrl": "https://example.com/kiminitodoke.jpg",
    "createdBy": userId
  },
  {
    "title": "The Dangers in My Heart",
    "overview": "Kyotaro Ichikawa, a lonely student with dark fantasies, finds himself increasingly drawn to the quirky and beautiful class idol, Anna Yamada.",
    "releaseYear": 2023,
    "genres": ["Romance", "Comedy", "School"],
    "runtime": 23,
    "posterUrl": "https://example.com/bokuyaba.jpg",
    "createdBy": userId
  },
  {
    "title": "Rascal Does Not Dream of Bunny Girl Senpai",
    "overview": "Sakuta Azusagawa meets a famous actress dressed as a bunny girl in a library, leading him to investigate the mysterious 'Puberty Syndrome' affecting his peers.",
    "releaseYear": 2018,
    "genres": ["Romance", "Supernatural", "Drama"],
    "runtime": 24,
    "posterUrl": "https://example.com/bunnygirl.jpg",
    "createdBy": userId
  },
  {
    "title": "Golden Time",
    "overview": "Banri Tada, a college student suffering from retrograde amnesia, struggles with his new life and the intense feelings of his classmate Kouko Kaga as his past self begins to resurface.",
    "releaseYear": 2013,
    "genres": ["Romance", "Drama", "Seinen"],
    "runtime": 24,
    "posterUrl": "https://example.com/goldentime.jpg",
    "createdBy": userId
  },
  {
    "title": "Toradora!",
    "overview": "Ryuuji Takasu and Taiga Aisaka form an unlikely alliance to help each other woo their respective crushes, only to realize their feelings might be for one another.",
    "releaseYear": 2008,
    "genres": ["Romance", "Comedy", "Drama"],
    "runtime": 24,
    "posterUrl": "https://example.com/toradora.jpg",
    "createdBy": userId
  }
];

const main = async () => {
  console.log("Seeding movies");

  for (const movie of movies){
    await prisma.movie.create({
      data: movie,
  });
  console.log(`Created Movie: ${movie.title} `);
  }

  console.log("Seeding Completed!")
};

main().catch((err) => {
  console.error(err)
  process.exit(1);
}).finally(async() => {
  await prisma.$disconnect();
})