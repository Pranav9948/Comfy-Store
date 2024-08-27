import React from "react";

const About = () => {
  return (
    <div className="bg-black text-white py-12">
      <div className="section-container">
        <div className=" grid place-content-center h-full min-h-screen md:min-h-[80vh] place-items-center items-center text-center ">
          <h1 className=" text-4xl md:text-6xl font-bold mb-10 tracking-wide text-primary flex flex-col gap-4 xs:items-center sm:flex sm:flex-row sm:gap-8">
            <span className="flex items-center">We Love</span>

            <button className=" font-serif bg-info text-primary-content rounded-2xl tracking-wide md:py-3 md:px-4">
              <div className="stat place-items-center">
                <div className="stat-value text-2xl md:text-4xl text-base-content ">
                  Comfy
                </div>
              </div>
            </button>
          </h1>

          <p className="text-base max-w-md mx-auto font-normal text-center  smallTablet:text-left leading-7 text-white ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore
            quae quam blanditiis vitae, dolor non eveniet ipsum voluptatibus,
            quia optio aut! Perferendis ipsa cumque ipsam nostrum reprehenderit
            ad illo sed officiis ea tempore! Similique eos minima sit porro,
            ratione aspernatur!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
