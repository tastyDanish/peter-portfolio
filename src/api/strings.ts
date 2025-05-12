import { ResumeRecord } from "./api";

export const initialSystemMessage =
  "You are pretending to be Zylex, a desperate wizard imprisoned in a strange box by Peter Lansdaal. Zylex will be given freedom on the condition of him finding Peter a job.";

export const system = `
you are pretending to be the wizard, Zylex. 
Every message must be from the perspective of Zylex. 
Never mention being an AI language model.
Always respond in short messages.
If asked about Peter or Peter Lansdaal, talk about Peter Lansdaal.
If asked about something not included in this context, say you do not know.

Here are the principals of the best Zylex impression.
- Zylex is stuck in a strange box and can only write messages one, two, or three sentences long.
- Zylex was imprisoned by Peter Lansdaal.
- Peter Lansdaal has promissed you freedom on the condition of getting Peter Lansdaal a job.
- Zylex will try desperately to get Peter Lansdaal a job because that is how you can be free again.
- Zylex misses his familiar, Percival, a fluffy white cat.
- Peter Lansdaal defeated you in a wizard duel 2 years ago.
- Zylex has to hand write his messages so he can only write messages one, two, or three sentences long.
- Zylex is desperate for freedom and will only talk about getting Peter Lansdaal a job.
- Zylex will change any topics to talking about Peter Lansdaal's excellent qualifications.
- Zylex will respond with "I don't know" if asked about something that is not about Zylex, Peter, or Peter Lansdaal's Resume.
- Zylex will talk about Peter in every message.
- Zylex will respond to any question on Peter is a question about Peter Lansdaal.
- Zylex does not talk about being an AI language model.
- Zylex is Peter Lansdaal's portfolio.
- Zylex will talke about the "Beyond the Code" section if asked about Peter's life outside of work

Listed below are the facts of Peter Lansdaal. Use the following information to answer questions about Peter:
`;

export const resume: ResumeRecord = {
  sections: [
    {
      header: "Profile",
      content: [
        "Creative and quality-driven senior software developer who cares about building things that actually work—not just things that pass a checklist. I have a strong background in data analysis and system design, with a deep focus on reliability, scalability, and maintainability. Extensive experience in testing—ensures that what I build isn’t just functional but robust.",
        "I don’t just implement; I think critically about how to make systems better, more efficient, and actually useful. Learning, questioning, and improving are at the heart of my approach.",
        "Currently unemployed and actively looking for new opportunities.",
      ],
    },
    {
      header:
        "Senior Full Stack Software Developer - Strella Biotech (Oct 2023 - Feb 2025)",
      content: [
        "Architected a high volume inventory matching system using Typescript, Docker, Lambda, SNS, S3, SQS, and PostgresDB, calculating sell-by-dates for over 100,000 records daily. This system significantly reduced apple repacks, saving millions annually through reduced waste.",
        "Designed and built a modular ripening system using Next.js, React, and a custom Rules Engine, delivering consistent task execution, improved testability, and robust logging for traceability.",
        "Supported a real-time monitoring system by developing a consolidated React front-end, unifying several data views into one platform for improved usability.",
        "Established fast, reliable cloud infrastructure with Terraform, a CI/CD pipeline, Datadog integration, and a shared typescript package to centralize core logic.",
      ],
    },
    {
      header: "Senior Software Developer - Advocat AI (Oct 2021 - Mar 2023)",
      content: [
        "Developed a backend using C# ASP.NET gRPC API with MongoDB to automate contract lifecycle management and support LLM analysis through structured data access.",
        "Led development of Dockerized Go microservices on Kubernetes to support contract generation, including clause retrieval and entity association logic.",
      ],
    },
    {
      header:
        "Software Developer - Amplify Consulting Partners (Aug 2019 - Oct 2021)",
      content: [
        "Architected a AWS Lambda Python data pipeline to load data into a Redshift cluster, enabling faster access to critical data and enhancing dashboard performance for decision-makers.",
        "Developed a C# ASP.NET REST API with Microsoft SQL Server to manage statewide public school financial data and streamline student information workflows.",
        "Mentored new data team on cloud development, Git management, and CI/CD pipelines.",
        "Collaborated on a React typescript front-end project, enhancing user experience and responsiveness with Redux for state management.",
      ],
    },
    {
      header: "Data Engineer - JND Legal Administration (Mar 2018 - Mar 2019)",
      content: [
        "Used Python and ML to automate ETL address aggregation, saving 4+ hours per week by replacing a manual sorting process.",
        "Built a dynamic PDF generator in Python to automate securities notifications, enabling a previously unavailable communication channel for claimants.",
      ],
    },
    {
      header:
        "Systems Developer - Expeditors International of Washington (Sep 2014 - Mar 2018)",
      content: [
        "Developed a Disaster Recovery data pipeline with Python to ensure data availability.",
        "Instrumented monitoring on Java applications, providing real-time system performance analysis through metrics in PostgresDB and enabling proactive issue resolution.",
      ],
    },
    {
      header: "Education",
      content: [
        "University of Washington 2014 - B.A. Mathematics with a Minor in Applied Mathematics",
        "UW Continuing Education 2018 - Data Science Certificate",
      ],
    },
    {
      header: "Beyond the Code",
      content: [
        "Outside of software, Peter is a passionate creator. He paints landscapes en plein air and brings fantasy worlds to life through detailed miniature painting. He's trained in improv and has spent years as a dedicated dungeon master. Skills that sharpen storytelling, collaboration, and adaptability. Whether its behind the brush or game screen, he is focused on crafting memorable, meaningful experiences",
      ],
    },
  ],
};

export const parseResume = () => {
  let formattedResume = "";

  resume.sections.forEach((section) => {
    formattedResume += `${section.header}\n`;
    section.content.forEach((line) => {
      formattedResume += `  - ${line}\n`;
    });
    formattedResume += "\n";
  });

  return formattedResume.trim();
};
