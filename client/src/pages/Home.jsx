import { useEffect, useState } from "react";
import { Card, FormField, Loader } from "../components";
import { getAllPosts } from "../api";
import PropTypes from "prop-types";

const RenderPost = ({ data, title }) => {
  if (data.length > 0)
    return data?.map((post) => <Card key={post._id} {...post} />);
  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};

RenderPost.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPost] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searched, setSearched] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await getAllPosts();
        setAllPost(fetchedPosts?.data?.reverse());
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleSearch = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearched(searchResult);
      }, 500)
    );
  };
  return (
    <section className="maxx-w-7xl mx-auto">
        <div className="flex justify-between items-center">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          The Community Showcase
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[700px]">
          Browse through the collection of best , imaginative and visually
          stunning images created by DALL-E AI
        </p>
      </div>
      <div className="w-96">
        <FormField
          labelName="Search Posts"
          type="text"
          name="text"
          placeholder="Search Posts..."
          value={searchText}
          handleChange={handleSearch}
        />
      </div>

        </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] mb-3 text-xl">
                Showing results for{" "}
                <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderPost data={searched} title="No search resluts found" />
              ) : (
                <RenderPost data={allPosts} title="No Post found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
