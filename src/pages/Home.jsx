export function Home() {
    return (
        <>
            <h1>
                Hello and Welcome!
            </h1>
            <h3 className="text-left">About this site</h3>
            <p className="text-left">This site serves as a portfolio hub for my current and future projects, as well as a 
                central place to link external work that extends beyond this application.

                I developed the entire site using React, a framework I began learning on October 20th. Through extensive research 
                and a process of trial and error, I was able to design a functional interface and an interactive résumé within just 
                two days.

                I'm a fast learner with a strong drive for continuous improvement. Given the right environment, 
                I can quickly adapt to new technologies; whether that means mastering a new framework or deepening my 
                expertise in the stacks I already use.</p>

            <h3 className="text-left">About Me</h3>
            <p className="text-left">My name is Philip Christensen, and I've been passionate about software development since 
                high school. I view computer science as an ongoing problem-solving challenge; one that combines creativity, logic, 
                and precision.

                My professional experience has primarily focused on front-end development, but I'm eager to expand into 
                full-stack or back-end roles to broaden my technical capabilities and contribute across all layers of a project.

                Outside of development, I enjoy reading, exercising, hiking, and exploring small towns throughout my area.
            </p>

            <h3 className="text-left">Future Site Updates Planned</h3>
            <ul className="text-left">
                <li>Division 2 Loot Map: I plan to develop a dynamic web application that visualizes the 
                    daily loot rotation system from The Division 2. This project will eventually demonstrate full-stack capabilities, 
                    including data integration, API handling, and interactive UI mapping. Currently, I have it rendering a small number
                    of square icons from a self generated library to demonstrate the ability to position and scale icons from a predefined list.
                    Next steps are to add custom icons, retrieve the location positions and the icon mappings from an api, and to allow mouse interaction via tooltips
                    </li>
                <li>Styling: The site currently uses PrimeFlexCSS and Material UI for layout and design components. 
                    As Material UI continues to expand its web feature set, I intend to refine the site's appearance 
                    and user experience for a more cohesive and professional presentation.</li>
            </ul>

            <h3 className="text-left">Contact Me</h3>
            <div className="flex justify-content-evenly">
            <span>Email: <a href="mailto:management@philintheblank.cloud">management@philintheblank.cloud</a></span>
            <span>Mobile: (814) 777-5383</span>
            </div>
        </>
    )
}