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
        "Senior Software Developer - Strella Biotech (Oct 2023 - Feb 2025)",
      content: [
        "Architected a high-volume Quality Control inventory matching system using TypeScript, AWS, Docker, Lambda, SNS, S3, and SQS, processing over 100,000 records daily. This system significantly reduced apple repacks, saving millions annually through reduced waste.",
        "Refactored a ripening task system with Next.js and a custom rules engine, replacing a buggy, monolithic backend with modular, testable services. Enhanced consistency, testability, and debugging through improved logging, resulting in a precise, data-driven workflow.",
        "Established fast, reliable cloud infrastructure with Terraform, AWS SAM, and a CI/CD pipeline. This approach streamlined automated testing and made deployments consistent, repeatable, and efficient.",
      ],
    },
    {
      header: "Senior Software Developer - Advocat AI (Oct 2021 - Mar 2023)",
      content: [
        "Re-engineered backend with a C# ASP.NET gRPC API and Azure Cosmos DB, significantly improving performance and enabling functional prototypes despite initial limitations.",
        "Led a Go micro-service deployment on Kubernetes, collaborating with product and business teams to align technical solutions with strategic goals.",
      ],
    },
    {
      header:
        "Software Developer - Amplify Consulting Partners (Aug 2019 - Oct 2021)",
      content: [
        "Architected a Python Lambda-based data pipeline to load data into a Redshift cluster, enabling faster access to critical data and improving dashboard performance for decision-makers.",
        "Developed a C# ASP.NET REST API using an Azure Microsoft SQL Server for a new student information system, optimizing administrative processes and improving data management.",
        "Contributed to a React front-end project, enhancing user experience and responsiveness with Redux for state management.",
      ],
    },
    {
      header: "Data Engineer - JND Legal Administration (Mar 2018 - Mar 2019)",
      content: [
        "Streamlined ETL processes utilizing Python and Machine Learning, improving data analyst productivity.",
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
