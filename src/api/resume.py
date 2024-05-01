def parse_resume(resume, sections=[]):
    parsed_resume = ""
    for section in [
        x for x in resume["sections"] if x["header"] in sections or len(sections) == 0
    ]:
        if len(section["header"]) > 0:
            parsed_resume += section["header"] + "\n"
        for line in section["content"]:
            parsed_resume += line + "\n"
        for sub_section in section["collection"]:
            if len(sub_section["header"]) > 0:
                parsed_resume += sub_section["header"] + "\n"
            for line in sub_section["content"]:
                parsed_resume += "- " + line + "\n"
        parsed_resume += "\n"
    return parsed_resume


resume = {
    "sections": [
        {
            "header": "PROFESSIONAL STATEMENT",
            "content": [
                "Peter Lansdaal is a Passionate and detail-oriented Senior Full-Stack Software Developer that knows every step of the stack. Has a keen focus on delivering impactful results and is driven by a passion for learning new technologies."
            ],
            "collection": [],
        },
        {
            "header": "WORK EXPERIENCE",
            "content": [],
            "collection": [
                {
                    "header": "Senior Software Developer at Strella Biotech from October 2023 to current",
                    "content": [
                        "Designed Python AWS Lambda functions with Docker containers registered in ECR, leveraging Pydantic to empower data scientists in algorithm development.",
                        "Successfully converted multiple Javascript Lambdas to Typescript and consolidated common code into a referenced package enhancing maintainability of measurement ingestion.",
                        "Engineered plop templates for Lambda boilerplate, orchestrated SAM for local testing, and implemented automated testing in the CI/CD pipeline for streamlined code deployment",
                    ],
                },
                {
                    "header": "Senior Software Developer at Advocat AI from October 2021 to March 2023",
                    "content": [
                        "Demonstrated expertise in troubleshooting the Docker builds deployed with Kubernetes.",
                        "Led a small team of engineers, including offshore resources, to develop a modern model-view-viewmodel Blazor front-end to take advantage of the full Microsoft stack backend.",
                        "Refactored a C# .NET gRPC API to leverage multithreading and an Azure Cosmos DB and reduce query times by 90%.",
                        "Created a culture of code excellence on Azure DevOps with a collaborative code review process to ensure code quality.",
                    ],
                },
                {
                    "header": "Software Developer at Amazon via Amplify Consulting Partners from March 2021 to October 2021",
                    "content": [
                        "Helped establish a new analytics team by designing and implementing a server-less data pipeline using Python, AWS Lambda, S3, and SQS to load and transform data into a Redshift cluster.",
                        "Mentored team on the development lifecycle, AWS, version control, and coding best practices",
                    ],
                },
                {
                    "header": "Software Developer at the Colorado Community College System via Amplify Consulting Partners from August 2019 to March 2021",
                    "content": [
                        "Spearheaded the development of a C# ASP.NET Core REST API using an Azure hosted Microsoft SQL Server for a new student information system.",
                        "Collaborated in debugging and enhancing a TypeScript-based React.js app, improving functionality and user experience.",
                    ],
                },
                {
                    "header": "Data Engineer at JND Legal Administration from March 2018 to March 2019",
                    "content": [
                        "Streamlined manual processes by utilizing Python and Machine Learning to automate PDF annotation, normalize address data, perform ETL actions into a Microsoft SQL Server, and migrate over 200 Access databases.",
                    ],
                },
                {
                    "header": "Systems Developer at Expeditors from September 2014 to March 2018",
                    "content": [
                        "Developed an automated Disaster Recover Pipeline with Bash scripts on Linux to ensure data integrity and availability in case of system failures or disruptions.",
                        "Instrumented monitoring on Java applications and developed custom dashboards using a Postgres DB, providing real-time analysis into system performance, metrics, and health.",
                    ],
                },
            ],
        },
        {
            "header": "PROGRAMMING LANGUAGES",
            "content": [],
            "collection": [
                {"header": "C#", "content": ["ASP.Net core and Blazor"]},
                {"header": "Python", "content": ["Flash and FastApi"]},
                {"header": "Javascript", "content": ["React.js, Next.js, and Node.js"]},
            ],
        },
        {
            "header": "EDUCATION",
            "content": [
                "Bachelors in Mathematics at the University of Washington with a minor in Applied Mathematics."
            ],
            "collection": [],
        },
        {
            "header": "PERSONAL PROJECTS",
            "content": [],
            "collection": [
                {
                    "header": "Wizard stuck in a computer",
                    "content": [
                        "A portfolio site featuring an old computer terminal with a chat interface to chat GPT impersonating a wizard",
                        "built using a React js front end and a fastApi backend",
                    ],
                },
                {
                    "header": "Carbonquill",
                    "content": [
                        "Peter collaborated with friends to build a notes taking site for table top role playing games that utilized ChatGPT to transcribe and summarize game play audio",
                        "built using a Next js front end with a C# Asp.Net Core Rest API",
                        "Used AzureCosmosDb to store the graph of notes",
                        "Auth0 for user authentication and Stripe for payments",
                    ],
                },
                {
                    "header": "Wacky Racers",
                    "content": [
                        "A discord bot that let users pick an emoji, then start and manage races",
                        "built using python and the discord api",
                    ],
                },
            ],
        },
        {
            "header": "DESCRIPTION",
            "content": [
                "Peter Lansdaal is a Seattle native with a flair for creativity and collaboration. He finds joy in playing tabletop role-playinhg games, creating immersive stories with friends, and nurturing lasting bonds. Beyond gaming, Peter Lansdaal has dabbled in improv and discovered a love for sketching portraits as an amateur artist. With a dream to build their own wooden boat, they cherish the art of craftsmanship and the tranquility of water. Peter Lansdaal weaves a colorful tapestry of passions leaving an indelible mark wherever their journey takes them."
            ],
            "collection": [],
        },
        {
            "header": "CONTACT",
            "content": ["pndaal@gmail.com"],
            "collection": [],
        },
    ]
}
