import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormField, Loader } from "../components";
import { preview } from "../assets";
import { getRandomPrompts } from "../utils";
import { genetateAiImage, SubmitePost } from "../api";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setFrom] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.photo && form.prompt) {
      try {
        setLoading(true);
        await SubmitePost(form);
        navigate("/");
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a prompt or photo");
    }
  };
  const handleChange = (e) => {
    setFrom({ ...form, [e.target.name]: e.target.value });
  };
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompts(form.prompt);
    setFrom({ ...form, prompt: randomPrompt });
  };
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await genetateAiImage(form.prompt);

        if (response.photo) {
          setFrom({
            ...form,
            photo: `data:image/jpeg;base64,${response.photo}`,
          });
        } else {
          alert("Failed to generate image");
        }
      } catch (error) {
        alert("Error generating image:", error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          Create Post
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[700px]">
          Create the best , imaginative and visually stunning images created by
          DALL-E AI and share them with the community
        </p>
      </div>
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            name="name"
            placeholder="John Doe"
            handleChange={handleChange}
            type="text"
            value={form.name}
          />
          <FormField
            labelName="Your Prompt"
            name="prompt"
            placeholder="an oil pastel drawing of an annoyed cat in a spaceship"
            handleChange={handleChange}
            type="text"
            value={form.prompt}
            isSupriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className="relative bg-gray-50 border border-gray-300 p-3 rounded-lg text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 w-64 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="Preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.4)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="px-4 py-2.5 text-white bg-green-700 text-sm w-full sm:w-auto rounded-md text-center font-medium"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>
        <div className="mt-4">
          <p className="mt-2 text-[#666e75] text-[14px]">
            Once yopu have created an image you can share it with the community
          </p>
          <button className="mt-3 px-4 py-2.5 text-white bg-[#6469ff] text-sm w-full sm:w-auto rounded-md text-center font-medium ">
            {loading ? "Sharing..." : "Share with community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
