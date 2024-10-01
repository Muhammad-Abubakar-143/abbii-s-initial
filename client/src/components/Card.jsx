import PropTypes from "prop-types"; // Import PropTypes
import { download } from "../assets";
import { downloadImage } from "../utils";

const Card = ({ _id, name, photo, prompt }) => {
  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
      <img
        className="w-full h-auto object-cover rounded-xl"
        src={photo}
        alt={name}
      />
      <div className="group-hover:flex group-hover:delay-150 transition-all ease-in-out duration-700 flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>
        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="text-white w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-xs font-bold">
              {name[0]}
            </div>
            <p className="text-white text-md">{name}</p>
          </div>
          <button
            type="button"
            onClick={() => downloadImage(_id, photo)}
            className="outline-none bg-transparent border-none"
          >
            <img
              src={download}
              alt="Download"
              className="w-6 h-6 invert object-contain"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  prompt: PropTypes.string.isRequired,
};

export default Card;
