const boardMembers = [
  {
    id: 1,
    name: "Rami Abdou",
    major: "Computer Science",
    year: 20,
    socials: {
      I: null,
      F: null,
      L: "https://www.linkedin.com/in/rami-abdou/"
    },
    position: "Co-President",
    bio: `My major is Computer Science, and I am currently serving as one of
    URMC’s Co-Presidents. I want to merge my passion for coding and product
    development with my love for the URM community, especially at Cornell. I
    hope that I can take what I’ve learned in my CIS courses and use it to
    inspire others to create community impact. If you at all related to my
    interests and goals, please reach out to me because I have a dope side
    project in the works right now!`,
    askMe: [
      "Machine Learning",
      "Basketball",
      "My Story",
      "Being Egyptian",
      "Entrepreneruship",
      "Being Jehron's BFF"
    ]
  },

  {
    id: 2,
    name: "Raheel Abeiku Yanful",
    major: "Computer Science",
    year: 21,
    socials: {
      I: "https://www.instagram.com/raheelyanful/",
      F: null,
      L: "https://www.linkedin.com/in/ryanful/"
    },
    position: "Co-Events Chair",
    bio: `Raheel is an Ahmadi Muslim of Ghanaian descent from the Bronx. He
    majors in Computer Science and plans to minor in Engineering Entrepreneurship.
    
    Through URMC, Raheel has found purpose. He knew he wanted to serve the
    members of his community but he didn’t know how and feared his time was
    running out. Raheel believes URMs have unlimited potential but can often
    lack the confidence necessary to reach their full potential. Raheel believes
    it is his responsibility to make sure that he uplifts himself and his fellow
    URMs and leverages all of the knowledge at his disposal to help actualize
    their goals and dreams.
    
    He loves photography, coding, learning, (trying to love) reading, and
    stepping out of his comfort zone.
    
    He values self-reflection, self-accountability, self-discipline, and
    self-control.`,
    askMe: [
      "Photography",
      "Joe Budden Podcast",
      "Rick and Morty",
      "Rick Ross",
      "Bas",
      "Mick Jenkins"
    ]
  },

  {
    id: 3,
    name: "Tewodros 'Tedi' Mitiku",
    major: "Computer Science",
    year: 23,
    socials: {
      I: "https://www.instagram.com/ted_inho/",
      F: "https://www.facebook.com/tewodros.mitiku.165",
      L: "https://www.linkedin.com/in/tewodros-mitiku-146660144/"
    },
    position: "Co-Events Chair",
    bio: `I am a freshman in the College of Engineering studying Computer
      Science with a plan to minor in either Business or Philosophy. I grew up
      in Northern Virginia, right outside of D.C and have always maintained a
      burning passion for Computer Science and technology. In addition to CS, I
      love music, culture, philosophy, and lifting. So if I'm not in a class,
      grinding at Uris, sleeping in Donlon, golfing at Robert Trent, eating at
      Appel, or lifting at Teagle, then I'm usually walking to one of those
      places.`,
    askMe: [
      "Philosophy",
      "Weightlifting",
      "Ethiopia",
      "The Come Up",
      "Chicken and Rice"
    ]
  },

  {
    id: 4,
    name: "Esuvat Bomani",
    major: "Information Science",
    year: 21,
    socials: {
      I: "http://instagram.com/kyymberli/",
      F: null,
      L: "http://linkedin.com/in/esuvatkimberlyb/"
    },
    position: "Professional Development Chair",
    bio: `A junior studying Interactive Technologies who is passionate about the
    prosperity of URM's in computing and entrepreneurship as a means to
    liberation.  I am a Tanzanian native from the Masai and Sukuma tribe and my
    hometown is Arusha. In my free time, you can find me either learning
    something new online, doing programming challenges, tracking corporate
    career pages for new positions, defending Moe's, reading self help books,
    napping, working out, or painting in gouache.`,
    askMe: [
      "Opportunities",
      "Resumes",
      "Mock Interviews",
      "Professional Development"
    ]
  },

  {
    id: 10,
    name: "Dami Odunowo",
    major: "Communication",
    year: 21,
    socials: {
      I: 'https://www.instagram.com/damiod/',
      F: null,
      L: 'https://www.linkedin.com/in/latifahodunowo'
    },
    position: "Co-PR and Alumni Chair",
    bio: `Hi I'm Dami! Co-Public Relations and Alumni Chair. I'm a Communication
    major and minoring in Information Science in the College of Agriculture and
    Life Sciences. I'm originally from Lagos, Nigeria and currently call London,
    England home. URMC helped me discover and develop my love for product design.
    I was embraced even with my non-technical background and given the chance to
    use my skills to pay the org forward. I have made it a personal goal to
    ensure other URMs like myself, who are interested in tech, know that they
    are always welcome!`,
    askMe: [
      "Music",
      "All Shoes but Jordans",
      "Hosting a Radio Show",
      "Python",
      "Marketing"
    ]
  },

  {
    id: 5,
    name: "Emily Romero",
    major: "Computer Science",
    year: 23,
    socials: {
      I: "https://www.instagram.com/emilyrxmero/",
      F: "https://m.facebook.com/emily.ann.507464",
      L: "https://www.linkedin.com/in/emily-romero-4b2913196"
    },
    position: "Co-PR and Alumni Chair",
    bio: `Hey! My name is Emily and I am a freshman currently pursing Computer
    Science in the College of Arts and Sciences. I am a PROUD first-gen in my
    Peruvian household, born and raised in Queens, New York. I am passionate
    about giving back to the community and stressing the importance of a
    community such as URMC. Other than computer science, I enjoy: drawing,
    finding new music and telling people how much I love sloths. Feel free to
    reach me out with any type of questions from applying for colleges to what
    type of music I listen to!`,
    askMe: [
      "Living at Cornell",
      "How I Used All My BRBs in the First Two Months",
      "Prelims!",
      "Adjusting to Cornell",
      "Music"
    ]
  },

  {
    id: 6,
    name: "Johnathan Anderson",
    major: "Computer Science",
    year: 21,
    socials: {
      I: "https://www.instagram.com/jawny___/",
      F: null,
      L: "https://linkedin.com/in/johnathana/"
    },
    position: "Co-Mentorship Chair",
    bio: `I'm a junior studying Computer Science in the College of Engineering
    and I am currently the Co-Mentorship Chair for URMC. Coming from Baltimore,
    I've been able to witness the dearth of resources that underrepresented
    minorities are often afforded first-hand. I'm cognizant of the fact that I
    didn't make it to where I am alone, so URMC is a great vector for me to give
    back to the communities that have continually supported me and provide them
    with the resources, inspiration, and encouragement necessary to maximize
    their potentials.

    Outside of URMC, I am currently the External Vice President of Cornell's
    chapter of the National Society of Black Engineers, the Vice President of
    Scholars Working Ambitiously to Graduate, a Backend Developer on Cornell
    AppDev, a Teaching Assistant for AppDev's backend course, and an aspiring
    entrepreneur.`,
    askMe: [
      "Interview Tips",
      "Internships",
      "Academic Advice",
      "Resume Critiques",
      "Cornell AppDev"
    ]
  },

  {
    id: 7,
    name: "Marcella Imoisili",
    major: "Information Science",
    year: 21,
    socials: {
      I: "https://www.instagram.com/marzzzella/",
      F: "https://www.facebook.com/marcella.imoisili",
      L: "https://www.linkedin.com/in/imarcella/"
    },
    position: "Co-Design Chair",
    bio: `Hi, I'm Marcella :) I'm a Junior, IS major from FL. When I got into
    Cornell, I really wanted to be an animator and intended to graduate as a
    Digital Communications major. A year later, I realized that the major was
    too restrictive and didn't challenge me as much as I had hoped. At the time,
    I was also taking my first CS course. And let me tell you... it was quite
    the challenge. Although I was really struggling, I found myself captivated
    by the intersection of logic, innovation, and creativity that CIS
    incorporated. There were times where I felt really alone and extremely
    discouraged but I was lucky to find a safe haven in URMC. With every g-body,
    office hour, and workshop I attended, I felt my confidence begin to increase.
    With the support of my peers and advisors, I was able to successfully switch
    my major to Information Science, which allowed me the flexibility to be as
    technical and artistic as I desired. I'm so happy to be a part of URMC and
    contribute to this great support system that first supported me!`,
    askMe: [
      "Snapchat",
      "WICC",
      "CS 1110",
      "INFO 1300",
      "INFO 2300",
      "INFO 2040"
    ]
  },

  // 8: {
  //   id: 8,
  //   name: "Cynthia Enofe",
  //   major: "Undecided",
  //   year: 23,
  //   socials: {
  //     I: null,
  //     F: null,
  //     L: null
  //   },
  //   position: "Underclassmen Floater",
  //   bio: `My name is Cynthia and my parents are from Nigeria (aye). I'm from
  //   Harlem, NY and I have lived in the NYC my entire life. I've always been
  //   intrigued by computers as my Dad decided to pick up software development as
  //   I grew into my adolescence. I would hear words such as Java and Python
  //   around the house, but my father was constantly discouraged at the fact that
  //   he desired a career in an industry that did not welcome people like him. I
  //   immediately became interested in Computer Science in college as I sought out
  //   a career in the field in order to shift the demographics of the individuals
  //   in the industry and also aid other minority students who would like to pursue
  //   a career in computing, but do not believe in themselves enough. I started
  //   out in computing by writing silly code in my TI-84 Plus graphing calculator
  //   during class, but I became more serious about coding when I joined URMC and
  //   saw how much the industry had to offer.`,
  //   askMe: [
  //     "Nigerian vs. Ghanian Jollof",
  //     "Horoscopes",
  //     "Traveling",
  //     "Cool Jokes",
  //     "Anything Really!"
  //   ]
  // },

  {
    id: 8,
    name: "Vivian Kiniga",
    major: "MPS in Information Science",
    year: 21,
    socials: {
      I: 'https://www.instagram.com/viviankiniga/',
      F: null,
      L: 'https://linkedin.com/in/vivian-kiniga-5b80a7b0/'
    },
    position: "IS Academic Chair",
    bio: `I am a Master's student studying Information Science with a concentration
    in User Experience (UX). I am from Nairobi, Kenya. I am really passionate
    about understanding people and coming up with user centered solutions. I
    really value inclusivity, especially in technology, hence my involvement in
    URMC. :)`,
    askMe: [
      "Product Design",
      "Music",
      "Kenya"
    ]
  },

  {
    id: 9,
    name: "Dylan Castillo",
    major: "Computer Science",
    year: 23,
    socials: {
      I: 'https://instagram.com/dylanjcastillo',
      F: null,
      L: 'https://www.linkedin.com/in/dylan-castillo-879563187/'
    },
    position: "Floater",
    bio: `I'm Dylan Castillo, a first-generation freshman in the college of Arts
    and Sciences majoring in Computer Science and an Underclassmen Representative
    for URMC. I was born and raised in Venezuela (but I'm half Cuban) and I'm
    currently living in Florida. Outside of URMC, I'm also involved as a Campus
    Visit Co-Chair for CU Image.`,
    askMe: [
      "Underclassmen Opportunities",
      "CS for Non-CS Majors",
      "Java",
      "Python",
      "Moe's"
    ]
  }
]

module.exports = boardMembers;
