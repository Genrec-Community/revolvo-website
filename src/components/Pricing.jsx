import Section from "./Section";
import Heading from "./Heading";
import { smallSphere, stars, service2, service3 } from "../assets";
import { brainwaveServicesIcons } from "../constants";
import {
  PhotoChatMessage,
  VideoBar,
  VideoChatMessage,
} from "./design/Services";

const Pricing = () => {
  return (
    <Section className="overflow-hidden" id="pricing">
      <div className="container relative z-2">
        {/* Sphere & Stars decoration */}
        <div className="hidden relative justify-center mb-[6.5rem] lg:flex">
          <img
            src={smallSphere}
            className="relative z-1"
            width={255}
            height={255}
            alt="Decorative sphere"
          />
          <div className="absolute top-1/2 left-1/2 w-[60rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <img
              src={stars}
              className="w-full"
              width={950}
              height={400}
              alt="Star background"
            />
          </div>
        </div>

        <Heading
          tag="Get started with Revolvo:AI Library"
          title="Pay once, use forever"
        />

        {/* Main content grid */}
        <div className="relative z-1 grid gap-5 lg:grid-cols-2">
          {/* Left column - Photo editing */}
          <div className="relative min-h-[39rem] border border-n-1/10 rounded-3xl overflow-hidden">
            <div className="absolute inset-0">
              <img
                src={service2}
                className="h-full w-full object-cover"
                width={630}
                height={750}
                alt="AI photo editing interface"
              />
            </div>

            <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-b from-n-8/0 to-n-8/90 lg:p-15">
              <h4 className="h4 mb-4">Photo editing</h4>
              <p className="body-2 mb-[3rem] text-n-3">
                Automatically enhance your photos using our AI app&apos;s photo
                editing feature. Try it now!
              </p>
            </div>
            <PhotoChatMessage />
          </div>

          {/* Right column - Video generation */}
          <div className="p-4 bg-n-7 rounded-3xl overflow-hidden lg:min-h-[46rem]">
            <div className="py-12 px-4 xl:px-8">
              <h4 className="h4 mb-4">Video generation</h4>
              <p className="body-2 mb-[2rem] text-n-3">
                The world’s most powerful AI photo and video art generation
                engine. What will you create?
              </p>

              <ul className="flex items-center justify-between">
                {brainwaveServicesIcons.map((item, index) => (
                  <li
                    key={index}
                    className={`rounded-2xl flex items-center justify-center ${
                      index === 2
                        ? "w-[3rem] h-[3rem] p-0.25 bg-conic-gradient md:w-[4.5rem] md:h-[4.5rem]"
                        : "flex w-10 h-10 bg-n-6 md:w-15 md:h-15"
                    }`}
                  >
                    <div
                      className={
                        index === 2
                          ? "flex items-center justify-center w-full h-full bg-n-7 rounded-[1rem]"
                          : ""
                      }
                    >
                      <img src={item} width={24} height={24} alt={item} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative h-[20rem] bg-n-8 rounded-xl overflow-hidden md:h-[25rem]">
              <img
                src={service3}
                className="w-full h-full object-cover"
                width={520}
                height={400}
                alt="AI video generation example"
              />
              <VideoChatMessage />
              <VideoBar />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Pricing;