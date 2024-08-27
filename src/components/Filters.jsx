import React from "react";
import { FormInput, SelectBox } from "../components";
import { Form, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { formatPrice } from "../utils";
import PriceRange from "./PriceRange";
import CheckBox from "./CheckBox";

const Filters = ({ params, request, }) => {
  const navigate = useNavigate();

  const datas = useLoaderData();

  

  const { data, meta ,paramsValue} = datas;

  console.log(`params`, paramsValue);

  const { companies, categories, pagination } = meta;

     const handleReset = () => {
       navigate("/", { replace: true });
     };
 

  return (
    <div>
      <h4 className="text-yellow-600 font-serif text-2xl font-semibold">
        Filter
      </h4>

      <Form method="get">
        <div className="mt-10 mb-20 max-w-full py-10  bg-transparent  border-2 border-yellow-500 rounded-md p-4  grid grid-cols-1 justify-center gap-4 smallTablet:grid-cols-3  smallTablet:items-center smallTablet:gap-8 smallTablet:justify-between w-full">
          <div>
            {" "}
            <FormInput
              label={"Search Product"}
              name={"search"}
              type={"text"}
              size={"xs"}
              defaultValue={paramsValue?.search}
            />
          </div>

          <div>
            <div className="label text-lg font-medium tracking-wide w-full">
              <span className="label-text text-white">Select Category</span>
            </div>
            <SelectBox
              name={"category"}
              categories={categories}
              defaults={paramsValue?.category}
            />
          </div>

          <div>
            <div className="label my-2 text-lg font-medium tracking-wide smallTablet:my-0">
              <span className="label-text text-white">Select Company</span>
            </div>
            <SelectBox
              name={"company"}
              categories={companies}
              defaults={paramsValue?.company}
            />
          </div>

          <div>
            <PriceRange
              minValue={0}
              maxValue={143000}
              step={1000}
              defaults={paramsValue?.price}
            />
          </div>

          <CheckBox defaults={paramsValue?.shipping} />

          <div></div>

          <div>
            <button className="btn btn-primary w-full">Search</button>
          </div>

          <div>
            <button className="btn btn-accent w-full" onClick={()=>handleReset()}>Reset</button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Filters;
