export function Home() {
    return (
        <>
        <h1>
            Hello and Welcome!
        </h1>
        <h3 className="text-left">About this site</h3>
        <p className="text-left">This site will be a host to all my future projects or at least a link to them if 
            I cannot build it entirely within this application.
            I wrote this all in React, a web framework foreign to me until October 20th. 
            With a lot of research and trail and error, I have a basic page and an interactive resume.
            That took 2 days, think of what I can do for your company in 2 weeks, 2 months, or 2 years!
            I love learning, I just need the proper environments to apply all that I have learned, 
            whether that be a new language or framework, or new techniques in the tech stacks I already know.
        </p>

        <h3 className="text-left">About Me</h3>
        <p className="text-left">My name is Philip Christensen and I have been in the development world since high school!
            I quickly learned that computer science is an endless puzzle to solve both in project design and bug hunting!
            My career path has led me to becoming a front end heavy developer however I am always 
            looking for a chance to expand into the full stack or back end. When I am not coding or designing projects,
            I can be found reading, exercising, hiking, or on a weekend trip to explore small towns in my area.
        </p>

        <h3 className="text-left">Future Site Updates Planned</h3>
        <ul className="text-left">
            <li>Division 2 Loot Map: This is a game I play frequently and it has a loot system based on the area or mission played. 
            This loot pool updates daily so I think it would be a cool project to demonstrate full stack capabilities with an updated loot 
            list mapped to an interactive map</li>
            <li>Styling: I am using basic styles with PrimeFlexCSS and Google's Material UI which is still growing its web availability vs android applications
                 and would like to refine the styles for a better look and feel.</li>
        </ul>
        </>
    )
}