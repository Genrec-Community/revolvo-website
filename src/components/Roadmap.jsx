import Button from "./Button";
import Heading from "./Heading";
import Section from "./Section";
import Tagline from "./Tagline";
import { roadmap } from "../constants";
import { check2, grid, loading1 } from "../assets";
import { Gradient } from "./design/Roadmap";

const Roadmap = () => (
  <Section className="overflow-hidden" id="roadmap">
    <div className="container md:pb-10">
      <Heading tag="Ready to get started" title="What we’re working on" />

      <div className="relative grid gap-6 md:grid-cols-2 md:gap-4 md:pb-[7rem]">
        {roadmap.map((item) => {
          const status = item.status === "done" ? "Done" : "In progress";

          return (
            <div
              className={`md:flex even:md:translate-y-[7rem] p-0.25 rounded-[2.5rem] ${
                item.colorful ? "bg-conic-gradient" : "bg-n-6"
              }`}
              key={item.id}
            >
              <div className="relative p-8 bg-n-8 rounded-[2.4375rem] overflow-hidden xl:p-15">
                <div className="absolute top-0 left-0 max-w-full">
                  <img
                    className="w-full"
                    src={grid}
                    width={550}
                    height={550}
                    alt="Grid"
                  />
                </div>
                <div className="relative z-1">
                  <div className="flex items-center justify-between max-w-[27rem] mb-8 md:mb-20">
                    <Tagline>{item.date}</Tagline>

                    <div className="flex items-center px-4 py-1 bg-n-1 rounded text-n-8">
                      <img
                        className="mr-2.5"
                        src={item.status === "done" ? check2 : loading1}
                        width={16}
                        height={16}
                        alt={status}
                      />
                      <div className="tagline">{status}</div>
                    </div>
                  </div>

                  <div className="mb-10 -my-10 -mx-15">
                    <img
                      className="w-full"
                      src={item.imageUrl}
                      width={628}
                      height={426}
                      alt={item.title}
                    />
                  </div>
                  <h4 className="h4 mb-4">{item.title}</h4>
                  <p className="body-2 text-n-4">{item.text}</p>
                </div>
              </div>
            </div>
          );
        })}

        <Gradient />
      </div>

      {/* New Photo Grid Section */}
      <div className="mt-16">
        <Heading tag="Gallery" title="Our Team" className="mb-12" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Photo 1 */}
          <div className="group relative">
            <img 
              src="src\assets\sam.png"  // Replace with your image path
              alt="Feature 1" 
              className="w-full h-64 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
            />
            <p className="mt-3 text-center text-n-1 body-2">Shyamnath Sankar</p>
          </div>

          {/* Photo 2 */}
          <div className="group relative">
            <img 
              src="src\assets\jai.jpg"  // Replace with your image path
              alt="Feature 2" 
              className="w-full h-64 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
            />
            <p className="mt-3 text-center text-n-1 body-2">Jai Samyukth BU</p>
          </div>

          {/* Photo 3 */}
          <div className="group relative">
            <img 
              src="src\assets\harish.jpg"  // Replace with your image path
              alt="Feature 3" 
              className="w-full h-64 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
            />
            <p className="mt-3 text-center text-n-1 body-2">Harish V</p>
          </div>

          {/* Photo 4 */}
          <div className="group relative">
            <img 
              src="src\assets\logesh.jpg"  // Replace with your image path
              alt="Feature 4" 
              className="w-full h-64 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
            />
            <p className="mt-3 text-center text-n-1 body-2">Logesh M</p>
          </div>
        </div>
      </div>

    </div>
  </Section>
);

export default Roadmap;