import mongoose from "mongoose";
import Movie from "../api/models/Movie.model.js";

const NOW_PLAYING_MOVIES = [
  {
    title: "Borderlands",
    poster_path: "/865DntZzOdX6rLMd405R0nFkLmL.jpg",
    release_date: "2024-08-07",
    original_language: "en",
    overview:
      "Returning to her home planet, an infamous bounty hunter forms an unexpected alliance with a team of unlikely heroes. Together, they battle monsters and dangerous bandits to protect a young girl who holds the key to unimaginable power.",
    genres: ["Action", "Science Fiction", "Comedy", "Adventure", "Thriller"],
    vote_average: 5.855,
    vote_count: 414,
  },
  {
    title: "The Killer",
    poster_path: "/6PCnxKZZIVRanWb710pNpYVkCSw.jpg",
    release_date: "2024-08-22",
    original_language: "en",
    overview:
      "Zee is a feared contract killer known as 'the Queen of the Dead,' but when she refuses to murder a young blind woman, she finds herself hunted both by criminal colleagues and a determined police detective.",
    genres: ["Action", "Thriller", "Crime"],
    vote_average: 6.483,
    vote_count: 143,
  },
  {
    title: "Inside Out 2",
    poster_path: "/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    release_date: "2024-06-11",
    original_language: "en",
    overview:
      "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.",
    genres: ["Animation", "Family", "Adventure", "Comedy"],
    vote_average: 7.7,
    vote_count: 3417,
  },
  {
    title: "Twilight of the Warriors: Walled In",
    poster_path: "/PywbVPeIhBFc33QXktnhMaysmL.jpg",
    release_date: "2024-04-23",
    original_language: "cn",
    overview:
      "Set in the 1980s, troubled youth Chan Lok-kwun accidentally enters the Walled City, discovers the order amidst its chaos, and learns important life lessons along the way. In the Walled City, he becomes close friends with Shin, Twelfth Master and AV. Under the leadership of Cyclone, they resist against the invasion of villain Mr. Big in a series of fierce battles. Together, they vow to protect the safe haven that is Kowloon Walled City.",
    genres: ["Action", "Adventure", "Crime", "Thriller"],
    vote_average: 6.893,
    vote_count: 117,
  },
  {
    title: "Despicable Me 4",
    poster_path: "/wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
    release_date: "2024-06-20",
    original_language: "en",
    overview:
      "Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
    genres: ["Animation", "Family", "Comedy", "Action"],
    vote_average: 7.209,
    vote_count: 1502,
  },
  {
    title: "Beetlejuice Beetlejuice",
    poster_path: "/kKgQzkUCnQmeTPkyIwHly2t6ZFI.jpg",
    release_date: "2024-09-04",
    original_language: "en",
    overview:
      "After a family tragedy, three generations of the Deetz family return home to Winter River. Still haunted by Beetlejuice, Lydia's life is turned upside down when her teenage daughter, Astrid, accidentally opens the portal to the Afterlife.",
    genres: ["Comedy", "Horror", "Fantasy"],
    vote_average: 7.237,
    vote_count: 217,
  },
  {
    title: "Beetlejuice",
    poster_path: "/nnl6OWkyPpuMm595hmAxNW3rZFn.jpg",
    release_date: "1988-03-30",
    original_language: "en",
    overview:
      "A newly dead New England couple seeks help from a deranged demon exorcist to scare an affluent New York family out of their home.",
    genres: ["Comedy", "Horror", "Fantasy"],
    vote_average: 7.38,
    vote_count: 6872,
  },
  {
    title: "Twisters",
    poster_path: "/pjnD08FlMAIXsfOLKQbvmO0f0MD.jpg",
    release_date: "2024-07-10",
    original_language: "en",
    overview:
      "As storm season intensifies, the paths of former storm chaser Kate Carter and reckless social-media superstar Tyler Owens collide when terrifying phenomena never seen before are unleashed. The pair and their competing teams find themselves squarely in the paths of multiple storm systems converging over central Oklahoma in the fight of their lives.",
    genres: ["Action", "Adventure", "Thriller"],
    vote_average: 7.005,
    vote_count: 1312,
  },
  {
    title: "Trap",
    poster_path: "/jwoaKYVqPgYemFpaANL941EF94R.jpg",
    release_date: "2024-07-31",
    original_language: "en",
    overview:
      "A father and teen daughter attend a pop concert, where they realize they're at the center of a dark and sinister event.",
    genres: ["Crime", "Thriller"],
    vote_average: 6.544,
    vote_count: 937,
  },
  {
    title: "Gunner",
    poster_path: "/5wOdd0PqE2hHGQmePdR1HtRNPgI.jpg",
    release_date: "2024-08-16",
    original_language: "en",
    overview:
      "While on a camping trip in order to reconnect, war veteran Colonel Lee Gunner must save his two sons from a gang of violent bikers when they're kidnapped after accidentally stumbling upon to a massive drug operation.",
    genres: ["Action", "Crime", "Thriller"],
    vote_average: 5.2,
    vote_count: 63,
  },
  {
    title: "Kill",
    poster_path: "/m2zXTuNPkywdYLyWlVyJZW2QOJH.jpg",
    release_date: "2024-07-03",
    original_language: "hi",
    overview:
      "When an army commando finds out his true love is engaged against her will, he boards a New Dehli-bound train in a daring quest to derail the arranged marriage. But when a gang of knife-wielding thieves begin to terrorize innocent passengers on his train, the commando takes them on himself in a death-defying kill-spree to save those around him — turning what should have been a typical commute into an adrenaline-fueled thrill ride.",
    genres: ["Action", "Thriller"],
    vote_average: 6.8,
    vote_count: 121,
  },
  {
    title: "The Union",
    poster_path: "/d9CTnTHip1RbVi2OQbA2LJJQAGI.jpg",
    release_date: "2024-08-15",
    original_language: "en",
    overview:
      "A New Jersey construction worker goes from regular guy to aspiring spy when his long-lost high school sweetheart recruits him for an espionage mission.",
    genres: ["Action", "Comedy"],
    vote_average: 6.253,
    vote_count: 583,
  },
  {
    title: "It Ends with Us",
    poster_path: "/4TzwDWpLmb9bWJjlN3iBUdvgarw.jpg",
    release_date: "2024-08-07",
    original_language: "en",
    overview:
      "When a woman's first love suddenly reenters her life, her relationship with a charming, but abusive neurosurgeon is upended, and she realizes she must learn to rely on her own strength to make an impossible choice for her future.",
    genres: ["Romance", "Drama"],
    vote_average: 6.77,
    vote_count: 265,
  },
  {
    title: "Alien: Romulus",
    poster_path: "/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg",
    release_date: "2024-08-13",
    original_language: "en",
    overview:
      "In this new chapter of the Alien franchise, survivors of a devastating alien attack on their colony must navigate the hostile planet as they seek safety and escape from the relentless threat that haunts them.",
    genres: ["Science Fiction", "Horror"],
    vote_average: 6.434,
    vote_count: 278,
  },
  {
    title: "The Last Laugh",
    poster_path: "/w92xym06jT2Pmc9UVhCFw09P3fB.jpg",
    release_date: "2024-09-06",
    original_language: "en",
    overview:
      "In a bid to reignite his career, a washed-up comedian discovers that a successful comedian is using his old material as their own. The ensuing legal battle becomes a larger fight for his own sense of self-worth and identity.",
    genres: ["Comedy", "Drama"],
    vote_average: 6.23,
    vote_count: 103,
  },
  {
    title: "Longlegs",
    poster_path: "/5aj8vVGFwGVbQQs26ywhg4Zxk2L.jpg",
    release_date: "2024-07-10",
    original_language: "en",
    overview:
      "FBI Agent Lee Harker is assigned to an unsolved serial killer case that takes an unexpected turn, revealing evidence of the occult. Harker discovers a personal connection to the killer and must stop him before he strikes again.",
    genres: ["Crime", "Horror", "Thriller"],
    vote_average: 6.721,
    vote_count: 754,
  },
  {
    title: "Jackpot!",
    poster_path: "/fOsamTFIyGxjw1jLSKdZYxQBJOT.jpg",
    release_date: "2024-08-13",
    original_language: "en",
    overview:
      "In the near future, a 'Grand Lottery' has been established - the catch: kill the winner before sundown to legally claim their multi-billion dollar jackpot. When Katie Kim mistakenly finds herself with the winning ticket, she reluctantly joins forces with amateur lottery protection agent Noel Cassidy who must get her to sundown in exchange for a piece of her prize.",
    genres: ["Comedy", "Science Fiction"],
    vote_average: 6.387,
    vote_count: 426,
  },
  {
    title: "Harold and the Purple Crayon",
    poster_path: "/dEsuQOZwdaFAVL26RjgjwGl9j7m.jpg",
    release_date: "2024-07-31",
    original_language: "en",
    overview:
      "Inside of his book, adventurous Harold can make anything come to life simply by drawing it. After he grows up and draws himself off the book's pages and into the physical world, Harold finds he has a lot to learn about real life.",
    genres: ["Adventure", "Family", "Fantasy", "Comedy"],
    vote_average: 6.875,
    vote_count: 100,
  },
  {
    title: "Saving Bikini Bottom: The Sandy Cheeks Movie",
    poster_path: "/30YnfZdMNIV7noWLdvmcJS0cbnQ.jpg",
    release_date: "2024-08-01",
    original_language: "en",
    overview:
      "When Bikini Bottom is scooped from the ocean, scientific squirrel Sandy Cheeks and her pal SpongeBob SquarePants saddle up for Texas to save their town.",
    genres: ["Animation", "Comedy", "Adventure", "Family"],
    vote_average: 6.4,
    vote_count: 205,
  },
  {
    title: "Untamed Royals",
    poster_path: "/iEe9RODlNgobupiksZ2vE4TZwUg.jpg",
    release_date: "2024-08-27",
    original_language: "es",
    overview:
      "A group of wealthy teenagers commit crimes that escalate from petty mischief to dangerous plots, causing chaotic consequences — but not for themselves.",
    genres: ["Thriller", "Crime", "Drama"],
    vote_average: 6.067,
    vote_count: 30,
  },
  {
    title: "The Garfield Movie",
    poster_path: "/p6AbOJvMQhBmffd0PIv0u8ghWeY.jpg",
    release_date: "2024-04-30",
    original_language: "en",
    overview:
      "Garfield, the world-famous, Monday-hating, lasagna-loving indoor cat, is about to have a wild outdoor adventure! After an unexpected reunion with his long-lost father – scruffy street cat Vic – Garfield and his canine friend Odie are forced from their perfectly pampered life into joining Vic in a hilarious, high-stakes heist.",
    genres: ["Animation", "Comedy", "Adventure", "Family"],
    vote_average: 7.125,
    vote_count: 896,
  },
];

const moviesDocuments = NOW_PLAYING_MOVIES.map((movie) => new Movie(movie));

export const moviesSeeds = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(async () => {
      const allMovies = await Movie.find();

      if (allMovies.length) {
        await Movie.collection.drop();
      }
    })
    .catch((err) => console.log(`Error deleting data: ${err}`))
    .then(async () => {
      await Movie.insertMany(moviesDocuments);
      console.log("Collection created successfully!");
    })
    .catch((err) => console.log(`Error create collection: ${err}`))
    .finally(() => mongoose.disconnect());
};


