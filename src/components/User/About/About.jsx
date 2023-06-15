import './About.css';
import about from "./about.png"
function About() {
   return (

      <div className='aboutBody'>
         <div className="aboutHeading">
            <h1>About</h1>
            {/* <p>Lểbdsafdsafewafewavdsaewavdsafewafsafewa</p> */}

         </div>
         <section className='about-us'>
            <img src={about} alt="About img" />
            <div className="aboutContent">
               <h2> What is about Karnel Travel?</h2>
               <p>​KarnelTravelView is providing you a place to book hotels, tours and
                  other services through our website with competitive
                  prices and guaranteed quality.
               </p>
               <p>
                  KarnelTravelView was founded by a group of travel enthusiasts who want to share their passion with everyone.
               </p>
               <p>
               ​Join KarnelTravelView to explore the world and enjoy amazing travel experiences!​
               </p>
            </div>
         </section>
      </div>


   );
}

export default About;